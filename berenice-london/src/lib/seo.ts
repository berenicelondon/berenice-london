import { Metadata } from 'next'

// Base SEO configuration
export const baseSEO = {
  siteName: 'Berenice London',
  siteUrl: 'https://berenicelondon.co.uk',
  businessName: 'Berenice London',
  description: 'Expert craftsmanship in bespoke wigs, hairpieces, and professional hair education. Transforming lives through exceptional hair solutions with over 20 years of expertise.',
  keywords: [
    'bespoke wigs',
    'hair toppers',
    'wig making',
    'hair loss solutions',
    'professional wigs',
    'human hair wigs',
    'wig consultation',
    'hair education',
    'London wig specialist',
    'custom hairpieces',
    'alopecia wigs',
    'cancer wigs',
    'medical wigs',
    'theatrical wigs',
    'hair extensions'
  ],
  social: {
    twitter: '@BereniceLondon',
    facebook: 'BereniceLondon',
    instagram: '@berenice.london',
    linkedin: 'company/berenice-london'
  }
}

// Generate page metadata
export function generateMetadata({
  title,
  description,
  keywords = [],
  path = '',
  image,
  noIndex = false,
  type = 'website'
}: {
  title: string
  description?: string
  keywords?: string[]
  path?: string
  image?: string
  noIndex?: boolean
  type?: 'website' | 'article' | 'product'
}): Metadata {
  const fullTitle = title === baseSEO.siteName ? title : `${title} | ${baseSEO.siteName}`
  const fullDescription = description || baseSEO.description
  const fullUrl = `${baseSEO.siteUrl}${path}`
  const fullKeywords = [...baseSEO.keywords, ...keywords].join(', ')
  const defaultImage = `${baseSEO.siteUrl}/images/og-default.jpg`
  const fullImage = image || defaultImage

  // Map product type to article for OpenGraph compatibility
  const ogType = type === 'product' ? 'article' : type

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: fullKeywords,
    authors: [{ name: baseSEO.businessName }],
    creator: baseSEO.businessName,
    publisher: baseSEO.businessName,
    robots: noIndex ? 'noindex,nofollow' : 'index,follow',
    alternates: {
      canonical: fullUrl
    },
    openGraph: {
      type: ogType,
      title: fullTitle,
      description: fullDescription,
      url: fullUrl,
      siteName: baseSEO.siteName,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: fullTitle
        }
      ],
      locale: 'en_GB',
      countryName: 'United Kingdom'
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      site: baseSEO.social.twitter,
      creator: baseSEO.social.twitter,
      images: [fullImage]
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      other: {
        'facebook-domain-verification': 'your-facebook-verification-code'
      }
    }
  }
}

// Structured Data (JSON-LD) generators
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: baseSEO.businessName,
    description: baseSEO.description,
    url: baseSEO.siteUrl,
    logo: `${baseSEO.siteUrl}/images/logo.png`,
    image: `${baseSEO.siteUrl}/images/business-photo.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Professional Studio',
      addressLocality: 'London',
      addressCountry: 'GB'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+44-20-XXXX-XXXX',
      contactType: 'customer service',
      availableLanguage: 'English'
    },
    sameAs: [
      `https://facebook.com/${baseSEO.social.facebook}`,
      `https://twitter.com/${baseSEO.social.twitter.replace('@', '')}`,
      `https://instagram.com/${baseSEO.social.instagram.replace('@', '')}`,
      `https://linkedin.com/${baseSEO.social.linkedin}`
    ],
    foundingDate: '2004',
    founder: {
      '@type': 'Person',
      name: 'Berenice'
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom'
    },
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 51.5074,
        longitude: -0.1278
      },
      geoRadius: 50000
    }
  }
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${baseSEO.siteUrl}/#business`,
    name: baseSEO.businessName,
    description: baseSEO.description,
    url: baseSEO.siteUrl,
    telephone: '+44-20-XXXX-XXXX',
    priceRange: '£££',
    image: [
      `${baseSEO.siteUrl}/images/business-photo-1.jpg`,
      `${baseSEO.siteUrl}/images/business-photo-2.jpg`,
      `${baseSEO.siteUrl}/images/business-photo-3.jpg`
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Professional Studio',
      addressLocality: 'London',
      postalCode: 'SW1A 1AA',
      addressCountry: 'GB'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.5074,
      longitude: -0.1278
    },
    openingHours: [
      'Mo-Fr 09:00-18:00',
      'Sa 10:00-16:00'
    ],
    paymentAccepted: ['Cash', 'Credit Card', 'Debit Card'],
    currenciesAccepted: 'GBP',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.9,
      reviewCount: 127,
      bestRating: 5,
      worstRating: 1
    }
  }
}

export function generateProductSchema(product: {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  images: string[]
  brand: string
  category: string
  inStock: boolean
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${baseSEO.siteUrl}/shop/product/${product.id}`,
    name: product.name,
    description: product.description,
    image: product.images.map(img => img.startsWith('http') ? img : `${baseSEO.siteUrl}${img}`),
    brand: {
      '@type': 'Brand',
      name: product.brand
    },
    category: product.category,
    sku: product.id,
    gtin: `${product.id}-GTIN`,
    offers: {
      '@type': 'Offer',
      url: `${baseSEO.siteUrl}/shop/product/${product.id}`,
      priceCurrency: 'GBP',
      price: product.price,
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: baseSEO.businessName
      },
      validFrom: new Date().toISOString(),
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1
    }
  }
}

export function generateArticleSchema(article: {
  id: string
  title: string
  description: string
  content: string
  author: string
  publishDate: string
  category: string
  tags: string[]
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${baseSEO.siteUrl}/blog/${article.id}`,
    headline: article.title,
    description: article.description,
    articleBody: article.content,
    author: {
      '@type': 'Person',
      name: article.author
    },
    publisher: {
      '@type': 'Organization',
      name: baseSEO.businessName,
      logo: {
        '@type': 'ImageObject',
        url: `${baseSEO.siteUrl}/images/logo.png`
      }
    },
    datePublished: article.publishDate,
    dateModified: article.publishDate,
    image: article.image || `${baseSEO.siteUrl}/images/blog-default.jpg`,
    articleSection: article.category,
    keywords: article.tags.join(', '),
    url: `${baseSEO.siteUrl}/blog/${article.id}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseSEO.siteUrl}/blog/${article.id}`
    }
  }
}

export function generateServiceSchema(service: {
  name: string
  description: string
  price?: string
  duration?: string
  category: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: baseSEO.businessName,
      url: baseSEO.siteUrl
    },
    serviceType: service.category,
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.name} Services`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.name
          }
        }
      ]
    }
  }
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseSEO.siteUrl}/#website`,
    url: baseSEO.siteUrl,
    name: baseSEO.siteName,
    description: baseSEO.description,
    inLanguage: 'en-GB',
    publisher: {
      '@id': `${baseSEO.siteUrl}/#business`
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseSEO.siteUrl}/shop?search={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  }
}

export function generateBreadcrumbSchema(breadcrumbs: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

// Performance optimization helpers
export const imageOptimization = {
  // Preload critical images
  preloadImages: [
    '/images/hero-background.jpg',
    '/images/logo.png'
  ],

  // Image sizes for responsive images
  imageSizes: {
    thumbnail: 'w-20 h-20',
    small: 'w-64 h-64',
    medium: 'w-512 h-512',
    large: 'w-1024 h-1024',
    hero: 'w-1920 h-1080'
  },

  // Critical CSS for above-the-fold content
  criticalCSS: `
    .hero-section { background-image: url('/images/hero-background.jpg'); }
    .logo { width: 200px; height: auto; }
  `
}

// SEO utility functions
export function generateCanonicalUrl(path: string): string {
  return `${baseSEO.siteUrl}${path.startsWith('/') ? path : `/${path}`}`
}

export function generateRobotsMeta(noIndex = false, noFollow = false): string {
  const robots = []
  if (noIndex) robots.push('noindex')
  else robots.push('index')

  if (noFollow) robots.push('nofollow')
  else robots.push('follow')

  return robots.join(',')
}

export function generateHreflang(path: string): Array<{ hrefLang: string; href: string }> {
  return [
    { hrefLang: 'en-GB', href: `${baseSEO.siteUrl}${path}` },
    { hrefLang: 'x-default', href: `${baseSEO.siteUrl}${path}` }
  ]
}
