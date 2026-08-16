import Link from 'next/link'
import AnimatedLink from '@/components/ui/AnimatedLink'
import MagneticButton from '@/components/ui/MagneticButton'
import Reveal from '@/components/ui/Reveal'
import { profile } from '@/data/site'

/** Oversized contact CTA + footer meta. */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-base-600 pt-16">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64"
        style={{
          background:
            'radial-gradient(60% 100% at 50% 0%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="shell relative">
        <Reveal>
          <p className="label mb-4">Available {profile.availability.replace('Available ', '')}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <Link
            href="/contact"
            data-cursor="view"
            data-cursor-label="Say hi"
            className="block font-display text-display font-medium leading-[0.95] tracking-tight text-ink transition-colors duration-300 hover:text-accent-bright"
          >
            Let&rsquo;s talk.
          </Link>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <MagneticButton href={`mailto:${profile.email}`} external>
              {profile.email}
            </MagneticButton>
            <MagneticButton href={profile.resume} variant="ghost" download>
              Download résumé
            </MagneticButton>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col gap-6 border-t border-base-600 py-8 text-sm text-ink-faint md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <ul className="flex flex-wrap items-center gap-6">
            <li>
              <AnimatedLink href={profile.linkedin} external>
                LinkedIn
              </AnimatedLink>
            </li>
            <li>
              <AnimatedLink href={profile.github} external>
                GitHub
              </AnimatedLink>
            </li>
            <li>
              <AnimatedLink href={`mailto:${profile.email}`} external>
                Email
              </AnimatedLink>
            </li>
            <li>
              <AnimatedLink href={`tel:${profile.phoneHref}`} external>
                {profile.phone}
              </AnimatedLink>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
