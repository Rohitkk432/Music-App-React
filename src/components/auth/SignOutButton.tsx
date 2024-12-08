'use client'

import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function SignOutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.replace('/login')
  }

  return (
    <button
      onClick={handleSignOut}
      className="p-2.5 rounded-lg transition-all duration-300 group
                text-gray-400 hover:text-red-400 hover:bg-surface-hover"
      title="Sign Out"
    >
      <LogOut 
        className="w-5 h-5 transition-transform duration-300
                 group-hover:scale-105" 
      />
    </button>
  )
}
