import { Router, Request, Response } from 'express'
import pool from '../lib/pool'
import { Song, PlaylistItem } from '../types'

const router = Router()

// Get full specific playlist of a user
router.get('/:user_id/:playlist_number', async (req: Request, res: Response) => {
  try {
    const { user_id, playlist_number } = req.params

    const playlist = await pool.query<Song & PlaylistItem>(
      `SELECT songs.*, playlist.song_id as id  
       FROM playlist 
       JOIN songs ON songs.id = playlist.song_id 
       WHERE playlist.user_id = $1 
       AND playlist.playlist_number = $2 
       ORDER BY playlist.id`,
      [user_id, playlist_number]
    )

    res.json(playlist.rows)
  } catch (err) {
    res.status(500).json({ error: 'Failed to get playlist' })
  }
})

// Get specific song from specific playlist
router.get('/:user_id/:song_id/:playlist_number', async (req: Request, res: Response) => {
  try {
    const { user_id, song_id, playlist_number } = req.params
    const song = await pool.query<PlaylistItem>(
      "SELECT * FROM playlist WHERE user_id = $1 AND song_id = $2 AND playlist_number = $3;",
      [user_id, song_id, playlist_number]
    )
    res.json(song.rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Failed to get playlist item' })
  }
})

// Add song to playlist
router.post('/', async (req: Request, res: Response) => {
  try {
    const { user_id, song_id, playlist_number } = req.body
    const newSong = await pool.query<PlaylistItem>(
      "INSERT INTO playlist (user_id, song_id, playlist_number) VALUES ($1, $2, $3) RETURNING *;",
      [user_id, song_id, playlist_number]
    )
    res.json(newSong.rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Failed to add to playlist' })
  }
})

// Remove song from playlist
router.delete('/', async (req: Request, res: Response) => {
  try {
    const { user_id, song_id, playlist_number } = req.body
    
    if (!song_id) {
      return res.status(400).json({ error: 'song_id is required' })
    }

    const result = await pool.query(
      `DELETE FROM playlist 
       WHERE user_id = $1 
       AND song_id = $2 
       AND playlist_number = $3 
       RETURNING *`,
      [user_id, song_id, playlist_number]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Song not found in playlist' })
    }

    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove from playlist' })
  }
})

// Delete entire playlist
router.delete('/full', async (req: Request, res: Response) => {
  try {
    const { user_id, playlist_number } = req.body
    const delPlaylist = await pool.query<PlaylistItem>(
      "DELETE FROM playlist WHERE user_id = $1 AND playlist_number = $2 RETURNING *;",
      [user_id, playlist_number]
    )
    res.json(delPlaylist.rows)
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete playlist' })
  }
})

export default router 