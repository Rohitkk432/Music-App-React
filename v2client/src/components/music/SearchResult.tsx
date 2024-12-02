'use client'

import { useState, useEffect } from 'react'
import { PlusIcon, QueueListIcon, HeartIcon, PlayIcon } from '@heroicons/react/24/solid'
import { usePlayer } from '@/context/PlayerContext'
import { useAuth } from '@/hooks/useAuth'
import { addToPlaylist, getLikedSongs, addToLiked, removeFromLiked } from '@/lib/api'
import { usePlaylistModal } from '@/context/PlaylistModalContext'
import { useToast } from '@/context/ToastContext'
import type { Song } from '@/types/music'

interface SearchResultProps extends Song {
  userId: string
}

export default function SearchResult({ userId, ...song }: SearchResultProps) {
  const { addToQueue, playSong } = usePlayer()
  const { openPlaylistModal } = usePlaylistModal()
  const [isLiked, setIsLiked] = useState(false)
  const { showToast } = useToast()

  // Check if song is liked on mount
  useEffect(() => {
    const checkLiked = async () => {
      if (!userId) return
      
      try {
        const liked = await getLikedSongs(userId)
        setIsLiked(liked.some(s => s.id === song.id))
      } catch (error) {
        console.error('Failed to check liked status:', error)
      }
    }
    
    checkLiked()
  }, [userId, song.id])

  const handleAddToQueue = () => {
    addToQueue(song)
    showToast('Added to queue', 'success')
  }

  const handlePlaySong = () => {
    playSong(song)
    showToast('Now playing', 'success')
  }

  const handleToggleLike = async () => {
    if (!userId) return

    try {
      if (isLiked) {
        await removeFromLiked(userId, song.id.toString())
        showToast('Removed from liked songs', 'success')
      } else {
        await addToLiked(userId, song.id.toString())
        showToast('Added to liked songs', 'success')
      }
      setIsLiked(!isLiked)
    } catch (error) {
      console.error('Failed to toggle like:', error)
      showToast('Failed to update liked songs', 'error')
    }
  }

  return (
    <div className="flex items-center justify-between p-3 bg-surface 
                  hover:bg-surface-hover rounded-xl transition-all duration-300
                  hover:scale-[1.01] group border border-gray-800/50">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="relative group/play">
          <img 
            src={song.imgpath} 
            alt={song.title}
            className="w-12 h-12 rounded-xl object-cover shadow-lg 
                     transition-transform duration-300
                     group-hover/play:scale-105"
          />
          <button
            onClick={handlePlaySong}
            className="absolute inset-0 flex items-center justify-center 
                     bg-background/90 opacity-0 group-hover/play:opacity-100 
                     transition-all duration-300 rounded-xl
                     ring-2 ring-accent-blue/0 group-hover/play:ring-accent-blue"
            title="Play"
          >
            <PlayIcon className="w-6 h-6 transform scale-90 
                             group-hover/play:scale-100 transition-transform" />
          </button>
        </div>
        <div className="min-w-0">
          <h3 className="font-medium text-sm truncate text-white">
            {song.title}
          </h3>
          <p className="text-xs text-gray-400 truncate">
            {song.singer}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleAddToQueue}
          className="p-2 hover:bg-surface-active rounded-lg transition-all duration-300
                   text-gray-400 hover:text-white group-hover:scale-105"
          title="Add to queue"
        >
          <QueueListIcon className="w-4 h-4" />
        </button>

        <button
          onClick={() => openPlaylistModal(song)}
          className="p-2 hover:bg-surface-active rounded-lg transition-all duration-300
                   text-gray-400 hover:text-white group-hover:scale-105"
          title="Add to playlist"
        >
          <PlusIcon className="w-4 h-4" />
        </button>

        <button
          onClick={handleToggleLike}
          className={`p-2 hover:bg-surface-active rounded-lg transition-all duration-300
                   group-hover:scale-105
                   ${isLiked ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}
          title={isLiked ? 'Remove from liked' : 'Add to liked'}
        >
          <HeartIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
