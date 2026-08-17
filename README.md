# Aureus — Developer Portfolio (MERN)

A dark, gold-accented portfolio for a full-stack + data-science engineer.
React (Vite) + GSAP/ScrollTrigger + Lenis + React Three Fiber on the front,
Express + MongoDB (Mongoose) on the back.

## Structure

```
portfolio/
├── client/          # Vite + React frontend
│   └── src/
│       ├── components/   # One component per section
│       ├── hooks/        # useSmoothScroll, useMagnetic, useTilt, splitText
│       ├── three/        # HeroScene (React Three Fiber)
│       └── data/         # All copy/content in one file — edit content.js first
└── server/          # Express API + MongoDB
    ├── models/Message.js
    └── routes/contact.js
```

## Run it

Requires Node 18+ and (optionally) a local MongoDB for the contact form.

```bash
# 1. Backend
cd server
cp .env.example .env        # adjust MONGODB_URI if needed
npm install
npm run dev                 # http://localhost:5000

# 2. Frontend (new terminal)
cd client
npm install
npm run dev                 # http://localhost:3000 (proxies /api → :5000)
```

Without MongoDB running, the site still works fully — the contact form
falls back to showing your email address.

### Production

```bash
cd client && npm run build          # outputs client/dist
cd ../server && npm start           # serves API + built frontend on :5000
```

### Email notifications (optional)

Fill the `SMTP_*` and `MAIL_TO` vars in `server/.env` and every contact
message is also forwarded to your inbox via Nodemailer. Messages are always
stored in MongoDB regardless.

## Make it yours

- **All copy lives in `client/src/data/content.js`** — name, tagline, stats,
  skills, projects, timeline, socials.
- Palette + fonts: `client/tailwind.config.js` and `client/src/index.css`
  (charcoal `#0a0a0a` base, gold `#c9a961` accent — no blue/green/purple).
- Fonts load from Fontshare (Clash Display + Satoshi) and Google (JetBrains Mono).

## Performance notes

- Lenis and ScrollTrigger share one GSAP ticker (single RAF loop).
- Animations are transform/opacity only, with `will-change` on hot elements.
- The 3D scene is code-split, mounted on idle, DPR-capped at 1.6, and uses a
  procedural environment map (no HDR/texture downloads).
- `prefers-reduced-motion` disables smooth scroll and animation.
