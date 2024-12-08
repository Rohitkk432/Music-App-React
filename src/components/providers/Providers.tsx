'use client'

import { ThemeProvider } from 'next-themes'
import { PlayerProvider } from '@/context/PlayerContext'
import { ToastProvider } from '@/context/ToastContext'
import { PlaylistModalProvider } from '@/context/PlaylistModalContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <ToastProvider>
        <PlayerProvider>
          <PlaylistModalProvider>
            {children}
          </PlaylistModalProvider>
        </PlayerProvider>
      </ToastProvider>
    </ThemeProvider>
  )
} 