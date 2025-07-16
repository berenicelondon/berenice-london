"use client"

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Crown, GraduationCap, Sparkles, Book, Users, Mail, Star, ArrowRight, Menu, User, Heart, ShoppingBag, ShoppingCart } from "lucide-react"
import { AuthModal } from "@/components/AuthModal"
import { Gallery } from "@/components/Gallery"
import { ProductList } from "@/components/ProductList"
import { ControlledCartDrawer } from "@/components/ShoppingCart"

import { useAuth } from "@/contexts/AuthContext"
import { useCart } from "@/contexts/CartContext"
import { useAnalytics } from "@/contexts/AnalyticsContext"
import { useState } from "react"
import Link from "next/link"

export default function HomePage() {
  const { user } = useAuth()
  const { getTotalItems } = useCart()
  const { trackEvent } = useAnalytics()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">("login")
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Crown className="h-8 w-8 text-amber-700" />
              <h1 className="text-2xl font-bold text-stone-800">Berenice London</h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-stone-700 hover:text-amber-700 transition-colors">Home</a>
              <Link href="/gallery" className="text-stone-700 hover:text-amber-700 transition-colors">Gallery</Link>
              <Link href="/shop" className="text-stone-700 hover:text-amber-700 transition-colors">Shop</Link>
              <a href="#education" className="text-stone-700 hover:text-amber-700 transition-colors">Education</a>
              <Link href="/blog" className="text-stone-700 hover:text-amber-700 transition-colors">Blog</Link>
              <Link href="/booking" className="text-stone-700 hover:text-amber-700 transition-colors">Book Now</Link>
              <Link href="/admin" className="text-stone-700 hover:text-amber-700 transition-colors text-xs">Admin</Link>
            </div>
            <div className="flex items-center gap-4">
              {/* Shopping Cart */}
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsCartOpen(true)}
                aria-label="Shopping cart"
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

              {user ? (
                // Logged in user options
                <>
                  <Link href="/member-dashboard">
                    <Button
                      variant="outline"
                      className="border-amber-600 text-amber-700 hover:bg-amber-50 hidden sm:flex"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Member Dashboard
                    </Button>
                  </Link>
                  <span className="text-sm text-stone-600 hidden sm:block">Welcome, {user.name}</span>
                </>
              ) : (
                // Public user options
                <>
                  <Button
                    variant="outline"
                    className="border-amber-600 text-amber-700 hover:bg-amber-50 hidden sm:flex"
                    onClick={() => {
                      setAuthModalTab("login")
                      setIsAuthModalOpen(true)
                    }}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Member Login
                  </Button>
                  <Button
                    className="bg-amber-700 hover:bg-amber-800 text-white hidden sm:flex"
                    onClick={() => {
                      setAuthModalTab("register")
                      setIsAuthModalOpen(true)
                    }}
                  >
                    Join Now
                  </Button>
                </>
              )}
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100/20 to-stone-100/20"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <Badge variant="outline" className="mb-6 text-amber-700 border-amber-200 bg-white/80">
            <Star className="h-3 w-3 mr-1" />
            Premium Hair Solutions
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-stone-800 mb-6">
            Berenice London
          </h2>
          <p className="text-xl text-stone-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Expert craftsmanship in bespoke wigs, hairpieces, and professional hair education.
            Transforming lives through exceptional hair solutions with over 20 years of expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button
                size="lg"
                className="bg-amber-700 hover:bg-amber-800 text-white group"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Shop Our Collection
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            {user ? (
              <Link href="/member-dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-amber-600 text-amber-700 hover:bg-amber-50"
                >
                  <User className="h-4 w-4 mr-2" />
                  Member Dashboard
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                variant="outline"
                className="border-stone-300 text-stone-700 hover:bg-stone-50"
                onClick={() => {
                  setAuthModalTab("register")
                  setIsAuthModalOpen(true)
                }}
              >
                <User className="h-4 w-4 mr-2" />
                Become a Member
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-stone-800 mb-4">Our Expertise</h3>
            <p className="text-lg text-stone-600">Comprehensive hair solutions tailored to your needs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-stone-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Crown className="h-6 w-6 text-amber-700" />
                  </div>
                  <CardTitle className="text-amber-700">Bespoke Wigs & Toppers</CardTitle>
                </div>
                <CardDescription>
                  Custom-made hairpieces crafted to your exact specifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-stone-600 mb-4">
                  Our master craftspeople create personalized wigs and toppers using the finest materials,
                  ensuring a perfect fit and natural appearance.
                </p>
                <Button variant="ghost" size="sm" className="text-amber-700 hover:bg-amber-50 p-0">
                  Learn More <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-stone-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <GraduationCap className="h-6 w-6 text-amber-700" />
                  </div>
                  <CardTitle className="text-amber-700">Education & Training</CardTitle>
                </div>
                <CardDescription>
                  Professional courses for hair specialists and enthusiasts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-stone-600 mb-4">
                  Learn from industry experts through our comprehensive education programs,
                  covering everything from basic care to advanced techniques.
                </p>
                <Button variant="ghost" size="sm" className="text-amber-700 hover:bg-amber-50 p-0">
                  View Courses <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-stone-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Sparkles className="h-6 w-6 text-amber-700" />
                  </div>
                  <CardTitle className="text-amber-700">Ready-Made Collection</CardTitle>
                </div>
                <CardDescription>
                  Premium quality wigs and toppers ready for immediate wear
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-stone-600 mb-4">
                  Explore our curated collection of high-quality, ready-to-wear pieces
                  designed for comfort, style, and natural beauty.
                </p>
                <Link href="/shop">
                  <Button variant="ghost" size="sm" className="text-amber-700 hover:bg-amber-50 p-0">
                    Shop Now <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-stone-800 mb-4">Featured Products</h3>
            <p className="text-lg text-stone-600">Discover our most popular wigs, toppers, and hair accessories</p>
          </div>

          <ProductList showFeatured={true} limit={6} />

          <div className="text-center mt-12">
            <Link href="/shop">
              <Button className="bg-amber-700 hover:bg-amber-800 text-white">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Shop All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-stone-800 mb-4">Transformation Gallery</h3>
            <p className="text-lg text-stone-600">See the incredible before and after results of our work</p>
          </div>

          <Gallery showFeatured={true} limit={6} />

          <div className="text-center mt-12">
            <Button className="bg-amber-700 hover:bg-amber-800 text-white">
              <Heart className="h-4 w-4 mr-2" />
              View Full Gallery
            </Button>
          </div>
        </div>
      </section>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
      />

      <ControlledCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  )
}
