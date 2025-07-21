"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface Admin {
  id: string
  email: string
  name: string
  role: 'super_admin' | 'admin' | 'editor'
  permissions: string[]
}

interface AdminContextType {
  admin: Admin | null
  adminLogin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  adminLogout: () => void
  isAdminLoading: boolean
  hasPermission: (permission: string) => boolean
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [isAdminLoading, setIsAdminLoading] = useState(true)

  useEffect(() => {
    // Check for existing admin session on mount (only in browser)
    if (typeof window !== 'undefined') {
      const savedAdmin = localStorage.getItem('berenice-admin')
      if (savedAdmin) {
        setAdmin(JSON.parse(savedAdmin))
      }
    }
    setIsAdminLoading(false)
  }, [])

  const adminLogin = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsAdminLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Demo admin accounts
    const demoAdmins = [
      {
        id: 'admin1',
        email: 'admin@berenice.com',
        password: 'admin123',
        name: 'Sarah Admin',
        role: 'super_admin' as const,
        permissions: ['manage_users', 'manage_posts', 'manage_bookings', 'view_analytics', 'manage_payments']
      },
      {
        id: 'editor1',
        email: 'editor@berenice.com',
        password: 'editor123',
        name: 'Emma Editor',
        role: 'editor' as const,
        permissions: ['manage_posts', 'view_bookings']
      }
    ]

    const foundAdmin = demoAdmins.find(a => a.email === email && a.password === password)

    if (foundAdmin) {
      const adminData: Admin = {
        id: foundAdmin.id,
        email: foundAdmin.email,
        name: foundAdmin.name,
        role: foundAdmin.role,
        permissions: foundAdmin.permissions
      }

      setAdmin(adminData)
      if (typeof window !== 'undefined') {
        localStorage.setItem('berenice-admin', JSON.stringify(adminData))
      }
      setIsAdminLoading(false)
      return { success: true }
    } else {
      setIsAdminLoading(false)
      return { success: false, error: 'Invalid admin credentials' }
    }
  }

  const adminLogout = () => {
    setAdmin(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('berenice-admin')
    }
  }

  const hasPermission = (permission: string): boolean => {
    if (!admin) return false
    return admin.permissions.includes(permission) || admin.role === 'super_admin'
  }

  return (
    <AdminContext.Provider value={{ admin, adminLogin, adminLogout, isAdminLoading, hasPermission }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin(): AdminContextType {
  const context = useContext(AdminContext)
  if (context === undefined) {
    // During SSR/build, return a safe fallback
    if (typeof window === 'undefined') {
      return {
        admin: null,
        adminLogin: async () => ({ success: false, error: 'Not available during SSR' }),
        adminLogout: () => {},
        isAdminLoading: false,
        hasPermission: () => false
      }
    }
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}
