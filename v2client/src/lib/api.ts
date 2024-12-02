import axios from 'axios'
import type { Song, QueueItem, LikedItem, PlaylistItem } from '@/types/music'

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// API wrapper function
export const apiCall = async <T>(
  fn: () => Promise<T>,
  {
    successMessage,
    errorMessage = 'An error occurred',
    showSuccessToast = true,
  }: {
    successMessage?: string
    errorMessage?: string
    showSuccessToast?: boolean
  } = {}
): Promise<T> => {
  try {
    const result = await fn()
    
    // Dispatch success toast event if message provided
    if (showSuccessToast && successMessage) {
      window.dispatchEvent(new CustomEvent('toast', {
        detail: { message: successMessage, type: 'success' }
      }))
    }
    
    return result
  } catch (error) {
    // Dispatch error toast event
    window.dispatchEvent(new CustomEvent('toast', {
      detail: { message: errorMessage, type: 'error' }
    }))
    console.error('API Error:', error)
    throw error
  }
}

// User APIs
export async function getOrCreateUser(email: string) {
  return apiCall(
    async () => {
      try {
        // First try to get existing user
        const { data } = await api.get<{ id: string }>(`/users/${email}`)
        return data
      } catch (error) {
        // If user doesn't exist, create new user
        const { data } = await api.post<{ id: string }>('/users', { email })
        return data
      }
    },
    {
      errorMessage: 'Failed to initialize user',
      showSuccessToast: false // We're handling success toasts manually
    }
  )
}

// Queue APIs
export async function getQueue(userId: string) {
  return apiCall(
    async () => {
      const { data } = await api.get<Song[]>(`/queue/${userId}`)
      return data
    },
    {
      errorMessage: 'Failed to get queue',
      showSuccessToast: false
    }
  )
}

export async function addToQueue(userId: string, songId: string) {
  return apiCall(
    async () => {
      // First check if song is already in queue
      const queue = await api.get<Song[]>(`/queue/${userId}`)
      if (queue.data.some(song => song.id === Number(songId))) {
        window.dispatchEvent(new CustomEvent('toast', {
          detail: { message: 'Song is already in queue', type: 'info' }
        }))
        return queue.data[0] // Return any song to maintain type safety
      }

      const { data } = await api.post<Song>('/queue', {
        user_id: userId,
        song_id: songId
      })
      window.dispatchEvent(new CustomEvent('toast', {
        detail: { message: `${data.title} added to queue`, type: 'success' }
      }))
      return data
    },
    {
      errorMessage: 'Failed to add to queue',
      showSuccessToast: false
    }
  )
}

export async function removeFromQueue(userId: string, songId: string) {
  return apiCall(
    async () => {
      await api.delete('/queue', {
        data: { user_id: userId, song_id: songId }
      })
    },
    {
      successMessage: 'Removed from queue',
      errorMessage: 'Failed to remove from queue'
    }
  )
}

export async function clearQueue(userId: string) {
  return apiCall(
    async () => {
      await api.delete(`/queue/${userId}`)
      window.dispatchEvent(new CustomEvent('toast', {
        detail: { message: 'Queue has been cleared', type: 'success' }
      }))
    },
    {
      errorMessage: 'Failed to clear queue',
      showSuccessToast: false
    }
  )
}

// Playlist APIs
export async function getPlaylist(userId: string, playlistNumber: string) {
  return apiCall(
    async () => {
      const { data } = await api.get<PlaylistItem[]>(
        `/playlist/${userId}/${playlistNumber}`
      )
      return data
    },
    {
      errorMessage: 'Failed to get playlist',
      showSuccessToast: false
    }
  )
}

export async function addToPlaylist(userId: string, songId: string, playlistNumber: number) {
  return apiCall(
    async () => {
      // Validate playlist number
      if (![1, 2, 3].includes(playlistNumber)) {
        window.dispatchEvent(new CustomEvent('toast', {
          detail: { message: 'Invalid playlist number', type: 'error' }
        }))
        throw new Error('Invalid playlist number')
      }

      // Check if song is already in playlist
      const playlist = await api.get<Song[]>(
        `/playlist/${userId}/${playlistNumber}`
      )
      if (playlist.data.some(song => song.id === Number(songId))) {
        window.dispatchEvent(new CustomEvent('toast', {
          detail: { message: `Song already exists in Playlist ${playlistNumber}`, type: 'info' }
        }))
        return playlist.data[0]
      }

      const { data } = await api.post<PlaylistItem>('/playlist', {
        user_id: userId,
        song_id: songId,
        playlist_number: playlistNumber
      })
      window.dispatchEvent(new CustomEvent('toast', {
        detail: { message: `Added to Playlist ${playlistNumber}`, type: 'success' }
      }))
      return data
    },
    {
      errorMessage: 'Failed to add to playlist',
      showSuccessToast: false
    }
  )
}

export async function removeFromPlaylist(userId: string, songId: string, playlistNumber: number) {
  return apiCall(
    async () => {
      const { data } = await api.delete('/playlist', {
        data: {
          user_id: userId,
          song_id: songId,
          playlist_number: playlistNumber
        }
      })
      window.dispatchEvent(new CustomEvent('toast', {
        detail: { message: `Removed from Playlist ${playlistNumber}`, type: 'success' }
      }))
      return data
    },
    {
      errorMessage: 'Failed to remove from playlist',
      showSuccessToast: false
    }
  )
}

// Liked APIs
export async function getLikedSongs(userId: string) {
  return apiCall(
    async () => {
      const { data } = await api.get<Song[]>(`/liked/${userId}`)
      return data
    },
    {
      errorMessage: 'Failed to get liked songs',
      showSuccessToast: false
    }
  )
}

export async function addToLiked(userId: string, songId: string) {
  return apiCall(
    async () => {
      // Check if song is already liked
      const liked = await api.get<Song[]>(`/liked/${userId}`)
      if (liked.data.some(song => song.id === Number(songId))) {
        window.dispatchEvent(new CustomEvent('toast', {
          detail: { message: 'Song is already in Liked Songs', type: 'info' }
        }))
        return liked.data[0]
      }

      const { data } = await api.post<LikedItem>('/liked', {
        user_id: userId,
        song_id: songId
      })
      window.dispatchEvent(new CustomEvent('toast', {
        detail: { message: 'Added to Liked Songs', type: 'success' }
      }))
      return data
    },
    {
      errorMessage: 'Failed to add to liked songs',
      showSuccessToast: false
    }
  )
}

export async function removeFromLiked(userId: string, songId: string) {
  return apiCall(
    async () => {
      const { data } = await api.delete<LikedItem>('/liked', {
        data: { user_id: userId, song_id: songId }
      })
      window.dispatchEvent(new CustomEvent('toast', {
        detail: { message: 'Removed from Liked Songs', type: 'success' }
      }))
      return data
    },
    {
      errorMessage: 'Failed to remove from liked songs',
      showSuccessToast: false
    }
  )
}

// Add playlist to queue
export async function addPlaylistToQueue(userId: string, playlistNumber: string) {
  return apiCall(
    async () => {
      const { data } = await api.post<Song[]>('/queue/playlist', {
        user_id: userId,
        playlist_number: playlistNumber
      })
      window.dispatchEvent(new CustomEvent('toast', {
        detail: { message: `Playlist ${playlistNumber} added to queue`, type: 'success' }
      }))
      return data
    },
    {
      errorMessage: 'Failed to add playlist to queue',
      showSuccessToast: false
    }
  )
}