import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Check if we're in demo mode
const isDemoMode = !process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.startsWith('sk_test_demo');

// Initialize Stripe only if we have a real key
const stripe = isDemoMode ? null : new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
  typescript: true
});

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'gbp', description, customerEmail, metadata } = await request.json();

    // If in demo mode, return mock payment intent
    if (isDemoMode || !stripe) {
      const demoPaymentIntent = {
        clientSecret: `demo_pi_${Date.now()}_secret_demo`,
        id: `demo_pi_${Date.now()}`,
        amount: Math.round(amount),
        currency: currency.toLowerCase(),
        status: 'requires_payment_method',
        description: description || 'Demo payment',
        metadata: {
          ...metadata,
          demo_mode: 'true',
          created_at: new Date().toISOString()
        }
      };

      return NextResponse.json(demoPaymentIntent);
    }

    // Create real payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Amount should already be in cents
      currency: currency.toLowerCase(),
      description,
      metadata: {
        ...metadata,
        customer_email: customerEmail || ''
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status
    });

  } catch (error) {
    console.error('Payment intent creation error:', error);

    // Check if it's a Stripe error
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode || 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
