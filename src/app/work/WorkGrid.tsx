'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import TiltCard from '@/components/ui/TiltCard'
import { fadeUp, inView, stagger } from '@/lib/motion'
import { ease } from '@/lib/tokens'
import { projects, type Project } from '@/data/site'

const FILTERS = ['All', 'ML Systems', 'Data Platform', 'Research'] as const
type Filter = (typeof FILTERS)[number]

/**
 * Filterable project grid. Cards animate out and back in on filter change via
 * AnimatePresence + layout, so the grid reflows rather than snapping.
 */
export default function WorkGrid() {
  const [filter, setFilter] = useState<Filter>('All')

  const visible = useMemo<Project[]>(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  )

  return (
    <>
      <div className="mb-10 flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects">
        {FILTERS.map((f) => {
          const active = filter === f
          const count = f === 'All' ? projects.length : projects.filter((p) => p.category === f).length
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={active}
              data-cursor="hover"
              className={`relative rounded-pill border px-5 py-2.5 text-sm transition-colors duration-200 ${
                active
                  ? 'border-transparent text-base-900'
                  : 'border-base-600 text-ink-muted hover:border-ink/30 hover:text-ink'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-pill bg-ink"
                  transition={{ duration: 0.42, ease: ease.expo }}
                />
              )}
              <span className="relative">
                {f} <span className="opacity-50">{count}</span>
              </span>
            </button>
          )
        })}
      </div>

      <motion.div
        variants={stagger(0.07)}
        initial="hidden"
        whileInView="show"
        viewport={inView}
        className="grid-12"
        layout
      >
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.article
              key={p.slug}
              layout
              variants={fadeUp}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.24, ease: ease.inOut } }}
              className="col-span-12 md:col-span-6"
            >
              <TiltCard className="h-full">
                <Link
                  href={`/work/${p.slug}`}
                  data-cursor="view"
                  data-cursor-label="View"
                  className="surface flex h-full flex-col justify-between rounded-card p-8 transition-colors duration-300 hover:border-ink/25"
                >
                  <div>
                    <div className="mb-6 flex items-center justify-between gap-4">
                      <span className="label">{p.category}</span>
                      <span className="font-mono text-xs text-ink-faint">{p.year}</span>
                    </div>
                    <h2 className="font-display text-h3 text-ink">{p.name}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.tagline}</p>
                  </div>

                  <div className="mt-8">
                    <span className="block font-display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-none tracking-tight text-accent-bright">
                      {p.accentStat.value}
                    </span>
                    <span className="mt-1.5 block font-mono text-xs text-ink-faint">
                      {p.accentStat.label}
                    </span>
                  </div>
                </Link>
              </TiltCard>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
