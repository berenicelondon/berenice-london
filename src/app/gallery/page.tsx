"use client"

import { Gallery } from "@/components/Gallery"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, Crown, Sparkles } from "lucide-react"
import Link from "next/link"

export default function GalleryPage() {
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
            <Sparkles className="h-3 w-3 mr-1" />
            Transformation Gallery
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6">
            Our Portfolio
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Witness the transformative power of expert craftsmanship. Each before and after tells a unique story
            of confidence restored and beauty enhanced through our premium hair solutions.
          </p>
        </div>
      </div>

      {/* Featured Section */}
      <div className="pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-stone-800 mb-4">Featured Transformations</h2>
            <p className="text-stone-600">Our most remarkable before and after transformations</p>
          </div>
          <Gallery showFeatured={true} limit={6} />
        </div>
      </div>

      {/* Full Gallery Section */}
      <div className="pb-16 px-4 sm:px-6 lg:px-8 bg-white/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-stone-800 mb-4">Complete Gallery</h2>
            <p className="text-stone-600">Explore all our transformations by category and style</p>
          </div>
          <Gallery />
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <Heart className="h-12 w-12 text-amber-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-stone-800 mb-4">
              Ready for Your Own Transformation?
            </h2>
            <p className="text-lg text-stone-600 mb-8">
              Every journey begins with a conversation. Book your complimentary consultation
              and let our experts create your perfect hair solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button size="lg" className="bg-amber-700 hover:bg-amber-800">
                  Book Free Consultation
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline">
                  Learn More About Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
