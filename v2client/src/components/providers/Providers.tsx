'use client'

import { useSession } from 'next-auth/react'
import { AuthProvider } from './AuthProvider'
import { PlayerProvider } from '@/context/PlayerContext'
import { ToastProvider } from '@/context/ToastContext'
import { useEffect, useState } from 'react'
import { getOrCreateUser } from '@/lib/api'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <PlayerContextWrapper>
          {children}
        </PlayerContextWrapper>
      </ToastProvider>
    </AuthProvider>
  )
}

function PlayerContextWrapper({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const [userId, setUserId] = useState<string>('')

  useEffect(() => {
    async function initUser() {
      if (session?.user?.email) {
        try {
          const user = await getOrCreateUser(session.user.email)
          setUserId(user.id)
        } catch (error) {
          console.error('Failed to init user:', error)
        }
      }
    }

    if (session?.user?.email) {
      initUser()
    } else {
      const storedId = localStorage.getItem('userId')
      if (storedId) {
        setUserId(storedId)
      }
    }
  }, [session?.user?.email])

  return (
    <PlayerProvider userId={userId}>
      {children}
    </PlayerProvider>
  )
} 