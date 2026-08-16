'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ease } from '@/lib/tokens'
import { useReducedMotionPref } from '@/lib/useMotionPreference'

/**
 * 3D tilt on pointer position, with a specular highlight that tracks the
 * cursor. Rotation is capped low (7deg) — past about 10deg text inside the
 * card starts to smear and the effect reads as a gimmick.
 */
export default function TiltCard({
  children,
  className = '',
  max = 7,
}: {
  children: React.ReactNode
  className?: string
  max?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50, on: false })
  const reduced = useReducedMotionPref()

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    setTilt({ rx: (0.5 - py) * max * 2, ry: (px - 0.5) * max * 2 })
    setGlare({ x: px * 100, y: py * 100, on: true })
  }

  const reset = () => {
    setTilt({ rx: 0, ry: 0 })
    setGlare((g) => ({ ...g, on: false }))
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`gpu relative ${className}`}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
      transition={ease.spring}
    >
      {children}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-card transition-opacity duration-300"
        style={{
          opacity: glare.on ? 1 : 0,
          background: `radial-gradient(420px circle at ${glare.x}% ${glare.y}%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 55%)`,
        }}
      />
    </motion.div>
  )
}
