import { NextRequest, NextResponse } from 'next/server'
import { createStripeInstance, PAYMENT_CONFIG } from '@/lib/stripe'
import { emailService } from '@/services/emailNotifications'
import { headers } from 'next/headers'

// Order management (in production, use a proper database)
interface Order {
  id: string
  paymentIntentId: string
  customerEmail: string
  amount: number
  currency: string
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
  items: any[]
  shippingAddress?: any
  createdAt: string
  updatedAt: string
  metadata: Record<string, any>
}

// Simple in-memory store (replace with database in production)
const orders = new Map<string, Order>()

// Webhook event handlers
const handlePaymentSucceeded = async (paymentIntent: any) => {
  try {
    console.log(`✅ Payment succeeded: ${paymentIntent.id}`)

    // Find or create order
    let order = Array.from(orders.values()).find(o => o.paymentIntentId === paymentIntent.id)

    if (!order) {
      // Create new order from payment intent
      order = {
        id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        paymentIntentId: paymentIntent.id,
        customerEmail: paymentIntent.receipt_email || paymentIntent.customer?.email || 'unknown@example.com',
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: 'paid',
        items: [], // Would be populated from metadata or separate API call
        shippingAddress: paymentIntent.shipping,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        metadata: paymentIntent.metadata || {},
      }
    } else {
      // Update existing order
      order.status = 'paid'
      order.updatedAt = new Date().toISOString()
    }

    orders.set(order.id, order)

    // Send confirmation email
    try {
      await emailService.sendEmail('order_confirmation', {
        userEmail: order.customerEmail,
        userName: order.shippingAddress?.name || 'Valued Customer',
        orderId: order.id,
        orderTotal: (order.amount / 100).toFixed(2),
        orderDate: new Date(order.createdAt).toLocaleDateString('en-GB'),
        items: order.metadata.items || 'Items from your order',
        shippingAddress: order.shippingAddress ?
          `${order.shippingAddress.address.line1}, ${order.shippingAddress.address.city}, ${order.shippingAddress.address.postal_code}` :
          'Shipping address on file',
      })
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError)
    }

    // Trigger fulfillment process (integrate with inventory system)
    await triggerOrderFulfillment(order)

    return { success: true, orderId: order.id }
  } catch (error) {
    console.error('Error handling payment succeeded:', error)
    throw error
  }
}

const handlePaymentFailed = async (paymentIntent: any) => {
  try {
    console.log(`❌ Payment failed: ${paymentIntent.id}`)

    // Find order and update status
    const order = Array.from(orders.values()).find(o => o.paymentIntentId === paymentIntent.id)

    if (order) {
      order.status = 'cancelled'
      order.updatedAt = new Date().toISOString()
      orders.set(order.id, order)
    }

    // Send failure notification email
    const customerEmail = paymentIntent.receipt_email || paymentIntent.customer?.email
    if (customerEmail) {
      try {
        await emailService.sendEmail('payment_failed', {
          userEmail: customerEmail,
          userName: paymentIntent.shipping?.name || 'Valued Customer',
          paymentIntentId: paymentIntent.id,
          amount: (paymentIntent.amount / 100).toFixed(2),
          currency: paymentIntent.currency.toUpperCase(),
          failureReason: paymentIntent.last_payment_error?.message || 'Payment was declined',
        })
      } catch (emailError) {
        console.error('Failed to send payment failure email:', emailError)
      }
    }

    return { success: true, status: 'payment_failed' }
  } catch (error) {
    console.error('Error handling payment failed:', error)
    throw error
  }
}

const handleChargeDispute = async (dispute: any) => {
  try {
    console.log(`⚠️ Charge dispute created: ${dispute.id}`)

    // Find related order
    const charge = dispute.charge
    const paymentIntent = charge.payment_intent
    const order = Array.from(orders.values()).find(o => o.paymentIntentId === paymentIntent)

    // Send internal notification
    const adminEmail = 'disputes@berenicelondon.co.uk'
    try {
      await emailService.sendEmail('admin_notification', {
        userEmail: adminEmail,
        userName: 'Admin Team',
        subject: `New Dispute: ${dispute.id}`,
        message: `A new dispute has been created for order ${order?.id || 'unknown'}.

Dispute Details:
- Dispute ID: ${dispute.id}
- Amount: £${(dispute.amount / 100).toFixed(2)}
- Reason: ${dispute.reason}
- Status: ${dispute.status}
- Customer: ${charge.billing_details?.email || 'unknown'}

Please review this dispute in your Stripe dashboard.`,
      })
    } catch (emailError) {
      console.error('Failed to send dispute notification:', emailError)
    }

    return { success: true, disputeId: dispute.id }
  } catch (error) {
    console.error('Error handling charge dispute:', error)
    throw error
  }
}

const handleSubscriptionEvent = async (subscription: any, eventType: string) => {
  try {
    console.log(`📅 Subscription event: ${eventType} - ${subscription.id}`)

    // Handle subscription events (for future membership billing)
    const customerEmail = subscription.customer?.email

    if (customerEmail) {
      try {
        let emailType = 'subscription_updated'
        const templateData: any = {
          userEmail: customerEmail,
          subscriptionId: subscription.id,
          status: subscription.status,
        }

        switch (eventType) {
          case 'customer.subscription.created':
            emailType = 'subscription_welcome'
            templateData.planName = subscription.items.data[0]?.price.nickname || 'Premium Plan'
            break

          case 'customer.subscription.updated':
            emailType = 'subscription_updated'
            break

          case 'customer.subscription.deleted':
            emailType = 'subscription_cancelled'
            break
        }

        await emailService.sendEmail(emailType, templateData)
      } catch (emailError) {
        console.error('Failed to send subscription email:', emailError)
      }
    }

    return { success: true, subscriptionId: subscription.id }
  } catch (error) {
    console.error('Error handling subscription event:', error)
    throw error
  }
}

const handleInvoiceEvent = async (invoice: any, eventType: string) => {
  try {
    console.log(`🧾 Invoice event: ${eventType} - ${invoice.id}`)

    const customerEmail = invoice.customer_email || invoice.customer?.email

    if (customerEmail) {
      try {
        if (eventType === 'invoice.payment_succeeded') {
          await emailService.sendEmail('invoice_paid', {
            userEmail: customerEmail,
            userName: invoice.customer_name || 'Valued Customer',
            invoiceId: invoice.id,
            amount: (invoice.amount_paid / 100).toFixed(2),
            currency: invoice.currency.toUpperCase(),
            paidAt: new Date().toLocaleDateString('en-GB'),
          })
        } else if (eventType === 'invoice.payment_failed') {
          await emailService.sendEmail('invoice_failed', {
            userEmail: customerEmail,
            userName: invoice.customer_name || 'Valued Customer',
            invoiceId: invoice.id,
            amount: (invoice.amount_due / 100).toFixed(2),
            currency: invoice.currency.toUpperCase(),
            dueDate: new Date(invoice.due_date * 1000).toLocaleDateString('en-GB'),
          })
        }
      } catch (emailError) {
        console.error('Failed to send invoice email:', emailError)
      }
    }

    return { success: true, invoiceId: invoice.id }
  } catch (error) {
    console.error('Error handling invoice event:', error)
    throw error
  }
}

// Order fulfillment process
const triggerOrderFulfillment = async (order: Order) => {
  try {
    console.log(`📦 Triggering fulfillment for order: ${order.id}`)

    // In production, integrate with:
    // - Inventory management system
    // - Shipping provider APIs
    // - ERP systems

    // For now, simulate fulfillment process
    setTimeout(async () => {
      try {
        // Update order status to shipped
        order.status = 'shipped'
        order.updatedAt = new Date().toISOString()
        orders.set(order.id, order)

        // Send shipping notification
        await emailService.sendEmail('order_shipped', {
          userEmail: order.customerEmail,
          userName: order.shippingAddress?.name || 'Valued Customer',
          orderId: order.id,
          trackingNumber: `BL${Date.now()}`, // Generate tracking number
          estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB'),
        })
      } catch (error) {
        console.error('Error in fulfillment process:', error)
      }
    }, 5000) // Simulate processing delay

    return { success: true }
  } catch (error) {
    console.error('Error triggering fulfillment:', error)
    throw error
  }
}

// Main webhook handler
export async function POST(request: NextRequest) {
  const stripe = createStripeInstance()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    console.error('No Stripe signature found')
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event: any

  try {
    const body = await request.text()
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET_LIVE

    if (!webhookSecret) {
      console.error('Webhook secret not configured')
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
    }

    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Handle the event
  try {
    console.log(`📨 Received webhook: ${event.type}`)

    let result: any = { success: true }

    switch (event.type) {
      case 'payment_intent.succeeded':
        result = await handlePaymentSucceeded(event.data.object)
        break

      case 'payment_intent.payment_failed':
        result = await handlePaymentFailed(event.data.object)
        break

      case 'charge.dispute.created':
        result = await handleChargeDispute(event.data.object)
        break

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        result = await handleSubscriptionEvent(event.data.object, event.type)
        break

      case 'invoice.payment_succeeded':
      case 'invoice.payment_failed':
        result = await handleInvoiceEvent(event.data.object, event.type)
        break

      default:
        console.log(`Unhandled webhook event type: ${event.type}`)
        result = { success: true, message: 'Event received but not processed' }
    }

    console.log(`✅ Webhook processed successfully: ${event.type}`)
    return NextResponse.json(result)

  } catch (error: any) {
    console.error(`❌ Error processing webhook ${event.type}:`, error)

    // Return success to prevent Stripe retries for non-critical errors
    // Only return error status for critical failures
    if (error.critical) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      warning: 'Event received but processing encountered non-critical error',
      error: error.message
    })
  }
}

// GET method for webhook endpoint verification
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Stripe webhook endpoint is active',
    timestamp: new Date().toISOString(),
    events: PAYMENT_CONFIG.webhookEvents,
  })
}

// Order management functions (for internal use only)
// These would typically be in a separate service layer
const orderManagement = {
  getOrder: (id: string) => orders.get(id),
  getAllOrders: () => Array.from(orders.values()),
  updateOrderStatus: (id: string, status: Order['status']) => {
    const order = orders.get(id)
    if (order) {
      order.status = status
      order.updatedAt = new Date().toISOString()
      orders.set(id, order)
      return order
    }
    return null
  },
}
