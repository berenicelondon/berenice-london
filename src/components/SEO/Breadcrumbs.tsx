"use client"

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { StructuredData } from './StructuredData'
import { generateBreadcrumbSchema, baseSEO } from '@/lib/seo'

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbsProps {
  customItems?: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ customItems, className = '' }: BreadcrumbsProps) {
  const pathname = usePathname()

  // Generate breadcrumb items from pathname if no custom items provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (customItems) return customItems

    const paths = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Home', url: '/' }
    ]

    let currentPath = ''
    paths.forEach((path, index) => {
      currentPath += `/${path}`

      // Convert path to readable name
      let name = path
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      // Special cases for better naming
      if (path === 'shop') name = 'Shop'
      if (path === 'blog') name = 'Blog'
      if (path === 'gallery') name = 'Gallery'
      if (path === 'booking') name = 'Book Consultation'
      if (path === 'member-dashboard') name = 'Member Dashboard'
      if (path === 'virtual-tryon') name = 'Virtual Try-On Studio'
      if (path === 'admin') name = 'Admin Panel'
      if (path === 'checkout') name = 'Checkout'
      if (path === 'product') name = 'Product'
      if (path === 'category') name = 'Category'

      breadcrumbs.push({
        name,
        url: currentPath
      })
    })

    return breadcrumbs
  }

  const breadcrumbItems = generateBreadcrumbs()

  // Generate structured data
  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbItems.map(item => ({
      name: item.name,
      url: item.url.startsWith('http') ? item.url : `${baseSEO.siteUrl}${item.url}`
    }))
  )

  if (breadcrumbItems.length <= 1) {
    return null // Don't show breadcrumbs on home page
  }

  return (
    <>
      {/* Structured Data */}
      <StructuredData data={breadcrumbSchema} id="breadcrumb-schema" />

      {/* Visual Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center space-x-2 text-sm text-stone-600 mb-6 ${className}`}
      >
        {breadcrumbItems.map((item, index) => (
          <div key={item.url} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 mx-2 text-stone-400" />
            )}

            {index === breadcrumbItems.length - 1 ? (
              // Current page - no link
              <span className="text-stone-800 font-medium flex items-center">
                {index === 0 && <Home className="h-4 w-4 mr-1" />}
                {item.name}
              </span>
            ) : (
              // Link to previous pages
              <Link
                href={item.url}
                className="text-stone-600 hover:text-amber-700 transition-colors flex items-center"
              >
                {index === 0 && <Home className="h-4 w-4 mr-1" />}
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  )
}

// Specific breadcrumb configurations for different sections
export function ShopBreadcrumbs({
  category,
  productName
}: {
  category?: string
  productName?: string
}) {
  const items: BreadcrumbItem[] = [
    { name: 'Home', url: '/' },
    { name: 'Shop', url: '/shop' }
  ]

  if (category) {
    items.push({
      name: category.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' '),
      url: `/shop/category/${category}`
    })
  }

  if (productName) {
    items.push({
      name: productName,
      url: '#' // Current page
    })
  }

  return <Breadcrumbs customItems={items} />
}

export function BlogBreadcrumbs({
  category,
  postTitle
}: {
  category?: string
  postTitle?: string
}) {
  const items: BreadcrumbItem[] = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' }
  ]

  if (category) {
    items.push({
      name: category,
      url: `/blog/category/${category.toLowerCase()}`
    })
  }

  if (postTitle) {
    items.push({
      name: postTitle,
      url: '#' // Current page
    })
  }

  return <Breadcrumbs customItems={items} />
}

export function GalleryBreadcrumbs({
  category
}: {
  category?: string
}) {
  const items: BreadcrumbItem[] = [
    { name: 'Home', url: '/' },
    { name: 'Gallery', url: '/gallery' }
  ]

  if (category) {
    items.push({
      name: category.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' '),
      url: `/gallery/${category}`
    })
  }

  return <Breadcrumbs customItems={items} />
}

export function MemberBreadcrumbs({
  section
}: {
  section?: string
}) {
  const items: BreadcrumbItem[] = [
    { name: 'Home', url: '/' },
    { name: 'Member Dashboard', url: '/member-dashboard' }
  ]

  if (section) {
    items.push({
      name: section,
      url: '#' // Current page
    })
  }

  return <Breadcrumbs customItems={items} />
}
