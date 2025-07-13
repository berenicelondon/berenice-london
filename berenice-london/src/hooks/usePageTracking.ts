"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useAnalytics } from '@/contexts/AnalyticsContext'

export function usePageTracking() {
  const pathname = usePathname()
  const { trackPageView } = useAnalytics()

  useEffect(() => {
    // Track page view when pathname changes (only in browser)
    if (pathname && typeof window !== 'undefined') {
      const title = document.title
      trackPageView(pathname, title)
    }
  }, [pathname, trackPageView])

  return pathname
}
