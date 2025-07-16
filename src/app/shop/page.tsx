"use client"

export const dynamic = 'force-dynamic'

import { ProductList } from "@/components/ProductList"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ControlledCartDrawer } from "@/components/ShoppingCart"
import { useCart } from "@/contexts/CartContext"
import { useAuth } from "@/contexts/AuthContext"
import { useAnalytics } from "@/contexts/AnalyticsContext"
import { productCategories, type ProductCategory } from "@/data/productsData"
import {
  ArrowLeft,
  ShoppingBag,
  Crown,
  Star,
  Truck,
  Shield,
  Award,
  ShoppingCart,
  User,
  Search,
  Filter,
  Grid,
  List,
  SlidersHorizontal,
  Heart,
  Zap,
  Percent,
  Gift,
  CheckCircle,
  Phone
} from "lucide-react"
import Link from "next/link"
import React, { useState } from "react"

export default function ShopPage() {
  const { user } = useAuth()
  const { getTotalItems } = useCart()
  const { trackEvent } = useAnalytics()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("featured")
  const [priceRange, setPriceRange] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  // Track shop visit
  React.useEffect(() => {
    trackEvent('shop', 'shop_visit', 'shop_page')
  }, [trackEvent])

  // Get member discount
  const getMemberDiscount = () => {
    if (!user) return 0
    switch (user.membershipType) {
      case 'elite': return 15
      case 'premium': return 10
      case 'basic': return 5
      default: return 0
    }
  }

  const memberDiscount = getMemberDiscount()

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      {/* Enhanced Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Crown className="h-8 w-8 text-amber-700" />
              <h1 className="text-2xl font-bold text-stone-800">Berenice London</h1>
            </Link>

            {/* Quick Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search wigs, toppers, accessories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/80 border-gray-200 focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Shopping Cart */}
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsCartOpen(true)}
                aria-label={`Shopping cart with ${getTotalItems()} items`}
              >
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-amber-600 text-white text-xs"
                  >
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>

              {user && (
                <Link href="/member-dashboard">
                  <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
              )}

              <Link href="/">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Header with Member Benefits */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-6 text-amber-700 border-amber-200 bg-white/80">
              <ShoppingBag className="h-3 w-3 mr-1" />
              Premium Hair Collection
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6">
              {user ? `Welcome back, ${user.name.split(' ')[0]}!` : 'Our Premium Shop'}
            </h1>

            <p className="text-xl text-stone-600 max-w-4xl mx-auto mb-8">
              {user ? (
                <>
                  As a <span className="font-semibold text-amber-700 capitalize">{user.membershipType}</span> member,
                  enjoy <span className="font-bold text-green-600">{memberDiscount}% off</span> all products
                  plus exclusive access to our premium collection.
                </>
              ) : (
                'Discover our carefully curated collection of premium wigs, hairpieces, and accessories. Each product is selected for its exceptional quality and crafted to enhance your natural beauty.'
              )}
            </p>

            {/* Member Benefits Bar */}
            {user && (
              <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl p-6 border border-amber-200">
                <div className="flex flex-wrap justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Percent className="h-4 w-4 text-green-600" />
                    <span className="font-semibold">{memberDiscount}% Member Discount</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold">Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gift className="h-4 w-4 text-purple-600" />
                    <span className="font-semibold">Exclusive Access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-amber-600" />
                    <span className="font-semibold">Priority Support</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 bg-white/60">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                <Truck className="h-6 w-6 text-amber-700" />
              </div>
              <h3 className="font-semibold text-stone-800 mb-1">Free Shipping</h3>
              <p className="text-xs text-stone-600">On orders over £100</p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                <Shield className="h-6 w-6 text-amber-700" />
              </div>
              <h3 className="font-semibold text-stone-800 mb-1">30-Day Returns</h3>
              <p className="text-xs text-stone-600">Hassle-free returns</p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                <Award className="h-6 w-6 text-amber-700" />
              </div>
              <h3 className="font-semibold text-stone-800 mb-1">Expert Crafted</h3>
              <p className="text-xs text-stone-600">Professional quality</p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                <Zap className="h-6 w-6 text-amber-700" />
              </div>
              <h3 className="font-semibold text-stone-800 mb-1">Fast Delivery</h3>
              <p className="text-xs text-stone-600">Express options available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Filters & Controls */}
      <div className="py-6 px-4 sm:px-6 lg:px-8 bg-white/80 border-b border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">

            {/* Mobile Search */}
            <div className="w-full md:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Tabs */}
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full lg:w-auto">
              <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
                <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
                <TabsTrigger value="wigs" className="text-xs sm:text-sm">Wigs</TabsTrigger>
                <TabsTrigger value="toppers" className="text-xs sm:text-sm">Toppers</TabsTrigger>
                <TabsTrigger value="extensions" className="text-xs sm:text-sm">Extensions</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Controls */}
            <div className="flex items-center gap-3 w-full lg:w-auto">
              {/* Filter Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 p-4 bg-white rounded-lg border border-stone-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-stone-700 mb-2 block">Price Range</label>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Prices" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="under-100">Under £100</SelectItem>
                      <SelectItem value="100-500">£100 - £500</SelectItem>
                      <SelectItem value="500-1000">£500 - £1,000</SelectItem>
                      <SelectItem value="over-1000">Over £1,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-stone-700 mb-2 block">Availability</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Products" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Products</SelectItem>
                      <SelectItem value="in-stock">In Stock</SelectItem>
                      <SelectItem value="low-stock">Low Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-stone-700 mb-2 block">Special Offers</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Offers" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Products</SelectItem>
                      <SelectItem value="sale">On Sale</SelectItem>
                      <SelectItem value="new">New Arrivals</SelectItem>
                      <SelectItem value="bestseller">Bestsellers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Products Section */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ProductList
            category={selectedCategory === "all" ? undefined : (selectedCategory as ProductCategory)}
            searchQuery={searchQuery}
            sortBy={sortBy as "name" | "price" | "rating" | "newest"}
            priceRange={priceRange as "all" | "under-100" | "100-500" | "500-1000" | "over-1000"}
            viewMode={viewMode}
            memberDiscount={memberDiscount}
          />
        </div>
      </div>

      {/* Member CTA */}
      {!user && (
        <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-100 to-yellow-100">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="bg-white shadow-xl border-amber-200">
              <CardContent className="p-8">
                <Crown className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-stone-800 mb-4">
                  Join Our Exclusive Members Club
                </h2>
                <p className="text-stone-600 mb-6">
                  Get up to 15% off all products, free shipping, early access to new collections, and priority customer support.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/member-dashboard">
                    <Button className="bg-amber-700 hover:bg-amber-800 text-white">
                      <Crown className="h-4 w-4 mr-2" />
                      Become a Member
                    </Button>
                  </Link>
                  <Button variant="outline" className="border-amber-600 text-amber-700">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Enhanced Cart Drawer */}
      <ControlledCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        memberDiscount={memberDiscount}
      />
    </div>
  )
}
