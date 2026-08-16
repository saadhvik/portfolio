'use client'

import { useEffect, useRef } from 'react'
import { useCanAnimateHeavy } from '@/lib/useMotionPreference'

type P = { x: number; y: number; hx: number; hy: number; vx: number; vy: number; r: number; d: number }

/**
 * Generative hero field, 2D canvas rather than WebGL.
 *
 * Why 2D: this is a particle field with additive dots and short connector
 * lines. Three.js would add ~180KB gzipped to render something Canvas2D draws
 * at 60fps in under 3KB of code. WebGL is the right call for geometry and
 * shading; it is the wrong call for 2,000 circles.
 *
 * Particles rest on a lattice and are displaced by the pointer, then spring
 * home — the lattice reads as structure, the displacement as live data.
 */
export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const enabled = useCanAnimateHeavy()

  useEffect(() => {
    if (!enabled) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let particles: P[] = []
    let frame = 0
    let running = true

    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 }
    const RADIUS = 170 // px of pointer influence

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Density scales with area but is capped: on a 4K display an uncapped
      // lattice is tens of thousands of particles and the frame budget dies.
      const gap = w < 700 ? 46 : 38
      const cols = Math.ceil(w / gap) + 1
      const rows = Math.ceil(h / gap) + 1
      particles = []
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const hx = i * gap + (j % 2 ? gap / 2 : 0)
          const hy = j * gap
          particles.push({
            x: hx,
            y: hy,
            hx,
            hy,
            vx: 0,
            vy: 0,
            r: Math.random() * 1.1 + 0.5,
            d: Math.random(),
          })
        }
      }
    }

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.tx = e.clientX - rect.left
      pointer.ty = e.clientY - rect.top
    }
    const onLeave = () => {
      pointer.tx = -9999
      pointer.ty = -9999
    }

    const draw = (t: number) => {
      if (!running) return
      ctx.clearRect(0, 0, w, h)

      // Ease the pointer so fast flicks do not snap the field.
      pointer.x += (pointer.tx - pointer.x) * 0.12
      pointer.y += (pointer.ty - pointer.y) * 0.12

      const time = t * 0.00035

      for (const p of particles) {
        // Ambient drift keeps the field alive with no pointer present.
        const driftX = Math.sin(time + p.d * 9) * 2.4
        const driftY = Math.cos(time * 0.9 + p.d * 7) * 2.4

        const dx = p.x - pointer.x
        const dy = p.y - pointer.y
        const dist = Math.hypot(dx, dy)

        if (dist < RADIUS) {
          const force = (1 - dist / RADIUS) ** 2 * 5.5
          p.vx += (dx / (dist || 1)) * force
          p.vy += (dy / (dist || 1)) * force
        }

        // Spring back to the lattice home, with damping.
        p.vx += (p.hx + driftX - p.x) * 0.055
        p.vy += (p.hy + driftY - p.y) * 0.055
        p.vx *= 0.84
        p.vy *= 0.84
        p.x += p.vx
        p.y += p.vy

        const disp = Math.hypot(p.x - p.hx, p.y - p.hy)
        const heat = Math.min(1, disp / 26)

        // Displaced particles take the accent colour: the pointer is
        // "exciting" the field, which is the whole metaphor.
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r + heat * 1.5, 0, Math.PI * 2)
        ctx.fillStyle =
          heat > 0.04
            ? `rgba(143, 128, 255, ${0.22 + heat * 0.68})`
            : `rgba(244, 244, 245, ${0.1 + p.d * 0.16})`
        ctx.fill()
      }

      frame = requestAnimationFrame(draw)
    }

    build()
    frame = requestAnimationFrame(draw)

    const ro = new ResizeObserver(build)
    ro.observe(canvas)
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('pointerleave', onLeave, { passive: true })

    // Stop the loop when the hero scrolls away — no offscreen frame cost.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true
          frame = requestAnimationFrame(draw)
        } else if (!entry.isIntersecting) {
          running = false
          cancelAnimationFrame(frame)
        }
      },
      { threshold: 0 }
    )
    io.observe(canvas)

    return () => {
      running = false
      cancelAnimationFrame(frame)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled])

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Static gradient wash. Renders immediately and is the entire visual
          when the canvas is skipped, so the hero is never a flat void. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 85% at 72% 8%, color-mix(in srgb, var(--accent) 20%, transparent) 0%, transparent 58%), radial-gradient(90% 70% at 8% 92%, color-mix(in srgb, var(--accent) 11%, transparent) 0%, transparent 62%)',
        }}
      />
      <canvas ref={canvasRef} className="h-full w-full" />
      {/* Fade the field into the page so the section boundary is not a hard edge. */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-base-900" />
    </div>
  )
}
