/**
 * DESIGN TOKENS — single source of truth.
 *
 * These values are mirrored into CSS custom properties in `globals.css` and
 * into the Tailwind theme in `tailwind.config.ts`. Change them here first,
 * then mirror. Nothing in a component should hard-code a hex, a duration,
 * or an easing curve.
 *
 * ── CUSTOMISING THE ACCENT ────────────────────────────────────────────────
 * Change `accent.DEFAULT` below AND `--accent` in globals.css. Everything
 * else (glow, ring, gradient, selection, canvas particles) is derived from
 * that one value via color-mix(), so a single edit repaints the whole site.
 * Keep luminance around L*60–70 on the charcoal base or AA contrast breaks.
 */

export const colors = {
  base: {
    900: '#0A0A0B', // page ground
    850: '#0E0E10',
    800: '#131316', // raised surface
    700: '#1A1A1F', // card
    600: '#26262E', // hairline / border
    500: '#3A3A45',
  },
  ink: {
    DEFAULT: '#F4F4F5', // primary text
    muted: '#A1A1AA', // body / secondary
    faint: '#8A8A97', // labels, meta
  },
  accent: {
    DEFAULT: '#6E5BFF', // electric indigo
    bright: '#8F80FF',
    deep: '#4A38D6',
  },
  signal: {
    ok: '#3ECF8E',
    warn: '#F5A524',
  },
} as const

/** Fluid type scale. All clamp-based; never a fixed px heading. */
export const type = {
  display: 'clamp(2.75rem, 7vw, 7rem)',
  h1: 'clamp(2.25rem, 5.2vw, 4.5rem)',
  h2: 'clamp(1.85rem, 3.6vw, 3rem)',
  h3: 'clamp(1.15rem, 1.7vw, 1.5rem)',
  body: 'clamp(0.98rem, 1.05vw, 1.075rem)',
  small: '0.875rem',
  label: '0.6875rem',
} as const

/** 8pt spacing scale. Tailwind's default 4pt grid is restricted to these. */
export const space = [0, 8, 16, 24, 32, 40, 48, 64, 80, 96, 128, 160, 200] as const

/**
 * EASING — `expo` is the project default, per spec.
 * Every transition uses one of these four. No ad-hoc curves.
 */
export const ease = {
  expo: [0.16, 1, 0.3, 1] as const, // default — entrances, reveals
  inOut: [0.65, 0, 0.35, 1] as const, // state swaps
  out: [0.33, 1, 0.68, 1] as const, // small UI
  spring: { type: 'spring', stiffness: 260, damping: 30, mass: 0.8 } as const,
}

export const ease_css = {
  expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
  inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
  out: 'cubic-bezier(0.33, 1, 0.68, 1)',
} as const

/** Durations in seconds (Framer) — ms equivalents in CSS. */
export const duration = {
  fast: 0.18,
  base: 0.42,
  slow: 0.72,
  reveal: 0.9,
} as const

export const layout = {
  maxWidth: 1440,
  gutter: 'clamp(1.25rem, 4vw, 4rem)',
} as const
