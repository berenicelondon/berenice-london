"use client"

import { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Camera, Upload, X, User, CheckCircle, AlertCircle, Trash2 } from 'lucide-react'

interface ProfilePhotoUploadProps {
  currentPhotoUrl?: string
  userName: string
  onPhotoUpdate: (photoUrl: string | null) => void
  maxSizeInMB?: number
}

export function ProfilePhotoUpload({
  currentPhotoUrl,
  userName,
  onPhotoUpdate,
  maxSizeInMB = 5
}: ProfilePhotoUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentPhotoUrl || null)
  const [error, setError] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Generate initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('')
  }

  // Validate file
  const validateFile = useCallback((file: File): string | null => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      return 'Please select a valid image file'
    }

    // Check file size
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024
    if (file.size > maxSizeInBytes) {
      return `File size must be less than ${maxSizeInMB}MB`
    }

    // Check file dimensions (optional)
    return null
  }, [maxSizeInMB])

  // Process and resize image
  const processImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        // Set canvas size (square aspect ratio)
        const size = Math.min(img.width, img.height)
        canvas.width = 300
        canvas.height = 300

        if (ctx) {
          // Draw image centered and cropped to square
          const sourceX = (img.width - size) / 2
          const sourceY = (img.height - size) / 2

          ctx.drawImage(
            img,
            sourceX,
            sourceY,
            size,
            size,
            0,
            0,
            300,
            300
          )

          // Convert to blob and create URL
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob)
              resolve(url)
            } else {
              reject(new Error('Failed to process image'))
            }
          }, 'image/jpeg', 0.8)
        } else {
          reject(new Error('Canvas context not available'))
        }
      }

      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = URL.createObjectURL(file)
    })
  }

  // Handle file selection
  const handleFileSelect = useCallback(async (file: File) => {
    setError(null)

    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }

    setIsUploading(true)

    try {
      // Process the image
      const processedUrl = await processImage(file)
      setPreviewUrl(processedUrl)

      // In a real app, you would upload to a storage service here
      // For demo purposes, we'll just use the local blob URL

      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      onPhotoUpdate(processedUrl)
      setIsDialogOpen(false)
    } catch (error) {
      console.error('Image processing failed:', error)
      setError('Failed to process image. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }, [onPhotoUpdate, validateFile])

  // Handle file input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  // Handle drag and drop
  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }, [handleFileSelect])

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
  }, [])

  // Remove photo
  const handleRemovePhoto = () => {
    setPreviewUrl(null)
    onPhotoUpdate(null)
    setIsDialogOpen(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="flex items-center gap-4">
      {/* Current Avatar Display */}
      <Avatar className="h-16 w-16">
        <AvatarImage src={previewUrl || currentPhotoUrl || ''} alt={userName} />
        <AvatarFallback className="bg-amber-100 text-amber-800 text-lg font-semibold">
          {getInitials(userName)}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-medium text-gray-900">{userName}</h3>
          {previewUrl && (
            <Badge variant="secondary" className="text-xs">
              <CheckCircle className="h-3 w-3 mr-1" />
              Photo Updated
            </Badge>
          )}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Camera className="h-4 w-4" />
              {previewUrl ? 'Change Photo' : 'Add Photo'}
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Update Profile Photo</DialogTitle>
              <DialogDescription>
                Upload a new profile photo. For best results, use a square image.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Preview */}
              <div className="flex justify-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={previewUrl || currentPhotoUrl || ''} alt={userName} />
                  <AvatarFallback className="bg-amber-100 text-amber-800 text-xl font-semibold">
                    {getInitials(userName)}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Upload Area */}
              <Card
                className="border-dashed border-2 hover:border-amber-300 transition-colors cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
              >
                <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG up to {maxSizeInMB}MB
                  </p>
                </CardContent>
              </Card>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="hidden"
              />

              {/* Error Display */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                {previewUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRemovePhoto}
                    className="flex-1 gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove Photo
                  </Button>
                )}

                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>

              {isUploading && (
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-600"></div>
                  Processing image...
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

// Compact version for use in navigation/headers
export function ProfileAvatar({
  photoUrl,
  userName,
  size = 'default'
}: {
  photoUrl?: string
  userName: string
  size?: 'sm' | 'default' | 'lg'
}) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('')
  }

  const sizeClasses = {
    sm: 'h-8 w-8 text-sm',
    default: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base'
  }

  return (
    <Avatar className={sizeClasses[size]}>
      <AvatarImage src={photoUrl || ''} alt={userName} />
      <AvatarFallback className="bg-amber-100 text-amber-800 font-semibold">
        {getInitials(userName)}
      </AvatarFallback>
    </Avatar>
  )
}
