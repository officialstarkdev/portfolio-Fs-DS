import useMagnetic from '../hooks/useMagnetic'
import { profile } from '../data/content'

function MagSocial({ href, children }) {
  const ref = useMagnetic(0.45)
  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-block px-4 py-3 text-sm text-bone-300 hover:text-gold-400 transition-colors duration-300"
    >
      {children}
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="px-6 md:px-12 lg:px-24 py-12 border-t border-ink-800">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <p className="font-display tracking-tightest text-bone-100">
          {profile.name}
          <span className="text-gold-500">.</span>
        </p>
        <nav className="flex flex-wrap -mx-4" aria-label="Social links">
          {profile.socials.map((s) => (
            <MagSocial key={s.label} href={s.href}>
              {s.label}
            </MagSocial>
          ))}
        </nav>
        <p className="font-mono text-[11px] text-bone-500">
          © {new Date().getFullYear()} — Built with React, GSAP & three.js
        </p>
      </div>
    </footer>
  )
}
