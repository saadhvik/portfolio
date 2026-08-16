import { about } from '../data/content.js'

export default function Proof() {
  return (
    <section id="proof" data-section className="proof">
      <div className="wrap">
        <p className="eyebrow" data-reveal>The through-line</p>
        <h2 data-reveal data-reveal-delay="60">{about.headline}</h2>

        <div className="proof__grid">
          <div className="proof__body" data-reveal data-reveal-delay="120">
            {about.body.map((p, i) => (
              <p key={i} className="lede">{p}</p>
            ))}
          </div>

          <dl className="proof__facts" data-reveal data-reveal-delay="180">
            {about.facts.map((f) => (
              <div key={f.k} className="proof__fact">
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
