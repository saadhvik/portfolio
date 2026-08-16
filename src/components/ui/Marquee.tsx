'use client'

/**
 * Infinite marquee. The track holds two identical copies of the content and
 * translates -50%, so the loop point is seamless. Pure CSS animation on
 * transform — it never touches the main thread — and it pauses on hover.
 *
 * Under reduced motion the animation stops and the strip becomes a plain
 * horizontally-scrollable list, which keeps every item reachable.
 */
export default function Marquee({
  items,
  reverse = false,
}: {
  items: readonly string[]
  reverse?: boolean
}) {
  const row = (keyPrefix: string) => (
    <ul className="flex shrink-0 items-center gap-3" aria-hidden={keyPrefix === 'b'}>
      {items.map((item) => (
        <li
          key={`${keyPrefix}-${item}`}
          className="whitespace-nowrap rounded-pill border border-base-600 px-5 py-2.5 font-mono text-sm text-ink-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  )

  return (
    <div
      className="group relative overflow-hidden py-2"
      style={{
        maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
      }}
    >
      <div
        className="gpu flex w-max gap-3 animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:overflow-x-auto"
        style={{ animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {row('a')}
        {row('b')}
      </div>
    </div>
  )
}
