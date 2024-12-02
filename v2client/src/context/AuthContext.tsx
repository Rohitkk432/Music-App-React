'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface AuthContextType {
  userId: string | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') {
      setLoading(true)
    } else {
      setUserId(session?.user?.id || null)
      setLoading(false)
    }
  }, [session, status])

  return (
    <AuthContext.Provider value={{ userId, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 