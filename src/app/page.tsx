"use client"

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Menu, User, ShoppingBag, ShoppingCart } from "lucide-react"
import { AuthModal } from "@/components/AuthModal"
import { ControlledCartDrawer } from "@/components/ShoppingCart"

import { useAuth } from "@/contexts/AuthContext"
import { useCart } from "@/contexts/CartContext"
import { useAnalytics } from "@/contexts/AnalyticsContext"
import { useState, FC } from "react"
import Link from "next/link"
import Image from 'next/image'

const HomePage: FC = () => {
  const { user } = useAuth()
  const { getTotalItems } = useCart()
  const { trackEvent } = useAnalytics()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">("login")
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <Image
                src="/uploads/Berenice London New Design/Group 526.svg"
                alt="Berenice London Logo"
                width={48}
                height={48}
              />
              <h1 className="text-2xl font-bold text-stone-800">Berenice London</h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-stone-700 hover:text-amber-700 transition-colors">Home</a>
              <Link href="/gallery" className="text-stone-700 hover:text-amber-700 transition-colors">Gallery</Link>
              <Link href="/shop" className="text-stone-700 hover:text-amber-700 transition-colors">Shop</Link>
              <Link href="/bespoke" className="text-stone-700 hover:text-amber-700 transition-colors">Bespoke</Link>
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
                  <Link href="/register">
                    <Button
                      className="bg-amber-700 hover:bg-amber-800 text-white hidden sm:flex"
                    >
                      Join Now
                    </Button>
                  </Link>
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
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <Badge variant="outline" className="mb-6 text-amber-700 border-amber-200 bg-white/80 px-4 py-2">
              Premium Hair Solutions
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-stone-800 mb-6">
              Berenice London
            </h2>
            <p className="text-xl text-stone-600 mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed">
              Expert craftsmanship in bespoke wigs, hairpieces, and professional hair education.
              Transforming lives through exceptional hair solutions with over 20 years of expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
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
              <Link href="/bespoke">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-stone-300 text-stone-700 hover:bg-stone-50"
                >
                  Bespoke Services
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-2xl">
            <Image
                src="/uploads/Berenice London New Design/Home (Back)-1.jpg"
                alt="Berenice London salon interior"
                fill
                style={{ objectFit: 'cover' }}
                className="transform hover:scale-105 transition-transform duration-500"
            />
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

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-stone-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Image
                    src="/uploads/Berenice London New Design/Group 528-1.svg"
                    alt="Bespoke Wigs Icon"
                    width={40}
                    height={40}
                  />
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
                <Link href="/bespoke">
                  <Button variant="ghost" size="sm" className="text-amber-700 hover:bg-amber-50 p-0">
                    Learn More <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-stone-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Image
                    src="/uploads/Berenice London New Design/Group 528-2.svg"
                    alt="Education Icon"
                    width={40}
                    height={40}
                  />
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
                 <Link href="/education">
                    <Button variant="ghost" size="sm" className="text-amber-700 hover:bg-amber-50 p-0">
                      View Courses <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-stone-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Image
                    src="/uploads/Berenice London New Design/Group 528-3.svg"
                    alt="Ready-Made Collection Icon"
                    width={40}
                    height={40}
                  />
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

      {/* Featured Products Section - Using images from design */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-stone-800 mb-4">Featured Products</h3>
            <p className="text-lg text-stone-600">Discover our most popular wigs, toppers, and hair accessories</p>
          </div>

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
              </div>
              <CardContent className="p-4">
                <h4 className="font-semibold text-lg mb-1">Classic Straight Full Lace Wig</h4>
                <p className="text-sm text-stone-600 mb-2">Indian Remy Hair</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">£1,295</span>
                    <span className="text-sm text-stone-500 line-through">£1,495</span>
                  </div>
                  <Button size="sm" className="bg-amber-700 hover:bg-amber-800">
                    View Details
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
              </div>
              <CardContent className="p-4">
                <h4 className="font-semibold text-lg mb-1">Luxury Curly Lace Closure Wig</h4>
                <p className="text-sm text-stone-600 mb-2">Peruvian Hair</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-bold text-lg">£745</span>
                  </div>
                  <Button size="sm" className="bg-amber-700 hover:bg-amber-800">
                    View Details
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
              </div>
              <CardContent className="p-4">
                <h4 className="font-semibold text-lg mb-1">Signature Lace Front Bob</h4>
                <p className="text-sm text-stone-600 mb-2">Brazilian Virgin Hair</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">£895</span>
                    <span className="text-sm text-stone-500 line-through">£1,095</span>
                  </div>
                  <Button size="sm" className="bg-amber-700 hover:bg-amber-800">
                    View Details
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
              </div>
              <CardContent className="p-4">
                <h4 className="font-semibold text-lg mb-1">Silk Base Crown Topper</h4>
                <p className="text-sm text-stone-600 mb-2">European Hair</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-bold text-lg">£395</span>
                  </div>
                  <Button size="sm" className="bg-amber-700 hover:bg-amber-800">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

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

      {/* Blog Preview Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-stone-800 mb-4">Latest From Our Blog</h3>
            <p className="text-lg text-stone-600">Expert insights and advice on hair care and solutions</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Blog Post 1 */}
            <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/uploads/Berenice London New Design/BLOG _ READY-MADE WIGS & TOPPERS.jpg"
                  alt="Ready-Made Wigs Blog"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <CardContent className="p-4">
                <Badge className="mb-2 bg-stone-100 text-stone-800">Ready-Made Collection</Badge>
                <h4 className="font-semibold text-lg mb-2">How to Choose the Perfect Ready-Made Wig</h4>
                <p className="text-sm text-stone-600 mb-4 line-clamp-3">
                  Finding the perfect ready-made wig can be overwhelming with so many options available. Our expert guide breaks down the key factors to consider...
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-stone-500">June 12, 2023</span>
                  <Button variant="ghost" size="sm" className="text-amber-700 hover:bg-amber-50 p-0">
                    Read More <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Blog Post 2 */}
            <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/uploads/Berenice London New Design/BLOG _ MEMBERSHIP.jpg"
                  alt="Membership Benefits Blog"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <CardContent className="p-4">
                <Badge className="mb-2 bg-stone-100 text-stone-800">Membership</Badge>
                <h4 className="font-semibold text-lg mb-2">5 Exclusive Benefits of Berenice London Membership</h4>
                <p className="text-sm text-stone-600 mb-4 line-clamp-3">
                  Discover how our membership program provides unparalleled value with exclusive discounts, early access to new collections, and personalized consultations...
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-stone-500">May 28, 2023</span>
                  <Button variant="ghost" size="sm" className="text-amber-700 hover:bg-amber-50 p-0">
                    Read More <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Blog Post 3 */}
            <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/uploads/Berenice London New Design/BLOG _ MEMBERSHIP 3.jpg"
                  alt="Hair Care Blog"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <CardContent className="p-4">
                <Badge className="mb-2 bg-stone-100 text-stone-800">Hair Care</Badge>
                <h4 className="font-semibold text-lg mb-2">Essential Care Tips for Prolonging Your Wig's Lifespan</h4>
                <p className="text-sm text-stone-600 mb-4 line-clamp-3">
                  Learn the professional techniques to maintain the quality and appearance of your premium hairpiece with our comprehensive care guide...
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-stone-500">April 15, 2023</span>
                  <Button variant="ghost" size="sm" className="text-amber-700 hover:bg-amber-50 p-0">
                    Read More <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
             <Link href="/blog">
                <Button className="bg-amber-700 hover:bg-amber-800 text-white">
                  View All Articles
                </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Virtual Try On CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-100 to-amber-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white shadow-xl rounded-xl p-10 border border-amber-200">
            <Image
              src="/uploads/Berenice London New Design/Group 528-4.svg"
              alt="Virtual Try-On Icon"
              width={60}
              height={60}
              className="mx-auto mb-6"
            />
            <h2 className="text-2xl font-bold text-stone-800 mb-4">
              Visualize Your Perfect Look
            </h2>
            <p className="text-stone-600 mb-6">
              Curious to see how our creations would look on you? Use our new Virtual Try-On tool to find your perfect style instantly.
            </p>
            <Link href="/virtual-try-on">
              <Button className="bg-amber-700 hover:bg-amber-800 text-white">
                Try It On Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

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

export default HomePage
