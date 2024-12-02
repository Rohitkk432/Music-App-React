'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { usePlayer } from '@/context/PlayerContext'
import MainLayout from '@/components/layout/MainLayout'
import { getPlaylist, removeFromPlaylist, addPlaylistToQueue } from '@/lib/api'
import { PlayIcon, XMarkIcon } from '@heroicons/react/24/solid'
import type { PlaylistItem } from '@/types/music'

export default function PlaylistPage() {
  const [playlists, setPlaylists] = useState<{ [key: string]: PlaylistItem[] }>({})
  const [currentPlaylist, setCurrentPlaylist] = useState('1')
  const [loading, setLoading] = useState(true)
  const { userId } = useAuth()
  const { refetchQueue, playFromQueue } = usePlayer()

  useEffect(() => {
    async function loadPlaylists() {
      if (!userId) return

      try {
        const [playlist1, playlist2, playlist3] = await Promise.all([
          getPlaylist(userId, '1'),
          getPlaylist(userId, '2'),
          getPlaylist(userId, '3')
        ])

        setPlaylists({
          '1': playlist1,
          '2': playlist2,
          '3': playlist3
        })
      } catch (error) {
        console.error('Failed to load playlists:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPlaylists()
  }, [userId])

  const handlePlayPlaylist = async () => {
    if (!userId || !currentPlaylist) return
    
    try {
      const newQueue = await addPlaylistToQueue(userId, currentPlaylist)
      if (newQueue.length > 0) {
        await refetchQueue()
        playFromQueue(newQueue[0])
      }
    } catch (error) {
      console.error('Failed to play playlist:', error)
    }
  }

  const handleRemoveSong = async (songId: string) => {
    if (!userId) return
    if (!songId) return

    try {
      await removeFromPlaylist(userId, songId, Number(currentPlaylist))
      setPlaylists(prev => ({
        ...prev,
        [currentPlaylist]: prev[currentPlaylist].filter(song => song.id !== songId)
      }))
    } catch (error) {
      console.error('Failed to remove song:', error)
    }
  }

  if (!userId) return null

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header with Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold">Your Playlist</h1>
          
          <div className="flex items-center gap-4">
            {/* Playlist Toggle */}
            <div className="flex rounded-lg overflow-hidden bg-gray-800">
              {['1', '2', '3'].map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPlaylist(num)}
                  className={`px-4 py-2 text-sm font-medium transition-colors
                    ${currentPlaylist === num 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
                >
                  Playlist {num}
                </button>
              ))}
            </div>

            {/* Play All Button */}
            {playlists[currentPlaylist]?.length > 0 && (
              <button
                onClick={handlePlayPlaylist}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 
                         rounded-lg text-sm transition-colors"
              >
                <PlayIcon className="w-4 h-4" />
                Play All
              </button>
            )}
          </div>
        </div>

        {/* Playlist Content */}
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="bg-gray-800/50 rounded-lg p-6">
            <div className="space-y-3">
              {playlists[currentPlaylist]?.length === 0 ? (
                <p className="text-center text-gray-400 py-8">
                  This playlist is empty
                </p>
              ) : (
                playlists[currentPlaylist].map((song) => {
                  return (
                    <div 
                      key={song.id}
                      className="flex items-center gap-3 p-2 bg-gray-700/30 rounded-lg group"
                    >
                      <img 
                        src={song.imgpath} 
                        alt={song.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">
                          {song.title}
                        </h3>
                        <p className="text-sm text-gray-400 truncate">
                          {song.singer}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveSong(song.id)}
                        className="p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                        title="Remove from playlist"
                      >
                        <XMarkIcon className="w-5 h-5" />
                      </button>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
