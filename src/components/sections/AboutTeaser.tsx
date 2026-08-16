import Reveal from '@/components/ui/Reveal'
import MagneticButton from '@/components/ui/MagneticButton'
import SectionHeading from '@/components/ui/SectionHeading'
import { experience, profile } from '@/data/site'

export default function AboutTeaser() {
  return (
    <section className="shell py-20">
      <div className="grid-12 gap-y-10">
        <div className="col-span-12 md:col-span-6">
          <SectionHeading label="About" title="I work where raw signal becomes a decision." />
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-prose text-body text-ink-muted">{profile.bio}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-8">
              <MagneticButton href="/about" variant="ghost">
                More about me
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        <div className="col-span-12 md:col-span-5 md:col-start-8">
          <Reveal>
            <p className="label mb-5">Track record</p>
          </Reveal>
          <ol className="space-y-0">
            {experience.map((job, i) => (
              <Reveal key={job.org} delay={0.06 * i} as="li" className="border-t border-base-600 py-5">
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-h3 font-medium text-ink">{job.org}</h3>
                    {job.current && (
                      <span className="shrink-0 rounded-pill border border-signal-ok/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-signal-ok">
                        Now
                      </span>
                    )}
                  </div>
                  <p className="mt-1 font-mono text-xs text-ink-faint">
                    {job.role} · {job.period}
                  </p>
                  <p className="mt-2 text-sm text-ink-muted">{job.summary}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
