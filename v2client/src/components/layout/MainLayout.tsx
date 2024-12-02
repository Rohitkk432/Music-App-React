'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { 
  HomeIcon, 
  HeartIcon, 
  QueueListIcon,
  ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/solid'
import Player from '@/components/music/Player'
import Queue from '@/components/music/Queue'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const navItems = [
    {
      name: 'Home',
      href: '/home',
      icon: HomeIcon,
    },
    {
      name: 'Liked',
      href: '/liked',
      icon: HeartIcon,
    },
    {
      name: 'Playlist',
      href: '/playlist',
      icon: QueueListIcon,
    },
  ]

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  return (
    <div className="min-h-screen pb-32">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-surface/80 backdrop-blur-xl 
                    border-b border-gray-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              href="/home" 
              className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 
                       bg-clip-text text-transparent"
            >
              Music Pro X
            </Link>

            {/* Nav Links & Logout */}
            <div className="flex items-center">
              {/* Nav Links */}
              <div className="flex items-center gap-1 mr-2 border-r border-gray-800 pr-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`p-2.5 rounded-lg transition-all duration-300 group
                      ${pathname === item.href 
                        ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-white' 
                        : 'text-gray-400 hover:text-white hover:bg-surface-hover'}`}
                  >
                    <item.icon 
                      className={`w-5 h-5 transition-transform duration-300
                        ${pathname === item.href 
                          ? 'scale-105' 
                          : 'group-hover:scale-105'}`} 
                    />
                  </Link>
                ))}
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="p-2.5 rounded-lg transition-all duration-300 group
                         text-gray-400 hover:text-red-400 hover:bg-surface-hover"
                title="Logout"
              >
                <ArrowRightOnRectangleIcon 
                  className="w-5 h-5 transition-transform duration-300
                         group-hover:scale-105" 
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24">
        {children}
      </main>

      {/* Player & Queue */}
      <Queue />
      <Player />
    </div>
  )
}
