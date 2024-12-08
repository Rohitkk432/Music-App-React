export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
        }
      }
      songs: {
        Row: {
          id: string
          title: string
          singer: string | null
          audiopath: string
          imgpath: string | null
          duration: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          singer?: string | null
          audiopath: string
          imgpath?: string | null
          duration?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          singer?: string | null
          audiopath?: string
          imgpath?: string | null
          duration?: string | null
          created_at?: string
        }
      }
      liked: {
        Row: {
          id: string
          user_id: string
          song_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          song_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          song_id?: string
          created_at?: string
        }
      }
      queue: {
        Row: {
          id: string
          user_id: string
          song_id: string
          position: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          song_id: string
          position: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          song_id?: string
          position?: number
          created_at?: string
        }
      }
      playlist: {
        Row: {
          id: string
          user_id: string
          song_id: string
          playlist_number: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          song_id: string
          playlist_number: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          song_id?: string
          playlist_number?: number
          created_at?: string
        }
      }
    }
  }
} 