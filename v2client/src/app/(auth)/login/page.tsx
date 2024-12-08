'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import GoogleLogo from './google-logo'
import { MusicalNoteIcon } from '@heroicons/react/24/outline'

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        router.push('/home')
      }
    }
    checkSession()
  }, [router])

  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      }
    })

    if (error) {
      console.error('Error:', error.message)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 
                  bg-gradient-to-b from-background to-surface">
      {/* Logo Section */}
      <div className="text-center mb-12">
        <div className="inline-block p-4 rounded-2xl bg-surface border border-gray-800 
                     shadow-xl shadow-blue-500/5 mb-6">
          <MusicalNoteIcon className="w-12 h-12 text-gray-400" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 
                     bg-clip-text text-transparent mb-2">
          Music Pro X
        </h1>
        <p className="text-gray-400">Your personal music companion</p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-surface border border-gray-800 rounded-2xl p-8 
                    shadow-xl shadow-blue-500/5">
        <h2 className="text-xl font-semibold text-center mb-8">
          Welcome Back
        </h2>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 px-6 py-3
                   bg-surface-hover hover:bg-surface-active
                   border border-gray-700 hover:border-gray-600
                   rounded-xl transition-all duration-300 hover:scale-[1.02]
                   group"
        >
          <GoogleLogo className="w-5 h-5 transition-transform duration-300
                              group-hover:scale-110" />
          <span className="text-sm font-medium">
            Continue with Google
          </span>
        </button>
      </div>

      <footer className="mt-12 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Music Pro X. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
