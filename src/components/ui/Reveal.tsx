'use client'

import { motion } from 'framer-motion'
import { fadeUp, inView } from '@/lib/motion'

/**
 * Scroll-triggered fade + lift. The default building block for section
 * content — used instead of ad-hoc whileInView so timing stays uniform.
 */
export default function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={`gpu ${className}`}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}
