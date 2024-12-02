import { Router, Request, Response } from 'express'
import pool from '../lib/pool'
import { User } from '../types'

const router = Router()

// Find existing user with email
router.get("/:email", async (req: Request, res: Response) => {
  try {
    const { email } = req.params
    const user = await pool.query<User>("SELECT * FROM users WHERE email = $1;", [email])
    
    // If no user found, return null instead of undefined
    if (user.rows.length === 0) {
      return res.json(null)
    }
    
    res.json(user.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to get user' })
  }
})

// Adding user to database
router.post("/", async (req: Request, res: Response) => {
  try {
    const { email } = req.body
    
    // First check if user already exists
    const existingUser = await pool.query<User>(
      "SELECT * FROM users WHERE email = $1;",
      [email]
    )

    if (existingUser.rows.length > 0) {
      return res.json(existingUser.rows[0])
    }

    // Create new user if doesn't exist
    const newUser = await pool.query<User>(
      "INSERT INTO users (email) VALUES ($1) RETURNING *;",
      [email]
    )
    res.json(newUser.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create user' })
  }
})

export default router 