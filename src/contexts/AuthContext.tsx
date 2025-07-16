"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
  membershipType: 'basic' | 'premium' | 'elite'
  joinDate: string
  profilePhotoUrl?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateProfilePhoto: (photoUrl: string | null) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount (only in browser)
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('berenice-user')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Demo users for testing
    const demoUsers = [
      { id: '1', email: 'demo@berenice.com', password: 'demo123', name: 'Demo User', membershipType: 'premium' as const },
      { id: '2', email: 'admin@berenice.com', password: 'admin123', name: 'Admin User', membershipType: 'elite' as const }
    ]

    const foundUser = demoUsers.find(u => u.email === email && u.password === password)

    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        membershipType: foundUser.membershipType,
        joinDate: new Date().toISOString()
      }

      setUser(userData)
      if (typeof window !== 'undefined') {
        localStorage.setItem('berenice-user', JSON.stringify(userData))
      }
      setIsLoading(false)
      return { success: true }
    } else {
      setIsLoading(false)
      return { success: false, error: 'Invalid email or password' }
    }
  }

  const register = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Check if user already exists (basic validation)
    const existingUser = typeof window !== 'undefined' ? localStorage.getItem(`user-${email}`) : null
    if (existingUser) {
      setIsLoading(false)
      return { success: false, error: 'User already exists' }
    }

    const userData: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      membershipType: 'basic',
      joinDate: new Date().toISOString()
    }

    setUser(userData)
    if (typeof window !== 'undefined') {
      localStorage.setItem('berenice-user', JSON.stringify(userData))
      localStorage.setItem(`user-${email}`, JSON.stringify({ email, password, name }))
    }
    setIsLoading(false)

    return { success: true }
  }

  const updateProfilePhoto = (photoUrl: string | null) => {
    if (user) {
      const updatedUser = { ...user, profilePhotoUrl: photoUrl || undefined }
      setUser(updatedUser)
      if (typeof window !== 'undefined') {
        localStorage.setItem('berenice-user', JSON.stringify(updatedUser))
      }
    }
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('berenice-user')
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfilePhoto, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    // During SSR/build, return a safe fallback
    if (typeof window === 'undefined') {
      return {
        user: null,
        login: async () => ({ success: false, error: 'Not available during SSR' }),
        register: async () => ({ success: false, error: 'Not available during SSR' }),
        logout: () => {},
        updateProfilePhoto: () => {},
        isLoading: false
      }
    }
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
