'use client'

import { useAuth } from '@/hooks/useAuth'
import MainLayout from '@/components/layout/MainLayout'
import SearchBar from '@/components/music/SearchBar'
import Loading from '@/components/ui/Loading'

export default function HomePage() {
  const { loading, userId } = useAuth()

  if (loading) return <Loading />
  if (!userId) return null

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Search Songs</h1>
        <SearchBar />
      </div>
    </MainLayout>
  )
}
