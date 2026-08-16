'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ease } from '@/lib/tokens'
import { useReducedMotionPref } from '@/lib/useMotionPreference'

type Props = {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'ghost'
  download?: boolean
  external?: boolean
  className?: string
  /** How far the button drifts toward the pointer, in px. */
  strength?: number
}

const BASE =
  'relative inline-flex items-center justify-center gap-2 rounded-pill px-6 py-4 text-sm font-medium tracking-tight transition-colors duration-200'

/**
 * Magnetic hover: the element drifts toward the pointer within its bounds and
 * springs back on exit. Transform-only, so it stays on the compositor.
 * Under reduced motion there is no displacement — it is just a button.
 */
export default function MagneticButton({
  href,
  children,
  variant = 'primary',
  download,
  external,
  className = '',
  strength = 14,
}: Props) {
  const ref = useRef<HTMLElement | null>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const reduced = useReducedMotionPref()

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const relX = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
    const relY = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
    setOffset({ x: relX * strength, y: relY * strength })
  }

  const reset = () => setOffset({ x: 0, y: 0 })

  const styles =
    variant === 'primary'
      ? 'bg-ink text-base-900 hover:bg-accent hover:text-white'
      : 'border border-base-600 text-ink hover:border-ink/40 hover:bg-white/[0.04]'

  const cls = `${BASE} ${styles} ${className}`

  // The label drifts slightly less than the shell — that offset is what reads
  // as weight rather than the whole thing sliding.
  const label = (
    <motion.span
      className="gpu inline-flex items-center gap-2"
      animate={{ x: offset.x * -0.25, y: offset.y * -0.25 }}
      transition={ease.spring}
    >
      {children}
    </motion.span>
  )

  const shellProps = {
    className: cls,
    onMouseMove: onMove,
    onMouseLeave: reset,
    'data-cursor': 'hover' as const,
  }

  return (
    <motion.span
      className="gpu inline-block"
      animate={{ x: offset.x, y: offset.y }}
      transition={ease.spring}
    >
      {external || download ? (
        <a
          {...shellProps}
          ref={ref as React.RefObject<HTMLAnchorElement>}
          href={href}
          download={download}
          target={external ? '_blank' : undefined}
          rel={external ? 'noreferrer noopener' : undefined}
        >
          {label}
        </a>
      ) : (
        <Link {...shellProps} ref={ref as React.RefObject<HTMLAnchorElement>} href={href}>
          {label}
        </Link>
      )}
    </motion.span>
  )
}
