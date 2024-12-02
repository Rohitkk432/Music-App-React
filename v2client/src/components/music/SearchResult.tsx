'use client'

import { useState, useEffect } from 'react'
import { PlusIcon, QueueListIcon, HeartIcon, PlayIcon } from '@heroicons/react/24/solid'
import { usePlayer } from '@/context/PlayerContext'
import { addToPlaylist, getLikedSongs, addToLiked, removeFromLiked } from '@/lib/api'
import Modal from '@/components/ui/Modal'
import type { Song } from '@/types/music'

interface SearchResultProps extends Song {
  userId: string
}

export default function SearchResult({ userId, ...song }: SearchResultProps) {
  const { addToQueue, playSong } = usePlayer()
  const [showPlaylistModal, setShowPlaylistModal] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  // Check if song is liked on mount
  useEffect(() => {
    const checkLiked = async () => {
      try {
        const liked = await getLikedSongs(userId)
        setIsLiked(liked.some(s => s.id === song.id))
      } catch (error) {
        console.error('Failed to check liked status:', error)
      }
    }
    
    if (userId) {
      checkLiked()
    }
  }, [userId, song.id])

  const handleAddToPlaylist = async (playlistNumber: number) => {
    try {
      await addToPlaylist(userId, song.id.toString(), playlistNumber)
      setShowPlaylistModal(false)
    } catch (error) {
      console.error('Failed to add to playlist:', error)
    }
  }

  const handleToggleLike = async () => {
    if (!userId) return

    try {
      if (isLiked) {
        await removeFromLiked(userId, song.id.toString())
      } else {
        await addToLiked(userId, song.id.toString())
      }
      setIsLiked(!isLiked)
    } catch (error) {
      console.error('Failed to toggle like:', error)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors gap-3">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="relative group shrink-0">
          <img 
            src={song.imgpath} 
            alt={song.title}
            className="w-12 h-12 rounded object-cover"
          />
          <button
            onClick={() => playSong(song)}
            className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
            title="Play"
          >
            <PlayIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="min-w-0">
          <h3 className="font-medium text-sm truncate">{song.title}</h3>
          <p className="text-sm text-gray-400 truncate">{song.singer}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <span className="text-sm text-gray-400 mr-2 hidden sm:inline">
          {song.duration}
        </span>
        
        <div className="flex gap-1">
          <button
            onClick={() => addToQueue(song)}
            className="p-2 hover:bg-gray-600 rounded-full transition-colors"
            title="Add to queue"
          >
            <QueueListIcon className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowPlaylistModal(true)}
            className="p-2 hover:bg-gray-600 rounded-full transition-colors"
            title="Add to playlist"
          >
            <PlusIcon className="w-4 h-4" />
          </button>

          <button
            onClick={handleToggleLike}
            className={`p-2 hover:bg-gray-600 rounded-full transition-colors
                     ${isLiked ? 'text-red-500' : ''}`}
            title={isLiked ? 'Remove from liked' : 'Add to liked'}
          >
            <HeartIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Playlist Modal */}
      <Modal 
        isOpen={showPlaylistModal} 
        onClose={() => setShowPlaylistModal(false)}
        title="Add to Playlist"
      >
        <div className="space-y-2">
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => handleAddToPlaylist(num)}
              className="w-full p-3 text-left hover:bg-gray-700 rounded-lg
                       transition-colors"
            >
              Playlist {num}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  )
}
