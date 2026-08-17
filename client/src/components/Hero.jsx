import { lazy, Suspense, useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { splitText } from '../hooks/splitText'
import useMagnetic from '../hooks/useMagnetic'
import { profile } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

const HeroScene = lazy(() => import('../three/HeroScene'))

export default function Hero({ ready }) {
  const root = useRef(null)
  const cta = useMagnetic(0.4)
  const [showScene, setShowScene] = useState(false)

  /* Lazy-mount the 3D scene after first paint so text renders instantly. */
  useEffect(() => {
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 300))
    const id = idle(() => setShowScene(true))
    return () => (window.cancelIdleCallback || clearTimeout)(id)
  }, [])

  useGSAP(
    () => {
      if (!ready) return
      const line1 = splitText(root.current.querySelector('.hero-l1'), 'chars')
      const line2 = splitText(root.current.querySelector('.hero-l2'), 'chars')

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.from(line1, {
        yPercent: 120,
        rotate: 4,
        duration: 1.1,
        stagger: 0.028,
      })
        .from(
          line2,
          { yPercent: 120, rotate: 4, duration: 1.1, stagger: 0.028 },
          '-=0.85'
        )
        .from(
          '.hero-fade',
          { opacity: 0, y: 24, duration: 0.9, stagger: 0.12 },
          '-=0.6'
        )

      /* Parallax depth: 3D layer drifts slower than the type on scroll. */
      gsap.to('.hero-scene', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero-copy', {
        yPercent: -14,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    },
    { scope: root, dependencies: [ready] }
  )

  return (
    <section
      id="top"
      ref={root}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ opacity: ready ? 1 : 0 }}
    >
      {/* 3D layer */}
      <div className="hero-scene absolute inset-0" aria-hidden="true">
        {showScene && (
          <Suspense
            fallback={
              <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-ink-700 animate-pulse" />
            }
          >
            <HeroScene />
          </Suspense>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/40 to-transparent" />
      </div>

      {/* Copy layer */}
      <div className="hero-copy relative z-10 px-6 md:px-12 lg:px-24 w-full">
        <p className="hero-fade eyebrow mb-6">Portfolio — {new Date().getFullYear()}</p>
        <h1 className="font-display font-semibold tracking-tightest leading-[0.95] text-[13vw] md:text-[8.5vw]">
          <span className="hero-l1 block overflow-hidden">Full-Stack</span>
          <span className="hero-l2 block overflow-hidden">
            <span className="display-hairline">×</span> Data Science
          </span>
        </h1>
        <div className="mt-10 flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
          <p className="hero-fade max-w-md text-bone-300 leading-relaxed">
            {profile.name}. {profile.tagline} MERN systems on one side, Python
            and machine learning on the other — one engineer for the whole
            pipeline.
          </p>
          <a
            ref={cta}
            href="#work"
            className="hero-fade inline-flex w-fit items-center gap-3 border border-gold-600 px-8 py-4 text-sm uppercase tracking-[0.25em] text-gold-400 hover:bg-gold-500 hover:text-ink-950 transition-colors duration-500"
          >
            View work
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-fade absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-bone-500">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="block w-px h-10 bg-gradient-to-b from-gold-500 to-transparent" />
      </div>
    </section>
  )
}
