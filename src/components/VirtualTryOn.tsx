"use client"

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import {
  Camera,
  RotateCcw,
  Download,
  Sparkles,
  Crown,
  AlertCircle,
  RefreshCw,
  X,
  ZoomIn,
  ZoomOut,
  RotateCw
} from 'lucide-react'
import { products } from '@/data/productsData'

interface VirtualTryOnProps {
  onClose?: () => void
}

interface WigOverlay {
  id: string
  productId: string
  name: string
  image: string
  x: number
  y: number
  scale: number
  rotation: number
}

export function VirtualTryOn({ onClose }: VirtualTryOnProps) {
  // Camera and photo states
  const [isLiveMode, setIsLiveMode] = useState(false)
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Wig overlay states
  const [wigs, setWigs] = useState<WigOverlay[]>([])
  const [selectedWig, setSelectedWig] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Get wig products from e-shop
  const wigProducts = products.filter(product =>
    product.category === 'wigs'
  ).slice(0, 8) // Limit to first 8 wigs for performance

  // Initialize camera
  const startCamera = useCallback(async () => {
    try {
      setIsLoading(true)
      setCameraError(null)

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsLiveMode(true)
      }
    } catch (error) {
      console.error('Camera access error:', error)
      setCameraError('Unable to access camera. Please check your camera permissions and try again.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Stop camera
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setIsLiveMode(false)
  }, [])

  // Capture photo
  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')

      if (context && video.videoWidth > 0 && video.videoHeight > 0) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        // Draw the image
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        const photoDataUrl = canvas.toDataURL('image/jpeg', 0.8)
        setCapturedPhoto(photoDataUrl)
        stopCamera()
      }
    }
  }, [stopCamera])

  // Add wig overlay
  const addWigOverlay = useCallback((productId: string) => {
    const product = wigProducts.find(p => p.id === productId)
    if (!product) return

    const newWig: WigOverlay = {
      id: `wig-${Date.now()}`,
      productId,
      name: product.name,
      image: product.images[0],
      x: 150, // Center-ish position
      y: 50,  // Top of head area
      scale: 1,
      rotation: 0
    }

    setWigs(prev => [...prev, newWig])
    setSelectedWig(newWig.id)
  }, [wigProducts])

  // Remove wig overlay
  const removeWig = useCallback((wigId: string) => {
    setWigs(prev => prev.filter(w => w.id !== wigId))
    if (selectedWig === wigId) {
      setSelectedWig(null)
    }
  }, [selectedWig])

  // Handle wig drag
  const handleWigMouseDown = useCallback((event: React.MouseEvent, wigId: string) => {
    event.preventDefault()
    setSelectedWig(wigId)
    setIsDragging(true)

    const handleMouseMove = (e: MouseEvent) => {
      const photoContainer = document.getElementById('photo-container')
      if (!photoContainer) return

      const rect = photoContainer.getBoundingClientRect()
      const newX = e.clientX - rect.left - 50 // Offset for wig center
      const newY = e.clientY - rect.top - 50

      setWigs(prev => prev.map(wig =>
        wig.id === wigId
          ? { ...wig, x: Math.max(0, Math.min(newX, rect.width - 100)), y: Math.max(0, Math.min(newY, rect.height - 100)) }
          : wig
      ))
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [])

  // Update wig properties
  const updateWigProperty = useCallback((wigId: string, property: keyof WigOverlay, value: number) => {
    setWigs(prev => prev.map(wig =>
      wig.id === wigId
        ? { ...wig, [property]: value }
        : wig
    ))
  }, [])

  // Save photo with overlays
  const savePhoto = useCallback(() => {
    if (!capturedPhoto) return

    const link = document.createElement('a')
    link.download = `berenice-virtual-tryon-${Date.now()}.jpg`
    link.href = capturedPhoto
    link.click()
  }, [capturedPhoto])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [stopCamera])

  const selectedWigData = selectedWig ? wigs.find(w => w.id === selectedWig) : null

  return (
    <div className="space-y-6">
      {/* Camera Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Camera Setup
          </CardTitle>
          <CardDescription>
            Take a photo to start trying on wigs virtually
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            {!isLiveMode && !capturedPhoto && (
              <Button
                onClick={startCamera}
                disabled={isLoading}
                className="bg-amber-700 hover:bg-amber-800"
              >
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Camera className="h-4 w-4 mr-2" />
                )}
                Start Camera
              </Button>
            )}

            {isLiveMode && (
              <Button onClick={capturePhoto} className="bg-green-600 hover:bg-green-700">
                <Camera className="h-4 w-4 mr-2" />
                Capture Photo
              </Button>
            )}

            {capturedPhoto && (
              <>
                <Button
                  onClick={() => {
                    setCapturedPhoto(null)
                    setWigs([])
                    startCamera()
                  }}
                  variant="outline"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Retake Photo
                </Button>

                <Button onClick={savePhoto} className="bg-blue-600 hover:bg-blue-700">
                  <Download className="h-4 w-4 mr-2" />
                  Save Photo
                </Button>
              </>
            )}
          </div>

          {/* Camera Error */}
          {cameraError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{cameraError}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Camera/Photo Display */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                {isLiveMode ? 'Live Camera' : capturedPhoto ? 'Your Photo with Wigs' : 'Camera Preview'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                id="photo-container"
                className="relative bg-stone-100 rounded-lg overflow-hidden aspect-video"
              >
                {isLiveMode && (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                )}

                {capturedPhoto && (
                  <div className="relative w-full h-full">
                    <img
                      src={capturedPhoto}
                      alt="Captured"
                      className="w-full h-full object-cover"
                    />

                    {/* Wig Overlays */}
                    {wigs.map(wig => (
                      <div
                        key={wig.id}
                        className={`absolute cursor-move select-none transition-all ${
                          selectedWig === wig.id ? 'ring-2 ring-amber-400 ring-offset-2' : ''
                        }`}
                        style={{
                          left: wig.x,
                          top: wig.y,
                          transform: `scale(${wig.scale}) rotate(${wig.rotation}deg)`,
                        }}
                        onMouseDown={(e) => handleWigMouseDown(e, wig.id)}
                        onClick={() => setSelectedWig(wig.id)}
                      >
                        <img
                          src={wig.image}
                          alt={wig.name}
                          className="w-20 h-20 object-cover rounded-lg pointer-events-none opacity-80 hover:opacity-90"
                          draggable={false}
                        />

                        {selectedWig === wig.id && (
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeWig(wig.id)
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {!isLiveMode && !capturedPhoto && (
                  <div className="flex items-center justify-center h-full text-stone-500">
                    <div className="text-center">
                      <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Click "Start Camera" to begin</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Wig Controls for Selected Wig */}
              {selectedWigData && capturedPhoto && (
                <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                  <h4 className="font-medium mb-3">Adjust: {selectedWigData.name}</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <label className="block text-xs font-medium mb-2">Size</label>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => updateWigProperty(selectedWigData.id, 'scale', Math.max(0.5, selectedWigData.scale - 0.1))}
                        >
                          <ZoomOut className="h-3 w-3" />
                        </Button>
                        <span className="text-xs w-12 text-center">{Math.round(selectedWigData.scale * 100)}%</span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => updateWigProperty(selectedWigData.id, 'scale', Math.min(2, selectedWigData.scale + 0.1))}
                        >
                          <ZoomIn className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="text-center">
                      <label className="block text-xs font-medium mb-2">Rotation</label>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => updateWigProperty(selectedWigData.id, 'rotation', selectedWigData.rotation - 15)}
                        >
                          <RotateCw className="h-3 w-3 scale-x-[-1]" />
                        </Button>
                        <span className="text-xs w-12 text-center">{selectedWigData.rotation}°</span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => updateWigProperty(selectedWigData.id, 'rotation', selectedWigData.rotation + 15)}
                        >
                          <RotateCw className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="text-center">
                      <label className="block text-xs font-medium mb-2">Position</label>
                      <p className="text-xs text-stone-600">Drag the wig to move it</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Wig Selector */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Available Wigs
              </CardTitle>
              <CardDescription>
                Click on a wig to add it to your photo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {wigProducts.map(product => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-2 border rounded-lg cursor-pointer hover:bg-amber-50 hover:border-amber-200 transition-colors"
                    onClick={() => capturedPhoto && addWigOverlay(product.id)}
                  >
                    <div className="w-12 h-12 bg-white rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-1">{product.name}</h4>
                      <p className="text-xs text-stone-600">£{product.price}</p>
                    </div>
                  </div>
                ))}

                {wigProducts.length === 0 && (
                  <div className="text-center text-stone-500 py-8">
                    <p className="text-sm">No wigs available</p>
                  </div>
                )}
              </div>

              {!capturedPhoto && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-700">
                    Take a photo first to start trying on wigs!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Hidden canvas for processing */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  )
}
