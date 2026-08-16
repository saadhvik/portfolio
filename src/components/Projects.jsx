import { projects } from '../data/content.js'

export default function Projects() {
  return (
    <section id="projects" data-section className="proj">
      <div className="wrap">
        <p className="eyebrow" data-reveal>Selected projects</p>
        <h2 data-reveal data-reveal-delay="60">Two systems I built end to end, and what they measurably changed.</h2>

        <div className="proj__grid">
          {projects.map((p, i) => (
            <article key={p.id} className="proj__card card" data-reveal data-reveal-delay={String(100 + i * 110)}>
              <p className="proj__tag">{p.tag}</p>
              <h3 className="proj__name">{p.name}</h3>

              <ul className="proj__stats">
                {p.stats.map((s) => (
                  <li key={s.l}>
                    <span className="proj__stat-v">{s.v}</span>
                    <span className="proj__stat-l">{s.l}</span>
                  </li>
                ))}
              </ul>

              <dl className="proj__par">
                <div>
                  <dt>Problem</dt>
                  <dd>{p.problem}</dd>
                </div>
                <div>
                  <dt>What I built</dt>
                  <dd>{p.action}</dd>
                </div>
                <div>
                  <dt>Result</dt>
                  <dd>{p.result}</dd>
                </div>
              </dl>

              <ul className="chips" aria-label="Stack">
                {p.stack.map((t) => (
                  <li key={t} className="chip">{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
