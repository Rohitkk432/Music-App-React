'use client'

import { useAuth } from '@/hooks/useAuth'
import MainLayout from '@/components/layout/MainLayout'
import SearchBar from '@/components/music/SearchBar'
import Queue from '@/components/music/Queue'
import Loading from '@/components/ui/Loading'

export default function HomePage() {
  const { loading, userId } = useAuth()

  if (loading) return <Loading />
  if (!userId) return null

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Search Section */}
        <section className="space-y-6">
          <SearchBar userId={userId} />
        </section>

        {/* Queue Section */}
        <section className="mt-8">
          <Queue />
        </section>
      </div>
    </MainLayout>
  )
}
