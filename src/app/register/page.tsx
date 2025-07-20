"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Crown, Sparkles, UserPlus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-100/20 to-stone-100/20"></div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="absolute top-4 left-4">
          <Link href="/">
            <Button variant="ghost">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <Card className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-2xl border-amber-200">
          {/* Left Side: Form */}
          <div className="p-8 md:p-12">
            <CardHeader className="text-center md:text-left">
              <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                <Crown className="h-8 w-8 text-amber-700" />
                <h1 className="text-2xl font-bold text-stone-800">Berenice London</h1>
              </div>
              <CardTitle className="text-3xl font-bold">Become a Member</CardTitle>
              <CardDescription className="text-stone-600">
                Join our exclusive community to unlock special benefits, early access, and more.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="Jane" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="jane.doe@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" placeholder="••••••••" required />
                </div>
                <Button type="submit" className="w-full bg-amber-700 hover:bg-amber-800 text-white">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create Account
                </Button>
              </form>
              <div className="mt-6 text-center text-sm">
                <p className="text-stone-600">
                  Already have an account?{" "}
                  <Link href="#" className="font-medium text-amber-700 hover:underline">
                    Log in
                  </Link>
                </p>
              </div>
            </CardContent>
          </div>

          {/* Right Side: Image and Benefits */}
          <div className="hidden md:block bg-gradient-to-br from-amber-100 to-yellow-100 p-12">
            <div className="relative w-full h-48 rounded-lg overflow-hidden mb-8">
                <Image
                    src="https://picsum.photos/800/600?random=5"
                    alt="Berenice London Salon"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <h3 className="text-2xl font-bold text-amber-800 mb-4">Membership Benefits</h3>
            <ul className="space-y-4 text-stone-700">
              <li className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 mt-1 text-amber-700 flex-shrink-0" />
                <span><span className="font-semibold">Exclusive Discounts:</span> Save up to 15% on all our products and services.</span>
              </li>
              <li className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 mt-1 text-amber-700 flex-shrink-0" />
                <span><span className="font-semibold">Early Access:</span> Be the first to shop our new collections and limited editions.</span>
              </li>
              <li className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 mt-1 text-amber-700 flex-shrink-0" />
                <span><span className="font-semibold">Priority Support:</span> Receive dedicated assistance from our team of experts.</span>
              </li>
               <li className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 mt-1 text-amber-700 flex-shrink-0" />
                <span><span className="font-semibold">Birthday Rewards:</span> Enjoy a special treat from us on your birthday.</span>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  )
}
