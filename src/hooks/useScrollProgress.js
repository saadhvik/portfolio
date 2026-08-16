import { useEffect, useRef } from 'react'

/**
 * Document scroll progress (0 → 1) written into a ref, updated on rAF.
 * A ref rather than state on purpose: the 3D scene reads it every frame and
 * React must not re-render 60 times a second to feed it.
 */
export function useScrollProgress() {
  const progress = useRef(0)

  useEffect(() => {
    let frame = 0
    const read = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      progress.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      frame = 0
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(read)
    }
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return progress
}
