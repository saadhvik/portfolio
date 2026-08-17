import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Reveal from '@/components/ui/Reveal'
import ArchitectureDiagram from '@/components/sections/ArchitectureDiagram'
import MagneticButton from '@/components/ui/MagneticButton'
import { projects } from '@/data/site'

// Next 15+ passes route params as a Promise — they must be awaited.
type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return { title: 'Not found' }
  return {
    title: project.name,
    description: project.tagline,
    openGraph: { title: project.name, description: project.tagline },
  }
}

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  const index = projects.findIndex((p) => p.slug === project.slug)
  const next = projects[(index + 1) % projects.length]

  return (
    <article className="pb-20 pt-32 md:pt-40">
      {/* ── Masthead ─────────────────────────────────────────────── */}
      <header className="shell">
        <Link href="/work" className="link-underline label mb-8 inline-block" data-cursor="hover">
          ← All work
        </Link>

        <div className="grid-12 gap-y-6">
          <div className="col-span-12 md:col-span-8">
            <p className="label mb-4">
              {project.category} · {project.year}
            </p>
            <h1 className="font-display text-h1 font-medium text-balance text-ink">
              {project.name}
            </h1>
            <p className="mt-5 max-w-prose text-body text-ink-muted">{project.tagline}</p>
          </div>

          <div className="col-span-12 md:col-span-3 md:col-start-10">
            <p className="label mb-2">Role</p>
            <p className="text-sm text-ink-muted">{project.role}</p>
          </div>
        </div>
      </header>

      {/* ── Full-bleed stat band ─────────────────────────────────────── */}
      <div className="relative my-16 overflow-hidden border-y border-base-600 py-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(70% 120% at 50% 0%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 65%)',
          }}
          aria-hidden="true"
        />
        <div className="shell relative">
          <p className="mb-10 font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-none tracking-tight text-accent-bright">
            {project.accentStat.value}
          </p>
          <p className="label mb-10">{project.accentStat.label}</p>
          <dl className="grid-12 gap-y-8">
            {project.stats.map((s) => (
              <div key={s.label} className="col-span-6 md:col-span-3">
                <dt className="font-display text-[clamp(1.4rem,2.4vw,2rem)] leading-none tracking-tight text-ink">
                  {s.value}
                </dt>
                <dd className="mt-2 font-mono text-xs leading-snug text-ink-faint">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* ── Problem → Process → Outcome ──────────────────────────── */}
      <div className="shell">
        <div className="grid-12 gap-y-12">
          <section className="col-span-12 md:col-span-8 md:col-start-3">
            <Reveal>
              <p className="label mb-4">01 — Problem</p>
              <p className="text-body text-ink">{project.problem}</p>
            </Reveal>

            <Reveal>
              <p className="label mb-4 mt-16">02 — Process</p>
              <ol className="space-y-6">
                {project.process.map((step, i) => (
                  <li key={i} className="flex gap-5 border-t border-base-600 pt-5">
                    <span className="shrink-0 font-mono text-xs text-accent-bright">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-body text-ink-muted">{step}</p>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal>
              <div className="mt-16">
                <ArchitectureDiagram steps={project.pipeline} />
              </div>
            </Reveal>

            <Reveal>
              <p className="label mb-4 mt-16">03 — Outcome</p>
              <p className="text-body text-ink">{project.outcome}</p>
            </Reveal>

            <Reveal>
              <p className="label mb-4 mt-16">Stack</p>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded-pill border border-base-600 px-4 py-1.5 font-mono text-xs text-ink-muted"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>
        </div>
      </div>

      {/* ── Next project ─────────────────────────────────────────── */}
      <nav className="shell mt-25 border-t border-base-600 pt-12" aria-label="Next project">
        <p className="label mb-4">Next case study</p>
        <Link
          href={`/work/${next.slug}`}
          data-cursor="view"
          data-cursor-label="Read"
          className="group block"
        >
          <h2 className="font-display text-h1 font-medium tracking-tight text-ink transition-colors duration-300 group-hover:text-accent-bright">
            {next.name}
          </h2>
          <p className="mt-3 max-w-prose text-body text-ink-muted">{next.tagline}</p>
        </Link>
        <div className="mt-8">
          <MagneticButton href="/contact">Start a conversation</MagneticButton>
        </div>
      </nav>
    </article>
  )
}
