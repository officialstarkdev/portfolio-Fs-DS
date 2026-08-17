import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import mongoose from 'mongoose'
import Message from '../models/Message.js'

const router = Router()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many messages — please try again later.' },
})

/* Email notification via Resend HTTP API (bypasses Render's SMTP port block). */
async function notifyByEmail({ name, email, message }) {
  const { RESEND_API_KEY, MAIL_TO } = process.env
  if (!RESEND_API_KEY || !MAIL_TO) {
    console.warn('Email skipped — missing RESEND_API_KEY or MAIL_TO env var')
    return
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [MAIL_TO],
      reply_to: email,
      subject: `Portfolio contact — ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(`Resend API error ${res.status}: ${JSON.stringify(data)}`)
  }

  console.log('✓ Email sent via Resend to', MAIL_TO, '| id:', data.id)
}

router.post('/', limiter, async (req, res) => {
  try {
    const { name, email, message } = req.body || {}
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ error: 'Name, email, and message are all required.' })
    }
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Message storage is offline right now.' })
    }
    const saved = await Message.create({ name, email, message })
    notifyByEmail({ name, email, message }).catch((err) =>
      console.error('Email notify failed:', err.message)
    )
    return res.status(201).json({ ok: true, id: saved._id })
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: 'Please check the form and try again.' })
    }
    console.error('Contact error:', err)
    return res.status(500).json({ error: 'Could not save your message.' })
  }
})

export default router
