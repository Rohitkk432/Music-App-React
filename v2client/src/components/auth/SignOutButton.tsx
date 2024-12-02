'use client'

import { signOut } from 'next-auth/react'

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="px-3 py-1.5 text-sm font-medium
               bg-red-600 hover:bg-red-700 
               rounded-lg transition-colors"
    >
      Sign Out
    </button>
  )
}
