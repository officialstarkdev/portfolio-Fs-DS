import { Router } from 'express'
import dns from 'node:dns'
import { promisify } from 'node:util'
import rateLimit from 'express-rate-limit'
import nodemailer from 'nodemailer'
import mongoose from 'mongoose'
import Message from '../models/Message.js'

const router = Router()
const dnsLookup = promisify(dns.lookup)

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

  /* Resolve SMTP hostname to IPv4 manually — Render blocks outbound IPv6. */
  const { address: ipv4 } = await dnsLookup(SMTP_HOST, { family: 4 })
  console.log(`SMTP resolved: ${SMTP_HOST} → ${ipv4}`)

  const transporter = nodemailer.createTransport({
    host: ipv4,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
    tls: {
      servername: SMTP_HOST,
      rejectUnauthorized: true,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    logger: true,
    debug: true,
  })

  console.log('Verifying SMTP connection...')
  await transporter.verify()
  console.log('SMTP connection verified ✓ — sending mail...')

  const info = await transporter.sendMail({
    from: `"Portfolio" <${SMTP_USER || 'noreply@portfolio.local'}>`,
    to: MAIL_TO,
    replyTo: email,
    subject: `Portfolio contact — ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  })
  console.log('✓ Email sent successfully to', MAIL_TO, '| messageId:', info.messageId)
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
