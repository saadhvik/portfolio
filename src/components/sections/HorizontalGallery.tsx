'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/data/site'
import { useReducedMotionPref } from '@/lib/useMotionPreference'

/**
 * Pinned horizontal scroll gallery driven by ScrollTrigger.
 *
 * Progressive enhancement, in this order:
 *  1. No JS / SSR  → a normal horizontally-scrollable flex row.
 *  2. Reduced motion → same, pinning never initialises.
 *  3. Narrow screens → same; pinning is desktop-only because trapping vertical
 *     scroll on a phone is hostile.
 *  4. Desktop + motion OK → the section pins and scrolls the track sideways.
 */
export default function HorizontalGallery() {
  const section = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotionPref()

  useEffect(() => {
    if (reduced) return
    if (!window.matchMedia('(min-width: 1024px)').matches) return
    const sectionEl = section.current
    const trackEl = track.current
    if (!sectionEl || !trackEl) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const distance = () => trackEl.scrollWidth - window.innerWidth + 120

      gsap.to(trackEl, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top top',
          // Pin length equals the horizontal distance, so the mapping between
          // wheel delta and sideways travel is 1:1 and feels physical.
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
    }, sectionEl)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={section} className="relative overflow-hidden py-20 lg:py-0 lg:min-h-[100svh] lg:flex lg:flex-col lg:justify-center">
      <div className="shell mb-8">
        <p className="label mb-3 flex items-center gap-3">
          <span className="h-px w-8 bg-accent" aria-hidden="true" />
          Case studies
        </p>
        <h2 className="max-w-prose font-display text-h2 text-balance text-ink">
          Problem, process, outcome — the full write-up on each.
        </h2>
      </div>

      <div
        ref={track}
        className="no-scrollbar flex gap-6 overflow-x-auto px-[var(--gutter)] pb-4 lg:overflow-visible lg:pb-0"
      >
        {projects.map((p, i) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            data-cursor="view"
            data-cursor-label="Read"
            className="surface group relative flex w-[82vw] shrink-0 flex-col justify-between rounded-card p-8 transition-colors duration-300 hover:border-ink/25 sm:w-[62vw] lg:w-[42vw]"
          >
            <div>
              <span className="font-mono text-xs text-ink-faint">
                {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </span>
              <h3 className="mt-6 font-display text-h3 text-ink">{p.name}</h3>
              <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink-muted">{p.problem}</p>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5">
              {p.stats.slice(0, 4).map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-xl tracking-tight text-ink">{s.value}</dt>
                  <dd className="mt-1 font-mono text-[11px] leading-snug text-ink-faint">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Link>
        ))}
      </div>
    </section>
  )
}
