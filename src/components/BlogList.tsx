"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { blogPosts, blogCategories, type BlogCategory, type BlogPost } from "@/data/blogData"
import { Search, Clock, Calendar, User, ArrowRight, Filter, BookOpen, Star } from "lucide-react"

interface BlogListProps {
  showFeatured?: boolean
  category?: BlogCategory
  limit?: number
}

export function BlogList({ showFeatured = false, category, limit }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | "all">(category || "all")
  const [sortBy, setSortBy] = useState<"date" | "readTime" | "title">("date")

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = blogPosts

    // Filter by featured status
    if (showFeatured) {
      filtered = filtered.filter(post => post.featured)
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query)) ||
        post.author.toLowerCase().includes(query)
      )
    }

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
        case "readTime":
          return a.readTime - b.readTime
        case "title":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    // Apply limit if specified
    if (limit) {
      filtered = filtered.slice(0, limit)
    }

    return filtered
  }, [searchQuery, selectedCategory, sortBy, showFeatured, limit])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getCategoryName = (categoryId: BlogCategory) => {
    return blogCategories.find(cat => cat.id === categoryId)?.name || categoryId
  }

  const getCategoryColor = (categoryId: BlogCategory) => {
    const colors = {
      'membership': 'bg-purple-100 text-purple-800',
      'bespoke-wigs': 'bg-amber-100 text-amber-800',
      'ready-made': 'bg-blue-100 text-blue-800',
      'education': 'bg-green-100 text-green-800',
      'care-tips': 'bg-pink-100 text-pink-800',
      'styling': 'bg-orange-100 text-orange-800'
    }
    return colors[categoryId] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      {!limit && (
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search posts..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as BlogCategory | "all")}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {blogCategories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value) => setSortBy(value as "date" | "readTime" | "title")}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Latest</SelectItem>
                <SelectItem value="readTime">Quick Read</SelectItem>
                <SelectItem value="title">A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Results Count */}
      {!limit && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {filteredAndSortedPosts.length} {filteredAndSortedPosts.length === 1 ? 'post' : 'posts'} found
          </p>
          {showFeatured && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              Featured Posts
            </Badge>
          )}
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAndSortedPosts.map((post) => (
          <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            {post.imageUrl && (
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge className={getCategoryColor(post.category)}>
                  {getCategoryName(post.category)}
                </Badge>
                {post.featured && (
                  <Star className="h-4 w-4 text-amber-500 fill-current" />
                )}
              </div>

              <CardTitle className="text-lg leading-tight group-hover:text-amber-700 transition-colors">
                {post.title}
              </CardTitle>

              <CardDescription className="line-clamp-2">
                {post.excerpt}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(post.publishDate)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readTime} min read
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <User className="h-3 w-3" />
                {post.author}
              </div>

              <div className="flex flex-wrap gap-1">
                {post.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <Link href={`/blog/${post.id}`}>
                <Button
                  variant="ghost"
                  className="w-full justify-between text-amber-700 hover:bg-amber-50 group/button"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Read More
                  </span>
                  <ArrowRight className="h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredAndSortedPosts.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Load More (if limited) */}
      {limit && blogPosts.length > limit && (
        <div className="text-center">
          <Button variant="outline" className="border-amber-600 text-amber-700">
            View All Posts
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  )
}
