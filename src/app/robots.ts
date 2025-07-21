import { MetadataRoute } from 'next'
import { baseSEO } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/member-dashboard/',
          '/virtual-tryon/',
          '/api/',
          '/_next/',
          '/checkout/',
          '/login/',
          '/register/',
          '/cart/',
          '*.json',
          '/private/',
          '/test/'
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/member-dashboard/',
          '/virtual-tryon/',
          '/api/',
          '/checkout/',
          '/login/',
          '/register/',
          '/cart/',
          '/private/'
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/admin/',
          '/member-dashboard/',
          '/virtual-tryon/',
          '/api/',
          '/checkout/',
          '/login/',
          '/register/',
          '/cart/',
          '/private/'
        ],
      }
    ],
    sitemap: `${baseSEO.siteUrl}/sitemap.xml`,
    host: baseSEO.siteUrl,
  }
}
