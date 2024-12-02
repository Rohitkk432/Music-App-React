'use client'

import Navigation from './Navigation'
import Player from '@/components/music/Player'
import Queue from '@/components/music/Queue'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navigation />
      
      {/* Main Content */}
      <main className="pb-32">
        {children}
      </main>

      {/* Fixed Elements */}
      <Queue />
      <Player />
    </div>
  )
}
