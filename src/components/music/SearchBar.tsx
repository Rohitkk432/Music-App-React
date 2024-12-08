'use client'

import { useState, useEffect } from 'react'
import { searchSongs } from '@/lib/api'
import type { Song } from '@/types/music'
import SongCard from './SongCard'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.trim()) {
        setLoading(true)
        try {
          const results = await searchSongs(query)
          setSongs(results)
        } catch (error) {
          console.error('Search error:', error)
        } finally {
          setLoading(false)
        }
      } else {
        setSongs([])
      }
    }, 300)

    return () => clearTimeout(searchTimeout)
  }, [query])

  return (
    <div>
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 
                     rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 
                                      text-gray-400 group-hover:text-white transition-colors" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search songs..."
            className="w-full pl-10 pr-4 py-2 bg-surface rounded-lg 
                     border border-gray-800 focus:border-transparent
                     focus:outline-none focus:ring-2 focus:ring-blue-500/50
                     group-hover:border-transparent transition-all"
          />
        </div>
      </div>

      {loading ? (
        <div className="mt-4 text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          {songs.length > 0 &&
            songs.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
        </div>
      )}
    </div>
  )
}
