"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { galleryItems, galleryCategories, type GalleryCategory, type GalleryItem } from "@/data/galleryData"
import { Search, Filter, Star, Quote, Heart, Eye, ArrowLeft, ArrowRight } from "lucide-react"

interface GalleryProps {
  showFeatured?: boolean
  category?: GalleryCategory
  limit?: number
}

export function Gallery({ showFeatured = false, category, limit }: GalleryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory | "all">(category || "all")
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [showBefore, setShowBefore] = useState(true)

  const filteredItems = useMemo(() => {
    let filtered = galleryItems

    // Filter by featured status
    if (showFeatured) {
      filtered = filtered.filter(item => item.featured)
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.serviceType.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Apply limit if specified
    if (limit) {
      filtered = filtered.slice(0, limit)
    }

    return filtered
  }, [searchQuery, selectedCategory, showFeatured, limit])

  const getCategoryName = (categoryId: GalleryCategory) => {
    return galleryCategories.find(cat => cat.id === categoryId)?.name || categoryId
  }

  const getCategoryColor = (categoryId: GalleryCategory) => {
    const colors = {
      'bespoke-wigs': 'bg-amber-100 text-amber-800',
      'ready-made': 'bg-blue-100 text-blue-800',
      'styling': 'bg-green-100 text-green-800',
      'color-matching': 'bg-purple-100 text-purple-800',
      'hair-loss': 'bg-pink-100 text-pink-800',
      'special-occasion': 'bg-orange-100 text-orange-800'
    }
    return colors[categoryId] || 'bg-gray-100 text-gray-800'
  }

  const openItemModal = (item: GalleryItem) => {
    setSelectedItem(item)
    setIsDialogOpen(true)
    setShowBefore(true)
  }

  // Before/After Comparison Component
  const BeforeAfterComparison = ({ item, showBefore: localShowBefore, onToggle }: {
    item: GalleryItem,
    showBefore: boolean,
    onToggle: () => void
  }) => (
    <div className="relative overflow-hidden rounded-lg group cursor-pointer" onClick={onToggle}>
      <div className="aspect-square relative">
        <img
          src={localShowBefore ? item.beforeImage : item.afterImage}
          alt={localShowBefore ? 'Before transformation' : 'After transformation'}
          className="w-full h-full object-cover transition-all duration-500"
        />

        {/* Toggle Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
            {localShowBefore ? 'Click to see After' : 'Click to see Before'}
          </div>
        </div>

        {/* Before/After Indicator */}
        <div className="absolute top-4 left-4">
          <Badge className={localShowBefore ? 'bg-gray-600' : 'bg-green-600'}>
            {localShowBefore ? 'Before' : 'After'}
          </Badge>
        </div>

        {/* Toggle Button */}
        <Button
          size="sm"
          className="absolute bottom-4 right-4 bg-white/90 text-gray-900 hover:bg-white"
          onClick={(e) => {
            e.stopPropagation()
            onToggle()
          }}
        >
          {localShowBefore ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      {!limit && (
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search transformations..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as GalleryCategory | "all")}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {galleryCategories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Results Count */}
      {!limit && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {filteredItems.length} {filteredItems.length === 1 ? 'transformation' : 'transformations'} found
          </p>
          {showFeatured && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              Featured Gallery
            </Badge>
          )}
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="relative">
              <BeforeAfterComparison
                item={item}
                showBefore={true}
                onToggle={() => {}}
              />

              {item.featured && (
                <div className="absolute top-2 right-2">
                  <Star className="h-5 w-5 text-amber-500 fill-current" />
                </div>
              )}
            </div>

            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge className={getCategoryColor(item.category)}>
                  {getCategoryName(item.category)}
                </Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => openItemModal(item)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>

              <CardTitle className="text-lg leading-tight">
                {item.title}
              </CardTitle>

              <CardDescription className="line-clamp-2">
                {item.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="text-sm">
                <span className="font-medium text-amber-700">{item.serviceType}</span>
              </div>

              {item.clientTestimonial && (
                <div className="bg-stone-50 p-3 rounded-lg">
                  <Quote className="h-4 w-4 text-amber-600 mb-2" />
                  <p className="text-sm italic line-clamp-2">{item.clientTestimonial}</p>
                  {item.clientName && (
                    <p className="text-xs text-gray-500 mt-1">- {item.clientName}</p>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-1">
                {item.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => openItemModal(item)}
              >
                View Full Transformation
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No transformations found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Load More (if limited) */}
      {limit && galleryItems.length > limit && (
        <div className="text-center">
          <Button variant="outline" className="border-amber-600 text-amber-700">
            View Full Gallery
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}

      {/* Modal Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedItem.title}
                  {selectedItem.featured && <Star className="h-5 w-5 text-amber-500 fill-current" />}
                </DialogTitle>
                <DialogDescription>
                  {selectedItem.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Service Info */}
                <div className="flex items-center gap-4">
                  <Badge className={getCategoryColor(selectedItem.category)}>
                    {getCategoryName(selectedItem.category)}
                  </Badge>
                  <span className="text-sm font-medium text-amber-700">
                    {selectedItem.serviceType}
                  </span>
                </div>

                {/* Before/After Images */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Badge variant="outline">Before</Badge>
                    </h4>
                    <div className="aspect-square rounded-lg overflow-hidden">
                      <img
                        src={selectedItem.beforeImage}
                        alt="Before transformation"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">After</Badge>
                    </h4>
                    <div className="aspect-square rounded-lg overflow-hidden">
                      <img
                        src={selectedItem.afterImage}
                        alt="After transformation"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Client Testimonial */}
                {selectedItem.clientTestimonial && (
                  <div className="bg-amber-50 p-6 rounded-lg">
                    <Quote className="h-6 w-6 text-amber-600 mb-4" />
                    <blockquote className="text-lg italic mb-4">
                      "{selectedItem.clientTestimonial}"
                    </blockquote>
                    {selectedItem.clientName && (
                      <cite className="text-sm text-gray-600">
                        - {selectedItem.clientName}
                      </cite>
                    )}
                  </div>
                )}

                {/* Tags */}
                <div>
                  <h4 className="font-medium mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map(tag => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-stone-50 p-6 rounded-lg text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    Inspired by this transformation? Book your consultation today.
                  </p>
                  <Button className="bg-amber-700 hover:bg-amber-800">
                    Book Your Consultation
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
