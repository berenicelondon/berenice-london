"use client"

export const dynamic = 'force-dynamic'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ControlledCartDrawer } from "@/components/ShoppingCart"
import { useCart } from "@/contexts/CartContext"
import { useAuth } from "@/contexts/AuthContext"
import { useAnalytics } from "@/contexts/AnalyticsContext"
import { productCategories, type ProductCategory } from "@/data/productsData"
import {
  ArrowLeft,
  ShoppingBag,
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
  Zap,
  Percent,
  Gift,
  Phone
} from "lucide-react"
import Link from "next/link"
import React, { useState, FC } from "react"
import Image from "next/image"

type SortByType = "featured" | "name" | "price-low" | "price-high" | "rating" | "newest"
type PriceRangeType = "all" | "under-100" | "100-500" | "500-1000" | "over-1000"
type ViewModeType = "grid" | "list"

const ShopPage: FC = () => {
  const { user } = useAuth()
  const { getTotalItems, addToCart } = useCart()
  const { trackEvent } = useAnalytics()
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">("all")
  const [sortBy, setSortBy] = useState<SortByType>("featured")
  const [priceRange, setPriceRange] = useState<PriceRangeType>("all")
  const [viewMode, setViewMode] = useState<ViewModeType>("grid")
  const [showFilters, setShowFilters] = useState<boolean>(false)

  // Track shop visit
  React.useEffect(() => {
    trackEvent('shop', 'shop_visit', 'shop_page')
  }, [trackEvent])

  // Get member discount
  const getMemberDiscount = (): number => {
    if (!user) return 0
    switch (user.membershipType) {
      case 'elite': return 15
      case 'premium': return 10
      case 'basic': return 5
      default: return 0
    }
  }

  const memberDiscount = getMemberDiscount()

  const handleAddToCart = (id: string, name: string, price: number, image: string, category: string) => {
    addToCart({
      id,
      name,
      price,
      image,
      category,
      quantity: 1
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/uploads/Berenice London New Design/Group 526.svg"
                alt="Berenice London Logo"
                width={48}
                height={48}
              />
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
      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-6 text-amber-700 border-amber-200 bg-white/80 px-4 py-2">
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
      <div className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-stone-100">
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
      <div className="py-6 px-4 sm:px-6 lg:px-8 bg-white sticky top-20 z-40 border-b border-stone-200 shadow-sm">
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
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory as (value: string) => void} className="w-full lg:w-auto">
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
              <Select value={sortBy} onValueChange={setSortBy as (value: string) => void}>
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
                  <Select value={priceRange} onValueChange={setPriceRange as (value: string) => void}>
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

      {/* Products Section - Using Figma Design Images */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Product 1 */}
            <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all">
              <div className="relative aspect-square">
                <Image
                  src="/uploads/Berenice London New Design/Shop 02.jpg"
                  alt="Classic Wig"
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className="absolute top-2 left-2">
                  <Badge className="bg-red-500">Sale</Badge>
                </div>
                <div className="absolute top-2 right-2 flex">
                  <Badge className="flex items-center gap-1 bg-amber-600/90 backdrop-blur-sm">
                    <Star className="h-3 w-3 fill-current" />
                    <span>4.9</span>
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <Badge className="mb-2 text-xs">Wigs</Badge>
                <h4 className="font-semibold text-lg mb-1">Classic Straight Full Lace Wig</h4>
                <p className="text-sm text-stone-600 mb-2">Indian Remy Hair</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">£1,295</span>
                    <span className="text-sm text-stone-500 line-through">£1,495</span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-amber-700 hover:bg-amber-800"
                    onClick={() => handleAddToCart(
                      'classic-wig-1',
                      'Classic Straight Full Lace Wig',
                      1295,
                      '/uploads/Berenice London New Design/Shop 02.jpg',
                      'wigs'
                    )}
                  >
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Product 2 */}
            <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all">
              <div className="relative aspect-square">
                <Image
                  src="/uploads/Berenice London New Design/Shop 3.jpg"
                  alt="Luxury Wig"
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className="absolute top-2 right-2 flex">
                  <Badge className="flex items-center gap-1 bg-amber-600/90 backdrop-blur-sm">
                    <Star className="h-3 w-3 fill-current" />
                    <span>4.8</span>
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <Badge className="mb-2 text-xs">Wigs</Badge>
                <h4 className="font-semibold text-lg mb-1">Luxury Curly Lace Closure Wig</h4>
                <p className="text-sm text-stone-600 mb-2">Peruvian Hair</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-bold text-lg">£745</span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-amber-700 hover:bg-amber-800"
                    onClick={() => handleAddToCart(
                      'luxury-wig-1',
                      'Luxury Curly Lace Closure Wig',
                      745,
                      '/uploads/Berenice London New Design/Shop 3.jpg',
                      'wigs'
                    )}
                  >
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Product 3 */}
            <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all">
              <div className="relative aspect-square">
                <Image
                  src="/uploads/Berenice London New Design/Shop 6.jpg"
                  alt="Signature Wig"
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className="absolute top-2 left-2">
                  <Badge className="bg-amber-600">Bestseller</Badge>
                </div>
                <div className="absolute top-2 right-2 flex">
                  <Badge className="flex items-center gap-1 bg-amber-600/90 backdrop-blur-sm">
                    <Star className="h-3 w-3 fill-current" />
                    <span>4.9</span>
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <Badge className="mb-2 text-xs">Wigs</Badge>
                <h4 className="font-semibold text-lg mb-1">Signature Lace Front Bob</h4>
                <p className="text-sm text-stone-600 mb-2">Brazilian Virgin Hair</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">£895</span>
                    <span className="text-sm text-stone-500 line-through">£1,095</span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-amber-700 hover:bg-amber-800"
                    onClick={() => handleAddToCart(
                      'signature-wig-1',
                      'Signature Lace Front Bob',
                      895,
                      '/uploads/Berenice London New Design/Shop 6.jpg',
                      'wigs'
                    )}
                  >
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Product 4 */}
            <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all">
              <div className="relative aspect-square">
                <Image
                  src="/uploads/Berenice London New Design/Bespoke.jpg"
                  alt="Silk Base Crown Topper"
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className="absolute top-2 right-2 flex">
                  <Badge className="flex items-center gap-1 bg-amber-600/90 backdrop-blur-sm">
                    <Star className="h-3 w-3 fill-current" />
                    <span>4.8</span>
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <Badge className="mb-2 text-xs">Hair Toppers</Badge>
                <h4 className="font-semibold text-lg mb-1">Silk Base Crown Topper</h4>
                <p className="text-sm text-stone-600 mb-2">European Hair</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-bold text-lg">£395</span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-amber-700 hover:bg-amber-800"
                    onClick={() => handleAddToCart(
                      'silk-topper-1',
                      'Silk Base Crown Topper',
                      395,
                      '/uploads/Berenice London New Design/Bespoke.jpg',
                      'toppers'
                    )}
                  >
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Additional Products */}
            {/* Product 5 */}
            <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all">
              <div className="relative aspect-square">
                <div className="h-full w-full bg-stone-100 flex items-center justify-center">
                  <div className="p-8 text-center">
                    <h4 className="font-medium text-lg mb-1">Luxury Hair Extension</h4>
                    <p className="text-sm text-stone-600 mb-2">Premium Quality</p>
                    <Badge className="mt-2">Coming Soon</Badge>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <Badge className="mb-2 text-xs">Extensions</Badge>
                <h4 className="font-semibold text-lg mb-1">Premium Tape-In Extensions</h4>
                <p className="text-sm text-stone-600 mb-2">European Hair</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-bold text-lg">£325</span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-stone-300 text-stone-700 cursor-not-allowed"
                    disabled
                  >
                    Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Product 6 */}
            <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all">
              <div className="relative aspect-square">
                <div className="h-full w-full bg-stone-100 flex items-center justify-center">
                  <div className="p-8 text-center">
                    <h4 className="font-medium text-lg mb-1">Human Hair Clip-Ins</h4>
                    <p className="text-sm text-stone-600 mb-2">Natural Blend</p>
                    <Badge className="mt-2 bg-green-600">New</Badge>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <Badge className="mb-2 text-xs">Extensions</Badge>
                <h4 className="font-semibold text-lg mb-1">Premium Clip-In Extensions</h4>
                <p className="text-sm text-stone-600 mb-2">Brazilian Hair</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-bold text-lg">£275</span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-amber-700 hover:bg-amber-800"
                    onClick={() => handleAddToCart(
                      'clip-extensions-1',
                      'Premium Clip-In Extensions',
                      275,
                      '',
                      'extensions'
                    )}
                  >
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Product 7 */}
            <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all">
              <div className="relative aspect-square">
                <div className="h-full w-full bg-stone-100 flex items-center justify-center">
                  <div className="p-8 text-center">
                    <h4 className="font-medium text-lg mb-1">Customizable Wig</h4>
                    <p className="text-sm text-stone-600 mb-2">Made to Order</p>
                    <Badge className="mt-2 bg-purple-600">Custom</Badge>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <Badge className="mb-2 text-xs">Wigs</Badge>
                <h4 className="font-semibold text-lg mb-1">Custom Full Lace Wig</h4>
                <p className="text-sm text-stone-600 mb-2">Choose Your Style</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-bold text-lg">£1,500+</span>
                  </div>
                  <Link href="/bespoke">
                    <Button
                      size="sm"
                      className="bg-amber-700 hover:bg-amber-800"
                    >
                      Customize
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Product 8 */}
            <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all">
              <div className="relative aspect-square">
                <div className="h-full w-full bg-stone-100 flex items-center justify-center">
                  <div className="p-8 text-center">
                    <h4 className="font-medium text-lg mb-1">Hair Care Kit</h4>
                    <p className="text-sm text-stone-600 mb-2">Essential Products</p>
                    <Badge className="mt-2 bg-amber-600">Popular</Badge>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <Badge className="mb-2 text-xs">Accessories</Badge>
                <h4 className="font-semibold text-lg mb-1">Premium Hair Care Kit</h4>
                <p className="text-sm text-stone-600 mb-2">Complete Set</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-bold text-lg">£85</span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-amber-700 hover:bg-amber-800"
                    onClick={() => handleAddToCart(
                      'hair-care-kit-1',
                      'Premium Hair Care Kit',
                      85,
                      '',
                      'accessories'
                    )}
                  >
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button className="bg-amber-700 hover:bg-amber-800 text-white">
              Load More Products
            </Button>
          </div>
        </div>
      </div>

      {/* Member CTA */}
      {!user && (
        <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-100 to-amber-50">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="bg-white shadow-xl border-amber-200">
              <CardContent className="p-8">
                <Image
                  src="/uploads/Berenice London New Design/Group 526.svg"
                  alt="Berenice London Logo"
                  width={60}
                  height={60}
                  className="mx-auto mb-4"
                />
                <h2 className="text-2xl font-bold text-stone-800 mb-4">
                  Join Our Exclusive Members Club
                </h2>
                <p className="text-stone-600 mb-6">
                  Get up to 15% off all products, free shipping, early access to new collections, and priority customer support.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/register">
                    <Button className="bg-amber-700 hover:bg-amber-800 text-white">
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

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/uploads/Berenice London New Design/Group 525.svg"
                alt="Berenice London Logo"
                width={40}
                height={40}
              />
              <h3 className="text-xl font-bold">Berenice London</h3>
            </div>
            <p className="text-stone-300 mb-6">
              Premium hair solutions crafted with expertise and care. Transforming lives through exceptional hair solutions since 2003.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-stone-300 hover:text-amber-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="text-stone-300 hover:text-amber-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="text-stone-300 hover:text-amber-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-stone-300 hover:text-amber-400 transition-colors">Home</a></li>
              <li><a href="#" className="text-stone-300 hover:text-amber-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-stone-300 hover:text-amber-400 transition-colors">Shop</a></li>
              <li><a href="#" className="text-stone-300 hover:text-amber-400 transition-colors">Gallery</a></li>
              <li><a href="#" className="text-stone-300 hover:text-amber-400 transition-colors">Blog</a></li>
              <li><a href="#" className="text-stone-300 hover:text-amber-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-stone-300 hover:text-amber-400 transition-colors">Bespoke Wigs</a></li>
              <li><a href="#" className="text-stone-300 hover:text-amber-400 transition-colors">Ready-Made Collection</a></li>
              <li><a href="#" className="text-stone-300 hover:text-amber-400 transition-colors">Hair Toppers</a></li>
              <li><a href="#" className="text-stone-300 hover:text-amber-400 transition-colors">Education & Training</a></li>
              <li><a href="#" className="text-stone-300 hover:text-amber-400 transition-colors">Consultations</a></li>
              <li><a href="#" className="text-stone-300 hover:text-amber-400 transition-colors">Aftercare</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-0.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span className="text-stone-300">123 Salon Street, London, UK</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-0.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span className="text-stone-300">+44 123 456 7890</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-0.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span className="text-stone-300">info@berenicelondon.com</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-0.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div className="text-stone-300">
                  <p className="font-semibold">Opening Hours:</p>
                  <p>Mon-Fri: 9am - 6pm</p>
                  <p>Saturday: 10am - 4pm</p>
                  <p>Sunday: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-stone-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-stone-400 text-sm">© 2023 Berenice London. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-stone-400 hover:text-amber-400 text-sm">Privacy Policy</a>
              <a href="#" className="text-stone-400 hover:text-amber-400 text-sm">Terms of Service</a>
              <a href="#" className="text-stone-400 hover:text-amber-400 text-sm">Shipping & Returns</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Enhanced Cart Drawer */}
      <ControlledCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        memberDiscount={memberDiscount}
      />
    </div>
  )
}

export default ShopPage
