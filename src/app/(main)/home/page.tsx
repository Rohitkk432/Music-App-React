'use client'

import { useEffect, useState } from 'react'
import { getAllSongs } from '@/lib/api'
import type { Song } from '@/types/music'
import MainLayout from '@/components/layout/MainLayout'
import SearchBar from '@/components/music/SearchBar'
import SongCard from '@/components/music/SongCard'
import Loading from '@/components/ui/Loading'
import { useToast } from '@/context/ToastContext'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const { showToast } = useToast()

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await getAllSongs()
        setSongs(data)
      } catch (error) {
        console.error('Failed to fetch songs:', error)
        showToast('Failed to load songs', 'error')
      } finally {
        setLoading(false)
      }
    }

    fetchSongs()
  }, [showToast])

  if (loading) return <Loading />

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Search Songs</h1>
        <SearchBar />

        <h2 className="text-xl font-bold mt-12 mb-6">All Songs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {songs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
