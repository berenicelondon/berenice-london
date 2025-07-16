"use client"

import Head from 'next/head'
import { StructuredData } from './StructuredData'
import {
  generateMetadata,
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateWebsiteSchema,
  baseSEO
} from '@/lib/seo'

interface SEOHeadProps {
  title: string
  description?: string
  keywords?: string[]
  path?: string
  image?: string
  noIndex?: boolean
  type?: 'website' | 'article' | 'product'
  structuredData?: Record<string, unknown> | Record<string, unknown>[]
  preloadImages?: string[]
  canonical?: string
}

export function SEOHead({
  title,
  description,
  keywords = [],
  path = '',
  image,
  noIndex = false,
  type = 'website',
  structuredData,
  preloadImages = [],
  canonical
}: SEOHeadProps) {
  const metadata = generateMetadata({
    title,
    description,
    keywords,
    path,
    image,
    noIndex,
    type
  })

  const fullCanonical = canonical || `${baseSEO.siteUrl}${path}`
  const fullImage = image || `${baseSEO.siteUrl}/images/og-default.jpg`

  // Safely handle potentially null values
  const metaDescription = metadata.description || baseSEO.description
  const metaTitle = metadata.title as string
  const metaKeywords = metadata.keywords as string

  // Generate base structured data
  const baseStructuredData = [
    generateOrganizationSchema(),
    generateLocalBusinessSchema(),
    generateWebsiteSchema()
  ]

  // Add custom structured data if provided
  const allStructuredData = structuredData
    ? [...baseStructuredData, ...(Array.isArray(structuredData) ? structuredData : [structuredData])]
    : baseStructuredData

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        <meta name="author" content={baseSEO.businessName} />
        <meta name="robots" content={metadata.robots as string} />

        {/* Canonical URL */}
        <link rel="canonical" href={fullCanonical} />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content={type === 'product' ? 'article' : type} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={fullCanonical} />
        <meta property="og:site_name" content={baseSEO.siteName} />
        <meta property="og:image" content={fullImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={metaTitle} />
        <meta property="og:locale" content="en_GB" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={baseSEO.social.twitter} />
        <meta name="twitter:creator" content={baseSEO.social.twitter} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={fullImage} />

        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#b45309" />
        <meta name="msapplication-TileColor" content="#b45309" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />

        {/* Favicon and Icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Preload Critical Resources */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* Preload Critical Images */}
        {preloadImages.map((imageSrc, index) => (
          <link
            key={index}
            rel="preload"
            href={imageSrc}
            as="image"
            type="image/jpeg"
          />
        ))}

        {/* DNS Prefetch for External Domains */}
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//js.stripe.com" />

        {/* Preconnect to Critical External Resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Critical CSS for Above-the-Fold Content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for immediate render */
            body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
            .hero-loading { min-height: 80vh; background: linear-gradient(135deg, #fef3c7, #fed7aa); }
            .nav-loading { height: 4rem; background: rgba(255, 255, 255, 0.9); }
          `
        }} />

        {/* Verification Meta Tags */}
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta name="facebook-domain-verification" content="your-facebook-verification-code" />

        {/* Language and Geographic Meta Tags */}
        <meta name="language" content="English" />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="London" />
        <meta name="geo.position" content="51.5074;-0.1278" />
        <meta name="ICBM" content="51.5074, -0.1278" />

        {/* Business-specific Meta Tags */}
        <meta name="rating" content="5" />
        <meta name="distribution" content="global" />
        <meta name="revisit-after" content="7 days" />
        <meta name="expires" content="never" />

        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />

        {/* Performance Hints */}
        <link rel="dns-prefetch" href="//berenicelondon.co.uk" />
        <link rel="preconnect" href="https://berenicelondon.co.uk" />

        {/* Alternate Languages (if applicable) */}
        <link rel="alternate" hrefLang="en-gb" href={fullCanonical} />
        <link rel="alternate" hrefLang="x-default" href={fullCanonical} />
      </Head>

      {/* Structured Data */}
      <StructuredData
        data={allStructuredData}
        id="global-structured-data"
      />
    </>
  )
}

// Simplified version for basic pages
export function BasicSEO({
  title,
  description,
  path = '',
  noIndex = false
}: {
  title: string
  description?: string
  path?: string
  noIndex?: boolean
}) {
  return (
    <SEOHead
      title={title}
      description={description}
      path={path}
      noIndex={noIndex}
      preloadImages={['/images/hero-background.jpg']}
    />
  )
}

// Product page SEO
export function ProductSEO({
  product,
  path
}: {
  product: {
    id: string
    name: string
    description: string
    price: number
    rating: number
    reviewCount: number
    images: string[]
    brand: string
    category: string
    inStock: boolean
  }
  path: string
}) {
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images[0],
    brand: { '@type': 'Brand', name: product.brand },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'GBP',
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount
    }
  }

  return (
    <SEOHead
      title={product.name}
      description={product.description}
      path={path}
      image={product.images[0]}
      type="product"
      keywords={[product.category, product.brand, 'wig', 'hairpiece']}
      structuredData={productSchema}
    />
  )
}

// Blog post SEO
export function BlogSEO({
  post,
  path
}: {
  post: {
    id: string
    title: string
    excerpt: string
    content: string
    author: string
    publishDate: string
    category: string
    tags: string[]
    featuredImage?: string
  }
  path: string
}) {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Person', name: post.author },
    datePublished: post.publishDate,
    image: post.featuredImage,
    publisher: {
      '@type': 'Organization',
      name: baseSEO.businessName,
      logo: `${baseSEO.siteUrl}/images/logo.png`
    }
  }

  return (
    <SEOHead
      title={post.title}
      description={post.excerpt}
      path={path}
      image={post.featuredImage}
      type="article"
      keywords={[...post.tags, post.category]}
      structuredData={articleSchema}
    />
  )
}
