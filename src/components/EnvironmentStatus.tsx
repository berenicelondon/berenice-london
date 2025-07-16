"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertCircle, Eye, EyeOff, Copy, RefreshCw } from "lucide-react"
import { verifyEnvironmentVariables } from '@/lib/analytics'

interface EnvVariable {
  name: string
  value: string
  status: 'set' | 'missing' | 'partial'
  required: boolean
  description: string
  type: 'public' | 'private'
}

export function EnvironmentStatus() {
  const [variables, setVariables] = useState<EnvVariable[]>([])
  const [showValues, setShowValues] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    checkEnvironmentVariables()
  }, [])

  const checkEnvironmentVariables = () => {
    const envVars = verifyEnvironmentVariables()

    const variablesList: EnvVariable[] = [
      {
        name: 'NEXT_PUBLIC_GA_ID',
        value: envVars.GA_TRACKING_ID,
        status: envVars.GA_TRACKING_ID ? 'set' : 'missing',
        required: true,
        description: 'Google Analytics 4 Measurement ID',
        type: 'public'
      },
      {
        name: 'NEXT_PUBLIC_FB_PIXEL_ID',
        value: envVars.FB_PIXEL_ID,
        status: envVars.FB_PIXEL_ID ? 'set' : 'missing',
        required: false,
        description: 'Facebook Pixel ID for social media tracking',
        type: 'public'
      },
      {
        name: 'NEXT_PUBLIC_HOTJAR_ID',
        value: envVars.HOTJAR_ID,
        status: envVars.HOTJAR_ID ? 'set' : 'missing',
        required: false,
        description: 'Hotjar Site ID for user behavior tracking',
        type: 'public'
      },
      {
        name: 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
        value: envVars.STRIPE_PUBLISHABLE_KEY,
        status: envVars.STRIPE_PUBLISHABLE_KEY ? 'set' : 'missing',
        required: true,
        description: 'Stripe publishable key for payment processing',
        type: 'public'
      },
      {
        name: 'NEXT_PUBLIC_APP_URL',
        value: envVars.APP_URL,
        status: envVars.APP_URL ? 'set' : 'missing',
        required: true,
        description: 'Application URL for redirects and webhooks',
        type: 'public'
      },
      {
        name: 'NODE_ENV',
        value: envVars.NODE_ENV,
        status: envVars.NODE_ENV ? 'set' : 'missing',
        required: true,
        description: 'Node.js environment (development/production)',
        type: 'public'
      }
    ]

    setVariables(variablesList)
  }

  const getStatusIcon = (status: string, required: boolean) => {
    if (status === 'set') {
      return <CheckCircle className="h-4 w-4 text-green-600" />
    } else if (required) {
      return <XCircle className="h-4 w-4 text-red-600" />
    } else {
      return <AlertCircle className="h-4 w-4 text-yellow-600" />
    }
  }

  const getStatusBadge = (status: string, required: boolean) => {
    if (status === 'set') {
      return <Badge variant="default" className="bg-green-100 text-green-800">Set</Badge>
    } else if (required) {
      return <Badge variant="destructive">Missing (Required)</Badge>
    } else {
      return <Badge variant="secondary">Missing (Optional)</Badge>
    }
  }

  const copyValue = (value: string) => {
    navigator.clipboard.writeText(value)
  }

  const maskValue = (value: string, type: string) => {
    if (!value) return 'Not set'
    if (!showValues && type === 'private') {
      return '●●●●●●●●●●●●●●●●'
    }
    if (!showValues && value.length > 20) {
      return `${value.substring(0, 8)}...${value.substring(value.length - 8)}`
    }
    return value
  }

  if (!isClient) {
    return <div>Loading environment status...</div>
  }

  const criticalMissing = variables.filter(v => v.required && v.status === 'missing').length
  const allSet = variables.filter(v => v.status === 'set').length

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              Environment Variables Status
              {criticalMissing === 0 ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
            </CardTitle>
            <CardDescription>
              Configuration status for analytics and integrations ({allSet}/{variables.length} configured)
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowValues(!showValues)}
            >
              {showValues ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showValues ? 'Hide' : 'Show'} Values
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={checkEnvironmentVariables}
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {criticalMissing > 0 && (
            <div className="p-4 border border-red-200 rounded-lg bg-red-50">
              <h3 className="font-semibold text-red-800 mb-2">⚠️ Critical Issues Found</h3>
              <p className="text-red-700 text-sm">
                {criticalMissing} required environment variable{criticalMissing > 1 ? 's are' : ' is'} missing.
                These need to be set in your Netlify environment variables for the site to work properly.
              </p>
            </div>
          )}

          <div className="grid gap-3">
            {variables.map((variable) => (
              <div
                key={variable.name}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-3 flex-1">
                  {getStatusIcon(variable.status, variable.required)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                        {variable.name}
                      </code>
                      {getStatusBadge(variable.status, variable.required)}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{variable.description}</p>
                    {variable.value && (
                      <div className="flex items-center gap-2 mt-2">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded flex-1">
                          {maskValue(variable.value, variable.type)}
                        </code>
                        {variable.value && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyValue(variable.value)}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 border rounded-lg bg-blue-50">
            <h3 className="font-semibold text-blue-800 mb-2">🔧 How to Fix Missing Variables</h3>
            <div className="text-sm text-blue-700 space-y-2">
              <p>1. Go to your Netlify dashboard: <code>https://app.netlify.com/sites/graceful-crisp-e96a53/settings/env</code></p>
              <p>2. Click "Add variable" for each missing required variable</p>
              <p>3. Set the following values:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><code>NEXT_PUBLIC_GA_ID</code>: Your Google Analytics 4 Measurement ID (e.g., G-XXXXXXXXXX)</li>
                <li><code>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code>: Your Stripe publishable key</li>
                <li><code>NEXT_PUBLIC_APP_URL</code>: https://berenicelondon.com</li>
                <li><code>NODE_ENV</code>: production</li>
              </ul>
              <p>4. Click "Save" and trigger a new deployment</p>
            </div>
          </div>

          {allSet === variables.length && (
            <div className="p-4 border border-green-200 rounded-lg bg-green-50">
              <h3 className="font-semibold text-green-800 mb-2">✅ All Systems Ready</h3>
              <p className="text-green-700 text-sm">
                All environment variables are properly configured. Analytics tracking, payments, and all integrations should be working correctly.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
