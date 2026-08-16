import { useEffect, useState } from 'react'
import { profile, sections } from '../data/content.js'

export default function Nav({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean)
    if (!targets.length || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.6, 1] }
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])

  return (
    <header className={`nav${scrolled ? ' nav--solid' : ''}`}>
      <div className="nav__inner">
        <a className="nav__brand" href="#hero">
          <span className="nav__mark" aria-hidden="true" />
          <span className="nav__brand-text">
            <strong>Saadhvik Muddana</strong>
            <span>Data Scientist &amp; ML Engineer</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Sections">
          {sections
            .filter((s) => s.id !== 'hero')
            .map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={active === s.id ? 'is-active' : undefined}
                aria-current={active === s.id ? 'true' : undefined}
              >
                {s.label}
              </a>
            ))}
        </nav>

        <div className="nav__actions">
          <button
            type="button"
            className="nav__theme"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☾' : '☀'}
          </button>
          <a className="btn nav__resume" href={profile.resumePdf} download>
            Resume
          </a>
          <a className="btn btn--primary nav__hire" href="#contact">
            Hire me
          </a>
        </div>
      </div>
    </header>
  )
}
