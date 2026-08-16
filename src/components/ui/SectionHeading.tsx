import Reveal from './Reveal'

/**
 * Consistent section header: eyebrow label, display heading, optional lede.
 * Every section uses this so vertical rhythm and hierarchy never drift.
 */
export default function SectionHeading({
  label,
  title,
  lede,
  align = 'left',
}: {
  label: string
  title: React.ReactNode
  lede?: string
  align?: 'left' | 'center'
}) {
  return (
    <header className={align === 'center' ? 'mx-auto max-w-prose text-center' : 'max-w-prose'}>
      <Reveal>
        <p className="label mb-3 flex items-center gap-3">
          {align === 'left' && <span className="h-px w-8 bg-accent" aria-hidden="true" />}
          {label}
        </p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="font-display text-h2 text-balance text-ink">{title}</h2>
      </Reveal>
      {lede && (
        <Reveal delay={0.12}>
          <p className="mt-3 text-body text-ink-muted">{lede}</p>
        </Reveal>
      )}
    </header>
  )
}
