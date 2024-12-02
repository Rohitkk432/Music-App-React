'use client'

import { useState, useMemo } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import SearchResult from './SearchResult'
import { songs } from '@/data/songs'  // Import local songs
import type { Song } from '@/types/music'

interface SearchBarProps {
  userId: string
}

export default function SearchBar({ userId }: SearchBarProps) {
  const [query, setQuery] = useState('')

  // Filter songs based on search query
  const results = useMemo(() => {
    const searchTerm = query.trim().toLowerCase()
    if (!searchTerm) return songs // Show all songs when no search

    return songs.filter(song => 
      song.title.toLowerCase().includes(searchTerm) || 
      song.singer.toLowerCase().includes(searchTerm)
    )
  }, [query])

  const handleSearch = (value: string) => {
    setQuery(value)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Search Music</h1>
        <span className="text-gray-400">
          {results.length} {results.length === 1 ? 'song' : 'songs'}
        </span>
      </div>

      {/* Search Input */}
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search songs..."
          className="w-full pl-10 pr-4 py-3 bg-gray-800 rounded-lg text-sm 
                   placeholder-gray-400 focus:outline-none focus:ring-2 
                   focus:ring-blue-500"
        />
      </div>

      {/* Search Results - Always show results */}
      <div className="mt-4 space-y-2">
        {results.length === 0 ? (
          <p className="text-center text-gray-400 py-4">No songs found</p>
        ) : (
          results.map((song) => (
            <SearchResult 
              key={song.id} 
              {...song} 
              userId={userId}
            />
          ))
        )}
      </div>
    </div>
  )
}
