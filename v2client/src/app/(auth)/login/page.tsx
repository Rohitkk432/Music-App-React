'use client'

import { signIn } from 'next-auth/react'
import { MusicalNoteIcon } from '@heroicons/react/24/solid'
import GoogleLogo from './google-logo'

export default function LoginPage() {
  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/home' })
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

        {/* Google Login Button */}
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

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            By continuing, you agree to our{' '}
            <a href="#" className="text-blue-400 hover:text-blue-300 
                                transition-colors duration-300">
              Terms of Service
            </a>
            {' '}and{' '}
            <a href="#" className="text-blue-400 hover:text-blue-300 
                                transition-colors duration-300">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Music Pro X. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
