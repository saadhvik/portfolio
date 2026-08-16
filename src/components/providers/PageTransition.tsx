'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { pageTransition } from '@/lib/motion'
import { ease } from '@/lib/tokens'

/**
 * Route-level enter/exit. A curtain sweeps up over the outgoing route, then
 * the incoming content fades and lifts in.
 *
 * `mode="wait"` matters: without it the two routes overlap and the page height
 * jumps mid-transition.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={pageTransition}
        initial="hidden"
        animate="show"
        exit="exit"
        className="gpu"
      >
        {/* Curtain — sits above content, sweeps out of frame on enter. */}
        <motion.div
          className="pointer-events-none fixed inset-0 z-[150] origin-bottom bg-accent"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.62, ease: ease.expo }}
          aria-hidden="true"
        />
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
