import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Magnetic hover: element is gently pulled toward the cursor.
 * Uses gsap.quickTo (GPU transforms only) for 60fps.
 */
export default function useMagnetic(strength = 0.35) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(pointer: coarse)').matches) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })

    let rect = null

    const updateRect = () => {
      if (el) rect = el.getBoundingClientRect()
    }

    const onEnter = () => {
      updateRect()
    }

    const onMove = (e) => {
      if (!rect) updateRect()
      xTo((e.clientX - (rect.left + rect.width / 2)) * strength)
      yTo((e.clientY - (rect.top + rect.height / 2)) * strength)
    }

    const onLeave = () => {
      xTo(0)
      yTo(0)
    }

    el.addEventListener('mouseenter', onEnter, { passive: true })
    el.addEventListener('mousemove', onMove, { passive: true })
    el.addEventListener('mouseleave', onLeave, { passive: true })

    return () => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])

  return ref
}
