import useMagnetic from '../hooks/useMagnetic'
import { profile } from '../data/content'

const links = [
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Work', '#work'],
  ['Timeline', '#timeline'],
  ['Contact', '#contact'],
]

function MagLink({ href, children }) {
  const ref = useMagnetic(0.3)
  return (
    <a
      ref={ref}
      href={href}
      className="inline-block px-3 py-2 text-sm text-bone-300 hover:text-gold-400 transition-colors duration-300"
    >
      {children}
    </a>
  )
}

export default function Nav() {
  const logo = useMagnetic(0.25)
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="flex items-center justify-between px-6 md:px-12 py-5 bg-gradient-to-b from-ink-950/90 to-transparent">
        <a
          ref={logo}
          href="#top"
          className="font-display text-lg tracking-tightest text-bone-100"
        >
          TS<span className="text-gold-500">.</span>
        </a>
        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {links.map(([label, href]) => (
            <MagLink key={href} href={href}>
              {label}
            </MagLink>
          ))}
        </nav>
        <a
          href={`mailto:${profile.email}`}
          className="md:hidden text-sm text-gold-400"
        >
          Say hello
        </a>
      </div>
    </header>
  )
}
