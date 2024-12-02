import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import pool from './lib/pool'

// Import routes
import userRoutes from './routes/users'
import songRoutes from './routes/songs'
import queueRoutes from './routes/queue'
import likedRoutes from './routes/liked'
import playlistRoutes from './routes/playlist'

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 4000

// Register routes
app.use('/users', userRoutes)
app.use('/songs', songRoutes)
app.use('/queue', queueRoutes)
app.use('/liked', likedRoutes)
app.use('/playlist', playlistRoutes)

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT NOW()')
    res.json({ status: 'ok', message: 'Server is healthy' })
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Database connection failed' })
  }
})

// Start server
async function startServer() {
  try {
    await pool.connect({
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      database: process.env.PG_DB,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
    })
    console.log('✅ PostgreSQL Connected')

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

startServer()