import { profile } from '../data/content.js'

/**
 * Mobile-only persistent action bar. On desktop the same two actions live in
 * the header, so a recruiter is never more than one tap from the PDF.
 */
export default function StickyCTA() {
  return (
    <div className="stickycta" role="complementary" aria-label="Quick actions">
      <a className="btn stickycta__btn" href={profile.resumePdf} download>
        ↓ Resume
      </a>
      <a className="btn btn--primary stickycta__btn" href={`mailto:${profile.email}?subject=Interview%20—%20Data%20Scientist%20role`}>
        Contact me
      </a>
    </div>
  )
}
