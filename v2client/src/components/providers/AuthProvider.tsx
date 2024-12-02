'use client'

import { Session } from 'next-auth'
import { SessionProvider, signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { api } from '@/lib/api'

// Wrapper component to handle user creation/verification
const AuthStateHandler = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession()

  useEffect(() => {
    const handleUserAuth = async (session: Session) => {
      if (!session?.user?.email) return

      try {
        // First try to get existing user
        const { data: existingUser } = await api.get(`/users/${session.user.email}`)
        
        // If user doesn't exist (data is null), create new user
        if (existingUser === null) {
          await api.post('/users', { email: session.user.email })
        }
      } catch (error) {
        console.error('Error handling user auth:', error)
      }
    }

    if (session) {
      handleUserAuth(session)
    }
  }, [session])

  return <>{children}</>
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthStateHandler>{children}</AuthStateHandler>
    </SessionProvider>
  )
}
