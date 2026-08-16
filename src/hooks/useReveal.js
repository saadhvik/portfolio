import { useEffect } from 'react'

/**
 * Adds `.is-in` to every [data-reveal] element as it enters the viewport.
 * IntersectionObserver only — no scroll listeners, no layout thrash.
 * If motion is reduced, everything is marked in immediately.
 */
export function useReveal(reducedMotion) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('[data-reveal]'))
    if (reducedMotion || !('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-in'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const delay = Number(entry.target.dataset.revealDelay || 0)
          window.setTimeout(() => entry.target.classList.add('is-in'), delay)
          io.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 }
    )

    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [reducedMotion])
}
