"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'

// Analytics Event Types
export interface AnalyticsEvent {
  id: string
  timestamp: Date
  type: 'page_view' | 'user_action' | 'conversion' | 'error'
  category: string
  action: string
  label?: string
  value?: number
  userId?: string
  sessionId: string
  metadata?: Record<string, string | number | boolean | undefined>
}

// User Behavior Tracking
export interface UserSession {
  id: string
  startTime: Date
  endTime?: Date
  pageViews: number
  events: AnalyticsEvent[]
  isConverted: boolean
  conversionType?: 'booking' | 'membership' | 'purchase'
  conversionValue?: number
}

// Analytics Metrics
export interface AnalyticsMetrics {
  totalPageViews: number
  uniqueVisitors: number
  averageSessionDuration: number
  bounceRate: number
  conversionRate: number
  totalConversions: number
  topPages: { page: string; views: number }[]
  userFlow: { from: string; to: string; count: number }[]
  deviceTypes: { type: string; count: number }[]
  trafficSources: { source: string; count: number }[]
}

interface AnalyticsContextType {
  // Current session
  currentSession: UserSession | null

  // Tracking methods
  trackPageView: (page: string, title?: string) => void
  trackEvent: (category: string, action: string, label?: string, value?: number, metadata?: Record<string, string | number | boolean | undefined>) => void
  trackConversion: (type: 'booking' | 'membership' | 'purchase', value?: number) => void

  // Data retrieval
  getEvents: () => AnalyticsEvent[]
  getSessions: () => UserSession[]
  getMetrics: () => AnalyticsMetrics
  getRealtimeData: () => { visitors: number; pageViews: number }

  // Admin functions
  clearData: () => void
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [currentSession, setCurrentSession] = useState<UserSession | null>(null)
  const [events, setEvents] = useState<AnalyticsEvent[]>([])
  const [sessions, setSessions] = useState<UserSession[]>([])
  const [realtimeVisitors, setRealtimeVisitors] = useState(0)
  const [realtimePageViews, setRealtimePageViews] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  // Generate session ID
  const generateSessionId = useCallback(() => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }, [])

  // Safe error logging that won't cause client-side exceptions
  const safeLog = useCallback((message: string, error?: unknown) => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      console.warn(`Analytics: ${message}`, error)
    }
  }, [])

  // Initialize session on mount
  useEffect(() => {
    setIsMounted(true)

    if (typeof window === 'undefined') return

    const sessionId = generateSessionId()
    const session: UserSession = {
      id: sessionId,
      startTime: new Date(),
      pageViews: 0,
      events: [],
      isConverted: false
    }

    setCurrentSession(session)

    // Load existing data from localStorage (only in browser)
    try {
      const savedEvents = localStorage.getItem('berenice-analytics-events')
      const savedSessions = localStorage.getItem('berenice-analytics-sessions')

      if (savedEvents) {
        const parsedEvents = JSON.parse(savedEvents).map((event: Record<string, unknown>) => ({
          ...event,
          timestamp: new Date(event.timestamp as string)
        }))
        setEvents(parsedEvents)
      }

      if (savedSessions) {
        const parsedSessions = JSON.parse(savedSessions).map((session: Record<string, unknown>) => ({
          ...session,
          startTime: new Date(session.startTime as string),
          endTime: session.endTime ? new Date(session.endTime as string) : undefined
        }))
        setSessions(parsedSessions)
      }
    } catch (error) {
      safeLog('Failed to load analytics data', error)
    }

    // Cleanup function to end session
    return () => {
      if (currentSession) {
        const updatedSession = {
          ...currentSession,
          endTime: new Date()
        }

        try {
          const existingSessions = JSON.parse(localStorage.getItem('berenice-analytics-sessions') || '[]')
          const updatedSessions = [...existingSessions, updatedSession]
          localStorage.setItem('berenice-analytics-sessions', JSON.stringify(updatedSessions))
        } catch (error) {
          safeLog('Failed to save session data', error)
        }
      }
    }
  }, [generateSessionId, safeLog])

  // Update realtime metrics
  const updateRealtimeMetrics = useCallback(() => {
    const now = new Date()
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000)

    // Count recent page views and unique visitors
    const recentEvents = events.filter(event =>
      event.type === 'page_view' && event.timestamp > fiveMinutesAgo
    )

    const uniqueSessionIds = new Set(recentEvents.map(event => event.sessionId))

    setRealtimePageViews(recentEvents.length)
    setRealtimeVisitors(uniqueSessionIds.size)
  }, [events])

  // Save data to localStorage (only in browser)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('berenice-analytics-events', JSON.stringify(events))
    }
  }, [events])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('berenice-analytics-sessions', JSON.stringify(sessions))
    }
  }, [sessions])

  // Track page view
  const trackPageView = useCallback((page: string, title?: string) => {
    if (!currentSession) return

    const event: AnalyticsEvent = {
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      type: 'page_view',
      category: 'navigation',
      action: 'page_view',
      label: page,
      sessionId: currentSession.id,
      metadata: {
        page,
        title,
        userAgent: navigator.userAgent,
        referrer: document.referrer
      }
    }

    setEvents(prev => [...prev, event])
    setCurrentSession(prev => prev ? {
      ...prev,
      pageViews: prev.pageViews + 1,
      events: [...prev.events, event]
    } : prev)
  }, [currentSession])

  // Track custom event
  const trackEvent = useCallback((category: string, action: string, label?: string, value?: number, metadata?: Record<string, string | number | boolean | undefined>) => {
    if (!currentSession) return

    const event: AnalyticsEvent = {
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      type: 'user_action',
      category,
      action,
      label,
      value,
      sessionId: currentSession.id,
      metadata
    }

    setEvents(prev => [...prev, event])
    setCurrentSession(prev => prev ? {
      ...prev,
      events: [...prev.events, event]
    } : prev)
  }, [currentSession])

  // Track conversion
  const trackConversion = useCallback((type: 'booking' | 'membership' | 'purchase', value?: number) => {
    if (!currentSession) return

    const event: AnalyticsEvent = {
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      type: 'conversion',
      category: 'conversion',
      action: type,
      value,
      sessionId: currentSession.id,
      metadata: { conversionType: type }
    }

    setEvents(prev => [...prev, event])
    setCurrentSession(prev => prev ? {
      ...prev,
      isConverted: true,
      conversionType: type,
      conversionValue: value,
      events: [...prev.events, event]
    } : prev)
  }, [currentSession])



  // Get analytics metrics
  const getMetrics = useCallback((dateRange?: { start: Date; end: Date }): AnalyticsMetrics => {
    let filteredEvents = events
    let filteredSessions = sessions

    if (dateRange) {
      filteredEvents = events.filter(event =>
        event.timestamp >= dateRange.start && event.timestamp <= dateRange.end
      )
      filteredSessions = sessions.filter(session =>
        session.startTime >= dateRange.start && session.startTime <= dateRange.end
      )
    }

    const pageViews = filteredEvents.filter(e => e.type === 'page_view')
    const conversions = filteredEvents.filter(e => e.type === 'conversion')
    const uniqueVisitors = new Set(filteredSessions.map(s => s.id)).size

    // Calculate bounce rate (sessions with only 1 page view)
    const bounces = filteredSessions.filter(s => s.pageViews <= 1).length
    const bounceRate = filteredSessions.length > 0 ? (bounces / filteredSessions.length) * 100 : 0

    // Calculate average session duration
    const sessionsWithDuration = filteredSessions.filter(s => s.endTime)
    const totalDuration = sessionsWithDuration.reduce((sum, session) => {
      return sum + (session.endTime!.getTime() - session.startTime.getTime())
    }, 0)
    const averageSessionDuration = sessionsWithDuration.length > 0
      ? totalDuration / sessionsWithDuration.length / 1000 / 60 // Convert to minutes
      : 0

    // Top pages
    const pageViewCounts = pageViews.reduce((acc, event) => {
      const page = event.label || 'unknown'
      acc[page] = (acc[page] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const topPages = Object.entries(pageViewCounts)
      .map(([page, views]) => ({ page, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10)

    return {
      totalPageViews: pageViews.length,
      uniqueVisitors,
      averageSessionDuration,
      bounceRate,
      conversionRate: pageViews.length > 0 ? (conversions.length / pageViews.length) * 100 : 0,
      totalConversions: conversions.length,
      topPages,
      userFlow: [], // Can be implemented based on needs
      deviceTypes: [], // Can be implemented based on user agent
      trafficSources: [] // Can be implemented based on referrer
    }
  }, [events, sessions])

  // Get filtered events
  const getEvents = useCallback((filters?: Partial<AnalyticsEvent>) => {
    if (!filters) return events

    return events.filter(event => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === undefined) return true
        return event[key as keyof AnalyticsEvent] === value
      })
    })
  }, [events])

  // Get filtered sessions
  const getSessions = useCallback((dateRange?: { start: Date; end: Date }) => {
    if (!dateRange) return sessions

    return sessions.filter(session =>
      session.startTime >= dateRange.start && session.startTime <= dateRange.end
    )
  }, [sessions])

  const value: AnalyticsContextType = {
    currentSession,
    trackPageView,
    trackEvent,
    trackConversion,

    getMetrics,
    getEvents,
    getSessions,
    getRealtimeData: () => ({ visitors: realtimeVisitors, pageViews: realtimePageViews }),
    clearData: () => {}
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
    // During SSR/build, return a safe fallback
    if (typeof window === 'undefined') {
      return {
        currentSession: null,
        trackPageView: () => {},
        trackEvent: () => {},
        trackConversion: () => {},
        getEvents: () => [],
        getSessions: () => [],
        getMetrics: () => ({
          totalPageViews: 0,
          uniqueVisitors: 0,
          averageSessionDuration: 0,
          bounceRate: 0,
          conversionRate: 0,
          totalConversions: 0,
          topPages: [],
          userFlow: [],
          deviceTypes: [],
          trafficSources: []
        }),
        getRealtimeData: () => ({ visitors: 0, pageViews: 0 }),
        clearData: () => {}
      }
    }
    throw new Error('useAnalytics must be used within an AnalyticsProvider')
  }
  return context
}
