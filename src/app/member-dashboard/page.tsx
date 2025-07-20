"use client"

export const dynamic = 'force-dynamic'

import { useAuth } from "@/contexts/AuthContext"
import { MemberDashboard } from "@/components/MemberDashboard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Crown, ArrowLeft, User } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function MemberDashboardPage() {
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
          <Crown className="h-12 w-12 text-amber-700 mx-auto mb-4 animate-pulse" />
          <p className="text-stone-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  // Show login prompt if not authenticated
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
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center gap-2 justify-center">
                <User className="h-5 w-5" />
                Member Access Required
              </CardTitle>
              <CardDescription>
                Please log in to access your member dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/" className="w-full">
                <Button className="w-full bg-amber-700 hover:bg-amber-800">
                  Go to Login
                </Button>
              </Link>
              <Link href="/shop" className="w-full">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Show member dashboard for authenticated users
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      <MemberDashboard />
    </div>
  )
}
