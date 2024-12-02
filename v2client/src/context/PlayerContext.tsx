'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { getQueue, addToQueue as addToQueueApi, removeFromQueue as removeFromQueueApi, clearQueue as clearQueueApi } from '@/lib/api'
import type { Song } from '@/types/music'

interface PlayerContextType {
  currentSong: Song | null
  queue: Song[]
  isPlaying: boolean
  addToQueue: (song: Song) => Promise<void>
  removeFromQueue: (songId: string) => Promise<void>
  clearQueue: () => Promise<void>
  playFromQueue: (song: Song) => void
  playSong: (song: Song) => void
  togglePlayPause: () => void
  nextSong: () => void
  previousSong: () => void
  refetchQueue: () => Promise<void>
}

const PlayerContext = createContext<PlayerContextType | null>(null)

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [queue, setQueue] = useState<Song[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const { userId } = useAuth()

  // Fetch queue on mount and when userId changes
  useEffect(() => {
    if (userId) {
      refetchQueue()
    }
  }, [userId])

  const refetchQueue = async () => {
    if (!userId) return
    try {
      const queueData = await getQueue(userId)
      setQueue(queueData)
    } catch (error) {
      console.error('Failed to fetch queue:', error)
    }
  }

  const addToQueue = async (song: Song) => {
    if (!userId) return
    try {
      await addToQueueApi(userId, song.id.toString())
      await refetchQueue()
    } catch (error) {
      console.error('Failed to add to queue:', error)
    }
  }

  const removeFromQueue = async (songId: string) => {
    if (!userId) return
    try {
      await removeFromQueueApi(userId, songId)
      await refetchQueue()
    } catch (error) {
      console.error('Failed to remove from queue:', error)
    }
  }

  const clearQueue = async () => {
    if (!userId) return
    try {
      await clearQueueApi(userId)
      setQueue([])
    } catch (error) {
      console.error('Failed to clear queue:', error)
    }
  }

  const playFromQueue = (song: Song) => {
    setCurrentSong(song)
    setIsPlaying(true)
  }

  const playSong = (song: Song) => {
    setCurrentSong(song)
    setIsPlaying(true)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const nextSong = () => {
    if (!currentSong || queue.length === 0) return
    const currentIndex = queue.findIndex(song => song.id === currentSong.id)
    if (currentIndex === -1 || currentIndex === queue.length - 1) {
      setCurrentSong(queue[0])
    } else {
      setCurrentSong(queue[currentIndex + 1])
    }
  }

  const previousSong = () => {
    if (!currentSong || queue.length === 0) return
    const currentIndex = queue.findIndex(song => song.id === currentSong.id)
    if (currentIndex === -1 || currentIndex === 0) {
      setCurrentSong(queue[queue.length - 1])
    } else {
      setCurrentSong(queue[currentIndex - 1])
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        queue,
        isPlaying,
        addToQueue,
        removeFromQueue,
        clearQueue,
        playFromQueue,
        playSong,
        togglePlayPause,
        nextSong,
        previousSong,
        refetchQueue
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider')
  }
  return context
}
