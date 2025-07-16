"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/contexts/CartContext"
import { products, productCategories, type ProductCategory, type Product } from "@/data/productsData"
import { Search, Filter, Star, ShoppingCart, Eye, Heart, ArrowRight } from "lucide-react"
import Link from "next/link"

interface ProductListProps {
  category?: ProductCategory
  showFeatured?: boolean
  limit?: number
  searchQuery?: string
  sortBy?: "name" | "price" | "rating" | "newest"
  priceRange?: "all" | "under-100" | "100-500" | "500-1000" | "over-1000"
  viewMode?: "grid" | "list"
  memberDiscount?: number
}

export function ProductList({
  category,
  showFeatured = false,
  limit,
  searchQuery: externalSearchQuery,
  sortBy: externalSortBy,
  priceRange: externalPriceRange,
  viewMode: externalViewMode,
  memberDiscount = 0
}: ProductListProps) {
  const { addToCart, isInCart } = useCart()
  const [searchQuery, setSearchQuery] = useState(externalSearchQuery || "")
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">(category || "all")
  const [sortBy, setSortBy] = useState<"name" | "price" | "rating" | "newest">(
    (externalSortBy as "name" | "price" | "rating" | "newest") || "name"
  )
  const [priceRange, setPriceRange] = useState<"all" | "under-100" | "100-500" | "500-1000" | "over-1000">(
    (externalPriceRange as "all" | "under-100" | "100-500" | "500-1000" | "over-1000") || "all"
  )
  const [viewMode, setViewMode] = useState<"grid" | "list">(externalViewMode || "grid")

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products]

    // Filter by featured status
    if (showFeatured) {
      filtered = filtered.filter(product => product.isFeatured)
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query)) ||
        product.brand.toLowerCase().includes(query)
      )
    }

    // Filter by price range
    if (priceRange !== "all") {
      filtered = filtered.filter(product => {
        switch (priceRange) {
          case "under-100":
            return product.price < 100
          case "100-500":
            return product.price >= 100 && product.price < 500
          case "500-1000":
            return product.price >= 500 && product.price < 1000
          case "over-1000":
            return product.price >= 1000
          default:
            return true
        }
      })
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.price - b.price
        case "rating":
          return b.rating - a.rating
        case "newest":
          return b.isNew ? 1 : -1
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    // Apply limit if specified
    if (limit) {
      filtered = filtered.slice(0, limit)
    }

    return filtered
  }, [searchQuery, selectedCategory, sortBy, priceRange, showFeatured, limit])

  const getCategoryName = (categoryId: ProductCategory) => {
    return productCategories.find(cat => cat.id === categoryId)?.name || categoryId
  }

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category
    })
  }

  const formatPrice = (price: number, withDiscount: boolean = false) => {
    if (withDiscount && memberDiscount > 0) {
      const discountedPrice = price * (1 - memberDiscount / 100)
      return `£${discountedPrice.toFixed(2)}`
    }
    return `£${price.toFixed(2)}`
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      {!limit && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as ProductCategory | "all")}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {productCategories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={priceRange} onValueChange={(value) => setPriceRange(value as typeof priceRange)}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-100">Under £100</SelectItem>
                <SelectItem value="100-500">£100 - £500</SelectItem>
                <SelectItem value="500-1000">£500 - £1,000</SelectItem>
                <SelectItem value="over-1000">Over £1,000</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value) => setSortBy(value as typeof sortBy)}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="price">Price (Low to High)</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Results Count */}
      {!limit && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? 'product' : 'products'} found
          </p>
          {showFeatured && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              Featured Products
            </Badge>
          )}
        </div>
      )}

      {/* Product Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredAndSortedProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            <div className="relative">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {product.isNew && <Badge className="bg-green-600">New</Badge>}
                {product.isBestseller && <Badge className="bg-amber-600">Bestseller</Badge>}
                {product.originalPrice && (
                  <Badge className="bg-red-600">
                    Save £{(product.originalPrice - product.price).toFixed(0)}
                  </Badge>
                )}
              </div>

              {/* Quick Actions */}
              <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                  <Heart className="h-4 w-4" />
                </Button>
                <Link href={`/shop/product/${product.id}`}>
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* Stock Status */}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="destructive">Out of Stock</Badge>
                </div>
              )}
            </div>

            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {getCategoryName(product.category)}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current text-amber-500" />
                  <span className="text-xs text-gray-600">{product.rating}</span>
                </div>
              </div>

              <CardTitle className="text-base leading-tight line-clamp-2">
                {product.name}
              </CardTitle>

              <CardDescription className="text-sm line-clamp-2">
                {product.description}
              </CardDescription>

              <div className="text-xs text-gray-500">
                by {product.brand}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Pricing */}
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-amber-700">
                  {formatPrice(product.price, memberDiscount > 0)}
                </span>
                {memberDiscount > 0 && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
                {product.originalPrice && !memberDiscount && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-600">Colors:</span>
                  <div className="flex gap-1">
                    {product.colors.slice(0, 4).map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color.startsWith('#') ? color : '#8B4513' }}
                      />
                    ))}
                    {product.colors.length > 4 && (
                      <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button
                  className="w-full bg-amber-700 hover:bg-amber-800"
                  disabled={!product.inStock}
                  onClick={() => handleAddToCart(product)}
                >
                  {isInCart(product.id) ? (
                    <>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>

                <Link href={`/shop/product/${product.id}`} className="block">
                  <Button variant="outline" className="w-full">
                    View Details
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-12">
          <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Load More (if limited) */}
      {limit && products.length > limit && (
        <div className="text-center">
          <Link href="/shop">
            <Button variant="outline" className="border-amber-600 text-amber-700">
              View All Products
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
