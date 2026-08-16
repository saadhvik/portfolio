import type { Variants } from 'framer-motion'
import { duration, ease } from './tokens'

/**
 * Shared Framer variants. Components import these rather than declaring
 * inline transitions, so timing stays consistent across the site.
 */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.reveal, ease: ease.expo },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: duration.slow, ease: ease.expo } },
}

/** Parent for staggered children. */
export const stagger = (staggerChildren = 0.06, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

/** A single character or word in a masked-line reveal. */
export const charRise: Variants = {
  hidden: { y: '110%' },
  show: {
    y: '0%',
    transition: { duration: duration.reveal, ease: ease.expo },
  },
}

/** clip-path wipe used for image / media reveals. */
export const clipWipe: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  show: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 1.1, ease: ease.expo },
  },
}

/** Page-level curtain transition. */
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: duration.base, ease: ease.expo } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.24, ease: ease.inOut } },
}

/** Standard viewport config: fire once, slightly before fully in view. */
export const inView = { once: true, margin: '0px 0px -12% 0px' } as const
