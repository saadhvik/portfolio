import type { Metadata } from 'next'
import ContactForm from './ContactForm'
import SplitText from '@/components/ui/SplitText'
import Reveal from '@/components/ui/Reveal'
import AnimatedLink from '@/components/ui/AnimatedLink'
import { profile } from '@/data/site'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Available for full-time Data Scientist and ML Engineer roles from May 2026, and for internships before then. Replies within 24 hours.',
  alternates: { canonical: '/contact' },
}

const DETAILS = [
  { k: 'Email', v: profile.email, href: `mailto:${profile.email}` },
  { k: 'Phone', v: profile.phone, href: `tel:${profile.phoneHref}` },
  { k: 'LinkedIn', v: profile.linkedinLabel, href: profile.linkedin },
  { k: 'GitHub', v: profile.githubLabel, href: profile.github },
]

export default function ContactPage() {
  return (
    <section className="shell pb-20 pt-32 md:pt-40">
      <p className="label mb-4">Contact</p>
      <SplitText
        as="h1"
        lines={['Available', 'May 2026.']}
        by="char"
        className="mb-6 font-display text-h1 font-medium text-ink"
      />

      <Reveal>
        <p className="mb-14 max-w-prose text-body text-ink-muted">
          Open to full-time Data Scientist and ML Engineer roles from May 2026, and to internships
          before then. Based in Cincinnati, OH and open to relocation. I reply within 24 hours.
        </p>
      </Reveal>

      <div className="grid-12 gap-y-14">
        <div className="col-span-12 md:col-span-7">
          <ContactForm />
        </div>

        <div className="col-span-12 md:col-span-4 md:col-start-9">
          <Reveal>
            <div className="mb-8 inline-flex items-center gap-2.5 rounded-pill border border-base-600 px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-ok animate-pulseDot" aria-hidden="true" />
              <span className="font-mono text-xs text-ink-muted">Open to opportunities</span>
            </div>
          </Reveal>

          <dl>
            {DETAILS.map((d, i) => (
              <Reveal key={d.k} delay={i * 0.05}>
                <div className="border-t border-base-600 py-4">
                  <dt className="label mb-1.5">{d.k}</dt>
                  <dd>
                    <AnimatedLink href={d.href} external>
                      {d.v}
                    </AnimatedLink>
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={0.25}>
            <a
              href={profile.resume}
              download
              data-cursor="hover"
              className="mt-8 inline-flex w-full items-center justify-between rounded-card border border-base-600 p-5 transition-colors duration-300 hover:border-ink/30"
            >
              <span className="text-sm text-ink">Download résumé</span>
              <span className="font-mono text-xs text-ink-faint">PDF ↓</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
