import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import nodemailer from 'nodemailer'
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

/* Optional email notification if SMTP env vars are set. */
async function notifyByEmail({ name, email, message }) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO } = process.env
  if (!SMTP_HOST || !MAIL_TO) {
    console.warn('Email skipped — missing SMTP_HOST or MAIL_TO env var')
    return
  }
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  })
  await transporter.sendMail({
    from: `"Portfolio" <${SMTP_USER || 'noreply@portfolio.local'}>`,
    to: MAIL_TO,
    replyTo: email,
    subject: `Portfolio contact — ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  })
  console.log('✓ Email sent successfully to', MAIL_TO)
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
