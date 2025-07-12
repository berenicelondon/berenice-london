"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { blogPosts, blogCategories, type BlogPost } from "@/data/blogData"
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Heart,
  MessageCircle,
  BookOpen,
  Crown,
  ChevronRight
} from "lucide-react"
import Link from "next/link"

// Mock comments data
interface Comment {
  id: string
  author: string
  email: string
  content: string
  date: string
  isAuthor?: boolean
  replies?: Comment[]
}

const mockComments: Comment[] = [
  {
    id: '1',
    author: 'Emma Thompson',
    email: 'emma@example.com',
    content: 'This was incredibly helpful! I had no idea about the proper measurement techniques. Thank you for sharing this detailed guide.',
    date: '2024-01-16',
    replies: [
      {
        id: '1-1',
        author: 'Sarah Mitchell',
        email: 'sarah@berenice.com',
        content: 'Thank you Emma! We\'re so glad you found it helpful. If you need any personalized guidance, feel free to book a consultation.',
        date: '2024-01-16',
        isAuthor: true
      }
    ]
  },
  {
    id: '2',
    author: 'Rachel Green',
    email: 'rachel@example.com',
    content: 'The step-by-step process is exactly what I needed. I\'ve been struggling with getting the right fit for months.',
    date: '2024-01-17'
  }
]

export default function BlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [comments, setComments] = useState(mockComments)
  const [newComment, setNewComment] = useState({
    author: '',
    email: '',
    content: ''
  })
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(42)

  useEffect(() => {
    if (params?.id) {
      const foundPost = blogPosts.find(p => p.id === params.id)
      setPost(foundPost || null)

      if (foundPost) {
        // Get related posts from same category
        const related = blogPosts
          .filter(p => p.id !== foundPost.id && p.category === foundPost.category)
          .slice(0, 3)
        setRelatedPosts(related)
      }
    }
  }, [params?.id])

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Post Not Found</h1>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button className="bg-amber-700 hover:bg-amber-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getCategoryName = (categoryId: string) => {
    return blogCategories.find(cat => cat.id === categoryId)?.name || categoryId
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = post.title

    let shareUrl = ''

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        return
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newComment.author || !newComment.email || !newComment.content) {
      return
    }

    const comment = {
      id: Date.now().toString(),
      author: newComment.author,
      email: newComment.email,
      content: newComment.content,
      date: new Date().toISOString().split('T')[0]
    }

    setComments(prev => [...prev, comment])
    setNewComment({ author: '', email: '', content: '' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Crown className="h-8 w-8 text-amber-700" />
              <h1 className="text-2xl font-bold text-stone-800">Berenice London</h1>
            </Link>
            <Link href="/blog">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <div className="mb-8">
          <Badge className="mb-4">
            {getCategoryName(post.category)}
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-stone-600 mb-8">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(post.publishDate)}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime} min read
              </div>
            </div>

            {/* Social Sharing */}
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={isLiked ? "default" : "outline"}
                onClick={handleLike}
                className={isLiked ? "bg-red-500 hover:bg-red-600" : ""}
              >
                <Heart className={`h-4 w-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
                {likeCount}
              </Button>

              <Button size="sm" variant="outline" onClick={() => handleShare('facebook')}>
                <Facebook className="h-4 w-4" />
              </Button>

              <Button size="sm" variant="outline" onClick={() => handleShare('twitter')}>
                <Twitter className="h-4 w-4" />
              </Button>

              <Button size="sm" variant="outline" onClick={() => handleShare('linkedin')}>
                <Linkedin className="h-4 w-4" />
              </Button>

              <Button size="sm" variant="outline" onClick={() => handleShare('copy')}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {post.imageUrl && (
          <div className="mb-8">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            {post.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={index} className="text-2xl font-bold text-stone-800 mt-8 mb-4">{paragraph.slice(3)}</h2>
              } else if (paragraph.startsWith('### ')) {
                return <h3 key={index} className="text-xl font-semibold text-stone-800 mt-6 mb-3">{paragraph.slice(4)}</h3>
              } else if (paragraph.trim() === '') {
                return <br key={index} />
              } else {
                return <p key={index} className="text-stone-700 leading-relaxed mb-4">{paragraph}</p>
              }
            })}
          </div>
        </div>

        {/* Tags */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <Badge key={tag} variant="outline">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        {/* Comments Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-stone-800 mb-6 flex items-center gap-2">
            <MessageCircle className="h-6 w-6" />
            Comments ({comments.length})
          </h3>

          {/* Comment Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Leave a Comment</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={newComment.author}
                      onChange={(e) => setNewComment(prev => ({ ...prev, author: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newComment.email}
                      onChange={(e) => setNewComment(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="comment">Comment</Label>
                  <Textarea
                    id="comment"
                    rows={4}
                    value={newComment.content}
                    onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
                    required
                  />
                </div>
                <Button type="submit" className="bg-amber-700 hover:bg-amber-800">
                  Post Comment
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarFallback>
                        {comment.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">{comment.author}</span>
                        {comment.isAuthor && (
                          <Badge variant="secondary" className="text-xs">Author</Badge>
                        )}
                        <span className="text-sm text-gray-500">
                          {formatDate(comment.date)}
                        </span>
                      </div>
                      <p className="text-stone-700">{comment.content}</p>

                      {/* Replies */}
                      {comment.replies && (
                        <div className="ml-8 mt-4 space-y-4">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex items-start gap-4">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-xs">
                                  {reply.author.split(' ').map((n) => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-medium text-sm">{reply.author}</span>
                                  {reply.isAuthor && (
                                    <Badge variant="secondary" className="text-xs">Author</Badge>
                                  )}
                                  <span className="text-xs text-gray-500">
                                    {formatDate(reply.date)}
                                  </span>
                                </div>
                                <p className="text-stone-700 text-sm">{reply.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <>
            <Separator className="my-8" />
            <div>
              <h3 className="text-2xl font-bold text-stone-800 mb-6">Related Posts</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="hover:shadow-lg transition-shadow">
                    {relatedPost.imageUrl && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={relatedPost.imageUrl}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-2">
                        {relatedPost.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {relatedPost.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href={`/blog/${relatedPost.id}`}>
                        <Button variant="ghost" className="w-full justify-between">
                          Read More
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {/* CTA */}
        <div className="mt-12">
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="text-center py-8">
              <h3 className="text-xl font-bold text-stone-800 mb-4">
                Need Personal Guidance?
              </h3>
              <p className="text-stone-600 mb-6">
                Our expert team is here to help you achieve your perfect hair solution.
              </p>
              <Link href="/booking">
                <Button className="bg-amber-700 hover:bg-amber-800">
                  Book Your Consultation
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
