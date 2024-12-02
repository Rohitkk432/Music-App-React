'use client'

import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { getQueue, addToQueue, removeFromQueue, clearQueue } from '@/lib/api'
import type { Song } from '@/types/music'

interface PlayerContextType {
  queue: Song[]
  currentSong: Song | null
  isPlaying: boolean
  addToQueue: (song: Song) => Promise<void>
  removeFromQueue: (songId: string) => void
  clearQueue: () => Promise<void>
  playSong: (song: Song) => void
  nextSong: () => void
  previousSong: () => void
  togglePlay: () => void
  refetchQueue: () => Promise<void>
  playFromQueue: (song: Song) => void
}

const PlayerContext = createContext<PlayerContextType | null>(null)

export function PlayerProvider({ children, userId }: { children: React.ReactNode, userId: string }) {
  const [queue, setQueue] = useState<Song[]>([])
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  // Load initial queue
  useEffect(() => {
    if (userId) {
      getQueue(userId).then(setQueue)
    }
  }, [userId])

  const refetchQueue = useCallback(async () => {
    if (userId) {
      const newQueue = await getQueue(userId)
      setQueue(newQueue)
    }
  }, [userId])

  const addSongToQueue = useCallback(async (song: Song) => {
    try {
      await addToQueue(userId, song.id.toString())
      await refetchQueue()
    } catch (error) {
      console.error('Failed to add to queue:', error)
    }
  }, [userId, refetchQueue])

  const removeSongFromQueue = useCallback(async (songId: string) => {
    try {
      await removeFromQueue(userId, songId)
      await refetchQueue()
    } catch (error) {
      console.error('Failed to remove from queue:', error)
    }
  }, [userId, refetchQueue])

  const clearEntireQueue = useCallback(async () => {
    try {
      await clearQueue(userId)
      setQueue([])
      setCurrentSong(null)
      setCurrentIndex(0)
      setIsPlaying(false)
    } catch (error) {
      console.error('Failed to clear queue:', error)
    }
  }, [userId])

  const playFromQueue = useCallback((song: Song) => {
    setCurrentSong(song)
    setIsPlaying(true)
    const index = queue.findIndex(s => s.id === song.id)
    if (index !== -1) {
      setCurrentIndex(index)
    }
  }, [queue])

  const playSong = useCallback((song: Song) => {
    setCurrentSong(song)
    setIsPlaying(true)
    const songInQueue = queue.some(s => s.id === song.id)
    if (!songInQueue) {
      addSongToQueue(song)
    }
    const index = queue.findIndex(s => s.id === song.id)
    if (index !== -1) {
      setCurrentIndex(index)
    }
  }, [queue, addSongToQueue])

  const nextSong = useCallback(() => {
    if (currentIndex < queue.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setCurrentSong(queue[currentIndex + 1])
    }
  }, [currentIndex, queue])

  const previousSong = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
      setCurrentSong(queue[currentIndex - 1])
    }
  }, [currentIndex, queue])

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev)
  }, [])

  return (
    <PlayerContext.Provider value={{
      queue,
      currentSong,
      isPlaying,
      addToQueue: addSongToQueue,
      removeFromQueue: removeSongFromQueue,
      clearQueue: clearEntireQueue,
      playSong,
      nextSong,
      previousSong,
      togglePlay,
      refetchQueue,
      playFromQueue
    }}>
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
