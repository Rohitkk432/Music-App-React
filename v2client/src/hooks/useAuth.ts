'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { getOrCreateUser } from '@/lib/api'
import type { Session } from 'next-auth'

interface AuthHook {
  session: Session | null
  loading: boolean
  userId: string | null
}

export function useAuth(): AuthHook {
  const { data: session, status } = useSession()
  const [userId, setUserId] = useState<string | null>(null)
  const loading = status === 'loading'

  useEffect(() => {
    async function initUser() {
      if (session?.user?.email) {
        try {
          const user = await getOrCreateUser(session.user.email)
          setUserId(user.id)
          localStorage.setItem('userId', user.id)
          localStorage.setItem('email', session.user.email)
        } catch (error) {
          console.error('Failed to init user:', error)
        }
      }
    }

    if (session?.user?.email) {
      initUser()
    } else {
      // Try to get from localStorage if no session
      const storedId = localStorage.getItem('userId')
      if (storedId) {
        setUserId(storedId)
      }
    }
  }, [session?.user?.email])

  return { session, loading, userId }
} 