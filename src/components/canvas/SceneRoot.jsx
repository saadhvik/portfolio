import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr } from '@react-three/drei'
import SpectralField from './SpectralField.jsx'

/**
 * Fixed, pointer-transparent backdrop. It sits behind everything and is
 * aria-hidden: the site loses zero information if this never mounts.
 */
export default function SceneRoot({ scroll, theme }) {
  const [visible, setVisible] = useState(false)

  // Fade the canvas in over 900ms once the first frame is on screen, so the
  // hero text is never competing with a pop-in.
  useEffect(() => {
    const id = window.setTimeout(() => setVisible(true), 60)
    return () => window.clearTimeout(id)
  }, [])

  // Note: no manual pause on visibilitychange. Browsers already suspend
  // requestAnimationFrame in background tabs, and flipping frameloop to
  // 'never' can leave the canvas blank in embedded/headless contexts.

  const isCoarse = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  const count = isCoarse ? 2744 : 5832 // 14³ on touch, 18³ on desktop

  return (
    <div
      className="scene"
      aria-hidden="true"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <Canvas
        dpr={[1, isCoarse ? 1.5 : 2]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0.4, 11], fov: 42, near: 0.1, far: 100 }}
      >
        <AdaptiveDpr pixelated={false} />
        <SpectralField scroll={scroll} theme={theme} count={count} />
      </Canvas>
    </div>
  )
}
