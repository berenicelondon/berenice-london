"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ChevronRight, Star, Menu, Search, ShoppingBag, User, MessageCircle } from "lucide-react"

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDot, setActiveDot] = useState(0)

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Dark Header */}
      <header className="bg-[#333333] text-white py-3 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-4">
          <button
            className="text-white md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="hidden md:flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <span className="text-[#333333] font-bold text-lg">B</span>
            </div>
          </div>

          <div className="text-center mx-auto">
            <h1 className="text-sm font-light tracking-widest">WELCOME TO <span className="text-amber-400">BERENICE</span> LONDON</h1>
          </div>

          <div className="flex items-center gap-4">
            <Search className="h-5 w-5" />
            <User className="h-5 w-5" />
            <ShoppingBag className="h-5 w-5" />
          </div>
        </div>
      </header>

      <main className="flex-grow relative">
        {/* Hero Section */}
        <section className="relative h-[85vh] overflow-hidden">
          <Image
            src="/uploads/Berenice London New Design/Home (Back)-1.jpg"
            alt="Flowing hair"
            fill
            className="object-cover"
            priority
          />

          {/* Vertical Navigation Menu */}
          <div className="absolute top-0 right-0 h-full bg-gradient-to-l from-amber-900 to-amber-800/95 text-white w-[250px] flex-col justify-center hidden md:flex">
            <nav className="py-8 flex flex-col space-y-2">
              <Link href="/shop" className="px-6 py-3 text-sm font-light tracking-widest hover:bg-amber-900/50 transition-colors border-b border-white/10 text-center">
                SHOP
              </Link>
              <Link href="/bespoke" className="px-6 py-3 text-sm font-light tracking-widest hover:bg-amber-900/50 transition-colors border-b border-white/10 text-center">
                BESPOKE
              </Link>
              <Link href="/about" className="px-6 py-3 text-sm font-light tracking-widest hover:bg-amber-900/50 transition-colors border-b border-white/10 text-center">
                ABOUT | CONTACT
              </Link>
              <Link href="/education" className="px-6 py-3 text-sm font-light tracking-widest hover:bg-amber-900/50 transition-colors border-b border-white/10 text-center">
                EDUCATION
              </Link>
              <Link href="/membership" className="px-6 py-3 text-sm font-light tracking-widest hover:bg-amber-900/50 transition-colors border-b border-white/10 text-center">
                MEMBERSHIP | BLOG
              </Link>
              <Link href="/investment" className="px-6 py-3 text-sm font-light tracking-widest hover:bg-amber-900/50 transition-colors text-center">
                INVESTMENT
              </Link>
            </nav>
          </div>
        </section>

        {/* Main Content */}
        <div className="bg-[#f4f4f4]">
          <section className="container mx-auto px-4 py-12">
            <h2 className="text-3xl sm:text-4xl font-light text-center">
              HUMAN <span className="text-amber-500">HAIR</span> WIGS & <span className="text-amber-500">BESPOKE</span> HAIRPIECES <span className="text-amber-500">IN</span> LONDON
            </h2>

            <p className="text-center mt-4 mb-8 text-gray-600 max-w-3xl mx-auto">
              Because you deserve to look and feel like yourself.
            </p>

            <p className="text-center text-gray-700 max-w-4xl mx-auto leading-relaxed">
              At <span className="text-amber-500 font-medium">Berenice London</span>, we specialise in natural-looking, low-density wigs designed for those experiencing hair loss—from alopecia, thinning, or chemotherapy—as well as clients seeking elegant fashion pieces or hair solutions for religious reasons. Our mission? To help you rediscover confidence with undetectable, lightweight hair that moves and feels just like your own.
            </p>
          </section>

          {/* Why Choose Us Section */}
          <section className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-light text-center mb-12">
              WHY <span className="text-amber-500">CHOOSE</span> US?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="border border-gray-200 p-6">
                <h3 className="text-lg font-medium mb-4">Luxury, low-density wigs</h3>
                <p className="text-gray-600">No bulky, artificial-looking hair; just soft, realistic styles Handcrafted in our London studio, not a factory.</p>
              </div>

              <div className="border border-gray-200 p-6">
                <h3 className="text-lg font-medium mb-4">Bespoke hairpieces & ready-to-wear</h3>
                <p className="text-gray-600">Handmade in our London studio with the finest, ethically sourced human hair for seamless blending. Unmatched softness, pure quality. Hair that feels and moves just like your own.</p>
              </div>

              <div className="border border-gray-200 p-6">
                <h3 className="text-lg font-medium mb-4">TruSkin integration</h3>
                <p className="text-gray-600">Book a private fitting at our London studio for this semi-permanent hair replacement solution. We offer multiple attachment methods for perfectly undetectable, natural-looking wear.</p>
              </div>

              <div className="border border-gray-200 p-6">
                <h3 className="text-lg font-medium mb-4">Private consultations</h3>
                <p className="text-gray-600">Discreet, one-to-one appointments in our Ealing studio. Just you and your wig specialist, guaranteed.</p>
              </div>
            </div>

            <div className="text-center mt-10">
              <p className="mb-4 text-gray-700 italic">Let’s create your perfect match – because true beauty starts with feeling like you.</p>
              <Link href="/shop">
                <Button className="bg-amber-500 hover:bg-amber-600 text-black rounded-full px-8 py-3">
                  ALL WIGS & TOPPERS <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </section>

          {/* Consultation Section */}
          <section className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-light text-center mb-10">
              BOOK YOUR CONSULTATION:
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <Image
                  src="/uploads/Berenice London New Design/Bespoke.jpg"
                  alt="Consultation"
                  width={600}
                  height={800}
                  className="rounded-md"
                />
              </div>

              <div>
                <p className="text-gray-700 mb-6">Choose yours preferred way to have consultation:</p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button variant="outline" className="border-amber-500 text-amber-800 flex-1">
                    Personal Consultation
                  </Button>
                  <Button variant="outline" className="border-gray-300 text-gray-800 flex-1">
                    Virtual Consultation
                  </Button>
                </div>

                <p className="text-sm text-gray-600 mb-8">
                  Meet with our expert wig specialist for a detailed one-to-one consultation at our West London Ealing wig studio. We’ll guide you through every step of the process, ensuring you feel totally informed and confident in your choice.
                </p>

                <div className="bg-white p-6 border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-lg">Consultation</h3>
                    <p className="text-lg font-bold text-amber-500">£75</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                    <div className="h-4 w-4 rounded-full border border-amber-500 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                    </div>
                    London, Ealing Studio
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Schedule a consultation with Petra, the founder, who is not only an expert in wig-making but also a fellow hair loss wearer. With her extensive knowledge and personal experience, Petra is committed to crafting the perfect wig tailored just for you. Throughout the process, we will provide guidance and address any questions or concerns you may have.
                    <br/><br/>
                    <b>Your consultation fee will be credited towards any wig purchase.</b>
                  </p>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-black rounded-full px-6 py-2">
                    SELECT TIME <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Story Section */}
        <section className="bg-[#333333] text-white py-16">
          <div className="container mx-auto px-4 text-center relative">
            <div className="absolute left-10 top-1/2 -translate-y-1/2 cursor-pointer">
                <ChevronRight className="h-8 w-8 transform rotate-180" />
            </div>
            <p className="text-lg font-light mb-4">“IN MAY 2014,</p>
            <p className="text-lg font-light mb-4">WE LAUNCHED OUR WIG BUSINESS,</p>
            <h2 className="text-3xl font-light mb-8">
              <span className="text-amber-400">BERENICE LONDON</span>.
            </h2>
            <p className="text-lg font-light mb-6 max-w-4xl mx-auto">
              FOR SOME HAIR LOSS IS DUE TO CONDITIONS LIKE ALOPECIA(M) OTHERS BECAUSE OF CHEMOTHERAPY.
            </p>
            <p className="text-lg font-light mb-8 max-w-4xl mx-auto">
              I LOVE MAKING CLIENTS FEEL GOOD AGAIN.”
            </p>
            <p className="italic">Petra Johnson</p>

            <div className="flex justify-center mt-8">
                <Button className="bg-transparent border border-white rounded-full px-8 py-3 text-lg">
                    Chat
                </Button>
            </div>
            <div className="absolute right-10 top-1/2 -translate-y-1/2 cursor-pointer">
                <ChevronRight className="h-8 w-8" />
            </div>
          </div>
        </section>

        <div className="bg-[#f4f4f4] py-12">
          {/* Testimonials Section */}
          <section className="container mx-auto px-4">
            <h2 className="text-3xl font-light text-center mb-10">
              WHAT OUR CUSTOMERS SAY
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Testimonial 1 */}
              <div className="border border-gray-200 p-6 bg-white">
                <p className="text-gray-700 mb-6">
                  “I did a training course with Petra to learn to prepare new hair. The day was above what I expected. Petra tailored the course to suit what I needed. I highly recommend Petra for hair training courses and will be back in the future to do the machine making course. Since the course we have been in touch Petra continues to help with any questions or help I need.
                  <br/><br/>
                  What a pleasure to meet both Petra and her Mum.
                  <br/><br/>
                  Thank you both.”
                </p>
                <div className="mt-6">
                  <Image
                    src="/uploads/Berenice London New Design/Shop 3.jpg"
                    alt="Client Hair"
                    width={300}
                    height={200}
                    className="w-full"
                  />
                </div>
                <div className="flex mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-500 text-sm mt-2">Zoe Conner</p>
              </div>

              {/* Testimonial 2 */}
              <div className="border border-gray-200 p-6 bg-white">
                <p className="text-gray-700 mb-6">
                  “I've met Petra a few months ago when I decided to get my first wig due to alopecia. I couldn't have made a better choice! Petra was absolutely a pleasure to meet, so kind and friendly. I was very stressed about the whole process and she overcome my fears, had her unique way of making me trust her skills and become more confident. She had so much patience and she took her time to answer all of my questions and worries. She overcome my amazing! I now have a beautiful piece of hair that looks exactly like my hair used to look before alopecia. It's light weight, high quality, and it moves so naturally. I definitely recommend Petra. Thank you Petra for being so lovely, so kind and for really caring about your customers. I will definitely be back soon for another wig!"
                </p>
                <div className="mt-6">
                  <Image
                    src="/uploads/Berenice London New Design/Shop 6.jpg"
                    alt="Client"
                    width={300}
                    height={200}
                    className="w-full"
                  />
                </div>
                <div className="flex mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-500 text-sm mt-2">Petra Gabor</p>
              </div>

              {/* Testimonial 3 */}
              <div className="border border-gray-200 p-6 bg-white">
                <p className="text-gray-700 mb-6">
                  “I cannot speak highly enough of the wig service Petra and her team provided to me. I didn't have a long time to stay in London but Petra managed to expedite the delivery time of my beautiful wig. From start to finish Petra was patient, informative, creative and a pleasure to be around. I felt very comfortable and at ease - essential for such an intimate service. The wig she has created is absolutely beautiful - I feel certainly I return for a second wig so that I cannot recommend her highly enough. Thank you Petra and team x”
                </p>
                <div className="mt-6">
                  <Image
                    src="/uploads/Berenice London New Design/Shop 02.jpg"
                    alt="Client"
                    width={300}
                    height={200}
                    className="w-full"
                  />
                </div>
                <div className="flex mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-500 text-sm mt-2">Heather Strench</p>
              </div>
            </div>

            <div className="flex justify-center mt-10">
              <div className="flex gap-2">
                {[0, 1, 2, 3].map((dot) => (
                  <button
                    key={dot}
                    className={`h-2 w-2 rounded-full ${activeDot === dot ? 'bg-amber-500' : 'bg-gray-300'}`}
                    onClick={() => setActiveDot(dot)}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#333333] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-8">
            <div className="flex gap-4">
              <Link href="#" className="h-8 w-8 border border-gray-600 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-black transition-colors">
                <span className="sr-only">X</span>
                X
              </Link>
              <Link href="#" className="h-8 w-8 border border-gray-600 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-black transition-colors">
                <span className="sr-only">Instagram</span>
                I
              </Link>
              <Link href="#" className="h-8 w-8 border border-gray-600 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-black transition-colors">
                <span className="sr-only">Facebook</span>
                F
              </Link>
              <Link href="#" className="h-8 w-8 border border-gray-600 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-black transition-colors">
                <span className="sr-only">Whatsapp</span>
                W
              </Link>
            </div>
          </div>

          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <span className="text-[#333333] font-bold text-2xl">B</span>
            </div>
          </div>

          <form className="max-w-md mx-auto mb-8">
            <div className="flex gap-4">
              <input type="text" placeholder="Your name" className="bg-transparent border-b border-gray-600 flex-1 py-2 text-white focus:outline-none"/>
              <input type="email" placeholder="Your email address" className="bg-transparent border-b border-gray-600 flex-1 py-2 text-white focus:outline-none"/>
              <Button className="bg-amber-500 hover:bg-amber-600 text-black rounded-full px-6">
                Subscribe
              </Button>
            </div>
          </form>

          <div className="flex justify-center mb-8">
            <Image src="/uploads/Berenice London New Design/Group 528-3.svg" alt="Ealing" width={80} height={40}/>
            <Image src="/uploads/Berenice London New Design/Group 528-2.svg" alt="HSA" width={80} height={40}/>
            <Image src="/uploads/Berenice London New Design/Group 528-1.svg" alt="Chat" width={80} height={40}/>
            <Image src="/uploads/Berenice London New Design/Group 528-4.svg" alt="NHS" width={80} height={40}/>
          </div>

          <div className="flex justify-center mb-8">
            <Image src="/uploads/Berenice London New Design/Group 526.svg" alt="Payment Methods" width={400} height={40}/>
          </div>

          <div className="text-center text-xs text-gray-400 mb-6">
            Berenice London provides high-quality, ethically sourced, human hair wigs and hairpieces to wig makers in the film, theatre and TV industry, as well as to the general public. We are based in London. To see our full range of wigs and hairpieces please see our online shop or contact us to discuss in more detail.
          </div>

          <div className="flex justify-center gap-6 text-xs text-gray-300">
            <Link href="/measure">How to Measure</Link>
            <Link href="/klarna">About Klarna</Link>
            <Link href="/terms">Terms & Conditions</Link>
            <Link href="/faq">FAQS</Link>
          </div>

          <div className="text-center text-[10px] text-gray-500 mt-8">
            Copyright 2024 by Berenice London Ltd all right reserved | Designed, Promoted and Hosted by 123 Internet.
          </div>
        </div>
      </footer>
    </div>
  )
}
