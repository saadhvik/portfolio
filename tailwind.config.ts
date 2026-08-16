import type { Config } from 'tailwindcss'

/**
 * Mirrors src/lib/tokens.ts. Keep them in sync — tokens.ts is the source of
 * truth, this file is the Tailwind projection of it.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        base: {
          900: '#0A0A0B',
          850: '#0E0E10',
          800: '#131316',
          700: '#1A1A1F',
          600: '#26262E',
          500: '#3A3A45',
        },
        ink: {
          DEFAULT: '#F4F4F5',
          muted: '#A1A1AA',
          faint: '#6B6B76',
        },
        accent: {
          DEFAULT: '#6E5BFF',
          bright: '#8F80FF',
          deep: '#4A38D6',
        },
        signal: {
          ok: '#3ECF8E',
          warn: '#F5A524',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Space Grotesk', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      fontSize: {
        display: ['clamp(2.75rem, 7vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        h1: ['clamp(2.25rem, 5.2vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        h2: ['clamp(1.85rem, 3.6vw, 3rem)', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        h3: ['clamp(1.15rem, 1.7vw, 1.5rem)', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        body: ['clamp(0.98rem, 1.05vw, 1.075rem)', { lineHeight: '1.6' }],
        label: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.18em' }],
      },
      // 8pt scale only.
      spacing: {
        1: '8px',
        2: '16px',
        3: '24px',
        4: '32px',
        5: '40px',
        6: '48px',
        8: '64px',
        10: '80px',
        12: '96px',
        16: '128px',
        20: '160px',
        25: '200px',
      },
      maxWidth: {
        shell: '1440px',
        prose: '68ch',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-quart': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      borderRadius: {
        card: '20px',
        pill: '999px',
      },
      backgroundImage: {
        'glass':
          'linear-gradient(150deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.015) 42%, rgba(255,255,255,0) 100%)',
        'accent-fade':
          'linear-gradient(135deg, color-mix(in srgb, #6E5BFF 26%, transparent), transparent 62%)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translate3d(0,0,0)' },
          to: { transform: 'translate3d(-50%,0,0)' },
        },
        pulseDot: {
          '0%': { boxShadow: '0 0 0 0 rgba(62,207,142,0.5)' },
          '70%': { boxShadow: '0 0 0 8px rgba(62,207,142,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(62,207,142,0)' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        pulseDot: 'pulseDot 2.4s cubic-bezier(0.65,0,0.35,1) infinite',
      },
    },
  },
  plugins: [],
}

export default config
