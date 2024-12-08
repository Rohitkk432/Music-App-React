'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { checkAdminAccess } from '@/lib/admin'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/context/ToastContext'
import MainLayout from '@/components/layout/MainLayout'
import { TrashIcon } from '@heroicons/react/24/outline'
import type { Song } from '@/types/music'
import { getAllSongs } from '@/lib/api'
import ConfirmModal from '@/components/ui/ConfirmModal'

const formatFileName = (fileName: string) => {
  if (fileName.length > 20) {
    return fileName.substring(0, 17) + '...'
  }
  return fileName
}

export default function AdminPage() {
  const router = useRouter()
  const { showToast } = useToast()
  const [hasAccess, setHasAccess] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    singer: '',
    duration: '',
    audioFile: null as File | null,
    imageFile: null as File | null,
  })
  const [songs, setSongs] = useState<Song[]>([])
  const [songToDelete, setSongToDelete] = useState<Song | null>(null)

  useEffect(() => {
    const checkAccess = async () => {
      const isAdmin = await checkAdminAccess()
      if (!isAdmin) {
        router.push('/home')
      } else {
        setHasAccess(true)
      }
    }
    
    checkAccess()
  }, [router])

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const allSongs = await getAllSongs()
        setSongs(allSongs)
      } catch (error) {
        console.error('Failed to load songs:', error)
      }
    }

    if (hasAccess) {
      loadSongs()
    }
  }, [hasAccess])

  if (!hasAccess) {
    return null
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'audio' | 'image') => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        [type === 'audio' ? 'audioFile' : 'imageFile']: file
      }))
    }
  }

  const uploadFile = async (file: File, path: string) => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `${path}/${fileName}`

      console.log('Uploading file:', {
        bucket: 'songs',
        path: filePath,
        fileSize: file.size,
        fileType: file.type
      })

      const { error: uploadError } = await supabase.storage
        .from('songs')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.error('Upload error:', uploadError)
        throw uploadError
      }

      const { data } = supabase.storage
        .from('songs')
        .getPublicUrl(filePath)

      console.log('Upload successful:', data.publicUrl)
      return data.publicUrl
    } catch (error) {
      console.error('Upload failed:', error)
      throw new Error('Failed to upload file. Please try again.')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.audioFile) {
      showToast('Please select an audio file', 'error')
      return
    }

    try {
      setUploading(true)

      // Upload files to Supabase Storage
      const audioUrl = await uploadFile(formData.audioFile, 'audio')
      let imageUrl = null
      if (formData.imageFile) {
        imageUrl = await uploadFile(formData.imageFile, 'images')
      }

      // Add song to database
      const { error: dbError } = await supabase
        .from('songs')
        .insert({
          title: formData.title,
          singer: formData.singer,
          audiopath: audioUrl,
          imgpath: imageUrl,
          duration: formData.duration,
        })

      if (dbError) throw dbError

      // Reset form
      setFormData({
        title: '',
        singer: '',
        duration: '',
        audioFile: null,
        imageFile: null,
      })

      showToast('Song added successfully!', 'success')
    } catch (error) {
      console.error('Error:', error)
      showToast('Failed to add song. Please check console for details.', 'error')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (song: Song) => {
    try {
      const { error } = await supabase
        .from('songs')
        .delete()
        .eq('id', song.id.toString())

      if (error) throw error

      setSongs(prev => prev.filter(s => s.id !== song.id))
      showToast('Song deleted successfully', 'success')
    } catch (error) {
      console.error('Failed to delete song:', error)
      showToast('Failed to delete song', 'error')
    }
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 
                     bg-clip-text text-transparent mb-8 text-center">
          Admin Dashboard
        </h1>

        <div className="max-w-2xl mx-auto space-y-8">
          <div className="bg-surface p-6 rounded-xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-4 text-center">Upload Song</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* File Uploads */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Audio Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Audio File
                  </label>
                  <label className="relative flex flex-col items-center justify-center aspect-square 
                                border-2 border-gray-600 border-dashed rounded-lg 
                                cursor-pointer bg-surface-active hover:bg-surface-hover
                                transition-colors overflow-hidden">
                    {formData.audioFile ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center 
                                  bg-surface-active p-4 text-center">
                        <svg className="w-8 h-8 text-blue-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                        <p className="text-sm font-medium text-gray-300">
                          {formatFileName(formData.audioFile.name)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Click to change</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-4 text-center">
                        <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-400">
                          <span className="font-semibold">Click to upload</span> audio
                        </p>
                        <p className="text-xs text-gray-500">MP3 or WAV up to 10MB</p>
                      </div>
                    )}
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="audio/*"
                      onChange={(e) => handleFileChange(e, 'audio')}
                    />
                  </label>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Cover Image
                  </label>
                  <label className="relative flex flex-col items-center justify-center aspect-square 
                                border-2 border-gray-600 border-dashed rounded-lg 
                                cursor-pointer bg-surface-active hover:bg-surface-hover
                                transition-colors overflow-hidden">
                    {formData.imageFile ? (
                      <div className="absolute inset-0">
                        <img 
                          src={URL.createObjectURL(formData.imageFile)} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center 
                                    justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <p className="text-sm font-medium text-white">Click to change</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-4 text-center">
                        <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-400">
                          <span className="font-semibold">Click to upload</span> image
                        </p>
                        <p className="text-xs text-gray-500">JPG or PNG up to 5MB</p>
                      </div>
                    )}
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'image')}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 bg-background rounded-lg"
                  required
                  aria-label="Song title"
                  placeholder="Enter song title"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">Singer</label>
                <input
                  type="text"
                  value={formData.singer}
                  onChange={e => setFormData(prev => ({ ...prev, singer: e.target.value }))}
                  className="w-full px-4 py-2 bg-background rounded-lg"
                  required
                  aria-label="Singer name"
                  placeholder="Enter singer name"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">Duration (HH:MM:SS)</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={e => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  className="w-full px-4 py-2 bg-background rounded-lg"
                  pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
                  placeholder="00:03:30"
                  required
                  aria-label="Song duration"
                />
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 
                         hover:from-blue-600 hover:to-purple-600 rounded-lg
                         transition-all duration-300 hover:scale-[1.02]
                         disabled:opacity-50 disabled:cursor-not-allowed
                         disabled:hover:scale-100"
              >
                {uploading ? 'Uploading...' : 'Upload Song'}
              </button>
            </form>
          </div>

          <div className="bg-surface p-6 rounded-xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-4 text-center">Manage Songs</h2>
            <div className="space-y-2">
              {songs.map(song => (
                <div 
                  key={song.id}
                  className="flex items-center justify-between p-3 bg-surface-active 
                           rounded-lg hover:bg-surface-hover transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={song.imgpath || '/placeholder.jpg'} 
                      alt={song.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{song.title}</h3>
                      <p className="text-sm text-gray-400">{song.singer}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSongToDelete(song)}
                    className="p-2 text-gray-400 hover:text-red-500 
                             hover:bg-surface rounded-lg transition-colors"
                    title="Delete song"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}

              {songs.length === 0 && (
                <p className="text-center text-gray-400 py-4">
                  No songs found
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={!!songToDelete}
        onClose={() => setSongToDelete(null)}
        onConfirm={() => {
          if (songToDelete) {
            handleDelete(songToDelete)
          }
          setSongToDelete(null)
        }}
        title="Delete Song"
        message={`Are you sure you want to delete "${songToDelete?.title}"? This action cannot be undone.`}
      />
    </MainLayout>
  )
} 