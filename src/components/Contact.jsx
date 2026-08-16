import { profile } from '../data/content.js'

const MAILTO = `mailto:${profile.email}?subject=${encodeURIComponent(
  'Interview — Data Scientist / ML Engineer'
)}&body=${encodeURIComponent(
  'Hi Saadhvik,\n\nWe are hiring for a role and would like to talk.\n\nRole:\nTeam:\nA few times that work:\n\n'
)}`

export default function Contact() {
  return (
    <section id="contact" data-section className="contact">
      <div className="wrap contact__inner">
        <p className="eyebrow" data-reveal>Contact</p>
        <h2 data-reveal data-reveal-delay="60">
          I&apos;m available for full-time Data Scientist and ML Engineer roles from May 2026, and for
          internships before then.
        </h2>
        <p className="lede" data-reveal data-reveal-delay="100">
          The fastest path is email — I reply within 24 hours. The button below opens a pre-filled
          message so you only have to add the role.
        </p>

        <div className="contact__cta" data-reveal data-reveal-delay="140">
          <a className="btn btn--primary contact__big" href={MAILTO}>
            Email me about a role
          </a>
          <a className="btn contact__big" href={profile.resumePdf} download>
            ↓ Download resume (PDF)
          </a>
        </div>

        <ul className="contact__list" data-reveal data-reveal-delay="180">
          <li>
            <span className="contact__k">Email</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </li>
          <li>
            <span className="contact__k">Phone</span>
            <a href={`tel:${profile.phoneHref}`}>{profile.phone}</a>
          </li>
          <li>
            <span className="contact__k">LinkedIn</span>
            <a href={profile.linkedin} target="_blank" rel="noreferrer noopener">/in/saadhvik-muddana</a>
          </li>
          <li>
            <span className="contact__k">GitHub</span>
            <a href={profile.github} target="_blank" rel="noreferrer noopener">github.com/saadhvik</a>
          </li>
          <li>
            <span className="contact__k">Based in</span>
            <span>Cincinnati, OH — open to relocation</span>
          </li>
        </ul>
      </div>
    </section>
  )
}
