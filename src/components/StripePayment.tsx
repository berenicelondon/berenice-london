"use client"

import { useState, useEffect } from 'react'
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, CreditCard, Shield, CheckCircle, AlertCircle, Lock } from 'lucide-react'
import { getStripe, PAYMENT_CONFIG, formatCurrency, convertToStripeAmount } from '@/lib/stripe'

// Get Stripe instance
const stripePromise = getStripe()

interface StripePaymentProps {
  amount: number
  currency?: string
  description: string
  customerEmail?: string
  onSuccess: (paymentIntent: { id: string; status: string; amount: number }) => void
  onError: (error: string) => void
  metadata?: Record<string, string>
}

interface PaymentFormProps extends StripePaymentProps {
  clientSecret: string
}

const PaymentForm = ({
  amount,
  currency = 'GBP',
  description,
  customerEmail,
  onSuccess,
  onError,
  clientSecret,
  metadata
}: PaymentFormProps) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isComplete, setIsComplete] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)
    setError(null)

    const cardElement = elements.getElement(CardElement)

    if (!cardElement) {
      setError('Card element not found')
      setIsLoading(false)
      return
    }

    // Confirm the payment
    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: customerEmail,
          },
        },
      }
    )

    setIsLoading(false)

    if (stripeError) {
      setError(stripeError.message || 'An error occurred')
      onError(stripeError.message || 'Payment failed')
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setIsComplete(true)
      onSuccess(paymentIntent)
    }
  }

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
        fontFamily: 'system-ui, -apple-system, sans-serif',
      },
      invalid: {
        color: '#9e2146',
      },
    },
    hidePostalCode: true,
  }

  if (isComplete) {
    return (
      <div className="text-center p-8">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-green-700 mb-2">Payment Successful!</h3>
        <p className="text-gray-600">Your payment has been processed securely.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Summary */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-gray-700">Amount to pay:</span>
          <span className="text-2xl font-bold text-amber-700">{formatCurrency(convertToStripeAmount(amount), currency)}</span>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      {/* Card Input */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Card Details
        </label>
        <div className="border border-gray-300 rounded-lg p-4 bg-white">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      {/* Security Badges */}
      <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Shield className="h-4 w-4" />
          <span>SSL Encrypted</span>
        </div>
        <div className="flex items-center gap-1">
          <Lock className="h-4 w-4" />
          <span>Secure Payment</span>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-amber-700 hover:bg-amber-800 text-white"
        disabled={!stripe || isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-4 w-4" />
            Pay {formatCurrency(convertToStripeAmount(amount), currency)}
          </>
        )}
      </Button>

      {/* Powered by Stripe */}
      <div className="text-center">
        <Badge variant="outline" className="text-xs">
          Powered by Stripe
        </Badge>
      </div>
    </form>
  )
}

export function StripePayment(props: StripePaymentProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [isInitializing, setIsInitializing] = useState(true)
  const [initError, setInitError] = useState<string | null>(null)

  useEffect(() => {
    const initializePayment = async () => {
      try {
        setIsInitializing(true)

        const response = await fetch('/api/stripe/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: props.amount,
            currency: props.currency || PAYMENT_CONFIG.currency,
            description: props.description,
            customerEmail: props.customerEmail,
            metadata: {
              ...props.metadata,
              payment_source: 'website',
              session_id: `session_${Date.now()}`,
            },
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to create payment intent')
        }

        const paymentIntent = await response.json()
        setClientSecret(paymentIntent.client_secret)
      } catch (error: any) {
        console.error('Failed to initialize payment:', error)
        setInitError(error.message || 'Failed to initialize payment. Please try again.')
      } finally {
        setIsInitializing(false)
      }
    }

    initializePayment()
  }, [props.amount, props.currency, props.description, props.customerEmail, props.metadata])

  const elementsOptions: StripeElementsOptions = {
    clientSecret: clientSecret || undefined,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#b45309', // amber-700
      },
    },
  }

  if (isInitializing) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Processing Payment
          </CardTitle>
          <CardDescription>Initializing secure payment...</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
        </CardContent>
      </Card>
    )
  }

  if (initError || !clientSecret) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            Payment Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertDescription>
              {initError || 'Unable to initialize payment. Please try again.'}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Secure Payment
        </CardTitle>
        <CardDescription>
          Complete your payment securely with Stripe
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Elements stripe={stripePromise} options={elementsOptions}>
          <PaymentForm {...props} clientSecret={clientSecret} />
        </Elements>
      </CardContent>
    </Card>
  )
}
