'use client'

import { useState, useMemo } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import SearchResult from './SearchResult'
import { useAuth } from '@/hooks/useAuth'
import { songs } from '@/data/songs'  // Import local songs
import type { Song } from '@/types/music'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const { userId } = useAuth()

  // Filter songs based on search query
  const results = useMemo(() => {
    const searchTerm = query.trim().toLowerCase()
    if (!searchTerm) return songs // Show no songs when no search

    return songs.filter(song => 
      song.title.toLowerCase().includes(searchTerm) || 
      song.singer.toLowerCase().includes(searchTerm)
    )
  }, [query])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <div>
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search songs..."
          className="w-full pl-10 pr-4 py-3 bg-surface rounded-xl 
                   border border-gray-800/50 focus:border-blue-500/50 
                   focus:outline-none focus:ring-1 focus:ring-blue-500/50"
        />
      </div>

      {/* Grid container for results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {results.length > 0 ? (
          results.map(song => (
            <SearchResult 
              key={song.id} 
              {...song} 
              userId={userId || ''}
            />
          ))
        ) : query ? (
          <div className="col-span-full text-center text-gray-400 py-8">
            No songs found
          </div>
        ) : null}
      </div>
    </div>
  )
}
