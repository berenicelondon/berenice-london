"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  CreditCard,
  Lock,
  Shield,
  CheckCircle,
  AlertCircle,
  Loader2,
  Star,
  Crown,
  Gift
} from "lucide-react"

interface PaymentDetails {
  cardNumber: string
  expiryDate: string
  cvv: string
  cardholderName: string
  billingAddress: {
    line1: string
    city: string
    postcode: string
    country: string
  }
}

interface PaymentSystemProps {
  type: 'booking' | 'membership' | 'order'
  amount: number
  currency?: string
  itemDescription: string
  membershipTier?: 'basic' | 'premium' | 'elite'
  onPaymentSuccess: (paymentId: string) => void
  onPaymentError: (error: string) => void
}

export function PaymentSystem({
  type,
  amount,
  currency = '£',
  itemDescription,
  membershipTier,
  onPaymentSuccess,
  onPaymentError
}: PaymentSystemProps) {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: {
      line1: '',
      city: '',
      postcode: '',
      country: 'UK'
    }
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!paymentDetails.cardNumber || paymentDetails.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number'
    }

    if (!paymentDetails.expiryDate || !/^\d{2}\/\d{2}$/.test(paymentDetails.expiryDate)) {
      newErrors.expiryDate = 'Please enter expiry date in MM/YY format'
    }

    if (!paymentDetails.cvv || paymentDetails.cvv.length !== 3) {
      newErrors.cvv = 'Please enter a valid 3-digit CVV'
    }

    if (!paymentDetails.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required'
    }

    if (!paymentDetails.billingAddress.line1.trim()) {
      newErrors.billingAddress = 'Billing address is required'
    }

    if (!paymentDetails.billingAddress.postcode.trim()) {
      newErrors.postcode = 'Postcode is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }
    return v
  }

  const handleInputChange = (field: string, value: string) => {
    if (field === 'cardNumber') {
      value = formatCardNumber(value)
    } else if (field === 'expiryDate') {
      value = formatExpiryDate(value)
    } else if (field === 'cvv') {
      value = value.replace(/[^0-9]/g, '').substring(0, 3)
    }

    if (field.startsWith('billingAddress.')) {
      const addressField = field.split('.')[1]
      setPaymentDetails(prev => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          [addressField]: value
        }
      }))
    } else {
      setPaymentDetails(prev => ({ ...prev, [field]: value }))
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handlePayment = async () => {
    if (!validateForm()) return

    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Mock payment validation (in real app, this would be Stripe/PayPal API)
      const isSuccessful = Math.random() > 0.1 // 90% success rate for demo

      if (isSuccessful) {
        const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        onPaymentSuccess(paymentId)
      } else {
        onPaymentError('Payment declined. Please try again with a different card.')
      }
    } catch (error) {
      onPaymentError('Payment processing failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const getMembershipBenefits = (tier: string) => {
    switch (tier) {
      case 'premium':
        return [
          '15% discount on all services',
          'Priority booking',
          'Monthly styling tips newsletter',
          'Free product samples'
        ]
      case 'elite':
        return [
          '25% discount on all services',
          'Priority booking',
          'Monthly styling tips newsletter',
          'Free product samples',
          '1-on-1 styling sessions',
          'Exclusive event invitations'
        ]
      default:
        return [
          'Access to member blog',
          'Basic booking system',
          'Community access'
        ]
    }
  }

  const getMembershipIcon = (tier?: string) => {
    switch (tier) {
      case 'elite': return <Crown className="h-5 w-5 text-amber-600" />
      case 'premium': return <Star className="h-5 w-5 text-amber-600" />
      default: return <Gift className="h-5 w-5 text-amber-600" />
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {type === 'membership' && membershipTier && getMembershipIcon(membershipTier)}
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">{itemDescription}</span>
            <span className="text-lg font-bold">{currency}{amount}</span>
          </div>

          {type === 'membership' && membershipTier && (
            <div className="bg-amber-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2 capitalize">{membershipTier} Membership Benefits:</h4>
              <ul className="text-sm space-y-1">
                {getMembershipBenefits(membershipTier).map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Separator />

          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total</span>
            <span>{currency}{amount}</span>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Button
              variant={paymentMethod === 'card' ? 'default' : 'outline'}
              onClick={() => setPaymentMethod('card')}
              className="h-16 flex flex-col gap-1"
            >
              <CreditCard className="h-5 w-5" />
              <span className="text-xs">Card</span>
            </Button>
            <Button
              variant="outline"
              disabled
              className="h-16 flex flex-col gap-1 opacity-50"
            >
              <span className="text-lg font-bold">PP</span>
              <span className="text-xs">PayPal</span>
            </Button>
            <Button
              variant="outline"
              disabled
              className="h-16 flex flex-col gap-1 opacity-50"
            >
              <span className="text-lg font-bold">A</span>
              <span className="text-xs">Apple Pay</span>
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500">
            <Badge variant="outline" className="text-xs">
              Demo Mode - PayPal and Apple Pay coming soon
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Card Details */}
      {paymentMethod === 'card' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Card Details
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Your payment information is secure and encrypted
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={paymentDetails.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                maxLength={19}
              />
              {errors.cardNumber && (
                <p className="text-sm text-red-500 mt-1">{errors.cardNumber}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={paymentDetails.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  maxLength={5}
                />
                {errors.expiryDate && (
                  <p className="text-sm text-red-500 mt-1">{errors.expiryDate}</p>
                )}
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={paymentDetails.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                  maxLength={3}
                />
                {errors.cvv && (
                  <p className="text-sm text-red-500 mt-1">{errors.cvv}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="cardholderName">Cardholder Name</Label>
              <Input
                id="cardholderName"
                placeholder="John Smith"
                value={paymentDetails.cardholderName}
                onChange={(e) => handleInputChange('cardholderName', e.target.value)}
              />
              {errors.cardholderName && (
                <p className="text-sm text-red-500 mt-1">{errors.cardholderName}</p>
              )}
            </div>

            <Separator />

            <div className="space-y-4">
              <Label>Billing Address</Label>
              <div>
                <Input
                  placeholder="Address Line 1"
                  value={paymentDetails.billingAddress.line1}
                  onChange={(e) => handleInputChange('billingAddress.line1', e.target.value)}
                />
                {errors.billingAddress && (
                  <p className="text-sm text-red-500 mt-1">{errors.billingAddress}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="City"
                  value={paymentDetails.billingAddress.city}
                  onChange={(e) => handleInputChange('billingAddress.city', e.target.value)}
                />
                <Input
                  placeholder="Postcode"
                  value={paymentDetails.billingAddress.postcode}
                  onChange={(e) => handleInputChange('billingAddress.postcode', e.target.value)}
                />
              </div>
              {errors.postcode && (
                <p className="text-sm text-red-500 mt-1">{errors.postcode}</p>
              )}

              <Select
                value={paymentDetails.billingAddress.country}
                onValueChange={(value) => handleInputChange('billingAddress.country', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UK">United Kingdom</SelectItem>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="CA">Canada</SelectItem>
                  <SelectItem value="AU">Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security Notice */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-blue-600" />
            <div className="text-sm">
              <p className="font-medium text-blue-900">Secure Payment</p>
              <p className="text-blue-700">
                Your payment is protected by industry-standard encryption and security measures.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Demo Notice */}
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-amber-900">Demo Mode</p>
              <p className="text-amber-700">
                This is a demonstration payment system. No real charges will be made.
                Use any valid-format card details for testing (e.g., 4242 4242 4242 4242).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pay Button */}
      <Button
        className="w-full bg-amber-700 hover:bg-amber-800 h-12 text-lg"
        onClick={handlePayment}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <Lock className="mr-2 h-5 w-5" />
            Pay {currency}{amount}
          </>
        )}
      </Button>
    </div>
  )
}
