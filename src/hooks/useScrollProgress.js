import { useEffect, useRef } from 'react'

/**
 * Hero-local scroll progress (0 → 1), written into a ref and updated on rAF.
 * 0 = hero fully in view, 1 = hero scrolled away. The 3D object uses this to
 * morph from the data cube into the fitted surface, so the whole transition
 * happens while the object is still on screen.
 *
 * A ref rather than state on purpose: the scene reads it every frame and React
 * must not re-render 60 times a second to feed it.
 */
export function useScrollProgress() {
  const progress = useRef(0)

  useEffect(() => {
    let frame = 0
    const read = () => {
      const span = window.innerHeight * 0.85
      progress.current = span > 0 ? Math.min(1, Math.max(0, window.scrollY / span)) : 0
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
