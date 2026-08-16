import { heroMetrics, profile } from '../data/content.js'

export default function Hero() {
  return (
    <section id="hero" data-section className="hero">
      <div className="wrap hero__inner">
        <p className="hero__status">
          <span className="hero__dot" aria-hidden="true" />
          Available for full-time Data Scientist / ML Engineer roles, May 2026
        </p>

        {/* h1 is plain text in the initial HTML payload — it paints before any
            3D asset is even requested. This is the 1-second guarantee. */}
        <h1 className="hero__name">
          Venkata Krishna Saadhvik <span className="hero__surname">Muddana</span>
        </h1>

        <p className="hero__role">
          Data Scientist &amp; ML Engineer
          <span className="hero__sep" aria-hidden="true">/</span>
          <span className="hero__loc">Cincinnati, OH · open to relocation</span>
        </p>

        <p className="hero__value">{profile.valueProp}</p>

        <ul className="hero__metrics">
          {heroMetrics.map((m) => (
            <li key={m.value} className={`hero__metric hero__metric--${m.tone}`}>
              <span className="metric">{m.value}</span>
              <span className="metric-label">{m.label}</span>
            </li>
          ))}
        </ul>

        <div className="hero__cta">
          <a className="btn btn--primary" href={profile.resumePdf} download>
            ↓ Download resume (PDF)
          </a>
          <a className="btn" href="#contact">Contact me</a>
          <a className="btn" href="#experience">See the work</a>
        </div>

        <p className="hero__meta">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <span aria-hidden="true">·</span>
          <a href={`tel:${profile.phoneHref}`}>{profile.phone}</a>
          <span aria-hidden="true">·</span>
          <a href={profile.linkedin} target="_blank" rel="noreferrer noopener">LinkedIn</a>
          <span aria-hidden="true">·</span>
          <a href={profile.github} target="_blank" rel="noreferrer noopener">GitHub</a>
        </p>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  )
}
