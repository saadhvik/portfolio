'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useReducedMotionPref } from '@/lib/useMotionPreference'

/**
 * Number counter that runs once on entering view.
 *
 * Deliberate constraint: the FINAL value is what renders server-side and under
 * reduced motion, and the element reserves its final width. A recruiter
 * skimming fast must never read "0" where "81%" belongs — the animation is
 * decoration on top of a correct value, never a replacement for it.
 */
export default function Counter({
  value,
  prefix = '',
  suffix = '',
  duration = 1400,
  className = '',
}: {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const reduced = useReducedMotionPref()
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (reduced || !inView) return
    let frame = 0
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      // easeOutExpo — matches the project's default curve.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      setDisplay(Math.round(eased * value))
      if (t < 1) frame = requestAnimationFrame(tick)
    }

    setDisplay(0)
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduced, value, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      <span className="tabular-nums">{display}</span>
      {suffix}
    </span>
  )
}
