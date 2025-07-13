"use client"

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

import { useAuth } from "@/contexts/AuthContext"
import { VirtualTryOn } from "@/components/VirtualTryOn"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crown, ArrowLeft, User, Sparkles, Lock } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function VirtualTryOnPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect to home if not logged in after loading
    if (!isLoading && !user) {
      router.push('/')
    }
  }, [user, isLoading, router])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="h-12 w-12 text-amber-700 mx-auto mb-4 animate-pulse" />
          <p className="text-stone-600">Loading Virtual Try-On Studio...</p>
        </div>
      </div>
    )
  }

  // Show member access required if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
        <nav className="bg-white/80 backdrop-blur-md border-b border-stone-200">
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

        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <Card className="max-w-lg mx-auto">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <Lock className="h-8 w-8 text-amber-600" />
              </div>
              <CardTitle className="flex items-center gap-2 justify-center text-xl">
                <Sparkles className="h-6 w-6 text-amber-600" />
                Virtual Try-On Studio
              </CardTitle>
              <CardDescription className="text-base">
                This premium feature is exclusive to Berenice London members
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h3 className="font-semibold text-amber-800 mb-2">Premium Feature Benefits:</h3>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• Try on wigs virtually using your camera</li>
                  <li>• Drag and position wigs on your photo</li>
                  <li>• Adjust size, rotation, and layering</li>
                  <li>• Save and share your virtual try-on photos</li>
                  <li>• Access to full wig collection</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <Link href="/" className="w-full">
                  <Button className="w-full bg-amber-700 hover:bg-amber-800">
                    <User className="h-4 w-4 mr-2" />
                    Become a Member
                  </Button>
                </Link>
                <Link href="/shop" className="w-full">
                  <Button variant="outline" className="w-full">
                    Browse Wigs
                  </Button>
                </Link>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Already a member? <Link href="/" className="text-amber-600 hover:text-amber-700 font-medium">Sign in here</Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Show virtual try-on for authenticated members
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Crown className="h-8 w-8 text-amber-700" />
              <h1 className="text-2xl font-bold text-stone-800">Berenice London</h1>
            </Link>
            <div className="flex items-center gap-4">
              <Badge className="bg-amber-100 text-amber-800">
                <Crown className="h-3 w-3 mr-1" />
                {user.membershipType.charAt(0).toUpperCase() + user.membershipType.slice(1)} Member
              </Badge>
              <Link href="/member-dashboard">
                <Button variant="ghost" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Virtual Try-On Component */}
      <div className="p-4">
        <VirtualTryOn />
      </div>
    </div>
  )
}
