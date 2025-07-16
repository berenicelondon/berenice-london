"use client"

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

import { useState } from "react"
import { useAdmin } from "@/contexts/AdminContext"
import { AdminPanel } from "@/components/AdminPanel"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Crown, Shield, Loader2, Lock, Mail } from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  const { admin, adminLogin, isAdminLoading } = useAdmin()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState("")

  // If admin is logged in, show admin panel
  if (admin) {
    return <AdminPanel />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields")
      return
    }

    const result = await adminLogin(formData.email, formData.password)
    if (!result.success) {
      setError(result.error || "Login failed")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Crown className="h-8 w-8 text-amber-700" />
            <span className="text-2xl font-bold text-stone-800">Berenice London</span>
          </Link>
          <Badge variant="outline" className="text-amber-700 border-amber-200">
            <Shield className="h-3 w-3 mr-1" />
            Admin Portal
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">
              Access the Berenice London management dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@berenice.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  />
                </div>
              </div>

              {error && (
                <div className="text-sm text-red-500 text-center">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-amber-700 hover:bg-amber-800"
                disabled={isAdminLoading}
              >
                {isAdminLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 space-y-3 text-center text-sm">
              <div className="text-gray-500">Demo Credentials:</div>
              <div className="space-y-2">
                <div className="p-2 bg-gray-50 rounded text-xs">
                  <strong>Super Admin:</strong> admin@berenice.com / admin123
                </div>
                <div className="p-2 bg-gray-50 rounded text-xs">
                  <strong>Editor:</strong> editor@berenice.com / editor123
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-stone-600 hover:text-amber-700">
            ← Back to main site
          </Link>
        </div>
      </div>
    </div>
  )
}
