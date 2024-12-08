'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HomeIcon, HeartIcon, QueueListIcon } from '@heroicons/react/24/solid'
import { useAuth } from '@/hooks/useAuth'
import SignOutButton from '../auth/SignOutButton'
import AdminButton from '../admin/AdminButton'

export default function Sidebar() {
  const pathname = usePathname()
  const { user, loading } = useAuth()

  if (loading) return null
  if (!user) return null

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

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-surface border-r border-gray-800">
      <div className="flex flex-col h-full p-4">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                ${pathname === item.href ? 'bg-surface-active' : 'hover:bg-surface-hover'}`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto space-y-2">
          <AdminButton />
          <SignOutButton />
        </div>
      </div>
    </aside>
  )
} 