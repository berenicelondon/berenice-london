"use client"

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useAnalytics } from '@/contexts/AnalyticsContext'
import {
  Users,
  Eye,
  TrendingUp,
  Clock,
  Target,
  Activity,
  Download,
  Calendar,
  ArrowUp,
  ArrowDown,
  Minus,
  Globe,
  Smartphone,
  Monitor,
  MousePointer,
  ShoppingCart,
  CreditCard
} from 'lucide-react'

type DateRange = '7d' | '30d' | '90d' | 'all'

export function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState<DateRange>('30d')
  const { getMetrics, getEvents, getSessions, getRealtimeData } = useAnalytics()

  // Calculate date range
  const getDateRangeFilter = (range: DateRange) => {
    if (range === 'all') return undefined

    const now = new Date()
    const days = range === '7d' ? 7 : range === '30d' ? 30 : 90
    const start = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)

    return { start, end: now }
  }

  const metrics = useMemo(() => {
    return getMetrics()
  }, [getMetrics])

  const events = useMemo(() => {
    const filter = getDateRangeFilter(dateRange)
    return getEvents().filter(event => {
      if (!filter) return true
      return event.timestamp >= filter.start && event.timestamp <= filter.end
    })
  }, [dateRange, getEvents])

  const sessions = useMemo(() => {
    return getSessions()
  }, [getSessions])

  // Calculate conversion breakdown
  const conversionBreakdown = useMemo(() => {
    const conversions = events.filter(e => e.type === 'conversion')
    const breakdown = conversions.reduce((acc, event) => {
      const type = event.action
      acc[type] = (acc[type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.entries(breakdown).map(([type, count]) => ({ type, count }))
  }, [events])

  // Calculate hourly activity
  const hourlyActivity = useMemo(() => {
    const hours = Array.from({ length: 24 }, (_, i) => ({ hour: i, pageViews: 0, conversions: 0 }))

    events.forEach(event => {
      const hour = event.timestamp.getHours()
      if (event.type === 'page_view') {
        hours[hour].pageViews++
      } else if (event.type === 'conversion') {
        hours[hour].conversions++
      }
    })

    return hours
  }, [events])

  // Format numbers
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}m ${remainingSeconds}s`
  }

  const getChangeIndicator = (current: number, previous: number) => {
    if (previous === 0) return { icon: Minus, color: 'text-gray-500', text: 'No data' }

    const change = ((current - previous) / previous) * 100
    if (change > 0) return { icon: ArrowUp, color: 'text-green-600', text: `+${change.toFixed(1)}%` }
    if (change < 0) return { icon: ArrowDown, color: 'text-red-600', text: `${change.toFixed(1)}%` }
    return { icon: Minus, color: 'text-gray-500', text: '0%' }
  }

  const exportData = () => {
    const data = {
      metrics,
      events: events.slice(0, 1000), // Limit for performance
      sessions: sessions.slice(0, 1000),
      exportDate: new Date().toISOString()
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `berenice-analytics-${dateRange}-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600">Monitor your website performance and user behavior</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={dateRange} onValueChange={(value: DateRange) => setDateRange(value)}>
            <SelectTrigger className="w-40">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={exportData} className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Real-time Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-500" />
            Real-time Activity
          </CardTitle>
          <CardDescription>Live visitor data (last 5 minutes)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{getRealtimeData().visitors}</div>
              <div className="text-sm text-gray-600">Active Visitors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{getRealtimeData().pageViews}</div>
              <div className="text-sm text-gray-600">Page Views</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(metrics.totalPageViews)}</div>
            <p className="text-xs text-muted-foreground">
              +{formatNumber(events.filter(e => e.type === 'page_view').length)} this period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(metrics.uniqueVisitors)}</div>
            <p className="text-xs text-muted-foreground">
              {sessions.length} sessions this period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDuration(metrics.averageSessionDuration * 60)}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.bounceRate.toFixed(1)}% bounce rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.conversionRate.toFixed(2)}%</div>
            <p className="text-xs text-muted-foreground">
              {metrics.totalConversions} conversions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>Most visited pages in selected period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.topPages.map((page, index) => (
                <div key={page.page} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs">
                      {index + 1}
                    </Badge>
                    <span className="font-medium truncate max-w-48">{page.page}</span>
                  </div>
                  <div className="text-sm text-gray-600">{formatNumber(page.views)} views</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Conversions */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Breakdown</CardTitle>
            <CardDescription>Types of conversions achieved</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversionBreakdown.map((item) => (
                <div key={item.type} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {item.type === 'booking' && <Calendar className="h-4 w-4 text-blue-500" />}
                    {item.type === 'membership' && <Users className="h-4 w-4 text-purple-500" />}
                    {item.type === 'purchase' && <ShoppingCart className="h-4 w-4 text-green-500" />}
                    <span className="font-medium capitalize">{item.type}</span>
                  </div>
                  <Badge variant="secondary">{item.count}</Badge>
                </div>
              ))}
              {conversionBreakdown.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  No conversions in selected period
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hourly Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Hourly Activity</CardTitle>
          <CardDescription>Page views and conversions by hour of day</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-500 mb-4">
              <span>12 AM</span>
              <span>6 AM</span>
              <span>12 PM</span>
              <span>6 PM</span>
              <span>11 PM</span>
            </div>
            {hourlyActivity.map((hour) => (
              <div key={hour.hour} className="flex items-center gap-2">
                <div className="w-8 text-xs text-gray-500">
                  {hour.hour.toString().padStart(2, '0')}h
                </div>
                <div className="flex-1 bg-gray-100 rounded-full h-6 relative">
                  <div
                    className="bg-blue-500 h-full rounded-full"
                    style={{
                      width: `${Math.min((hour.pageViews / Math.max(...hourlyActivity.map(h => h.pageViews))) * 100, 100)}%`
                    }}
                  />
                  {hour.conversions > 0 && (
                    <div
                      className="absolute top-0 bg-green-500 h-full rounded-full opacity-75"
                      style={{
                        width: `${Math.min((hour.conversions / Math.max(...hourlyActivity.map(h => h.conversions))) * 100, 100)}%`
                      }}
                    />
                  )}
                </div>
                <div className="w-16 text-xs text-gray-600 text-right">
                  {hour.pageViews} / {hour.conversions}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Page Views</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Conversions</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
