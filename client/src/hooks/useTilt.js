import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/** Subtle 3D tilt following the mouse. Transform-only, quickTo-driven. */
export default function useTilt(max = 7) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(pointer: coarse)').matches) return

    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3.out' })
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3.out' })
    gsap.set(el, { transformPerspective: 900 })

    let rect = null

    const updateRect = () => {
      if (el) rect = el.getBoundingClientRect()
    }

    const onEnter = () => {
      updateRect()
    }

    const onMove = (e) => {
      if (!rect) updateRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      ry(px * max * 2)
      rx(-py * max * 2)
    }

    const onLeave = () => {
      rx(0)
      ry(0)
    }

    el.addEventListener('mouseenter', onEnter, { passive: true })
    el.addEventListener('mousemove', onMove, { passive: true })
    el.addEventListener('mouseleave', onLeave, { passive: true })

    return () => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [max])

  return ref
}
