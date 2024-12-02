'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HomeIcon, QueueListIcon, HeartIcon } from '@heroicons/react/24/solid'
import SignOutButton from '@/components/auth/SignOutButton'

export default function Navigation() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path ? 'bg-blue-600' : 'hover:bg-gray-800'
  }

  return (
    <nav className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Navigation */}
          <div className="flex items-center gap-1">
            <Link 
              href="/home"
              className={`p-2 rounded-lg transition-colors ${isActive('/home')}`}
              title="Home"
            >
              <HomeIcon className="!w-5 !h-5" />
            </Link>

            <Link 
              href="/playlist"
              className={`p-2 rounded-lg transition-colors ${isActive('/playlist')}`}
              title="Playlists"
            >
              <QueueListIcon className="!w-5 !h-5" />
            </Link>

            <Link 
              href="/liked"
              className={`p-2 rounded-lg transition-colors ${isActive('/liked')}`}
              title="Liked Songs"
            >
              <HeartIcon className="!w-5 !h-5" />
            </Link>
          </div>

          {/* Right side - Sign Out */}
          <SignOutButton />
        </div>
      </div>
    </nav>
  )
}
