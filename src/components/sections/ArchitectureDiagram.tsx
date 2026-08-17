'use client'

import { motion } from 'framer-motion'
import { inView, stagger } from '@/lib/motion'
import { ease } from '@/lib/tokens'

type Step = { stage: string; detail: string }

/**
 * System architecture as a flow diagram, generated from project data.
 *
 * Chosen over a screenshot on purpose: a UI screenshot of a backend system
 * shows a dashboard, not the engineering. The pipeline is the work, so the
 * pipeline is what gets drawn.
 *
 * Layout is CSS, not SVG coordinates — nodes reflow to a vertical stack on
 * narrow screens instead of scrolling off a fixed viewBox. Only the connector
 * rules are SVG, and they animate by scaling a transform.
 */
export default function ArchitectureDiagram({ steps }: { steps: Step[] }) {
  return (
    <figure className="m-0">
      <figcaption className="label mb-8">System architecture</figcaption>

      <motion.ol
        variants={stagger(0.09)}
        initial="hidden"
        whileInView="show"
        viewport={inView}
        className="grid gap-x-4 gap-y-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1
          return (
            <motion.li
              key={step.stage}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.expo } },
              }}
              className="gpu relative"
            >
              <div
                className={`surface h-full rounded-card p-5 ${
                  isLast ? 'border-accent/45' : ''
                }`}
              >
                <span
                  className={`font-mono text-[11px] ${
                    isLast ? 'text-accent-bright' : 'text-ink-faint'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 text-base font-medium leading-snug text-ink">{step.stage}</h3>
                <p className="mt-1.5 font-mono text-[11px] leading-snug text-ink-faint">
                  {step.detail}
                </p>
              </div>

              {/* No drawn connectors: the grid rewraps at three breakpoints,
                  so any fixed connector points into empty space at one of
                  them. The 01–06 sequence carries the flow instead. */}
            </motion.li>
          )
        })}
      </motion.ol>
    </figure>
  )
}
