'use client'

import { motion } from 'framer-motion'
import { charRise, stagger } from '@/lib/motion'
import { useReducedMotionPref } from '@/lib/useMotionPreference'

type Props = {
  lines: readonly string[]
  className?: string
  /** Split granularity. Chars for headlines, words for longer copy. */
  by?: 'char' | 'word'
  delay?: number
  as?: 'h1' | 'h2' | 'p' | 'div'
}

/**
 * Masked staggered reveal. Each line is an overflow-hidden block; the glyphs
 * inside translate up from 110% so they appear to rise out of the mask edge.
 *
 * Accessibility: the split text is aria-hidden and the intact string is
 * exposed via .sr-only, so screen readers get one clean sentence rather than
 * a stream of single characters.
 */
export default function SplitText({
  lines,
  className = '',
  by = 'char',
  delay = 0,
  as: Tag = 'div',
}: Props) {
  const reduced = useReducedMotionPref()
  const full = lines.join(' ')

  if (reduced) {
    return <Tag className={className}>{full}</Tag>
  }

  return (
    <Tag className={className}>
      <span className="sr-only">{full}</span>
      <motion.span
        aria-hidden="true"
        variants={stagger(by === 'char' ? 0.018 : 0.05, delay)}
        initial="hidden"
        animate="show"
        className="block"
      >
        {lines.map((line, li) => (
          <span className="mask-line" key={li}>
            {line.split(' ').map((word, wi) =>
              by === 'char' ? (
                /* Chars are wrapped per-word. Without this the browser is free
                   to line-break between any two inline-block glyphs, which
                   splits words mid-token on narrow screens. */
                <span key={`${li}-${wi}`} className="inline-block whitespace-nowrap">
                  {Array.from(word).map((ch, ci) => (
                    <motion.span
                      key={`${li}-${wi}-${ci}`}
                      variants={charRise}
                      className="gpu inline-block"
                    >
                      {ch}
                    </motion.span>
                  ))}
                  {wi < line.split(' ').length - 1 && <span>&nbsp;</span>}
                </span>
              ) : (
                <motion.span
                  key={`${li}-${wi}`}
                  variants={charRise}
                  className="gpu inline-block whitespace-nowrap"
                >
                  {word}
                  {wi < line.split(' ').length - 1 && <>&nbsp;</>}
                </motion.span>
              )
            )}
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}
