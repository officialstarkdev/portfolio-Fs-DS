import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { skills } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

function SkillGroup({ group, index }) {
  return (
    <div className="skill-group">
      <div className="flex items-baseline justify-between border-b border-ink-700 pb-4">
        <h3 className="font-display text-2xl md:text-3xl tracking-tightest">
          {group.title}
        </h3>
        <span className="font-mono text-xs text-gold-600">
          {index === 0 ? 'MERN' : 'PY / ML'}
        </span>
      </div>
      <p className="mt-4 text-sm text-bone-500 max-w-sm">{group.note}</p>
      <ul className="mt-8 space-y-6">
        {group.items.map((s) => (
          <li key={s.name} className="skill-row">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-bone-300">{s.name}</span>
              <span className="font-mono text-xs text-gold-500">{s.level}</span>
            </div>
            <div className="h-px bg-ink-700 overflow-hidden">
              <div
                className="skill-bar h-full bg-gradient-to-r from-gold-600 to-gold-300 origin-left"
                data-level={s.level}
                style={{ transform: 'scaleX(0)' }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Skills() {
  const root = useRef(null)

  useGSAP(
    () => {
      gsap.from('.skill-row', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.06,
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      })
      gsap.utils.toArray('.skill-bar').forEach((bar) => {
        gsap.to(bar, {
          scaleX: parseInt(bar.dataset.level, 10) / 100,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: bar, start: 'top 90%' },
        })
      })
    },
    { scope: root }
  )

  return (
    <section id="skills" ref={root} className="section-pad bg-ink-900">
      <div className="grid md:grid-cols-12 gap-10 mb-16">
        <div className="md:col-span-3">
          <p className="eyebrow">Capabilities</p>
        </div>
        <div className="md:col-span-9">
          <h2 className="font-display font-medium tracking-tightest text-3xl md:text-5xl">
            Two disciplines, one pipeline<span className="text-gold-500">.</span>
          </h2>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-16 md:gap-24">
        <SkillGroup group={skills.web} index={0} />
        <SkillGroup group={skills.data} index={1} />
      </div>
    </section>
  )
}
