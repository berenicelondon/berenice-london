'use client'

import { useState, useEffect } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { CreditCard, Loader2, CheckCircle } from 'lucide-react';

// Check if we're in demo mode
const isDemoMode = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.startsWith('pk_test_demo') || !process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

// Initialize Stripe
const stripePromise = isDemoMode ? null : loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface StripePaymentProps {
  amount: number;
  description?: string;
  customerEmail?: string;
  onSuccess?: (paymentIntent: any) => void;
  onError?: (error: string) => void;
  metadata?: Record<string, string>;
}

function CheckoutForm({
  amount,
  description,
  customerEmail,
  onSuccess,
  onError,
  clientSecret
}: StripePaymentProps & { clientSecret: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/shop/checkout?success=true`,
        receipt_email: customerEmail,
      },
      redirect: 'if_required',
    });

    if (error) {
      setMessage(error.message || 'An unexpected error occurred.');
      onError?.(error.message || 'Payment failed');
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      onSuccess?.(paymentIntent);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement options={{ layout: 'tabs' }} />
      {message && (
        <div className="text-sm text-red-600">{message}</div>
      )}
      <Button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full bg-amber-700 hover:bg-amber-800"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-4 w-4" />
            Pay £{amount.toFixed(2)}
          </>
        )}
      </Button>
    </form>
  );
}

export function StripePayment(props: StripePaymentProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isDemoMode) return;

    // Create payment intent
    setLoading(true);
    fetch('/api/stripe/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: Math.round(props.amount * 100), // Convert to cents
        currency: 'gbp',
        description: props.description,
        metadata: props.metadata
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setError('Failed to initialize payment');
        }
      })
      .catch((err) => {
        setError('Failed to connect to payment server');
        console.error('Payment initialization error:', err);
      })
      .finally(() => setLoading(false));
  }, [props.amount, props.description, props.metadata]);

  // Demo mode handler
  const handleDemoCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      props.onSuccess?.({
        id: `demo_${Date.now()}`,
        status: 'succeeded',
        amount: props.amount * 100,
        currency: 'gbp'
      });
      setLoading(false);
    }, 2000);
  };

  // Demo mode UI
  if (isDemoMode) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Demo Mode:</strong> Payment processing is in demo mode.
              Click below to simulate a successful payment.
            </p>
          </div>

          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-sm text-gray-600 mb-2">Order Summary</p>
              <p className="font-medium">{props.description || 'Order'}</p>
              <p className="text-2xl font-bold text-amber-700">£{props.amount.toFixed(2)}</p>
            </div>

            <Button
              onClick={handleDemoCheckout}
              disabled={loading}
              className="w-full bg-amber-700 hover:bg-amber-800"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing Demo Payment...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Complete Demo Payment
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Live Stripe UI
  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="py-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-amber-700" />
            <p className="text-sm text-gray-600">Initializing secure payment...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="py-8">
          <div className="text-center space-y-4">
            <p className="text-red-600">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!clientSecret || !stripePromise) {
    return null;
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#b45309',
            colorBackground: '#ffffff',
            colorText: '#1c1917',
            colorDanger: '#df1b41',
            fontFamily: 'system-ui, sans-serif',
            borderRadius: '8px',
          },
        },
      }}
    >
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Secure Payment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CheckoutForm {...props} clientSecret={clientSecret} />
        </CardContent>
      </Card>
    </Elements>
  );
}
