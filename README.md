# Venkata Krishna Saadhvik Muddana — Portfolio

A recruiter-first 3D portfolio. The design goal is a single measurable outcome:
**a recruiter can decide to interview within 60 seconds**, on any device, with or
without WebGL, JavaScript, or motion.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # → dist/
npm run preview    # serve the production build on :4173
```

Node 18+ required.

## Deploy

### Vercel
1. Push this folder to a GitHub repo.
2. vercel.com → **Add New → Project** → import the repo.
3. Framework preset **Vite** is detected automatically. Confirm:
   - Build command: `npm run build`
   - Output directory: `dist`
4. **Deploy**. Add your custom domain under *Settings → Domains*.

Or from the CLI:
```bash
npm i -g vercel
vercel --prod
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```
`netlify.toml` is already configured (build `npm run build`, publish `dist`).

### After deploying — do these two things
1. Replace `https://saadhvik.dev/` in `index.html` (`<link rel="canonical">`,
   `og:url`, `og:image`, `twitter:image`, JSON-LD `url`) with your real domain.
   Open Graph images must be absolute URLs or LinkedIn will not render the card.
2. Confirm the LinkedIn and GitHub URLs in `src/data/content.js` are correct —
   they are inferred placeholders (`/in/saadhvik-muddana`, `github.com/saadhvik`).

## Editing content

Everything textual lives in **`src/data/content.js`**. No copy is hard-coded in
components. To update the resume PDF, replace
`public/Venkata-Krishna-Saadhvik-Muddana-Resume.pdf` — keep the filename or update
`profile.resumePdf`.

To regenerate the social card after a copy change, edit the source HTML you used
for `public/og.png` and re-screenshot at exactly 1200×630.

## Architecture

```
index.html                     Meta, Open Graph, JSON-LD Person schema, <noscript> fallback
public/
  Venkata-...-Resume.pdf       The actual PDF, served statically
  og.png                       1200×630 social card
  favicon.svg
src/
  main.jsx                     Entry; adds .js-motion so reveals may start hidden
  App.jsx                      Layout, 3D gating logic, lazy boundary
  data/content.js              ALL resume content, single source of truth
  hooks/
    usePrefersReducedMotion.js Live media-query subscription
    useReveal.js               IntersectionObserver reveals
    useScrollProgress.js       rAF scroll ratio into a ref (no re-renders)
    useTheme.js                Dark/light with localStorage + system default
  components/
    Nav.jsx  StickyCTA.jsx  Hero.jsx  Proof.jsx  Experience.jsx
    Projects.jsx  Skills.jsx  Research.jsx  Contact.jsx  Footer.jsx
    canvas/
      SceneRoot.jsx            Canvas setup, DPR clamp, fade-in
      SpectralField.jsx        The morphing point cloud + GLSL
  styles/
    global.css                 Tokens, typography, buttons, reduced-motion rules
    components.css             Per-component styles
```

## Performance budget

Measured from `npm run build`:

| Chunk | Raw | Gzipped | On critical path? |
|---|---|---|---|
| `index.html` | 5.5 kB | 1.9 kB | yes |
| CSS | 16 kB | 4.1 kB | yes |
| `index` (app) | 26 kB | 8.7 kB | yes |
| `vendor` (react, react-dom) | 238 kB | 75 kB | yes |
| `three` (three + r3f + drei) | 706 kB | 179 kB | **no — lazy** |
| `SceneRoot` | 5.8 kB | 2.5 kB | **no — lazy** |

**Critical path ≈ 90 kB gzipped.** Total with 3D ≈ 271 kB gzipped, under the
500 kB budget. The hero paints before `three` is even requested.

## Graceful degradation

The 3D scene is skipped entirely — not merely hidden — when any of these hold:

- `prefers-reduced-motion: reduce`
- `navigator.connection.saveData`, or `effectiveType` is 2g
- `deviceMemory < 4 GB` or `hardwareConcurrency < 4`
- no WebGL context available

In every one of those cases the site is a complete, fully-readable portfolio. The
`<noscript>` block covers a JS-disabled corporate laptop with name, role, value
proposition, resume link, and contact details.

## Accessibility

- Semantic landmarks: `header` / `main` / `section` / `footer`, one `h1`
- Skip link, visible `:focus-visible` rings, `aria-current` on the active nav item
- Canvas is `aria-hidden` and `pointer-events: none` — it carries no information
- All motion respects `prefers-reduced-motion`; reveals fall back to static
- Contrast meets WCAG AA in both themes for body and UI text
