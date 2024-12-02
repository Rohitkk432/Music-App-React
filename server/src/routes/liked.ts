import { Router, Request, Response } from 'express'
import pool from '../lib/pool'
import { Song, LikedItem } from '../types'

const router = Router()

// Get liked songs
router.get('/:user_id', async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params
    const liked = await pool.query<Song>(
      `SELECT songs.* FROM liked 
       JOIN songs ON songs.id = liked.song_id 
       WHERE liked.user_id = $1`,
      [user_id]
    )
    res.json(liked.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to get liked songs' })
  }
})

// Add song to liked
router.post('/', async (req: Request, res: Response) => {
  try {
    const { user_id, song_id } = req.body
    const newLiked = await pool.query<LikedItem>(
      'INSERT INTO liked (user_id, song_id) VALUES ($1, $2) RETURNING *',
      [user_id, song_id]
    )
    res.json(newLiked.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to add to liked' })
  }
})

// Remove from liked
router.delete('/', async (req: Request, res: Response) => {
  try {
    const { user_id, song_id } = req.body
    const removed = await pool.query<LikedItem>(
      'DELETE FROM liked WHERE user_id = $1 AND song_id = $2 RETURNING *',
      [user_id, song_id]
    )
    res.json(removed.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to remove from liked' })
  }
})

export default router 