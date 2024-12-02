'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import GoogleLogo from './google-logo'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/home'
  const error = searchParams.get('error')

  const handleSignIn = async () => {
    try {
      setIsLoading(true)
      await signIn('google', { 
        callbackUrl,
        redirect: true,
      })
    } catch (error) {
      console.error('Sign in error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-10">
        {/* Logo/Brand */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Music Pro X
          </h1>
          <p className="text-gray-400 text-sm">Your Personal Music Player</p>
        </div>

        {/* Login Box */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700/50">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold text-white">Welcome Back</h2>
              <p className="text-sm text-gray-400">Sign in to continue</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
                <p className="text-sm text-red-500 text-center">
                  {error === 'OAuthCallback' ? 'Failed to sign in. Please try again.' : error}
                </p>
              </div>
            )}

            <button
              onClick={handleSignIn}
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 
                       bg-white hover:bg-gray-100 
                       text-gray-900 font-medium text-sm
                       rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-offset-2 
                       focus:ring-offset-gray-800 focus:ring-white
                       ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <GoogleLogo />
                  <span>Continue with Google</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
