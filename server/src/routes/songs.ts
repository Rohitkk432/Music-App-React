import { Router, Request, Response } from 'express'
import pool from '../lib/pool'
import { Song } from '../types'

const router = Router()

// Getting all songs
router.get('/', async (req: Request, res: Response) => {
  try {
    const songs = await pool.query<Song>("SELECT * FROM songs;")
    res.json(songs.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to get songs' })
  }
})

// Add to queue from playlist
router.post('/playlistQueue', async (req: Request, res: Response) => {
  try {
    const { user_id, playlist_number } = req.body
    const newSong = await pool.query(
      `INSERT INTO queue (user_id, song_id)
       SELECT user_id, song_id 
       FROM (
         SELECT user_id, song_id, title, singer, duration, imgpath, audiopath, playlist_number 
         FROM (SELECT * FROM playlist WHERE user_id = $1 AND playlist_number = $2) AS userplaylist 
         JOIN songs ON songs.id = userplaylist.song_id
       ) AS playlist`,
      [user_id, playlist_number]
    )
    res.json(newSong.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to add playlist to queue' })
  }
})

export default router 