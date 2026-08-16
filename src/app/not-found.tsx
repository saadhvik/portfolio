import Link from 'next/link'
import MagneticButton from '@/components/ui/MagneticButton'

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70svh] flex-col justify-center py-32">
      <p className="label mb-4">404</p>
      <h1 className="mb-6 max-w-[14ch] font-display text-h1 font-medium text-ink">
        This page does not exist.
      </h1>
      <p className="mb-8 max-w-prose text-body text-ink-muted">
        The link may be out of date. Everything worth seeing is one click away.
      </p>
      <div className="flex flex-wrap gap-3">
        <MagneticButton href="/">Back home</MagneticButton>
        <MagneticButton href="/work" variant="ghost">
          See the work
        </MagneticButton>
      </div>
    </section>
  )
}
