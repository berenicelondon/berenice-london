"use client"

import { BlogList } from "@/components/BlogList"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, Crown } from "lucide-react"
import Link from "next/link"

export default function BlogPage() {
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
            <Link href="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="outline" className="mb-6 text-amber-700 border-amber-200">
            <BookOpen className="h-3 w-3 mr-1" />
            Hair & Beauty Insights
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6">
            Our Blog
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Expert insights, styling tips, and the latest updates from the world of premium hair solutions.
            Discover everything you need to know about wigs, hairpieces, and professional hair care.
          </p>
        </div>
      </div>

      {/* Blog Content */}
      <div className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <BlogList />
        </div>
      </div>
    </div>
  )
}
