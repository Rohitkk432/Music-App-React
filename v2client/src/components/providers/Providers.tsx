'use client'

import { SessionProvider } from 'next-auth/react'
import { AuthProvider } from '@/context/AuthContext'
import { PlayerProvider } from '@/context/PlayerContext'
import { PlaylistModalProvider } from '@/context/PlaylistModalContext'
import { ThemeProvider } from 'next-themes'
import { ToastProvider } from '@/context/ToastContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <AuthProvider>
          <PlayerProvider>
            <PlaylistModalProvider>
              <ToastProvider>
                {children}
              </ToastProvider>
            </PlaylistModalProvider>
          </PlayerProvider>
        </AuthProvider>
      </ThemeProvider>
    </SessionProvider>
  )
} 