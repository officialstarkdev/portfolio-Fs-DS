import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { timeline } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Timeline() {
  const root = useRef(null)

  useGSAP(
    () => {
      /* Line-draw synced to scroll */
      gsap.fromTo(
        '.tl-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.tl-track',
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 0.6,
          },
        }
      )
      gsap.utils.toArray('.tl-item').forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          x: -32,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 80%' },
        })
        gsap.from(item.querySelector('.tl-dot'), {
          scale: 0,
          duration: 0.5,
          ease: 'back.out(2.5)',
          scrollTrigger: { trigger: item, start: 'top 80%' },
        })
      })
    },
    { scope: root }
  )

  return (
    <section id="timeline" ref={root} className="section-pad bg-ink-900">
      <div className="grid md:grid-cols-12 gap-10 mb-20">
        <div className="md:col-span-3">
          <p className="eyebrow">Experience</p>
        </div>
        <div className="md:col-span-9">
          <h2 className="font-display font-medium tracking-tightest text-3xl md:text-5xl">
            The route so far<span className="text-gold-500">.</span>
          </h2>
        </div>
      </div>

      <div className="tl-track relative max-w-3xl md:ml-[25%] pl-10">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-ink-700" aria-hidden="true" />
        <div
          className="tl-line absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-gold-300 via-gold-500 to-gold-700 origin-top"
          aria-hidden="true"
        />
        <ol className="space-y-20">
          {timeline.map((t) => (
            <li key={t.period} className="tl-item relative">
              <span
                className="tl-dot absolute -left-10 top-2 -translate-x-1/2 block w-2.5 h-2.5 rounded-full bg-gold-500"
                aria-hidden="true"
              />
              <p className="font-mono text-xs text-gold-500 tracking-widest">{t.period}</p>
              <h3 className="mt-3 font-display text-2xl tracking-tightest">{t.role}</h3>
              <p className="mt-1 text-sm text-bone-500">{t.org}</p>
              <p className="mt-4 text-bone-300 leading-relaxed max-w-xl">{t.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
