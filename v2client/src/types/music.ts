export interface Song {
    id: string;
    title: string;
    singer: string;
    duration: string;
    imgpath: string;
    audiopath: string;
  }
  
  export interface QueueItem {
    id: string;
    user_id: string;
    song_id: string;
  }
  
  export interface PlaylistItem extends Song {
    id: string;
    playlist_number: number;
  }
  
  export interface User {
    id: string;
    email: string;
    name?: string;
    image?: string;
  }
  
  export interface LikedItem {
    id: string;
    user_id: string;
    song_id: string;
  }