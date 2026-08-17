import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { splitText } from '../hooks/splitText'
import { stats, profile } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const root = useRef(null)

  useGSAP(
    () => {
      const words = splitText(root.current.querySelector('.about-lede'), 'words')
      gsap.from(words, {
        yPercent: 110,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.02,
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      })

      /* Counters */
      gsap.utils.toArray('.stat-num').forEach((el) => {
        const target = parseFloat(el.dataset.value)
        const decimals = parseInt(el.dataset.decimals || '0', 10)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
          onUpdate: () => {
            el.textContent = obj.v.toFixed(decimals)
          },
        })
      })

      gsap.from('.stat-cell', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.stat-grid', start: 'top 85%' },
      })
    },
    { scope: root }
  )

  return (
    <section id="about" ref={root} className="section-pad">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-3">
          <p className="eyebrow">About</p>
        </div>
        <div className="md:col-span-9">
          <h2 className="about-lede font-display font-medium tracking-tightest text-3xl md:text-5xl leading-tight max-w-4xl">
            Most teams hire two people for this. A web engineer to ship the
            product, and a data scientist to make it smart. I close that gap —
            the model and the interface are designed together, so neither is an
            afterthought.
          </h2>
          <p className="mt-8 max-w-xl text-bone-300 leading-relaxed">
            Based in {profile.location}. Two years across agencies, an
            analytics firm, and independent consulting — always at the seam
            where production software meets applied machine learning.
          </p>
        </div>
      </div>

      <div className="stat-grid mt-24 grid grid-cols-2 md:grid-cols-4 border-t border-ink-700">
        {stats.map((s) => (
          <div key={s.label} className="stat-cell py-10 pr-6 border-b md:border-b-0 border-ink-800">
            <p className="font-display text-5xl md:text-6xl tracking-tightest text-bone-100">
              <span className="stat-num" data-value={s.value} data-decimals={s.decimals || 0}>
                0
              </span>
              <span className="text-gold-500">{s.suffix}</span>
            </p>
            <p className="mt-3 text-sm text-bone-500">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
