export interface Song {
    id: number;
    title: string;
    singer: string;
    audiopath: string;
    imgpath: string | null;
    duration: string;
    created_at: string;
  }
  
  export interface QueueItem {
    id: number;
    user_id: number;
    song_id: number;
  }
  
  export interface PlaylistItem extends Song {
    playlist_number: number;
  }
  
  export interface User {
    id: string;
    email: string;
    name?: string;
    image?: string;
  }
  
  export interface LikedItem {
    id: number;
    user_id: number;
    song_id: number;
  }