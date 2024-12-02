'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { usePlayer } from '@/context/PlayerContext'
import MainLayout from '@/components/layout/MainLayout'
import { getPlaylist, removeFromPlaylist, addPlaylistToQueue } from '@/lib/api'
import { PlayIcon, XMarkIcon, MusicalNoteIcon } from '@heroicons/react/24/solid'
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

  const handleRemoveSong = async (songId: number) => {
    if (!userId) return

    try {
      await removeFromPlaylist(userId, songId.toString(), Number(currentPlaylist))
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
      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Your Playlists</h1>
            <p className="page-subtitle">
              {playlists[currentPlaylist]?.length || 0} songs
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {/* Playlist Toggle */}
            <div className="flex rounded-xl overflow-hidden bg-surface border border-gray-800">
              {['1', '2', '3'].map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPlaylist(num)}
                  className={`flex-1 sm:flex-none px-6 py-2.5 text-sm font-medium transition-all duration-300
                    ${currentPlaylist === num 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-surface-hover'}`}
                >
                  Playlist {num}
                </button>
              ))}
            </div>

            {/* Play All Button */}
            {playlists[currentPlaylist]?.length > 0 && (
              <button
                onClick={handlePlayPlaylist}
                className="action-button"
              >
                <PlayIcon className="w-5 h-5" />
                Play All
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent 
                         rounded-full animate-spin" />
          </div>
        ) : (
          <div className="bg-surface/50 rounded-xl p-4 sm:p-6 border border-gray-800/50">
            <div className="content-grid">
              {!playlists[currentPlaylist]?.length ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-surface-active 
                               flex items-center justify-center">
                    <MusicalNoteIcon className="w-8 h-8 text-gray-600" />
                  </div>
                  <p className="text-gray-400 mb-2">
                    This playlist is empty
                  </p>
                  <p className="text-sm text-gray-500">
                    Add songs to start playing
                  </p>
                </div>
              ) : (
                playlists[currentPlaylist].map((song) => (
                  <div 
                    key={song.id}
                    className="flex items-center justify-between p-3 bg-surface 
                             hover:bg-surface-hover rounded-xl transition-all duration-300
                             hover:scale-[1.01] group border border-gray-800/50"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="relative group/play">
                        <img 
                          src={song.imgpath} 
                          alt={song.title}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover 
                                   shadow-lg transition-transform duration-300
                                   group-hover/play:scale-105"
                        />
                        <button
                          onClick={() => playFromQueue(song)}
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

                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-400 hidden sm:block">
                        {song.duration}
                      </span>
                      <button
                        onClick={() => handleRemoveSong(song.id)}
                        className="p-2 text-gray-400 hover:text-red-500 
                                 transition-colors duration-300 rounded-lg
                                 hover:bg-surface-active"
                        title="Remove from playlist"
                      >
                        <XMarkIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
