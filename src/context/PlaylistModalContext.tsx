'use client'

import { createContext, useContext, useState } from 'react'
import type { Song } from '@/types/music'

interface PlaylistModalContextType {
  isOpen: boolean
  currentSong: Song | null
  openPlaylistModal: (song: Song) => void
  onClose: () => void
}

const PlaylistModalContext = createContext<PlaylistModalContextType | null>(null)

export function PlaylistModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentSong, setCurrentSong] = useState<Song | null>(null)

  const openPlaylistModal = (song: Song) => {
    console.log('Opening modal with song:', song)
    setCurrentSong(song)
    setIsOpen(true)
  }

  const onClose = () => {
    console.log('Closing modal')
    setIsOpen(false)
    setCurrentSong(null)
  }

  return (
    <PlaylistModalContext.Provider value={{ isOpen, currentSong, openPlaylistModal, onClose }}>
      {children}
    </PlaylistModalContext.Provider>
  )
}

export function usePlaylistModal() {
  const context = useContext(PlaylistModalContext)
  if (!context) {
    throw new Error('usePlaylistModal must be used within a PlaylistModalProvider')
  }
  return context
} 