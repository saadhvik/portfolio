'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { navItems, profile } from '@/data/site'
import { ease } from '@/lib/tokens'

/**
 * Pill navigation. The active indicator is a shared layoutId, so it slides
 * between items rather than cross-fading.
 */
export default function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[120] py-4 transition-colors duration-500 ${
        scrolled
          ? 'border-b border-base-600 bg-base-900/80 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <div className="shell flex items-center gap-4">
        <Link
          href="/"
          className="hidden items-center gap-2.5 text-sm font-medium tracking-tight sm:flex"
          data-cursor="hover"
        >
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          <span className="hidden sm:inline">{profile.shortName}</span>
        </Link>

        {/* min-w-0 lets the pill shrink below its content width instead of
            pushing items off-screen; the inner nav scrolls if it must, so no
            destination is ever unreachable at any viewport size. */}
        <nav
          className="no-scrollbar mx-auto flex min-w-0 max-w-full items-center gap-0.5 overflow-x-auto rounded-pill border border-base-600 bg-base-900/60 p-1 backdrop-blur-xl sm:gap-1"
          aria-label="Primary"
        >
          {navItems.map((item) => {
            const active =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                data-cursor="hover"
                aria-current={active ? 'page' : undefined}
                className="relative shrink-0 rounded-pill px-3 py-2 text-[13px] text-ink-muted transition-colors duration-200 hover:text-ink sm:px-4 sm:text-sm"
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-pill bg-white/[0.08]"
                    transition={{ duration: 0.42, ease: ease.expo }}
                  />
                )}
                <span className={`relative ${active ? 'text-ink' : ''}`}>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <a
          href={profile.resume}
          download
          data-cursor="hover"
          className="hidden rounded-pill border border-base-600 px-4 py-2 text-sm text-ink transition-colors duration-200 hover:border-ink/40 hover:bg-white/[0.04] sm:inline-flex"
        >
          Résumé
        </a>
      </div>
    </header>
  )
}
