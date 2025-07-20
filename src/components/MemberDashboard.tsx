"use client"

import { useAuth } from "@/contexts/AuthContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BlogList } from "@/components/BlogList"
import { BookingSystem } from "@/components/BookingSystem"
import { ProfilePhotoUpload, ProfileAvatar } from "@/components/ProfilePhotoUpload"
import { VirtualTryOn } from "@/components/VirtualTryOn"
import {
  Crown,
  Calendar,
  BookOpen,
  Star,
  Gift,
  Clock,
  Users,
  Sparkles,
  Settings,
  LogOut,
  ChevronRight,
  Home,
  ArrowLeft,
  ShoppingBag
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export function MemberDashboard() {
  const { user, logout, updateProfilePhoto } = useAuth()
  const [activeSection, setActiveSection] = useState<'dashboard' | 'blog' | 'booking' | 'virtual-tryon'>('dashboard')

  if (!user) return null

  const getMembershipIcon = (type: string) => {
    switch (type) {
      case 'elite': return <Crown className="h-5 w-5 text-amber-600" />
      case 'premium': return <Star className="h-5 w-5 text-amber-600" />
      default: return <Sparkles className="h-5 w-5 text-amber-600" />
    }
  }

  const getMembershipColor = (type: string) => {
    switch (type) {
      case 'elite': return 'bg-gradient-to-r from-amber-500 to-yellow-500'
      case 'premium': return 'bg-gradient-to-r from-amber-600 to-orange-500'
      default: return 'bg-gradient-to-r from-stone-400 to-stone-500'
    }
  }

  const memberSince = new Date(user.joinDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  })

  // Navigation Component
  const DashboardNav = () => (
    <nav className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Crown className="h-8 w-8 text-amber-700" />
            <h1 className="text-2xl font-bold text-stone-800">Berenice London</h1>
          </Link>
          <div className="flex items-center gap-6">
            <Button
              variant={activeSection === 'dashboard' ? 'default' : 'ghost'}
              onClick={() => setActiveSection('dashboard')}
              className={activeSection === 'dashboard' ? 'bg-amber-700 hover:bg-amber-800' : ''}
            >
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button
              variant={activeSection === 'blog' ? 'default' : 'ghost'}
              onClick={() => setActiveSection('blog')}
              className={activeSection === 'blog' ? 'bg-amber-700 hover:bg-amber-800' : ''}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Blog
            </Button>
            <Button
              variant={activeSection === 'booking' ? 'default' : 'ghost'}
              onClick={() => setActiveSection('booking')}
              className={activeSection === 'booking' ? 'bg-amber-700 hover:bg-amber-800' : ''}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Book Appointment
            </Button>
            <Button
              variant={activeSection === 'virtual-tryon' ? 'default' : 'ghost'}
              onClick={() => setActiveSection('virtual-tryon')}
              className={activeSection === 'virtual-tryon' ? 'bg-amber-700 hover:bg-amber-800' : ''}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Virtual Try-On
            </Button>
            <Link href="/shop">
              <Button variant="ghost">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Shop
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Main Site
              </Button>
            </Link>
            <ProfileAvatar
              photoUrl={user.profilePhotoUrl}
              userName={user.name}
              size="default"
            />
            <Button variant="outline" onClick={logout} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )

  // Blog Section
  if (activeSection === 'blog') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
        <DashboardNav />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-stone-800 mb-4">Member Blog Access</h1>
            <p className="text-lg text-stone-600">Exclusive content and insights for our valued members</p>
          </div>
          <BlogList showFeatured={user.membershipType !== 'basic'} />
        </div>
      </div>
    )
  }

  // Booking Section
  if (activeSection === 'booking') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
        <DashboardNav />
        <BookingSystem />
      </div>
    )
  }

  // Virtual Try-On Section
  if (activeSection === 'virtual-tryon') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
        <DashboardNav />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-stone-800 mb-4 flex items-center justify-center gap-3">
              <Sparkles className="h-8 w-8 text-amber-600" />
              Virtual Try-On Studio
            </h1>
            <p className="text-lg text-stone-600">
              Try on wigs from our collection using your camera - exclusive for {user.membershipType} members
            </p>
          </div>
          <VirtualTryOn />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      <DashboardNav />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-stone-800">Welcome back, {user.name}</h1>
          <p className="text-stone-600">Manage your membership and access exclusive content</p>
        </div>
        <Button variant="outline" onClick={logout} className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>

      {/* Membership Card */}
      <Card className="overflow-hidden">
        <div className={`h-2 ${getMembershipColor(user.membershipType)}`}></div>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ProfilePhotoUpload
                currentPhotoUrl={user.profilePhotoUrl}
                userName={user.name}
                onPhotoUpdate={updateProfilePhoto}
              />
              <div>
                <CardTitle className="flex items-center gap-2">
                  {user.name}
                  {getMembershipIcon(user.membershipType)}
                </CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="capitalize">
              {user.membershipType} Member
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <Calendar className="h-8 w-8 text-amber-600 mx-auto mb-2" />
              <p className="text-sm text-stone-600">Member Since</p>
              <p className="font-semibold">{memberSince}</p>
            </div>
            <div className="text-center">
              <BookOpen className="h-8 w-8 text-amber-600 mx-auto mb-2" />
              <p className="text-sm text-stone-600">Courses Completed</p>
              <p className="font-semibold">3 of 8</p>
            </div>
            <div className="text-center">
              <Gift className="h-8 w-8 text-amber-600 mx-auto mb-2" />
              <p className="text-sm text-stone-600">Rewards Points</p>
              <p className="font-semibold">2,450</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-amber-600" />
              Book Consultation
            </CardTitle>
            <CardDescription>
              Schedule a personal consultation with our experts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full bg-amber-700 hover:bg-amber-800"
              onClick={() => setActiveSection('booking')}
            >
              Book Now
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="h-5 w-5 text-amber-600" />
              Member Blog
            </CardTitle>
            <CardDescription>
              Access exclusive insights and styling tips
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="w-full border-amber-600 text-amber-700"
              onClick={() => setActiveSection('blog')}
            >
              Read Articles
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="h-5 w-5 text-amber-600" />
              Virtual Try-On Studio
              <Badge className="ml-2 bg-amber-100 text-amber-800 text-xs">NEW</Badge>
            </CardTitle>
            <CardDescription>
              Try on wigs virtually using your camera - premium feature
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white"
              onClick={() => setActiveSection('virtual-tryon')}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Launch Try-On
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-amber-600" />
              Community
            </CardTitle>
            <CardDescription>
              Connect with other members and share experiences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Join Discussion
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-600" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="font-medium">Completed "Hair Care Basics" course</p>
              <p className="text-sm text-stone-600">2 days ago</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg">
            <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="font-medium">Consultation booked for next week</p>
              <p className="text-sm text-stone-600">5 days ago</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg">
            <div className="h-2 w-2 bg-amber-500 rounded-full"></div>
            <div className="flex-1">
              <p className="font-medium">Downloaded "Wig Styling Guide"</p>
              <p className="text-sm text-stone-600">1 week ago</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Membership Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-amber-600" />
            Your {user.membershipType.charAt(0).toUpperCase() + user.membershipType.slice(1)} Benefits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Priority booking for consultations</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Access to exclusive tutorials</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Monthly styling tips newsletter</span>
              </div>
            </div>
            <div className="space-y-3">
              {user.membershipType !== 'basic' && (
                <>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm">15% discount on all services</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm">Free monthly product samples</span>
                  </div>
                </>
              )}
              {user.membershipType === 'elite' && (
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">1-on-1 styling sessions</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}
