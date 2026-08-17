import type { Metadata } from 'next'
import SplitText from '@/components/ui/SplitText'
import Reveal from '@/components/ui/Reveal'
import MagneticButton from '@/components/ui/MagneticButton'
import SkillsMarquee from '@/components/sections/SkillsMarquee'
import Credentials from '@/components/sections/Credentials'
import { education, experience, profile, skillGroups } from '@/data/site'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Data Scientist and MS Computer Science candidate at the University of Cincinnati. Surrogate modelling, RAG systems, hyperspectral ML and analytics engineering.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <>
      <section className="shell pb-16 pt-32 md:pt-40">
        <p className="label mb-4">About</p>
        <SplitText
          as="h1"
          lines={['High-dimensional data,', 'shipped as decisions.']}
          by="char"
          className="mb-8 max-w-[18ch] font-display text-h1 font-medium text-ink"
        />

        <div className="grid-12 gap-y-8">
          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <p className="text-body text-ink-muted">{profile.bio}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-5 text-body text-ink-muted">
                That means SHAP, cross-validation, drift monitoring and 73 dbt tests — not just a
                good-looking validation curve. The proof that a model works belongs in the same
                deliverable as the model.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="mt-8 flex flex-wrap gap-3">
                <MagneticButton href={profile.resume} download>
                  Download résumé
                </MagneticButton>
                <MagneticButton href="/contact" variant="ghost">
                  Get in touch
                </MagneticButton>
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <Reveal>
              <p className="label mb-5">Education</p>
              <ul>
                {education.map((e) => (
                  <li key={e.school} className="border-t border-base-600 py-4">
                    <h3 className="text-base font-medium text-ink">{e.school}</h3>
                    <p className="mt-1 text-sm text-ink-muted">{e.degree}</p>
                    <p className="mt-1 font-mono text-xs text-ink-faint">{e.period}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────────── */}
      <section className="shell py-16">
        <Reveal>
          <p className="label mb-8">Timeline</p>
        </Reveal>
        <ol className="relative">
          {experience.map((job, i) => (
            <Reveal
              key={job.org}
              delay={i * 0.06}
              as="li"
              className="relative grid gap-2 border-t border-base-600 py-8 md:grid-cols-[220px_1fr] md:gap-10"
            >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-2 h-2 w-2 shrink-0 rounded-full ${
                      job.current ? 'bg-accent' : 'bg-base-500'
                    }`}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-xs text-ink-faint">{job.period}</span>
                </div>
                <div>
                  <h3 className="text-h3 font-medium text-ink">
                    {job.role} <span className="text-ink-faint">·</span>{' '}
                    <span className="text-accent-bright">{job.org}</span>
                  </h3>
                  <p className="mt-2 max-w-prose text-body text-ink-muted">{job.summary}</p>
                  <p className="mt-2 font-mono text-xs text-ink-faint">{job.place}</p>
                </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ── Tool stack ───────────────────────────────────────────── */}
      <section className="shell py-16">
        <Reveal>
          <p className="label mb-8">Tool stack</p>
        </Reveal>
        <div className="grid-12 gap-y-10">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.06} className="col-span-12 md:col-span-4">
              <h3 className="mb-4 text-h3 font-medium text-ink">{group.title}</h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((s) => (
                  <li
                    key={s}
                    className="rounded-pill border border-base-600 px-3.5 py-1.5 font-mono text-xs text-ink-muted"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <SkillsMarquee />
      <Credentials />
    </>
  )
}
