'use client'

import { Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { checkAdminAccess } from '@/lib/admin'
import { useState, useEffect } from 'react'

export default function AdminButton() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkAccess = async () => {
      const hasAccess = await checkAdminAccess()
      setIsAdmin(hasAccess)
    }
    checkAccess()
  }, [])

  if (!isAdmin) return null

  return (
    <button
      onClick={() => router.push('/admin')}
      className="p-2.5 rounded-lg transition-all duration-300 group
                text-gray-400 hover:text-white hover:bg-surface-hover"
      title="Admin Dashboard"
    >
      <Settings 
        className="w-5 h-5 transition-transform duration-300
                 group-hover:scale-105" 
      />
    </button>
  )
} 