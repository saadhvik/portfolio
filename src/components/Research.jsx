import { certifications, patents, publications } from '../data/content.js'

export default function Research() {
  return (
    <section id="research" data-section className="res">
      <div className="wrap">
        <p className="eyebrow" data-reveal>Research, patents &amp; certifications</p>
        <h2 data-reveal data-reveal-delay="60">Work that survived outside review.</h2>
        <p className="lede" data-reveal data-reveal-delay="100">
          Three peer-reviewed publications, two filed patents, and two Oracle Cloud
          professional certifications — external validation that the methods hold up.
        </p>

        <div className="res__grid">
          <section className="res__col card" data-reveal data-reveal-delay="140">
            <h3 className="res__title">Publications <span className="res__count">3</span></h3>
            <ul className="res__list">
              {publications.map((p) => (
                <li key={p.title}>
                  <span className="res__item-title">{p.title}</span>
                  <span className="res__item-meta">{p.venue}{p.year !== '—' ? ` · ${p.year}` : ''}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="res__col card" data-reveal data-reveal-delay="200">
            <h3 className="res__title">Patents filed <span className="res__count">2</span></h3>
            <ul className="res__list">
              {patents.map((p) => (
                <li key={p.id}>
                  <span className="res__item-title">{p.title}</span>
                  <span className="res__item-meta res__mono">{p.id}</span>
                </li>
              ))}
            </ul>

            <h3 className="res__title res__title--sub">Certifications</h3>
            <ul className="res__list">
              {certifications.map((c) => (
                <li key={c}>
                  <span className="res__item-title">{c}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </section>
  )
}
