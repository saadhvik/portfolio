'use client'

import { motion } from 'framer-motion'
import { fadeUp, inView } from '@/lib/motion'

/**
 * Scroll-triggered fade + lift. The default building block for section
 * content — used instead of ad-hoc whileInView so timing stays uniform.
 *
 * `as` matters for more than style: wrapping an <li> in a <div> puts a
 * non-li child directly inside <ul>/<ol>, which is invalid HTML and breaks
 * list semantics for screen readers. Inside a list, always pass as="li".
 */
const TAGS = {
  div: motion.div,
  li: motion.li,
  section: motion.section,
} as const

export default function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: keyof typeof TAGS
}) {
  const Tag = TAGS[as]

  return (
    <Tag
      className={`gpu ${className}`}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      transition={{ delay }}
    >
      {children}
    </Tag>
  )
}
