"use client"

import { ShoppingCart } from "@/components/ShoppingCart"
import { Crown } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
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
            <div className="flex items-center gap-4">
              <Link href="/shop" className="text-stone-700 hover:text-amber-700 transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <ShoppingCart />
    </div>
  )
}
