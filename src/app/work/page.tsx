import type { Metadata } from 'next'
import WorkGrid from './WorkGrid'
import SplitText from '@/components/ui/SplitText'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected projects: RAG clinical trial matching, a governed dbt warehouse over 3.3M records, PyTorch physics surrogates, and hyperspectral classification research.',
  alternates: { canonical: '/work' },
}

export default function WorkPage() {
  return (
    <section className="shell pb-20 pt-32 md:pt-40">
      <p className="label mb-4">Work</p>
      <SplitText
        as="h1"
        lines={['Four systems.', 'Measured outcomes.']}
        by="char"
        className="mb-6 max-w-[16ch] font-display text-h1 font-medium text-ink"
      />
      <p className="mb-12 max-w-prose text-body text-ink-muted">
        Each project below replaced a manual or unmeasured process with one that has numbers
        attached. Open any card for the full problem → process → outcome write-up.
      </p>
      <WorkGrid />
    </section>
  )
}
