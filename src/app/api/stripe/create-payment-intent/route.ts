import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'gbp', description, customerEmail, metadata } = await request.json();

    // Demo mode - return a mock payment intent
    const demoPaymentIntent = {
      client_secret: `demo_pi_${Date.now()}_secret_demo`,
      id: `demo_pi_${Date.now()}`,
      amount: Math.round(amount * 100),
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

  } catch (error) {
    console.error('Demo payment intent creation error:', error);

    return NextResponse.json(
      { error: 'Demo mode: Payment intent simulation failed' },
      { status: 500 }
    );
  }
}
