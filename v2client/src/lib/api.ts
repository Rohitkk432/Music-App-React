import { supabase } from './supabase'
import type { Song } from '@/types/music'

// Songs
export const getAllSongs = async (): Promise<Song[]> => {
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// Liked Songs
export const getLikedSongs = async (userId: string): Promise<Song[]> => {
  const { data, error } = await supabase
    .from('liked')
    .select(`
      songs (*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data?.map(item => (item.songs as unknown) as Song) ?? []
}

export const addToLiked = async (userId: string, songId: string): Promise<void> => {
  const { error } = await supabase
    .from('liked')
    .insert({ user_id: userId, song_id: songId })

  if (error) throw error
}

export const removeFromLiked = async (userId: string, songId: string): Promise<void> => {
  const { error } = await supabase
    .from('liked')
    .delete()
    .match({ user_id: userId, song_id: songId })

  if (error) throw error
}

// Queue
export const getQueue = async (userId: string): Promise<Song[]> => {
  const { data, error } = await supabase
    .from('queue')
    .select(`
      songs (*)
    `)
    .eq('user_id', userId)
    .order('position', { ascending: true })

  if (error) throw error
  return data?.map(item => (item.songs as unknown) as Song) ?? []
}

export const addToQueue = async (userId: string, songId: string): Promise<void> => {
  // Get highest position
  const { data: lastItem } = await supabase
    .from('queue')
    .select('position')
    .eq('user_id', userId)
    .order('position', { ascending: false })
    .limit(1)

  const position = (lastItem?.[0]?.position ?? 0) + 1

  const { error } = await supabase
    .from('queue')
    .insert({ user_id: userId, song_id: songId, position })

  if (error) throw error
}

export const removeFromQueue = async (userId: string, songId: string): Promise<void> => {
  const { error } = await supabase
    .from('queue')
    .delete()
    .match({ user_id: userId, song_id: songId })

  if (error) throw error
}

export const clearQueue = async (userId: string): Promise<void> => {
  const { error } = await supabase
    .from('queue')
    .delete()
    .eq('user_id', userId)

  if (error) throw error
}

// Playlists
export const getPlaylist = async (userId: string, playlistNumber: number): Promise<Song[]> => {
  const { data, error } = await supabase
    .from('playlist')
    .select(`
      songs (*)
    `)
    .match({ 
      user_id: userId,
      playlist_number: playlistNumber
    })
    .order('created_at', { ascending: true })

  if (error) throw error
  return data?.map(item => (item.songs as unknown) as Song) ?? []
}

export const addToPlaylist = async (userId: string, songId: string, playlistNumber: number): Promise<void> => {
  const { error } = await supabase
    .from('playlist')
    .insert({
      user_id: userId,
      song_id: songId,
      playlist_number: playlistNumber
    })

  if (error) throw error
}

export const removeFromPlaylist = async (userId: string, songId: string, playlistNumber: number): Promise<void> => {
  const { error } = await supabase
    .from('playlist')
    .delete()
    .match({
      user_id: userId,
      song_id: songId,
      playlist_number: playlistNumber
    })

  if (error) throw error
}

export const clearPlaylist = async (userId: string, playlistNumber: number): Promise<void> => {
  const { error } = await supabase
    .from('playlist')
    .delete()
    .match({
      user_id: userId,
      playlist_number: playlistNumber
    })

  if (error) throw error
}

export const searchSongs = async (query: string): Promise<Song[]> => {
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .or(`title.ilike.%${query}%,singer.ilike.%${query}%`)
    .order('title', { ascending: true })

  if (error) throw error
  return data
}