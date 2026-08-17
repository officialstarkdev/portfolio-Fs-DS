import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { splitText } from '../hooks/splitText'
import useMagnetic from '../hooks/useMagnetic'
import { profile } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

const IDLE = 'idle', SENDING = 'sending', SENT = 'sent', FAILED = 'failed'

export default function Contact() {
  const root = useRef(null)
  const submitRef = useMagnetic(0.35)
  const [status, setStatus] = useState(IDLE)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  useGSAP(
    () => {
      const words = splitText(root.current.querySelector('.contact-title'), 'words')
      gsap.from(words, {
        yPercent: 110,
        duration: 0.9,
        ease: 'power4.out',
        stagger: 0.05,
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      })
      gsap.from('.field, .contact-side > *', {
        opacity: 0,
        y: 28,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-grid', start: 'top 80%' },
      })
    },
    { scope: root }
  )

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (status === SENDING) return
    setStatus(SENDING)
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus(SENT)
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus(FAILED)
    }
  }

  return (
    <section id="contact" ref={root} className="section-pad">
      <p className="eyebrow mb-8">Contact</p>
      <h2 className="contact-title font-display font-semibold tracking-tightest text-[11vw] md:text-[6.5vw] leading-[1.02] max-w-5xl">
        Have a product that needs both halves?
      </h2>

      <div className="contact-grid mt-20 grid md:grid-cols-12 gap-14">
        <form className="md:col-span-7 space-y-10" onSubmit={submit} noValidate>
          <div className="field">
            <input id="c-name" type="text" placeholder="Name" required value={form.name} onChange={set('name')} />
            <label htmlFor="c-name">Your name</label>
            <span className="field-line" />
          </div>
          <div className="field">
            <input id="c-email" type="email" placeholder="Email" required value={form.email} onChange={set('email')} />
            <label htmlFor="c-email">Email address</label>
            <span className="field-line" />
          </div>
          <div className="field">
            <textarea id="c-msg" rows="4" placeholder="Message" required value={form.message} onChange={set('message')} />
            <label htmlFor="c-msg">What are you building?</label>
            <span className="field-line" />
          </div>
          <button
            ref={submitRef}
            type="submit"
            disabled={status === SENDING}
            className="inline-flex items-center gap-3 border border-gold-600 px-10 py-4 text-sm uppercase tracking-[0.25em] text-gold-400 hover:bg-gold-500 hover:text-ink-950 transition-colors duration-500 disabled:opacity-50"
          >
            {status === SENDING ? 'Sending…' : 'Send message'}
          </button>
          <p aria-live="polite" className="text-sm min-h-5">
            {status === SENT && <span className="text-gold-400">Message saved — I'll reply within a day.</span>}
            {status === FAILED && (
              <span className="text-bone-500">
                Couldn't reach the server. Email me directly at{' '}
                <a className="text-gold-400 underline" href={`mailto:${profile.email}`}>{profile.email}</a>.
              </span>
            )}
          </p>
        </form>

        <aside className="contact-side md:col-span-5 md:pl-10 md:border-l border-ink-700 space-y-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-bone-500 mb-2">Email</p>
            <a href={`mailto:${profile.email}`} className="text-lg text-bone-100 hover:text-gold-400 transition-colors">
              {profile.email}
            </a>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-bone-500 mb-2">Based in</p>
            <p className="text-bone-300">{profile.location}</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-bone-500 mb-2">Availability</p>
            <p className="text-bone-300">Booking projects for Q4 2026.</p>
          </div>
        </aside>
      </div>
    </section>
  )
}
