export const APP_NAME = 'Music Player'
export const DEFAULT_PLAYLIST_ID = '1'

export const ROUTES = {
  HOME: '/home',
  LOGIN: '/login',
  PLAYLIST: '/playlist',
  LIKED: '/liked',
} as const

export const API_ENDPOINTS = {
  SEARCH: '/api/songs/search',
  QUEUE: '/api/queue',
  PLAYLIST: '/api/playlists',
  LIKED: '/api/liked',
} as const

export const AUTH_ERRORS = {
  UNAUTHORIZED: 'You must be signed in to access this resource',
  INVALID_CREDENTIALS: 'Invalid credentials',
  SERVER_ERROR: 'Authentication server error',
} as const

export function getApiUrl(endpoint: string) {
  return `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`
}

export function getAuthRedirectUrl(callbackUrl?: string) {
  const baseUrl = ROUTES.LOGIN
  return callbackUrl ? `${baseUrl}?callbackUrl=${encodeURIComponent(callbackUrl)}` : baseUrl
} 