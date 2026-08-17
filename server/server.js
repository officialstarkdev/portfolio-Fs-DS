import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import contactRouter from './routes/contact.js'

const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio'

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json({ limit: '32kb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, db: mongoose.connection.readyState === 1 })
})
app.use('/api/contact', contactRouter)

app.listen(PORT, () => console.log(`✓ API listening on http://localhost:${PORT}`))

mongoose
  .connect(MONGODB_URI, { serverSelectionTimeoutMS: 4000 })
  .then(() => console.log('✓ MongoDB connected'))
  .catch((err) =>
    console.warn('⚠ MongoDB not reachable — contact form will return errors until it is:', err.message)
  )