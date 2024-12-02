'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { usePlayer } from '@/context/PlayerContext'
import { usePlaylistModal } from '@/context/PlaylistModalContext'
import { getPlaylist, removeFromPlaylist, addPlaylistToQueue } from '@/lib/api'
import MainLayout from '@/components/layout/MainLayout'
import SongCard from '@/components/music/SongCard'
import Loading from '@/components/ui/Loading'
import { PlayIcon } from '@heroicons/react/24/solid'
import type { Song } from '@/types/music'

export default function PlaylistPage() {
  const [currentPlaylist, setCurrentPlaylist] = useState('1')
  const [playlists, setPlaylists] = useState<Record<string, Song[]>>({
    '1': [],
    '2': [],
    '3': []
  })
  const { loading, userId } = useAuth()
  const { addToQueue, playSong, clearQueue } = usePlayer()
  const { openPlaylistModal } = usePlaylistModal()

  useEffect(() => {
    if (userId) {
      fetchPlaylist()
    }
  }, [userId, currentPlaylist])

  const fetchPlaylist = async () => {
    if (!userId) return
    try {
      const data = await getPlaylist(userId, currentPlaylist)
      setPlaylists(prev => ({
        ...prev,
        [currentPlaylist]: data
      }))
    } catch (error) {
      console.error('Failed to fetch playlist:', error)
    }
  }

  const handleRemove = async (songId: string) => {
    if (!userId) return
    try {
      await removeFromPlaylist(userId, songId, Number(currentPlaylist))
      await fetchPlaylist()
    } catch (error) {
      console.error('Failed to remove from playlist:', error)
    }
  }

  const handlePlayAll = async () => {
    const currentSongs = playlists[currentPlaylist]
    if (!currentSongs.length) return
    
    await clearQueue()
    currentSongs.forEach(song => addToQueue(song))
    playSong(currentSongs[0])
  }

  if (loading) return <Loading />
  if (!userId) return null

  const currentSongs = playlists[currentPlaylist]

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header with Toggle and Play All */}
        <div className="flex flex-col gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 
                         bg-clip-text text-transparent">
              Playlist {currentPlaylist}
            </h1>
            <p className="text-gray-400 mt-1">
              {currentSongs.length} {currentSongs.length === 1 ? 'song' : 'songs'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Playlist Toggle */}
            <div className="flex rounded-lg overflow-hidden bg-surface w-full sm:w-auto">
              {['1', '2', '3'].map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPlaylist(num)}
                  className={`flex-1 sm:flex-none px-4 py-2.5 text-sm font-medium transition-colors
                    ${currentPlaylist === num 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-surface-hover'}`}
                >
                  Playlist {num}
                </button>
              ))}
            </div>

            {currentSongs.length > 0 && (
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
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentSongs.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-8">
              This playlist is empty
            </div>
          ) : (
            currentSongs.map(song => (
              <SongCard
                key={song.id}
                {...song}
                userId={userId}
                onPlay={() => playSong(song)}
                onAddToQueue={() => addToQueue(song)}
                onAddToPlaylist={() => openPlaylistModal(song)}
                showRemove
                onRemove={() => handleRemove(song.id.toString())}
              />
            ))
          )}
        </div>
      </div>
    </MainLayout>
  )
}
