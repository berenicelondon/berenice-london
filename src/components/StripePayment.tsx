'use client'

import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { CreditCard } from 'lucide-react';

interface StripePaymentProps {
  amount: number;
  description?: string;
  customerEmail?: string;
  onSuccess?: (paymentIntent: any) => void;
  onError?: (error: string) => void;
  metadata?: Record<string, string>;
}

export function StripePayment({
  amount,
  description,
  customerEmail,
  onSuccess,
  onError,
  metadata
}: StripePaymentProps) {
  const handleTemporaryCheckout = () => {
    // Temporary demo checkout for deployment
    setTimeout(() => {
      onSuccess?.({
        id: `demo_${Date.now()}`,
        status: 'succeeded',
        amount: amount * 100,
        currency: 'gbp'
      });
    }, 2000);
  };

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
            <strong>Demo Mode:</strong> Payment processing is temporarily disabled.
            This is a demonstration of the checkout flow.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Amount:</span>
            <span className="font-medium">£{amount.toFixed(2)}</span>
          </div>

          {description && (
            <div className="text-sm text-gray-600">
              {description}
            </div>
          )}

          {customerEmail && (
            <div className="flex justify-between text-sm">
              <span>Email:</span>
              <span>{customerEmail}</span>
            </div>
          )}
        </div>

        <Button
          onClick={handleTemporaryCheckout}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          Complete Demo Order
        </Button>

        <p className="text-xs text-gray-500 text-center">
          Stripe payment integration will be enabled in the next update
        </p>
      </CardContent>
    </Card>
  );
}
