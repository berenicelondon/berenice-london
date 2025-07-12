"use client"

import { useState } from "react"
import { useCart } from "@/contexts/CartContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  ShoppingCart as ShoppingCartIcon,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag
} from "lucide-react"
import Link from "next/link"

interface CartDrawerProps {
  children: React.ReactNode
}

interface ControlledCartDrawerProps {
  isOpen: boolean
  onClose: () => void
  memberDiscount?: number
}

export function CartDrawer({ children }: CartDrawerProps) {
  const { items, updateQuantity, removeFromCart, getTotalItems, getTotalPrice, clearCart } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  const formatPrice = (price: number) => {
    return `£${price.toFixed(2)}`
  }

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  const shippingThreshold = 100
  const currentTotal = getTotalPrice()
  const freeShippingRemaining = Math.max(0, shippingThreshold - currentTotal)
  const shippingCost = currentTotal >= shippingThreshold ? 0 : 9.99

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart ({getTotalItems()})
          </SheetTitle>
          <SheetDescription>
            {items.length === 0
              ? "Your cart is empty"
              : `${getTotalItems()} item${getTotalItems() > 1 ? 's' : ''} in your cart`
            }
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCartIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Button onClick={() => setIsOpen(false)} asChild>
                <Link href="/shop">
                  Start Shopping
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Free Shipping Progress */}
              {freeShippingRemaining > 0 && (
                <Card className="bg-amber-50 border-amber-200">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Tag className="h-4 w-4 text-amber-600" />
                      <span>Add {formatPrice(freeShippingRemaining)} more for free shipping!</span>
                    </div>
                    <div className="mt-2 w-full bg-amber-200 rounded-full h-2">
                      <div
                        className="bg-amber-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (currentTotal / shippingThreshold) * 100)}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Cart Items */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {items.map((item) => (
                  <Card key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-sm leading-tight">{item.name}</h4>
                              <p className="text-xs text-gray-500 capitalize">{item.category}</p>
                              {item.selectedColor && (
                                <p className="text-xs text-gray-500">Color: {item.selectedColor}</p>
                              )}
                              {item.selectedSize && (
                                <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-sm">{formatPrice(item.price * item.quantity)}</p>
                              <p className="text-xs text-gray-500">{formatPrice(item.price)} each</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Cart Summary */}
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(currentTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className={shippingCost === 0 ? "text-green-600" : ""}>
                      {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatPrice(currentTotal + shippingCost)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  className="w-full bg-amber-700 hover:bg-amber-800"
                  onClick={() => setIsOpen(false)}
                  asChild
                >
                  <Link href="/shop/checkout">
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsOpen(false)}
                    asChild
                  >
                    <Link href="/shop">Continue Shopping</Link>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

// Main Shopping Cart Component for dedicated cart page
export function ShoppingCart() {
  const { items, updateQuantity, removeFromCart, getTotalItems, getTotalPrice, clearCart } = useCart()

  const formatPrice = (price: number) => {
    return `£${price.toFixed(2)}`
  }

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  const shippingThreshold = 100
  const currentTotal = getTotalPrice()
  const freeShippingRemaining = Math.max(0, shippingThreshold - currentTotal)
  const shippingCost = currentTotal >= shippingThreshold ? 0 : 9.99

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCartIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/shop">
            <Button className="bg-amber-700 hover:bg-amber-800">
              Start Shopping
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-stone-800">Shopping Cart</h1>
          <p className="text-stone-600">{getTotalItems()} item{getTotalItems() > 1 ? 's' : ''} in your cart</p>
        </div>
        <Button variant="outline" onClick={clearCart} className="text-red-600">
          <Trash2 className="h-4 w-4 mr-2" />
          Clear Cart
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {/* Free Shipping Progress */}
          {freeShippingRemaining > 0 && (
            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-sm mb-3">
                  <Tag className="h-4 w-4 text-amber-600" />
                  <span>Add {formatPrice(freeShippingRemaining)} more for free shipping!</span>
                </div>
                <div className="w-full bg-amber-200 rounded-full h-2">
                  <div
                    className="bg-amber-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (currentTotal / shippingThreshold) * 100)}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {items.map((item) => (
            <Card key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}>
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{item.name}</h3>
                        <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                        {item.selectedColor && (
                          <p className="text-sm text-gray-500">Color: {item.selectedColor}</p>
                        )}
                        {item.selectedSize && (
                          <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="h-10 w-10 p-0"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="w-20 text-center"
                          min="1"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="h-10 w-10 p-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-lg">{formatPrice(item.price * item.quantity)}</p>
                        <p className="text-sm text-gray-500">{formatPrice(item.price)} each</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({getTotalItems()} items)</span>
                <span>{formatPrice(currentTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className={shippingCost === 0 ? "text-green-600" : ""}>
                  {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>{formatPrice(currentTotal + shippingCost)}</span>
              </div>

              <div className="space-y-3 pt-4">
                <Link href="/shop/checkout">
                  <Button className="w-full bg-amber-700 hover:bg-amber-800">
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Controlled version for external state management
export function ControlledCartDrawer({ isOpen, onClose, memberDiscount = 0 }: ControlledCartDrawerProps) {
  const { items, updateQuantity, removeFromCart, getTotalItems, getTotalPrice, clearCart } = useCart()

  const formatPrice = (price: number, withDiscount: boolean = false) => {
    if (withDiscount && memberDiscount > 0) {
      const discountedPrice = price * (1 - memberDiscount / 100)
      return `£${discountedPrice.toFixed(2)}`
    }
    return `£${price.toFixed(2)}`
  }

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  const shippingThreshold = 100
  const baseTotal = getTotalPrice()
  const currentTotal = memberDiscount > 0 ? baseTotal * (1 - memberDiscount / 100) : baseTotal
  const freeShippingRemaining = Math.max(0, shippingThreshold - currentTotal)
  const shippingCost = currentTotal >= shippingThreshold ? 0 : 9.99

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart ({getTotalItems()})
          </SheetTitle>
          <SheetDescription>
            {items.length === 0
              ? "Your cart is empty"
              : `${getTotalItems()} item${getTotalItems() > 1 ? 's' : ''} in your cart`}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Free Shipping Progress */}
          {freeShippingRemaining > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-800">
                  Add {formatPrice(freeShippingRemaining)} more for free shipping!
                </span>
              </div>
              <div className="w-full bg-amber-200 rounded-full h-2">
                <div
                  className="bg-amber-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((currentTotal / shippingThreshold) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCartIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <Button onClick={onClose} className="bg-amber-700 hover:bg-amber-800">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-stone-100 rounded-md overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{formatPrice(item.price)}</span>
                          <div className="flex items-center gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-red-500 hover:text-red-700"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Cart Summary */}
          {items.length > 0 && (
            <div className="space-y-4 border-t pt-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>{formatPrice(currentTotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping:</span>
                  <span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>{formatPrice(currentTotal + shippingCost)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Link href="/shop/checkout" onClick={onClose}>
                  <Button className="w-full bg-amber-700 hover:bg-amber-800">
                    Checkout
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    clearCart()
                    onClose()
                  }}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
