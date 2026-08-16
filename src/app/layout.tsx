import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import SmoothScroll from '@/components/providers/SmoothScroll'
import Cursor from '@/components/providers/Cursor'
import PageTransition from '@/components/providers/PageTransition'
import { profile } from '@/data/site'

/**
 * ── SWAPPING FONTS ────────────────────────────────────────────────────────
 * Both faces are self-hosted by next/font at build time (no runtime request
 * to Google, no layout shift). To change the display face, swap the import
 * for any next/font/google family and keep the `variable` name — Tailwind
 * reads `--font-display` / `--font-body`, so nothing else changes.
 *
 * For General Sans (not on Google Fonts): drop the .woff2 files into
 * src/app/fonts/, switch to `next/font/local`, and keep the same variable.
 */
const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.shortName}`,
  },
  description:
    'Data Scientist and MS CS candidate. Cut physics-simulation runtime from 8 hours to sub-second with PyTorch surrogates, removed 60% of redundant records at Infosys, shipped a RAG trial-matcher at 81% top-3 accuracy. 3 publications, 2 patents.',
  authors: [{ name: profile.name }],
  keywords: [
    'Data Scientist', 'Machine Learning Engineer', 'PyTorch', 'RAG', 'MLOps',
    'Hyperspectral imaging', 'dbt', 'Cincinnati',
  ],
  openGraph: {
    type: 'profile',
    title: `${profile.name} — ${profile.role}`,
    description:
      '8 hours to sub-second. 60% fewer redundant records. 81% top-3 RAG accuracy. 3 publications, 2 patents. Available May 2026.',
    url: profile.siteUrl,
    siteName: profile.name,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: profile.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} — ${profile.role}`,
    description: '8h → sub-second. 81% top-3 RAG accuracy. 3 publications, 2 patents.',
    images: ['/og.png'],
  },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0B',
  width: 'device-width',
  initialScale: 1,
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  givenName: 'Venkata Krishna Saadhvik',
  familyName: 'Muddana',
  jobTitle: 'Data Scientist',
  email: `mailto:${profile.email}`,
  telephone: '+15133496965',
  url: profile.siteUrl,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Cincinnati',
    addressRegion: 'OH',
    addressCountry: 'US',
  },
  knowsAbout: [
    'Machine Learning', 'Deep Learning', 'PyTorch', 'scikit-learn', 'Python', 'SQL', 'R',
    'MLOps', 'Retrieval-Augmented Generation', 'Hyperspectral Imaging', 'Data Engineering',
    'dbt', 'Apache Spark', 'Databricks', 'Snowflake', 'AWS', 'Power BI',
  ],
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'University of Cincinnati' },
    { '@type': 'CollegeOrUniversity', name: 'SRM University AP' },
  ],
  worksFor: { '@type': 'CollegeOrUniversity', name: 'University of Cincinnati' },
  sameAs: [profile.linkedin, profile.github],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[300] focus:rounded-pill focus:bg-ink focus:px-5 focus:py-3 focus:text-base-900"
        >
          Skip to content
        </a>

        <Cursor />
        <Nav />

        <SmoothScroll>
          <PageTransition>
            <main id="main">{children}</main>
            <Footer />
          </PageTransition>
        </SmoothScroll>
      </body>
    </html>
  )
}
