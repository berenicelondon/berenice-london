"use client"

import { useState, ChangeEvent, FC } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Crown, Sparkles, Upload, Camera, Wand2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type Hairstyle = {
  id: string
  name: string
  src: string
}

const hairstyles: Hairstyle[] = [
  { id: "style1", name: "Classic Bob", src: "https://picsum.photos/400/400?random=6" },
  { id: "style2", name: "Long Waves", src: "https://picsum.photos/400/400?random=7" },
  { id: "style3", name: "Elegant Updo", src: "https://picsum.photos/400/400?random=8" },
  { id: "style4", name: "Chic Pixie", src: "https://picsum.photos/400/400?random=9" },
]

const VirtualTryOnPage: FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [selectedHairstyle, setSelectedHairstyle] = useState<string | null>(null)

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event: ProgressEvent<FileReader>) => {
        setUploadedImage(event.target?.result as string)
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

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

      {/* Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 text-center">
        <Badge variant="outline" className="mb-6 text-amber-700 border-amber-200 bg-white/90">
          <Wand2 className="h-3 w-3 mr-1" />
          Digital Styling Studio
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Virtual Try-On</h1>
        <p className="text-lg text-stone-600 max-w-3xl mx-auto">
          Visualize your new look from the comfort of your home. Upload your photo and try on our exquisite collection of hairstyles.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Card className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden shadow-xl border-amber-200">
          {/* Left: Upload & Preview */}
          <div className="p-8 bg-white">
            <CardHeader>
              <CardTitle className="text-2xl">1. Upload Your Photo</CardTitle>
              <CardDescription>For the best results, use a clear, front-facing photo.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-80 border-2 border-dashed border-stone-300 rounded-lg flex items-center justify-center mb-6 bg-stone-50 relative overflow-hidden">
                {uploadedImage ? (
                  <Image src={uploadedImage} alt="User upload" layout="fill" objectFit="cover" />
                ) : (
                  <div className="text-center text-stone-500">
                    <Upload className="h-12 w-12 mx-auto mb-2" />
                    <p>Click to upload or drag and drop</p>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="image-upload" className="sr-only">Upload Image</Label>
                  <Input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  <Button onClick={() => document.getElementById('image-upload')?.click()} className="w-full bg-amber-700 hover:bg-amber-800 text-white">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload from Device
                  </Button>
                </div>
                <Button variant="outline" className="w-full">
                  <Camera className="h-4 w-4 mr-2" />
                  Use Webcam
                </Button>
              </div>
            </CardContent>
          </div>

          {/* Right: Style Selection */}
          <div className="p-8 bg-gradient-to-br from-amber-50 to-yellow-100">
            <CardHeader>
              <CardTitle className="text-2xl">2. Select a Hairstyle</CardTitle>
              <CardDescription>Choose from our curated collection of styles.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {hairstyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedHairstyle(style.id)}
                    className={`relative rounded-lg overflow-hidden border-4 ${selectedHairstyle === style.id ? 'border-amber-700' : 'border-transparent'} transition-all duration-200`}
                  >
                    <Image src={style.src} alt={style.name} width={200} height={200} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-end p-2">
                      <p className="text-white font-semibold text-sm">{style.name}</p>
                    </div>
                  </button>
                ))}
              </div>
              <Button disabled={!uploadedImage || !selectedHairstyle} className="w-full mt-6 bg-stone-800 hover:bg-stone-900 text-white">
                <Sparkles className="h-4 w-4 mr-2" />
                Apply Style & See the Magic
              </Button>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default VirtualTryOnPage
