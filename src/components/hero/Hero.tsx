'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import SplitText from '@/components/ui/SplitText'
import MagneticButton from '@/components/ui/MagneticButton'
import { profile } from '@/data/site'
import { duration, ease } from '@/lib/tokens'

// The canvas is client-only and code-split: the headline paints before this
// module is even requested.
const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false })

/** Three numbers, all traceable to the résumé. Kept short enough to scan. */
const HERO_PROOF = [
  { value: '8h → <1s', label: 'Simulation runtime' },
  { value: '81%', label: 'Top-3 RAG accuracy' },
  { value: '3 + 2', label: 'Publications, patents' },
]

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-32">
      <HeroCanvas />

      <div className="shell relative">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.base, ease: ease.expo }}
          className="mb-6 inline-flex items-center gap-2.5 rounded-pill border border-base-600 bg-base-900/50 px-4 py-2 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-signal-ok animate-pulseDot" aria-hidden="true" />
          <span className="font-mono text-xs text-ink-muted">
            {profile.availability} · {profile.location} · {profile.relocation}
          </span>
        </motion.p>

        <SplitText
          as="h1"
          lines={profile.headline}
          by="char"
          className="font-display text-display font-medium text-ink"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.reveal, ease: ease.expo, delay: 0.5 }}
          className="mt-7 grid-12 items-end gap-y-6"
        >
          <p className="col-span-12 max-w-prose text-body text-ink-muted md:col-span-6">
            {profile.subhead}
          </p>

          {/* Proof above the fold. A recruiter who never scrolls still leaves
              with three numbers — the headline alone is a claim, not evidence. */}
          <ul className="col-span-12 grid grid-cols-3 gap-4 md:col-span-5 md:col-start-8">
            {HERO_PROOF.map((m) => (
              <li key={m.label} className="border-l border-base-600 pl-3">
                <span className="block font-display text-[clamp(1.05rem,1.9vw,1.5rem)] leading-none tracking-tight text-ink">
                  {m.value}
                </span>
                <span className="mt-2 block text-[11px] leading-snug text-ink-faint">
                  {m.label}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.reveal, ease: ease.expo, delay: 0.62 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <MagneticButton href="/work">View selected work</MagneticButton>
          <MagneticButton href={profile.resume} variant="ghost" download>
            Download résumé
          </MagneticButton>
          <MagneticButton href="/contact" variant="ghost">
            Get in touch
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: duration.slow }}
        className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        aria-hidden="true"
      >
        <span className="label">Scroll</span>
        <span className="h-8 w-px bg-gradient-to-b from-base-500 to-transparent" />
      </motion.div>
    </section>
  )
}
