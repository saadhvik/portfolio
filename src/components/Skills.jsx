import { skillGroups } from '../data/content.js'

export default function Skills() {
  return (
    <section id="skills" data-section className="skills">
      <div className="wrap">
        <p className="eyebrow" data-reveal>Technical skills</p>
        <h2 data-reveal data-reveal-delay="60">The full stack I work across — grouped the way a hiring manager screens.</h2>
        <p className="lede" data-reveal data-reveal-delay="100">
          Listed in plain text so it survives an ATS parse. Nothing here is aspirational — every item
          appears in shipped work above.
        </p>

        <div className="skills__grid">
          {skillGroups.map((g, i) => (
            <section
              key={g.band}
              className={`skills__band card skills__band--${g.accent}`}
              data-reveal
              data-reveal-delay={String(120 + i * 90)}
            >
              <h3 className="skills__band-title">{g.band}</h3>
              <ul className="chips chips--dense">
                {g.items.map((s) => (
                  <li key={s} className="chip">{s}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
