# Venkata Krishna Saadhvik Muddana — Portfolio

Enterprise-grade personal site. Next.js App Router, TypeScript, Tailwind,
Framer Motion, GSAP ScrollTrigger, Lenis, and a 2D canvas particle field.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the build
```

---

## Customising

### Accent colour

The whole site is accented from **one value**. Change it in two places, which
are kept deliberately in sync:

1. `src/lib/tokens.ts` → `colors.accent.DEFAULT`
2. `src/app/globals.css` → `--accent` (and `--accent-bright`, ~15% lighter)

`tailwind.config.ts` mirrors the same hex for utility classes. Everything else
— button hovers, the tilt-card glare, the hero canvas particles, focus rings,
the page-transition curtain, gradient washes — derives from those via
`color-mix()`, so one edit repaints the site.

Keep luminance roughly L\*60–70 against `#0A0A0B` or AA contrast breaks on the
small mono labels.

### Fonts

Both faces load through `next/font/google` in `src/app/layout.tsx`, self-hosted
at build time — no runtime request to Google, no layout shift.

```ts
const display = Space_Grotesk({ variable: '--font-display', ... })
const body    = Inter({ variable: '--font-body', ... })
```

To swap: change the import to any `next/font/google` family and **keep the
`variable` name**. Tailwind reads `--font-display` / `--font-body`, so no
component changes.

For **General Sans** (not on Google Fonts): drop the `.woff2` files into
`src/app/fonts/`, switch to `next/font/local`, keep the same variable names.

### Content

Everything lives in `src/data/site.ts`. No copy is hard-coded in a component.
Projects drive both the bento grid and the case-study routes — adding an entry
to `projects` generates a new `/work/[slug]` page automatically via
`generateStaticParams`.

---

## Structure

```
src/
  app/
    layout.tsx              Fonts, metadata, JSON-LD, providers
    page.tsx                Home
    globals.css             Tokens as CSS vars + component/utility layers
    work/page.tsx           Filterable grid (WorkGrid.tsx is the client part)
    work/[slug]/page.tsx    Case study — problem → process → outcome
    about/page.tsx          Story, timeline, tool stack
    contact/page.tsx        Form (ContactForm.tsx) + details
    not-found.tsx
  components/
    providers/
      SmoothScroll.tsx      Lenis, driven from the GSAP ticker
      Cursor.tsx            Custom cursor with hover states
      PageTransition.tsx    Route enter/exit + curtain
    layout/                 Nav (pill, shared layoutId), Footer (oversized CTA)
    hero/                   Hero, HeroCanvas (particle field)
    ui/                     MagneticButton, TiltCard, SplitText, Marquee,
                            Counter, Reveal, SectionHeading, AnimatedLink
    sections/               BentoWork, HorizontalGallery, Stats,
                            SkillsMarquee, AboutTeaser, Credentials
  lib/
    tokens.ts               SOURCE OF TRUTH for colour/type/space/easing
    motion.ts               Shared Framer variants
    useMotionPreference.ts  Reduced-motion + device-capability gates
  data/site.ts              All content
```

---

## Motion system

Four easings, three durations, defined once in `tokens.ts`. Nothing declares an
ad-hoc curve. The project default is `cubic-bezier(0.16, 1, 0.3, 1)`.

| Interaction | Where | Notes |
|---|---|---|
| Masked char reveal | `SplitText` | Chars grouped per word so lines never break mid-token |
| Magnetic hover | `MagneticButton` | Label drifts less than the shell — reads as weight |
| 3D tilt + glare | `TiltCard` | Capped at 7° — past ~10° text smears |
| Pinned horizontal scroll | `HorizontalGallery` | Desktop only; pin length = scroll distance, so travel is 1:1 |
| Infinite marquee | `Marquee` | Pure CSS transform, pauses on hover |
| Number counters | `Counter` | Final value renders by default; animation is additive |
| Route transitions | `PageTransition` | `mode="wait"` so heights don't jump |
| Particle field | `HeroCanvas` | Lattice + pointer displacement, springs home |

**Only `transform` and `opacity` are animated.** Every animated node carries
`.gpu` (own layer, no layout/paint work).

### Why Canvas2D and not Three.js for the hero

The hero is additive dots on a lattice. Three.js would add ~180KB gzipped to
draw what Canvas2D does at 60fps in under 3KB. WebGL is right for geometry and
shading; it is the wrong tool for 2,000 circles.

---

## Degradation

The motion system degrades as a whole, not in pieces.

`prefers-reduced-motion: reduce` →
Lenis never initialises (native scroll returns) · ScrollTrigger pinning never
registers · the custom cursor never mounts · `SplitText` renders plain text ·
counters show their final value · the marquee stops and becomes a scrollable
list · all CSS transitions collapse to 0.01ms.

The hero canvas is *additionally* skipped on Save-Data, 2G, `deviceMemory < 4`,
or `hardwareConcurrency < 4`. A static gradient wash renders underneath it in
every case, so the hero is never an empty void.

Horizontal pinning is desktop-only (`min-width: 1024px`) — trapping vertical
scroll on a phone is hostile. Below that it is a normal scrollable row.

---

## Accessibility

- Semantic landmarks, one `h1` per route, real `ol`/`ul`/`dl`
- Skip link; visible focus rings on every interactive element
- `SplitText` exposes the intact sentence to screen readers and marks the
  per-character spans `aria-hidden` — no character-by-character announcement
- Nav uses `aria-current="page"`; filters use `aria-pressed`
- Canvas is `aria-hidden` and carries no information
- The custom cursor never hides the native cursor until it has confirmed a fine
  pointer, so a failure can't leave anyone without a cursor

## TODOs

Marked inline with `TODO(saadhvik)`:

- **`src/data/site.ts`** — verify the LinkedIn and GitHub URLs resolve (both
  inferred from the résumé PDF, which hyperlinks the words but not the targets)
- **`src/app/work/[slug]/page.tsx`** — the full-bleed stat band is a deliberate
  stand-in for a screenshot or architecture diagram; swap it when you have one
- **`src/app/contact/ContactForm.tsx`** — currently composes a `mailto:`. Swap
  `handleSubmit` for a POST if you want submissions in a database

## Deploy

Vercel auto-detects Next.js. Push to `main` and it ships. `metadataBase` is set
from `profile.siteUrl` in `src/data/site.ts` — update that when a custom domain
is attached, or Open Graph images resolve against the wrong host.
