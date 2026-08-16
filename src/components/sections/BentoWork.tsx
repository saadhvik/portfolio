'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import TiltCard from '@/components/ui/TiltCard'
import SectionHeading from '@/components/ui/SectionHeading'
import { fadeUp, inView, stagger } from '@/lib/motion'
import { projects } from '@/data/site'

/**
 * Bento grid of selected work. Card widths come from each project's `span`
 * (of 12), so the rhythm is data-driven rather than hard-coded per card.
 */
export default function BentoWork() {
  return (
    <section id="work" className="shell py-20">
      <SectionHeading
        label="Selected work"
        title="Systems I built end to end, and what they measurably changed."
        lede="Four projects across ML systems, data platform and research. Each one replaced a manual process with a measured one."
      />

      <motion.div
        variants={stagger(0.08, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={inView}
        className="mt-10 grid-12"
      >
        {projects.map((p) => (
          <motion.article
            key={p.slug}
            variants={fadeUp}
            className={`col-span-12 ${
              p.span === 8
                ? 'md:col-span-8'
                : p.span === 6
                  ? 'md:col-span-6'
                  : p.span === 4
                    ? 'md:col-span-4'
                    : 'md:col-span-12'
            }`}
          >
            <TiltCard className="h-full">
              <Link
                href={`/work/${p.slug}`}
                data-cursor="view"
                data-cursor-label="View"
                className="surface group flex h-full flex-col justify-between rounded-card p-6 transition-colors duration-300 hover:border-ink/25 md:p-8"
              >
                <div>
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <span className="label">{p.category}</span>
                    <span className="font-mono text-xs text-ink-faint">{p.year}</span>
                  </div>

                  <h3 className="font-display text-h3 text-ink">{p.name}</h3>
                  <p className="mt-2 max-w-prose text-sm leading-relaxed text-ink-muted">
                    {p.tagline}
                  </p>

                  {/* Wide cards would otherwise sit half-empty. Fill the space
                      with more evidence rather than more padding. */}
                  {p.span >= 8 && (
                    <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
                      {p.stats.slice(0, 3).map((s) => (
                        <div key={s.label}>
                          <dt className="font-display text-lg leading-none tracking-tight text-ink">
                            {s.value}
                          </dt>
                          <dd className="mt-1.5 font-mono text-[11px] leading-snug text-ink-faint">
                            {s.label}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>

                <div className="mt-8">
                  <div className="mb-5">
                    <span className="block font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-none tracking-tight text-accent-bright">
                      {p.accentStat.value}
                    </span>
                    <span className="mt-1.5 block font-mono text-xs text-ink-faint">
                      {p.accentStat.label}
                    </span>
                  </div>

                  <ul className="flex flex-wrap gap-2">
                    {p.stack.slice(0, 4).map((s) => (
                      <li
                        key={s}
                        className="rounded-pill border border-base-600 px-3 py-1 font-mono text-[11px] text-ink-faint"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </TiltCard>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
