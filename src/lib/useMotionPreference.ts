'use client'

import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Live subscription to the OS reduced-motion setting.
 * Defaults to `true` before hydration so we never start motion we would then
 * have to yank away.
 */
export function useReducedMotionPref(): boolean {
  const [reduced, setReduced] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    setReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/**
 * True only on devices that can carry the heavier canvas work: fine pointer,
 * enough cores/memory, not on Save-Data. Mirrors the reduced-motion gate.
 */
export function useCanAnimateHeavy(): boolean {
  const [ok, setOk] = useState(false)
  const reduced = useReducedMotionPref()

  useEffect(() => {
    if (reduced) {
      setOk(false)
      return
    }
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string }
      deviceMemory?: number
    }
    if (nav.connection?.saveData) return
    if (nav.connection?.effectiveType && /(^|-)2g$/.test(nav.connection.effectiveType)) return
    if (typeof nav.deviceMemory === 'number' && nav.deviceMemory < 4) return
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) return
    setOk(true)
  }, [reduced])

  return ok
}
