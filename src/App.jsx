import { Suspense, lazy, useEffect, useState } from 'react'
import Nav from './components/Nav.jsx'
import StickyCTA from './components/StickyCTA.jsx'
import Hero from './components/Hero.jsx'
import Proof from './components/Proof.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Research from './components/Research.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion.js'
import { useReveal } from './hooks/useReveal.js'
import { useScrollProgress } from './hooks/useScrollProgress.js'
import { useTheme } from './hooks/useTheme.js'

// The entire 3D bundle lives behind this boundary. It is fetched only after
// the hero text has painted, and only on devices that can carry it.
const SceneRoot = lazy(() => import('./components/canvas/SceneRoot.jsx'))

function canRun3D() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  // Data Saver / metered connections: skip the 3D payload entirely.
  const conn = navigator.connection
  if (conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || ''))) return false
  if (navigator.deviceMemory && navigator.deviceMemory < 4) return false
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) return false
  try {
    const c = document.createElement('canvas')
    return Boolean(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export default function App() {
  const reduced = usePrefersReducedMotion()
  const scroll = useScrollProgress()
  const { theme, toggle } = useTheme()
  const [mount3D, setMount3D] = useState(false)

  useReveal(reduced)

  useEffect(() => {
    if (!canRun3D()) return
    // Wait for the browser to go idle: hero text and CTAs win the main thread.
    const start = () => setMount3D(true)
    const id =
      'requestIdleCallback' in window
        ? window.requestIdleCallback(start, { timeout: 2500 })
        : window.setTimeout(start, 900)
    return () => {
      if ('cancelIdleCallback' in window) window.cancelIdleCallback(id)
      else window.clearTimeout(id)
    }
  }, [reduced])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      {mount3D && (
        <Suspense fallback={null}>
          <SceneRoot scroll={scroll} theme={theme} />
        </Suspense>
      )}

      <Nav theme={theme} onToggleTheme={toggle} />

      <div className="shell">
        <main id="main">
          <Hero />
          <Proof />
          <Experience />
          <Projects />
          <Skills />
          <Research />
          <Contact />
        </main>
        <Footer />
      </div>

      <StickyCTA />
    </>
  )
}
