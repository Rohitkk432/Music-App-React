import { Router, Request, Response } from 'express'
import pool from '../lib/pool'
import { Song, QueueItem } from '../types'

const router = Router()

// Get queue songs with full song info
router.get('/:user_id', async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params
    const queue = await pool.query<Song>(
      `SELECT songs.* FROM queue 
       JOIN songs ON songs.id = queue.song_id 
       WHERE queue.user_id = $1 
       ORDER BY queue.id`,
      [user_id]
    )
    res.json(queue.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to get queue' })
  }
})

// Add song to queue
router.post('/', async (req: Request, res: Response) => {
  try {
    const { user_id, song_id } = req.body
    
    // Add to queue
    const newQueueItem = await pool.query<QueueItem>(
      'INSERT INTO queue (user_id, song_id) VALUES ($1, $2) RETURNING *',
      [user_id, song_id]
    )

    // Get full song info
    const song = await pool.query<Song>(
      'SELECT * FROM songs WHERE id = $1',
      [song_id]
    )

    res.json(song.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to add to queue' })
  }
})

// Clear queue
router.delete('/:user_id', async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params
    await pool.query('DELETE FROM queue WHERE user_id = $1', [user_id])
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to clear queue' })
  }
})

// Remove song from queue
router.delete('/', async (req: Request, res: Response) => {
  try {
    const { user_id, song_id } = req.body
    await pool.query(
      'DELETE FROM queue WHERE user_id = $1 AND song_id = $2',
      [user_id, song_id]
    )
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to remove from queue' })
  }
})

// Add playlist songs to queue
router.post('/playlist', async (req: Request, res: Response) => {
  try {
    const { user_id, playlist_number } = req.body
    
    // First get playlist songs
    const playlistSongs = await pool.query<Song>(
      `SELECT songs.* FROM playlist 
       JOIN songs ON songs.id = playlist.song_id 
       WHERE playlist.user_id = $1 AND playlist.playlist_number = $2 
       ORDER BY playlist.id`,
      [user_id, playlist_number]
    )

    if (!playlistSongs.rows.length) {
      return res.status(404).json({ error: 'No songs found in playlist' })
    }

    // Clear existing queue
    await pool.query('DELETE FROM queue WHERE user_id = $1', [user_id])

    // Add playlist songs to queue
    for (const song of playlistSongs.rows) {
      await pool.query(
        'INSERT INTO queue (user_id, song_id) VALUES ($1, $2)',
        [user_id, song.id]
      )
    }

    // Return the new queue
    const newQueue = await pool.query<Song>(
      `SELECT songs.* FROM queue 
       JOIN songs ON songs.id = queue.song_id 
       WHERE queue.user_id = $1 
       ORDER BY queue.id`,
      [user_id]
    )

    res.json(newQueue.rows)
  } catch (err) {
    console.error('Failed to add playlist to queue:', err)
    res.status(500).json({ error: 'Failed to add playlist to queue' })
  }
})

export default router 