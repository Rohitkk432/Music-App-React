import axios from 'axios'
import type { Song, QueueItem, LikedItem, PlaylistItem } from '@/types/music'

const API_URL = 'http://localhost:4000'

// User APIs
export async function getOrCreateUser(email: string) {
  try {
    // First try to get existing user
    const { data } = await axios.get<{ id: string }>(`${API_URL}/users/${email}`)
    return data
  } catch (error) {
    // If user doesn't exist, create new user
    const { data } = await axios.post<{ id: string }>(`${API_URL}/users`, { email })
    return data
  }
}

// Queue APIs
export async function getQueue(userId: string) {
  const { data } = await axios.get<Song[]>(`${API_URL}/queue/${userId}`)
  return data
}

export async function addToQueue(userId: string, songId: string) {
  const { data } = await axios.post<Song>(`${API_URL}/queue`, {
    user_id: userId,
    song_id: songId
  })
  return data
}

export async function removeFromQueue(userId: string, songId: string) {
  await axios.delete(`${API_URL}/queue`, {
    data: { user_id: userId, song_id: songId }
  })
}

export async function clearQueue(userId: string) {
  await axios.delete(`${API_URL}/queue/${userId}`)
}

// Playlist APIs
export async function getPlaylist(userId: string, playlistNumber: string) {
  const { data } = await axios.get<PlaylistItem[]>(
    `${API_URL}/playlist/${userId}/${playlistNumber}`
  )
  return data
}

export async function addToPlaylist(userId: string, songId: string, playlistNumber: number) {
  const { data } = await axios.post<PlaylistItem>(`${API_URL}/playlist`, {
    user_id: userId,
    song_id: songId,
    playlist_number: playlistNumber
  })
  return data
}

export async function removeFromPlaylist(userId: string, songId: string, playlistNumber: number) {
  const { data } = await axios.delete(`${API_URL}/playlist`, {
    data: {
      user_id: userId,
      song_id: songId,
      playlist_number: playlistNumber
    }
  })
  return data
}

// Liked APIs
export async function getLikedSongs(userId: string) {
  const { data } = await axios.get<Song[]>(`${API_URL}/liked/${userId}`)
  return data
}

export async function addToLiked(userId: string, songId: string) {
  const { data } = await axios.post<LikedItem>(`${API_URL}/liked`, {
    user_id: userId,
    song_id: songId
  })
  return data
}

export async function removeFromLiked(userId: string, songId: string) {
  const { data } = await axios.delete<LikedItem>(`${API_URL}/liked`, {
    data: { user_id: userId, song_id: songId }
  })
  return data
}

// Add playlist to queue
export async function addPlaylistToQueue(userId: string, playlistNumber: string) {
  const { data } = await axios.post<Song[]>(`${API_URL}/queue/playlist`, {
    user_id: userId,
    playlist_number: playlistNumber
  })
  return data
}