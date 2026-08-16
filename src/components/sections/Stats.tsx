'use client'

import Counter from '@/components/ui/Counter'
import Reveal from '@/components/ui/Reveal'

/**
 * Headline metrics. Each value is real and traceable to the résumé — the
 * counter animates the digits but the final number is what renders by default.
 */
const ITEMS = [
  { value: 8, prefix: '', suffix: 'h → <1s', label: 'Physics simulation runtime, via PyTorch surrogates' },
  { value: 81, prefix: '', suffix: '%', label: 'Top-3 accuracy, 500 oncologist-reviewed cases' },
  { value: 60, prefix: '−', suffix: '%', label: 'Redundant records removed from procurement data' },
  { value: 5, prefix: '', suffix: '', label: 'Peer-reviewed publications and filed patents' },
]

export default function Stats() {
  return (
    <section className="shell py-20">
      <div className="grid-12 gap-y-10">
        {ITEMS.map((item, i) => (
          <Reveal key={item.label} delay={i * 0.06} className="col-span-6 md:col-span-3">
            <div className="border-l border-base-600 pl-5">
              <span className="block font-display text-[clamp(2rem,4vw,3.25rem)] leading-none tracking-tight text-ink">
                <Counter value={item.value} prefix={item.prefix} suffix={item.suffix} />
              </span>
              <span className="mt-3 block max-w-[22ch] text-sm leading-snug text-ink-muted">
                {item.label}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
