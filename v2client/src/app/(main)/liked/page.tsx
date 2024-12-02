'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { usePlayer } from '@/context/PlayerContext'
import MainLayout from '@/components/layout/MainLayout'
import { getLikedSongs, removeFromLiked } from '@/lib/api'
import { PlayIcon, HeartIcon } from '@heroicons/react/24/solid'
import type { Song } from '@/types/music'

export default function LikedPage() {
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const { userId } = useAuth()
  const { addToQueue, clearQueue, playSong } = usePlayer()

  useEffect(() => {
    async function loadLikedSongs() {
      if (!userId) return

      try {
        const items = await getLikedSongs(userId)
        setSongs(items)
      } catch (error) {
        console.error('Failed to load liked songs:', error)
      } finally {
        setLoading(false)
      }
    }

    loadLikedSongs()
  }, [userId])

  const handlePlayAll = async () => {
    if (!songs.length) return
    await clearQueue()
    songs.forEach(song => addToQueue(song))
    playSong(songs[0]) // Play the first song
  }

  const handleUnlike = async (songId: number) => {
    if (!userId) return

    try {
      await removeFromLiked(userId, songId.toString())
      setSongs(prev => prev.filter(song => song.id !== songId))
    } catch (error) {
      console.error('Failed to unlike song:', error)
    }
  }

  if (!userId) return null

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 
                         bg-clip-text text-transparent">
              Liked Songs
            </h1>
            <p className="text-gray-400 mt-1">
              {songs.length} {songs.length === 1 ? 'song' : 'songs'}
            </p>
          </div>

          {songs.length > 0 && (
            <button
              onClick={handlePlayAll}
              className="flex items-center justify-center gap-2 px-6 py-2.5
                     bg-gradient-to-r from-blue-500 to-purple-500 
                     hover:from-blue-600 hover:to-purple-600
                     rounded-lg transition-all duration-300 
                     hover:scale-[1.02] w-full sm:w-auto"
            >
              <PlayIcon className="w-5 h-5" />
              Play All
            </button>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent 
                         rounded-full animate-spin" />
          </div>
        ) : songs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-2">
              No liked songs yet
            </p>
            <p className="text-sm text-gray-500">
              Start liking songs to add them here
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {songs.map((song) => (
              <div 
                key={song.id}
                className="flex items-center justify-between p-3 bg-gray-800 
                         hover:bg-gray-700 rounded-lg transition-all duration-300
                         hover:scale-[1.01] group"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="relative group/play">
                    <img 
                      src={song.imgpath} 
                      alt={song.title}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover 
                               shadow-lg transition-transform duration-300
                               group-hover/play:scale-105"
                    />
                    <button
                      onClick={() => playSong(song)}
                      className="absolute inset-0 flex items-center justify-center 
                               bg-gray-900 opacity-0 group-hover/play:opacity-90 
                               transition-all duration-300 rounded-lg
                               ring-1 ring-blue-500/0 group-hover/play:ring-blue-500"
                      title="Play"
                    >
                      <PlayIcon className="w-6 h-6 transform scale-90 
                                       group-hover/play:scale-100 transition-transform" />
                    </button>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-sm truncate text-gray-100">
                      {song.title}
                    </h3>
                    <p className="text-xs text-gray-400 truncate">
                      {song.singer}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400 hidden sm:block">
                    {song.duration}
                  </span>
                  <button
                    onClick={() => handleUnlike(song.id)}
                    className="p-2 text-red-500 hover:bg-gray-600 rounded-lg 
                           transition-all duration-300 hover:scale-105"
                    title="Unlike"
                  >
                    <HeartIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  )
} 