'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotionPref } from '@/lib/useMotionPreference'

/**
 * Custom cursor: a small dot that tracks 1:1 and a ring that lags behind.
 * Hovering anything with [data-cursor] swaps state and can show a label.
 *
 * Never replaces the native cursor on touch/coarse pointers (CSS hides the
 * layer) and never on reduced motion. The native cursor is only hidden once
 * this component has actually mounted and confirmed a fine pointer, so a
 * failure here can never leave a visitor with no cursor at all.
 */
type CursorState = 'default' | 'hover' | 'view' | 'drag'

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<CursorState>('default')
  const [label, setLabel] = useState('')
  const [enabled, setEnabled] = useState(false)
  const reduced = useReducedMotionPref()

  useEffect(() => {
    if (reduced) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setEnabled(true)
  }, [reduced])

  useEffect(() => {
    if (!enabled) return

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { ...pos }
    let frame = 0

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
      if (dot.current) {
        dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`
      }
    }

    const loop = () => {
      // Exponential follow — frame-rate independent.
      ringPos.x += (pos.x - ringPos.x) * 0.18
      ringPos.y += (pos.y - ringPos.y) * 0.18
      if (ring.current) {
        ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`
      }
      frame = requestAnimationFrame(loop)
    }

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest('[data-cursor]') as HTMLElement | null
      if (!el) {
        setState('default')
        setLabel('')
        return
      }
      setState((el.dataset.cursor as CursorState) || 'hover')
      setLabel(el.dataset.cursorLabel || '')
    }

    document.body.style.cursor = 'none'
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    frame = requestAnimationFrame(loop)

    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(frame)
    }
  }, [enabled])

  if (!enabled) return null

  const ringSize = state === 'view' ? 76 : state === 'hover' ? 48 : 32

  return (
    <div className="cursor-layer pointer-events-none fixed inset-0 z-[200]" aria-hidden="true">
      <div
        ref={dot}
        className="gpu fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-ink"
        style={{ opacity: state === 'view' ? 0 : 1, transition: 'opacity .2s var(--ease-expo)' }}
      />
      <div
        ref={ring}
        className="gpu fixed left-0 top-0 flex items-center justify-center rounded-full border border-ink/40"
        style={{
          width: ringSize,
          height: ringSize,
          background: state === 'view' ? 'var(--accent)' : 'transparent',
          borderColor: state === 'view' ? 'transparent' : undefined,
          transition:
            'width .42s var(--ease-expo), height .42s var(--ease-expo), background .3s var(--ease-expo), border-color .3s var(--ease-expo)',
        }}
      >
        {label && (
          <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white">
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
