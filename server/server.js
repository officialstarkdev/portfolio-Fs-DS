import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import contactRouter from './routes/contact.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio'

app.use(cors())
app.use(express.json({ limit: '32kb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, db: mongoose.connection.readyState === 1 })
})
app.use('/api/contact', contactRouter)

/* In production, serve the built React app. */
const dist = path.join(__dirname, '../client/dist')
app.use(express.static(dist))
app.get(/^(?!\/api).*/, (_req, res, next) => {
  res.sendFile(path.join(dist, 'index.html'), (err) => err && next())
})

app.listen(PORT, () => console.log(`✓ API listening on http://localhost:${PORT}`))

mongoose
  .connect(MONGODB_URI, { serverSelectionTimeoutMS: 4000 })
  .then(() => console.log('✓ MongoDB connected'))
  .catch((err) =>
    console.warn('⚠ MongoDB not reachable — contact form will return errors until it is:', err.message)
  )
