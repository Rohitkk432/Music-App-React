'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { usePlaylistModal } from '@/context/PlaylistModalContext'
import { addToPlaylist } from '@/lib/api'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/context/ToastContext'
import { supabase } from '@/lib/supabase'

export default function PlaylistModal() {
  const { isOpen, onClose, currentSong } = usePlaylistModal()
  console.log('PlaylistModal state:', { isOpen, currentSong })
  const { userId } = useAuth()
  const { showToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToPlaylist = async (playlistNumber: number) => {
    if (!userId || !currentSong) {
      showToast('Something went wrong', 'error')
      setIsLoading(false)
      return
    }

    try {
      // Check if song already exists in playlist
      const { data: existingSong } = await supabase
        .from('playlist')
        .select('*')
        .match({ 
          user_id: userId, 
          song_id: currentSong.id,
          playlist_number: playlistNumber 
        })
        .single()

      if (existingSong) {
        showToast('Song already exists in this playlist', 'error')
        setIsLoading(false)
        return
      }

      await addToPlaylist(userId, currentSong.id.toString(), playlistNumber)
      showToast(`Added to Playlist ${playlistNumber}`, 'success')
      setIsLoading(false)
      onClose()
    } catch (error: any) {
      console.error('Failed to add to playlist:', error)
      if (error?.code === '23505') {
        showToast('Song already exists in this playlist', 'error')
      } else {
        showToast('Failed to add to playlist', 'error')
      }
      setIsLoading(false)
    }
  }

  const handleClick = async (playlistNumber: number) => {
    if (isLoading) return
    setIsLoading(true)
    await handleAddToPlaylist(playlistNumber)
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog 
        as="div" 
        className="relative z-50" 
        onClose={() => {
          setIsLoading(false)
          onClose()
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl 
                                     bg-surface p-6 shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6"
                >
                  Add to Playlist
                </Dialog.Title>

                <div className="mt-4 space-y-2">
                  {[1, 2, 3].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleClick(num)}
                      disabled={isLoading}
                      className={`w-full px-4 py-3 text-left rounded-lg 
                               bg-surface-active hover:bg-surface-hover 
                               transition-colors duration-300
                               ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      Playlist {num}
                    </button>
                  ))}
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    disabled={isLoading}
                    className={`w-full px-4 py-2 text-sm font-medium 
                             bg-red-500 hover:bg-red-600 
                             rounded-lg transition-colors
                             ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => {
                      setIsLoading(false)
                      onClose()
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
} 