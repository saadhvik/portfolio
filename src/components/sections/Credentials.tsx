import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import { certifications, patents, publications } from '@/data/site'

/**
 * Publications, patents and certifications — the hardest external validation
 * on the site, so it gets its own section rather than a footnote.
 */
export default function Credentials() {
  return (
    <section className="shell py-20">
      <SectionHeading
        label="Research & credentials"
        title="Work that survived outside review."
        lede="Three peer-reviewed publications, two filed patents and two Oracle Cloud professional certifications — earned before finishing the master's."
      />

      <div className="mt-10 grid-12 gap-y-10">
        <div className="col-span-12 md:col-span-7">
          <Reveal>
            <p className="label mb-5">Publications</p>
          </Reveal>
          <ul>
            {publications.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <li className="border-t border-base-600 py-5">
                  <h3 className="max-w-prose text-h3 font-medium leading-snug text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-2 font-mono text-xs text-ink-faint">
                    {p.venue}
                    {p.year !== '—' ? ` · ${p.year}` : ''}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="col-span-12 md:col-span-4 md:col-start-9">
          <Reveal>
            <p className="label mb-5">Patents filed</p>
          </Reveal>
          <ul>
            {patents.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.05}>
                <li className="border-t border-base-600 py-4">
                  <h3 className="text-base font-medium text-ink">{p.title}</h3>
                  <p className="mt-1 font-mono text-xs text-ink-faint">{p.id}</p>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal>
            <p className="label mb-5 mt-10">Certifications</p>
          </Reveal>
          <ul>
            {certifications.map((c, i) => (
              <Reveal key={c} delay={i * 0.05}>
                <li className="border-t border-base-600 py-4 text-sm text-ink-muted">{c}</li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
