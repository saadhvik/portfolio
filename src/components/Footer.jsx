import { profile } from '../data/content.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <p>
          <strong>{profile.name}</strong> — {profile.role}
        </p>
        <p className="footer__meta">
          Built with React, React Three Fiber and Three.js. No trackers, no cookies, no autoplaying sound.
        </p>
      </div>
    </footer>
  )
}
