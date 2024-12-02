export interface Song {
    id: number;
    title: string;
    singer: string;
    audiopath: string;
    imgpath: string;
    duration: string;
  }
  
  export interface QueueItem {
    id: number;
    user_id: number;
    song_id: number;
  }
  
  export interface PlaylistItem {
    id: number;
    user_id: number;
    song_id: number;
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