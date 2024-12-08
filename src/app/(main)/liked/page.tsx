'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { usePlayer } from '@/context/PlayerContext'
import { usePlaylistModal } from '@/context/PlaylistModalContext'
import { getLikedSongs, removeFromLiked } from '@/lib/api'
import MainLayout from '@/components/layout/MainLayout'
import SongCard from '@/components/music/SongCard'
import Loading from '@/components/ui/Loading'
import { PlayIcon, XMarkIcon } from '@heroicons/react/24/solid'
import type { Song } from '@/types/music'

export const dynamic = 'force-dynamic'

export default function LikedPage() {
  const [songs, setSongs] = useState<Song[]>([])
  const { loading, userId } = useAuth()
  const { addToQueue, playSong, clearQueue } = usePlayer()
  const { openPlaylistModal } = usePlaylistModal()

  useEffect(() => {
    if (userId) {
      fetchLikedSongs()
    }
  }, [userId])

  const fetchLikedSongs = async () => {
    if (!userId) return
    try {
      const data = await getLikedSongs(userId)
      setSongs(data)
    } catch (error) {
      console.error('Failed to fetch liked songs:', error)
    }
  }

  const handleUnlike = async (songId: string) => {
    if (!userId) return
    try {
      await removeFromLiked(userId, songId)
      await fetchLikedSongs()
    } catch (error) {
      console.error('Failed to remove from liked:', error)
    }
  }

  const handlePlayAll = async () => {
    if (!songs.length) return
    await clearQueue()
    songs.forEach(song => addToQueue(song))
    playSong(songs[0]) // Play the first song
  }

  if (loading) return <Loading />
  if (!userId) return null

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header with Play All */}
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

        {/* Mobile: List View */}
        <div className="sm:hidden space-y-2">
          {songs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              isLiked={true}
              onPlay={() => playSong(song)}
              onAddToQueue={() => addToQueue(song)}
              onAddToPlaylist={() => openPlaylistModal(song)}
              onLike={() => handleUnlike(song.id.toString())}
            />
          ))}
          {songs.length === 0 && (
            <p className="text-gray-400 text-center py-8">
              No liked songs yet
            </p>
          )}
        </div>

        {/* Desktop: Grid View */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {songs.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-8">
              No liked songs yet
            </div>
          ) : (
            songs.map(song => (
              <SongCard
                key={song.id}
                song={song}
                isLiked={true}
                onPlay={() => playSong(song)}
                onAddToQueue={() => addToQueue(song)}
                onAddToPlaylist={() => openPlaylistModal(song)}
                onLike={() => handleUnlike(song.id.toString())}
              />
            ))
          )}
        </div>
      </div>
    </MainLayout>
  )
} 