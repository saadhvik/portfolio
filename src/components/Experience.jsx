import { education, experience } from '../data/content.js'

export default function Experience() {
  return (
    <section id="experience" data-section className="exp">
      <div className="wrap">
        <p className="eyebrow" data-reveal>Experience</p>
        <h2 data-reveal data-reveal-delay="60">Three roles, one pattern: measurable time and error removed.</h2>

        <ol className="exp__list">
          {experience.map((job, i) => (
            <li key={job.id} className="exp__item" data-reveal data-reveal-delay={String(80 + i * 90)}>
              <div className="exp__rail" aria-hidden="true">
                <span className={`exp__node${job.current ? ' is-current' : ''}`} />
              </div>

              <article className="exp__card card">
                <header className="exp__head">
                  <div>
                    <h3>
                      {job.role} <span className="exp__at">·</span> <span className="exp__org">{job.org}</span>
                    </h3>
                    <p className="exp__meta">
                      <time>{job.period}</time> · {job.place}
                      {job.current && <span className="exp__badge">Current</span>}
                    </p>
                  </div>
                </header>

                <p className="exp__headline">{job.headline}</p>

                <ul className="exp__stats">
                  {job.stats.map((s) => (
                    <li key={s.l}>
                      <span className="exp__stat-v">{s.v}</span>
                      <span className="exp__stat-l">{s.l}</span>
                    </li>
                  ))}
                </ul>

                <ul className="exp__bullets">
                  {job.bullets.map((b, bi) => (
                    <li key={bi}>{b}</li>
                  ))}
                </ul>

                <ul className="chips" aria-label="Tools used">
                  {job.stack.map((t) => (
                    <li key={t} className="chip">{t}</li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>

        <div className="edu" data-reveal>
          <h3 className="edu__title">Education</h3>
          <ul className="edu__list">
            {education.map((e) => (
              <li key={e.school} className="edu__item card">
                <strong>{e.school}</strong>
                <span>{e.degree}</span>
                <span className="edu__meta">{e.period} · {e.place}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
