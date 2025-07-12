import { NextRequest, NextResponse } from 'next/server'
import { createStripeInstance, PAYMENT_CONFIG, convertToStripeAmount, StripeError } from '@/lib/stripe'
import { headers } from 'next/headers'

// Rate limiting (in production, use a proper rate limiter like Redis)
const rateLimitMap = new Map()

const RATE_LIMIT_MAX_REQUESTS = 10
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute

function rateLimit(identifier: string): boolean {
  const now = Date.now()
  const windowStart = now - RATE_LIMIT_WINDOW

  if (!rateLimitMap.has(identifier)) {
    rateLimitMap.set(identifier, [])
  }

  const requests = rateLimitMap.get(identifier)

  // Remove old requests outside the window
  const recentRequests = requests.filter((time: number) => time > windowStart)
  rateLimitMap.set(identifier, recentRequests)

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false
  }

  recentRequests.push(now)
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const headersList = await headers()
    const forwardedFor = headersList.get('x-forwarded-for')
    const realIp = headersList.get('x-real-ip')
    const clientIp = forwardedFor?.split(',')[0] || realIp || 'unknown'

    if (!rateLimit(clientIp)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()
    const {
      amount,
      currency = PAYMENT_CONFIG.currency,
      description,
      metadata = {},
      customerEmail,
      shippingAddress,
      receiptEmail,
      setupFutureUsage,
    } = body

    // Validation
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount. Amount must be a positive number.' },
        { status: 400 }
      )
    }

    if (amount > 100000) { // £1000 limit
      return NextResponse.json(
        { error: 'Amount exceeds maximum limit of £1,000.' },
        { status: 400 }
      )
    }

    if (!description || typeof description !== 'string') {
      return NextResponse.json(
        { error: 'Description is required.' },
        { status: 400 }
      )
    }

    // Initialize Stripe
    const stripe = createStripeInstance()

    // Create customer if email provided
    let customerId
    if (customerEmail) {
      try {
        // Check if customer exists
        const existingCustomers = await stripe.customers.list({
          email: customerEmail,
          limit: 1,
        })

        if (existingCustomers.data.length > 0) {
          customerId = existingCustomers.data[0].id
        } else {
          // Create new customer
          const customer = await stripe.customers.create({
            email: customerEmail,
            metadata: {
              source: 'website',
              created_via: 'payment_intent',
            },
          })
          customerId = customer.id
        }
      } catch (error) {
        console.error('Error creating/finding customer:', error)
        // Continue without customer ID if there's an error
      }
    }

    // Prepare payment intent parameters
    const paymentIntentParams: any = {
      amount: convertToStripeAmount(amount),
      currency: currency.toLowerCase(),
      description,
      metadata: {
        ...metadata,
        order_source: 'website',
        created_at: new Date().toISOString(),
        client_ip: clientIp,
      },
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never', // Disable redirect-based payment methods for better UX
      },
      // Enable Stripe Radar for fraud detection
      radar_options: PAYMENT_CONFIG.security.enableRadar ? {
        session: metadata.session_id || undefined,
      } : undefined,
      // Capture method
      capture_method: PAYMENT_CONFIG.security.captureMethod,
    }

    // Add customer if available
    if (customerId) {
      paymentIntentParams.customer = customerId
    }

    // Add receipt email
    if (receiptEmail || customerEmail) {
      paymentIntentParams.receipt_email = receiptEmail || customerEmail
    }

    // Add shipping information
    if (shippingAddress) {
      paymentIntentParams.shipping = {
        name: shippingAddress.name,
        address: {
          line1: shippingAddress.line1,
          line2: shippingAddress.line2 || undefined,
          city: shippingAddress.city,
          postal_code: shippingAddress.postal_code,
          country: shippingAddress.country,
          state: shippingAddress.state || undefined,
        },
      }
    }

    // Setup future usage for saved payment methods
    if (setupFutureUsage) {
      paymentIntentParams.setup_future_usage = setupFutureUsage
    }

    // Require 3D Secure for high-value transactions
    if (convertToStripeAmount(amount) >= PAYMENT_CONFIG.security.require3DS) {
      paymentIntentParams.confirmation_method = 'manual'
      paymentIntentParams.confirm = false
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create(paymentIntentParams)

    // Log successful creation (remove in production or use proper logging)
    console.log(`Payment intent created: ${paymentIntent.id} for ${amount} ${currency}`)

    // Return client secret and relevant information
    return NextResponse.json({
      client_secret: paymentIntent.client_secret,
      payment_intent_id: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
      requires_3ds: convertToStripeAmount(amount) >= PAYMENT_CONFIG.security.require3DS,
    })

  } catch (error: any) {
    console.error('Error creating payment intent:', error)

    // Handle Stripe-specific errors
    if (error.type === 'StripeCardError') {
      return NextResponse.json(
        { error: 'Your card was declined. Please try a different payment method.' },
        { status: 400 }
      )
    }

    if (error.type === 'StripeRateLimitError') {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a moment.' },
        { status: 429 }
      )
    }

    if (error.type === 'StripeInvalidRequestError') {
      return NextResponse.json(
        { error: 'Invalid request. Please check your payment information.' },
        { status: 400 }
      )
    }

    if (error.type === 'StripeAPIError') {
      return NextResponse.json(
        { error: 'Payment processing is temporarily unavailable. Please try again later.' },
        { status: 503 }
      )
    }

    if (error.type === 'StripeConnectionError') {
      return NextResponse.json(
        { error: 'Network error. Please check your connection and try again.' },
        { status: 503 }
      )
    }

    if (error.type === 'StripeAuthenticationError') {
      return NextResponse.json(
        { error: 'Authentication error. Please contact support.' },
        { status: 500 }
      )
    }

    // Generic error
    return NextResponse.json(
      {
        error: process.env.NODE_ENV === 'development'
          ? error.message
          : 'An unexpected error occurred. Please try again.'
      },
      { status: 500 }
    )
  }
}

// OPTIONS method for CORS (if needed)
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
