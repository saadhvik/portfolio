'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ease } from '@/lib/tokens'
import { profile } from '@/data/site'

type Field = 'name' | 'company' | 'message'

/**
 * Minimal contact form with floating labels and an animated focus rule.
 *
 * No backend by design: submitting composes a pre-filled mailto: to Saadhvik.
 * That means zero server, zero spam surface and zero chance of a silently
 * dropped message — the recruiter sees the mail land in their own sent items.
 *
 * TODO(saadhvik): if you want submissions in a database instead, swap
 * `handleSubmit` for a POST to /api/contact (or a Formspree / Resend endpoint)
 * and keep the mailto as the no-JS fallback on the <form action>.
 */
export default function ContactForm() {
  const [values, setValues] = useState<Record<Field, string>>({
    name: '',
    company: '',
    message: '',
  })
  const [focused, setFocused] = useState<Field | null>(null)

  const set = (field: Field, value: string) =>
    setValues((v) => ({ ...v, [field]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(
      `Role enquiry${values.company ? ` — ${values.company}` : ''}`
    )
    const bodyText = encodeURIComponent(
      `Hi Saadhvik,\n\n${values.message}\n\n— ${values.name}${
        values.company ? `\n${values.company}` : ''
      }`
    )
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${bodyText}`
  }

  const fields: { id: Field; label: string; type: 'text' | 'textarea' }[] = [
    { id: 'name', label: 'Your name', type: 'text' },
    { id: 'company', label: 'Company', type: 'text' },
    { id: 'message', label: 'What role, and what would I be working on?', type: 'textarea' },
  ]

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      {fields.map((f) => {
        const active = focused === f.id || values[f.id].length > 0
        return (
          <div key={f.id} className="relative pt-7">
            <label
              htmlFor={f.id}
              className={`pointer-events-none absolute left-0 origin-left transition-all duration-300 ${
                active
                  ? 'top-0 text-xs tracking-[0.14em] text-ink-faint'
                  : 'top-7 text-base text-ink-muted'
              }`}
              style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
            >
              {f.label}
            </label>

            {f.type === 'textarea' ? (
              <textarea
                id={f.id}
                name={f.id}
                required={f.id === 'message'}
                rows={4}
                value={values[f.id]}
                onChange={(e) => set(f.id, e.target.value)}
                onFocus={() => setFocused(f.id)}
                onBlur={() => setFocused(null)}
                className="w-full resize-none bg-transparent pb-3 pt-1 text-base text-ink outline-none"
              />
            ) : (
              <input
                id={f.id}
                name={f.id}
                type="text"
                required={f.id === 'name'}
                value={values[f.id]}
                onChange={(e) => set(f.id, e.target.value)}
                onFocus={() => setFocused(f.id)}
                onBlur={() => setFocused(null)}
                className="w-full bg-transparent pb-3 pt-1 text-base text-ink outline-none"
              />
            )}

            {/* Base rule + accent rule that scales in from the left on focus. */}
            <span className="block h-px w-full bg-base-600" aria-hidden="true" />
            <motion.span
              className="block h-px w-full origin-left bg-accent"
              style={{ marginTop: -1 }}
              initial={false}
              animate={{ scaleX: focused === f.id ? 1 : 0 }}
              transition={{ duration: 0.42, ease: ease.expo }}
              aria-hidden="true"
            />
          </div>
        )
      })}

      <button
        type="submit"
        data-cursor="hover"
        className="mt-10 inline-flex items-center gap-2 rounded-pill bg-ink px-7 py-4 text-sm font-medium text-base-900 transition-colors duration-200 hover:bg-accent hover:text-white"
      >
        Send message →
      </button>

      <p className="mt-4 text-xs text-ink-faint">
        Opens your mail client with the message pre-filled. Prefer to write directly?{' '}
        <a href={`mailto:${profile.email}`} className="link-underline text-ink-muted">
          {profile.email}
        </a>
      </p>
    </form>
  )
}
