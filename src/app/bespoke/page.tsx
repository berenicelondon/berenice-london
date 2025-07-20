"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Crown, Check, Shield, Award, Sparkles, Wand2, Scissors, Palette } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BespokePage() {
  const processSteps = [
    {
      icon: <Wand2 className="h-8 w-8 text-amber-700" />,
      title: "1. Consultation & Vision",
      description: "We begin with a private consultation to understand your vision, needs, and lifestyle, ensuring the final piece is a true reflection of you.",
    },
    {
      icon: <Scissors className="h-8 w-8 text-amber-700" />,
      title: "2. Precision Measurements",
      description: "Our experts take precise measurements of your head and hairline to create a flawless, comfortable, and secure foundation.",
    },
    {
      icon: <Palette className="h-8 w-8 text-amber-700" />,
      title: "3. Material & Hair Selection",
      description: "Choose from our curated selection of the world's finest human hair, with options for colour, texture, and density to create the perfect match.",
    },
    {
      icon: <Sparkles className="h-8 w-8 text-amber-700" />,
      title: "4. Artisan Craftsmanship",
      description: "Our master artisans meticulously hand-craft your piece, knotting each strand of hair to the breathable, lightweight cap for a natural look.",
    },
    {
      icon: <Check className="h-8 w-8 text-amber-700" />,
      title: "5. Final Fitting & Styling",
      description: "We conclude with a final fitting and professional styling session to ensure your bespoke piece is perfect in every way.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 text-stone-800">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Crown className="h-8 w-8 text-amber-700" />
              <h1 className="text-2xl font-bold">Berenice London</h1>
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

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100/20 to-stone-100/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-6 text-amber-700 border-amber-200 bg-white/90">
            <Sparkles className="h-3 w-3 mr-1" />
            Your Vision, Perfectly Crafted
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            The Bespoke Experience
          </h1>
          <p className="text-xl text-stone-600 mb-8 leading-relaxed">
            Discover the ultimate in personalization. Our bespoke service is a journey to create a hair solution that is uniquely and beautifully yours, crafted with unparalleled skill and artistry.
          </p>
          <Button size="lg" className="bg-amber-700 hover:bg-amber-800 text-white group">
            Book Your Private Consultation
          </Button>
        </div>
      </section>

      {/* The Berenice Promise */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/70">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-amber-700" />
              </div>
              <h3 className="text-xl font-bold mb-2">Unmatched Quality</h3>
              <p className="text-stone-600">We use only the finest, ethically-sourced materials for a luxurious and lasting result.</p>
            </div>
            <div className="p-6">
              <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-amber-700" />
              </div>
              <h3 className="text-xl font-bold mb-2">Master Artistry</h3>
              <p className="text-stone-600">Decades of experience ensure every detail is crafted to perfection by our skilled artisans.</p>
            </div>
            <div className="p-6">
              <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-amber-700" />
              </div>
              <h3 className="text-xl font-bold mb-2">Absolute Discretion</h3>
              <p className="text-stone-600">Your privacy is paramount. We provide a confidential and supportive experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Meticulous Process</h2>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">
              From the initial sketch to the final touch, our five-step process is designed to deliver a piece that exceeds your expectations.
            </p>
          </div>

          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0 w-24 h-24 bg-white rounded-full border-4 border-amber-200 flex items-center justify-center">
                  {step.icon}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Showcase */}
      <section className="py-16 bg-white/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Crafted to Perfection</h2>
            <p className="text-lg text-stone-600">A glimpse into the artistry behind our bespoke creations.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="group relative overflow-hidden rounded-lg">
              <Image src="https://picsum.photos/800/1000?random=1" alt="Bespoke wig making process" width={800} height={1000} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="group relative overflow-hidden rounded-lg">
              <Image src="https://picsum.photos/800/1000?random=2" alt="Bespoke wig making process" width={800} height={1000} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="group relative overflow-hidden rounded-lg">
              <Image src="https://picsum.photos/800/1000?random=3" alt="Bespoke wig making process" width={800} height={1000} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="group relative overflow-hidden rounded-lg">
              <Image src="https://picsum.photos/800/1000?random=4" alt="Bespoke wig making process" width={800} height={1000} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-white p-12 rounded-xl shadow-lg border border-amber-200">
          <Crown className="h-12 w-12 text-amber-700 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-stone-600 mb-8">
            Contact us today to schedule your complimentary, no-obligation consultation with a Berenice London specialist. Let's bring your vision to life.
          </p>
          <Button size="lg" className="bg-amber-700 hover:bg-amber-800 text-white">
            Book a Consultation
          </Button>
        </div>
      </section>
    </div>
  )
}
