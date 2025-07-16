import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Check if we're in demo mode
const isDemoMode = !process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.startsWith('sk_test_demo');
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Initialize Stripe only if we have a real key
const stripe = isDemoMode ? null : new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
  typescript: true
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const sig = request.headers.get('stripe-signature')

    // Demo mode - acknowledge webhook but don't process
    if (isDemoMode || !stripe || !webhookSecret) {
      console.log('Demo webhook received:', {
        timestamp: new Date().toISOString(),
        size: body.length,
        demo_mode: true
      })

      return NextResponse.json({
        received: true,
        demo_mode: true,
        message: 'Webhook received in demo mode'
      })
    }

    // Verify webhook signature
    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, sig!, webhookSecret)
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message)
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      )
    }

    // Handle the event
    console.log(`Webhook received: ${event.type}`)

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('Payment succeeded:', paymentIntent.id)
        // Handle successful payment
        break

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent
        console.log('Payment failed:', failedPayment.id)
        // Handle failed payment
        break

      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session
        console.log('Checkout session completed:', session.id)
        // Handle completed checkout session
        break

      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook processing error:', error)

    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json({
    status: 'Webhook endpoint',
    mode: isDemoMode ? 'demo' : 'live',
    configured: !!webhookSecret
  })
}
