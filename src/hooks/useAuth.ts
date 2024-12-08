'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  userId: string | null
  loading: boolean
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    userId: null,
    loading: true
  })

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState({
        user: session?.user ?? null,
        userId: session?.user?.id ?? null,
        loading: false
      })
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({
        user: session?.user ?? null,
        userId: session?.user?.id ?? null,
        loading: false
      })
    })

    return () => subscription.unsubscribe()
  }, [])

  return state
} 