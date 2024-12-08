'use client'

import { PlayIcon, QueueListIcon, PlusIcon, HeartIcon, XMarkIcon } from '@heroicons/react/24/solid'
import type { Song } from '@/types/music'
import { usePlayer } from '@/context/PlayerContext'
import { usePlaylistModal } from '@/context/PlaylistModalContext'
import { addToLiked, removeFromLiked } from '@/lib/api'
import { useState } from 'react'
import { useToast } from '@/context/ToastContext'
import { useAuth } from '@/hooks/useAuth'

interface SongCardProps {
  song: Song
  isLiked?: boolean
  showRemoveButton?: boolean
  onPlay?: () => void
  onAddToQueue?: () => void
  onAddToPlaylist?: () => void
  onLike?: () => void
  onRemove?: () => void
}

export default function SongCard({ 
  song, 
  isLiked = false,
  showRemoveButton = false,
  onPlay,
  onAddToQueue,
  onAddToPlaylist,
  onLike,
  onRemove 
}: SongCardProps) {
  const { playSong, addToQueue } = usePlayer()
  const { openPlaylistModal } = usePlaylistModal()
  const { showToast } = useToast()
  const [liked, setLiked] = useState(isLiked)
  const { userId } = useAuth()

  const handlePlay = () => {
    if (onPlay) {
      onPlay()
    } else {
      playSong(song)
    }
  }

  const handleAddToQueue = () => {
    if (onAddToQueue) {
      onAddToQueue()
    } else {
      addToQueue(song)
      showToast('Added to queue', 'success')
    }
  }

  const handleLike = async () => {
    if (!userId) return

    try {
      if (onLike) {
        onLike()
        setLiked(!liked)
      } else {
        if (liked) {
          await removeFromLiked(userId, song.id.toString())
          setLiked(false)
          showToast('Removed from liked songs', 'success')
        } else {
          await addToLiked(userId, song.id.toString())
          setLiked(true)
          showToast('Added to liked songs', 'success')
        }
      }
    } catch (error) {
      console.error('Error toggling like:', error)
      showToast('Failed to update liked songs', 'error')
    }
  }

  const handlePlaylistClick = () => {
    console.log('Opening playlist modal for song:', song)
    openPlaylistModal(song)
  }

  return (
    <div className="group">
      {/* Mobile: List View */}
      <div className="sm:hidden flex items-center justify-between p-3 bg-surface 
                    hover:bg-surface-hover rounded-xl transition-all duration-300
                    border border-gray-800/50">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative group/play">
            <img
              src={song.imgpath || '/placeholder.jpg'}
              alt={song.title}
              className="w-12 h-12 rounded-xl object-cover shadow-lg"
            />
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center 
                       bg-background/90 opacity-0 group-hover/play:opacity-100 
                       transition-all duration-300 rounded-xl"
              title="Play song"
            >
              <PlayIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="min-w-0">
            <h3 className="font-medium text-sm truncate">{song.title}</h3>
            <p className="text-xs text-gray-400 truncate">{song.singer}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAddToQueue}
            className="p-2 hover:bg-surface-active rounded-lg transition-all"
            title="Add to queue"
          >
            <QueueListIcon className="w-4 h-4" />
          </button>
          <button
            onClick={handlePlaylistClick}
            className="p-2 hover:bg-surface-active rounded-lg transition-all"
            title="Add to playlist"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
          <button
            onClick={handleLike}
            className={`p-2 hover:bg-surface-active rounded-lg transition-all
                     ${liked ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}
            title={liked ? 'Remove from liked' : 'Add to liked'}
          >
            <HeartIcon className="w-4 h-4" />
          </button>
          {showRemoveButton && (
            <button
              onClick={onRemove}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-surface-active rounded-lg transition-all"
              title="Remove from playlist"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Desktop: Grid View */}
      <div className="hidden sm:block h-full">
        <div className="bg-surface p-3 rounded-xl hover:bg-surface-hover 
                      transition-all duration-300 group-hover:scale-[1.02]
                      border border-gray-800/50 h-full">
          <div className="relative aspect-square mb-3 rounded-lg overflow-hidden">
            <img 
              src={song.imgpath || '/placeholder.jpg'} 
              alt={song.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100
                         transition-opacity duration-300 flex items-center justify-center">
              <button
                onClick={handlePlay}
                className="p-2.5 bg-blue-500 rounded-full transform scale-90 
                         group-hover:scale-100 transition-all duration-300
                         hover:bg-blue-600 shadow-lg"
                title="Play song"
              >
                <PlayIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="font-medium text-sm truncate">{song.title}</h3>
            <p className="text-xs text-gray-400 truncate">{song.singer}</p>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button
                onClick={handleAddToQueue}
                className="p-1.5 text-gray-400 hover:text-white 
                         hover:bg-surface-active rounded-lg transition-all"
                title="Add to queue"
              >
                <QueueListIcon className="w-4 h-4" />
              </button>
              <button
                onClick={handlePlaylistClick}
                className="p-1.5 text-gray-400 hover:text-white 
                         hover:bg-surface-active rounded-lg transition-all"
                title="Add to playlist"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
              {showRemoveButton && (
                <button
                  onClick={onRemove}
                  className="p-1.5 text-gray-400 hover:text-red-500 
                           hover:bg-surface-active rounded-lg transition-all"
                  title="Remove from playlist"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <button
              onClick={handleLike}
              className={`p-1.5 hover:bg-surface-active rounded-lg transition-all
                       ${liked ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}
              title={liked ? 'Remove from liked' : 'Add to liked'}
            >
              <HeartIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}