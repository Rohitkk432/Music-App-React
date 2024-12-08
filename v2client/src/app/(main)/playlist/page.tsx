'use client'

import { useEffect, useState } from 'react'
import { getPlaylist, removeFromPlaylist, clearPlaylist } from '@/lib/api'
import type { Song } from '@/types/music'
import MainLayout from '@/components/layout/MainLayout'
import SongCard from '@/components/music/SongCard'
import { useAuth } from '@/hooks/useAuth'
import Loading from '@/components/ui/Loading'
import { usePlayer } from '@/context/PlayerContext'
import { usePlaylistModal } from '@/context/PlaylistModalContext'
import { PlayIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useToast } from '@/context/ToastContext'

export default function PlaylistPage() {
  const [songs, setSongs] = useState<Record<number, Song[]>>({
    1: [],
    2: [],
    3: []
  })
  const [loading, setLoading] = useState(true)
  const { userId } = useAuth()
  const { addToQueue, playSong, clearQueue } = usePlayer()
  const { openPlaylistModal } = usePlaylistModal()
  const [activePlaylist, setActivePlaylist] = useState(1)
  const { showToast } = useToast()

  useEffect(() => {
    if (!userId) return

    const loadPlaylist = async () => {
      try {
        const songs = await getPlaylist(userId, activePlaylist)
        setSongs(prev => ({
          ...prev,
          [activePlaylist]: songs
        }))
      } catch (error) {
        console.error('Failed to load playlist:', error)
      }
    }

    loadPlaylist()
  }, [userId, activePlaylist])

  const handleRemove = async (songId: string) => {
    if (!userId) return

    try {
      await removeFromPlaylist(userId, songId, activePlaylist)
      setSongs(prev => ({
        ...prev,
        [activePlaylist]: prev[activePlaylist].filter(s => s.id.toString() === songId)
      }))
      showToast('Removed from playlist', 'success')
    } catch (error) {
      console.error('Failed to remove from playlist:', error)
      showToast('Failed to remove from playlist', 'error')
    }
  }

  const handlePlayAll = async () => {
    if (!songs[activePlaylist].length) return
    await clearQueue()
    songs[activePlaylist].forEach(song => addToQueue(song))
    playSong(songs[activePlaylist][0]) // Play the first song
  }

  const handleClearPlaylist = async () => {
    if (!userId || !songs[activePlaylist].length) return
    try {
      await clearPlaylist(userId, activePlaylist)
      setSongs(prev => ({
        ...prev,
        [activePlaylist]: []
      }))
      showToast('Playlist cleared', 'success')
    } catch (error) {
      console.error('Failed to clear playlist:', error)
      showToast('Failed to clear playlist', 'error')
    }
  }

  if (loading) return <Loading />

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 
                         bg-clip-text text-transparent">
              Playlists
            </h1>
            <p className="text-gray-400 mt-1">
              {songs[activePlaylist].length} {songs[activePlaylist].length === 1 ? 'song' : 'songs'}
            </p>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            {songs[activePlaylist].length > 0 && (
              <>
                <button
                  onClick={handlePlayAll}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5
                         bg-gradient-to-r from-blue-500 to-purple-500 
                         hover:from-blue-600 hover:to-purple-600
                         rounded-lg transition-all duration-300 
                         hover:scale-[1.02]"
                >
                  <PlayIcon className="w-5 h-5" />
                  Play All
                </button>
                <button
                  onClick={handleClearPlaylist}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5
                         bg-red-500 hover:bg-red-600
                         rounded-lg transition-all duration-300 
                         hover:scale-[1.02]"
                >
                  <XMarkIcon className="w-5 h-5" />
                  Clear
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => setActivePlaylist(num)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap
                ${activePlaylist === num 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                  : 'bg-surface text-gray-400 hover:text-white'}`}
            >
              Playlist {num}
            </button>
          ))}
        </div>

        {/* Mobile: List View */}
        <div className="sm:hidden space-y-2">
          {songs[activePlaylist].map((song) => (
            <SongCard
              key={song.id}
              song={song}
              showRemoveButton
              onPlay={() => playSong(song)}
              onAddToQueue={() => addToQueue(song)}
              onAddToPlaylist={() => openPlaylistModal(song)}
              onRemove={() => handleRemove(song.id.toString())}
            />
          ))}
          {songs[activePlaylist].length === 0 && (
            <p className="text-gray-400 text-center py-8">
              No songs in Playlist {activePlaylist}
            </p>
          )}
        </div>

        {/* Desktop: Grid View */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {songs[activePlaylist].length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-8">
              No songs in Playlist {activePlaylist}
            </div>
          ) : (
            songs[activePlaylist].map(song => (
              <SongCard
                key={song.id}
                song={song}
                showRemoveButton
                onPlay={() => playSong(song)}
                onAddToQueue={() => addToQueue(song)}
                onAddToPlaylist={() => openPlaylistModal(song)}
                onRemove={() => handleRemove(song.id.toString())}
              />
            ))
          )}
        </div>
      </div>
    </MainLayout>
  )
}
