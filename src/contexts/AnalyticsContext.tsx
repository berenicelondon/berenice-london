'use client'

import React, { createContext, useContext, useEffect, ReactNode, useState } from 'react'

interface AnalyticsSession {
  id: string
  startTime: Date
  endTime?: Date
  pageViews: number
  events: any[]
  userId?: string
}

interface AnalyticsEvent {
  id: string
  type: string
  category: string
  action: string
  label?: string
  value?: number
  metadata?: Record<string, any>
  timestamp: Date
  sessionId: string
  userId?: string
}

interface AnalyticsMetrics {
  totalPageViews: number
  uniqueVisitors: number
  averageSessionDuration: number
  bounceRate: number
  conversionRate: number
  totalConversions: number
  topPages: Array<{ page: string; views: number; count: number }>
  userFlow: any[]
  deviceTypes: any[]
  trafficSources: any[]
}

interface AnalyticsContextType {
  currentSession: AnalyticsSession | null
  trackPageView: (page: string, title?: string) => void
  trackEvent: (category: string, action: string, label?: string, value?: number, metadata?: Record<string, any>) => void
  trackConversion: (type: 'booking' | 'membership' | 'purchase', value?: number) => void
  getEvents: () => AnalyticsEvent[]
  getSessions: () => AnalyticsSession[]
  getMetrics: () => AnalyticsMetrics
  getRealtimeData: () => { visitors: number; pageViews: number }
  clearData: () => void
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

interface AnalyticsProviderProps {
  children: ReactNode
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const [currentSession, setCurrentSession] = useState<AnalyticsSession | null>(null)
  const [events, setEvents] = useState<AnalyticsEvent[]>([])
  const [sessions, setSessions] = useState<AnalyticsSession[]>([])

  useEffect(() => {
    // Initialize analytics providers and create initial session
    if (typeof window !== 'undefined') {
      console.log('Analytics providers initialized in demo mode')

      // Create initial session
      const session: AnalyticsSession = {
        id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        startTime: new Date(),
        pageViews: 0,
        events: [],
      }

      setCurrentSession(session)
    }
  }, [])

  const trackPageView = (page: string, title?: string) => {
    // Demo mode - log page views
    if (process.env.NODE_ENV === 'development') {
      console.log('Page View:', page, title)
    }

    // Update session
    if (currentSession) {
      setCurrentSession(prev => prev ? { ...prev, pageViews: prev.pageViews + 1 } : null)
    }

    // Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: page,
        page_title: title,
      })
    }

    // Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView')
    }
  }

  const trackEvent = (category: string, action: string, label?: string, value?: number, metadata?: Record<string, any>) => {
    // Demo mode - log events to console
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', { category, action, label, value, metadata })
    }

    // Create event record
    const event: AnalyticsEvent = {
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'event',
      category,
      action,
      label,
      value,
      metadata,
      timestamp: new Date(),
      sessionId: currentSession?.id || 'unknown',
    }

    setEvents(prev => [...prev, event])

    // Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
        ...metadata,
      })
    }

    // Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', action, { category, label, value, ...metadata })
    }
  }

  const trackConversion = (type: 'booking' | 'membership' | 'purchase', value?: number) => {
    trackEvent('conversion', `conversion_${type}`, type, value, { conversionType: type })
  }

  const getEvents = () => events

  const getSessions = () => sessions

  const getMetrics = (): AnalyticsMetrics => {
    const totalPageViews = events.filter(e => e.type === 'page_view').length
    const uniqueVisitors = new Set(events.map(e => e.userId).filter(Boolean)).size || 1
    const conversions = events.filter(e => e.category === 'conversion')

    return {
      totalPageViews,
      uniqueVisitors,
      averageSessionDuration: 120, // Demo value
      bounceRate: 0.3, // Demo value
      conversionRate: conversions.length / Math.max(totalPageViews, 1),
      totalConversions: conversions.length,
      topPages: [
        { page: '/', views: 50, count: 50 },
        { page: '/shop', views: 30, count: 30 },
        { page: '/booking', views: 20, count: 20 },
      ],
      userFlow: [],
      deviceTypes: [],
      trafficSources: [],
    }
  }

  const getRealtimeData = () => ({ visitors: 1, pageViews: events.length })

  const clearData = () => {
    setEvents([])
    setSessions([])
  }

  const value = {
    currentSession,
    trackPageView,
    trackEvent,
    trackConversion,
    getEvents,
    getSessions,
    getMetrics,
    getRealtimeData,
    clearData,
  }

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalytics(): AnalyticsContextType {
  const context = useContext(AnalyticsContext)
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider')
  }
  return context
}

// Type declarations for analytics globals
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    fbq: (...args: any[]) => void
    dataLayer: any[]
  }
}
