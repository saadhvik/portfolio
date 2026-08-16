'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotionPref } from '@/lib/useMotionPreference'

/**
 * Lenis smooth scroll, driven from GSAP's ticker so Lenis and ScrollTrigger
 * share one rAF loop. Two independent loops is the usual cause of jitter in
 * this stack.
 *
 * Disabled entirely under prefers-reduced-motion — native scrolling is
 * restored, and ScrollTrigger falls back to the real scroll position.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotionPref()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.05,
      // Matches the project's default expo curve.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Anchor links must go through Lenis or they jump instantly.
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!el) return
      const id = el.getAttribute('href')
      if (!id || id === '#') return
      const target = document.querySelector(id)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target as HTMLElement, { offset: -80 })
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [reduced])

  return <>{children}</>
}
