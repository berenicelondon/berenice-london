"use client"

export const dynamic = 'force-dynamic'

import { useState } from "react"
import { useCart } from "@/contexts/CartContext"
import { useAnalytics } from "@/contexts/AnalyticsContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { StripePayment } from "@/components/StripePayment"
import { emailService } from "@/services/emailNotifications"
import { Crown, ArrowLeft, ShoppingBag, Truck, CreditCard, CheckCircle, Lock } from "lucide-react"
import Link from "next/link"

interface ShippingDetails {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  postcode: string
  country: string
  saveAddress: boolean
}

export default function CheckoutPage() {
  const { items, getTotalItems, getTotalPrice, clearCart } = useCart()
  const { trackEvent, trackConversion } = useAnalytics()
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping')
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postcode: '',
    country: 'UK',
    saveAddress: false
  })
  const [orderId, setOrderId] = useState<string | null>(null)

  const subtotal = getTotalPrice()
  const shippingThreshold = 100
  const shippingCost = subtotal >= shippingThreshold ? 0 : 9.99
  const total = subtotal + shippingCost

  const formatPrice = (price: number) => {
    return `£${price.toFixed(2)}`
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('payment')
  }

  const handlePaymentSuccess = async (paymentId: string) => {
    const newOrderId = `BL-${Date.now().toString().slice(-6)}`
    setOrderId(newOrderId)

    // Send order confirmation email
    try {
      await emailService.sendEmail('order_confirmation', {
        userEmail: shippingDetails.email,
        userName: `${shippingDetails.firstName} ${shippingDetails.lastName}`,
        orderId: newOrderId,
        orderTotal: total.toString(),
        orderDate: new Date().toLocaleDateString(),
        items: items.map(item => `${item.name} x${item.quantity}`).join(', '),
        shippingAddress: `${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.postcode}`
      })
    } catch (error) {
      console.error('Failed to send order confirmation email:', error)
    }

    // Track conversion
    trackConversion('purchase', total)
    trackEvent('shop', 'purchase_completed', `${getTotalItems()} items`, total)

    clearCart()
    setStep('confirmation')
  }

  const handlePaymentError = (error: string) => {
    console.error('Payment failed:', error)
  }

  // Redirect to cart if empty
  if (items.length === 0 && step !== 'confirmation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add some items to your cart before checking out.</p>
          <Link href="/shop">
            <Button className="bg-amber-700 hover:bg-amber-800">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // Shipping Details Step
  if (step === 'shipping') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
        {/* Navigation */}
        <nav className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center gap-2">
                <Crown className="h-8 w-8 text-amber-700" />
                <h1 className="text-2xl font-bold text-stone-800">Berenice London</h1>
              </Link>
              <Link href="/shop/cart">
                <Button variant="ghost" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Cart
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-stone-800 mb-2">Checkout</h1>
            <div className="flex items-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-xs font-medium">1</div>
                <span className="text-amber-600 font-medium">Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-300 text-white rounded-full flex items-center justify-center text-xs font-medium">2</div>
                <span className="text-gray-500">Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-300 text-white rounded-full flex items-center justify-center text-xs font-medium">3</div>
                <span className="text-gray-500">Confirmation</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Shipping Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Shipping Information
                  </CardTitle>
                  <CardDescription>
                    Please provide your shipping details for delivery
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={shippingDetails.firstName}
                          onChange={(e) => setShippingDetails(prev => ({ ...prev, firstName: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={shippingDetails.lastName}
                          onChange={(e) => setShippingDetails(prev => ({ ...prev, lastName: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingDetails.email}
                        onChange={(e) => setShippingDetails(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={shippingDetails.phone}
                        onChange={(e) => setShippingDetails(prev => ({ ...prev, phone: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={shippingDetails.address}
                        onChange={(e) => setShippingDetails(prev => ({ ...prev, address: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={shippingDetails.city}
                          onChange={(e) => setShippingDetails(prev => ({ ...prev, city: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="postcode">Postcode</Label>
                        <Input
                          id="postcode"
                          value={shippingDetails.postcode}
                          onChange={(e) => setShippingDetails(prev => ({ ...prev, postcode: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Select value={shippingDetails.country} onValueChange={(value) => setShippingDetails(prev => ({ ...prev, country: value }))}>
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

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="saveAddress"
                        checked={shippingDetails.saveAddress}
                        onCheckedChange={(checked: boolean) => setShippingDetails(prev => ({ ...prev, saveAddress: checked === true }))}
                      />
                      <Label htmlFor="saveAddress" className="text-sm">
                        Save this address for future orders
                      </Label>
                    </div>

                    <Button type="submit" className="w-full bg-amber-700 hover:bg-amber-800">
                      Continue to Payment
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                          {item.selectedColor && (
                            <p className="text-xs text-gray-500">Color: {item.selectedColor}</p>
                          )}
                        </div>
                        <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal ({getTotalItems()} items)</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className={shippingCost === 0 ? "text-green-600" : ""}>
                        {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Payment Step
  if (step === 'payment') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
        {/* Navigation */}
        <nav className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center gap-2">
                <Crown className="h-8 w-8 text-amber-700" />
                <h1 className="text-2xl font-bold text-stone-800">Berenice London</h1>
              </Link>
              <Button variant="ghost" onClick={() => setStep('shipping')} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Shipping
              </Button>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-stone-800 mb-2">Payment</h1>
            <div className="flex items-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-medium">✓</div>
                <span className="text-green-600 font-medium">Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-xs font-medium">2</div>
                <span className="text-amber-600 font-medium">Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-300 text-white rounded-full flex items-center justify-center text-xs font-medium">3</div>
                <span className="text-gray-500">Confirmation</span>
              </div>
            </div>
          </div>

          <StripePayment
            amount={total}
            description={`Order for ${getTotalItems()} item${getTotalItems() > 1 ? 's' : ''} from Berenice London`}
            customerEmail={shippingDetails.email}
            onSuccess={(paymentIntent) => handlePaymentSuccess(paymentIntent.id)}
            onError={handlePaymentError}
            metadata={{
              order_type: 'shop_purchase',
              total_items: getTotalItems().toString(),
              customer_name: `${shippingDetails.firstName} ${shippingDetails.lastName}`,
              customer_email: shippingDetails.email
            }}
          />
        </div>
      </div>
    )
  }

  // Confirmation Step
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Crown className="h-8 w-8 text-amber-700" />
              <h1 className="text-2xl font-bold text-stone-800">Berenice London</h1>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="mb-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-stone-800 mb-4">Order Confirmed!</h1>
          <p className="text-lg text-stone-600">
            Thank you for your order. We've sent a confirmation email to {shippingDetails.email}.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-left">
            <div className="flex justify-between">
              <span>Order Number:</span>
              <span className="font-mono font-medium">{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span>Order Date:</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Amount:</span>
              <span className="font-medium">{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Address:</span>
              <div className="text-right">
                <div>{shippingDetails.firstName} {shippingDetails.lastName}</div>
                <div>{shippingDetails.address}</div>
                <div>{shippingDetails.city}, {shippingDetails.postcode}</div>
                <div>{shippingDetails.country}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 space-y-4">
          <p className="text-sm text-stone-600">
            Your order will be processed within 1-2 business days. You'll receive a tracking number via email once your order ships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button variant="outline">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/">
              <Button className="bg-amber-700 hover:bg-amber-800">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
