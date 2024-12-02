'use client'

import { createContext, useContext, useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { addToPlaylist } from '@/lib/api'
import { useAuth } from '@/hooks/useAuth'
import type { Song } from '@/types/music'

interface PlaylistModalContextType {
  openPlaylistModal: (song: Song) => void
  closePlaylistModal: () => void
}

const PlaylistModalContext = createContext<PlaylistModalContextType | null>(null)

export function PlaylistModalProvider({ children }: { children: React.ReactNode }) {
  const { userId } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)

  const openPlaylistModal = (song: Song) => {
    setSelectedSong(song)
    setIsOpen(true)
  }

  const closePlaylistModal = () => {
    setIsOpen(false)
    setSelectedSong(null)
  }

  const handleAddToPlaylist = async (playlistNumber: number) => {
    if (!selectedSong || !userId) return

    try {
      await addToPlaylist(userId, selectedSong.id.toString(), playlistNumber)
      closePlaylistModal()
    } catch (error) {
      console.error('Failed to add to playlist:', error)
    }
  }

  return (
    <PlaylistModalContext.Provider value={{ openPlaylistModal, closePlaylistModal }}>
      {children}
      <Modal 
        isOpen={isOpen} 
        onClose={closePlaylistModal}
        title="Add to Playlist"
      >
        <div className="space-y-3">
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => handleAddToPlaylist(num)}
              className="w-full p-4 text-left bg-surface hover:bg-surface-hover 
                       rounded-lg transition-all duration-300 hover:scale-[1.02]
                       border border-gray-800 hover:border-gray-700
                       flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-surface-active 
                           flex items-center justify-center text-lg font-medium">
                {num}
              </div>
              <div>
                <h3 className="font-medium">Playlist {num}</h3>
                <p className="text-sm text-gray-400">Add to this playlist</p>
              </div>
            </button>
          ))}
        </div>
      </Modal>
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