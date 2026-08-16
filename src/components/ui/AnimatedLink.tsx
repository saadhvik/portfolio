import Link from 'next/link'

/** Text link with the shared left-to-right underline wipe. */
export default function AnimatedLink({
  href,
  children,
  external,
  className = '',
}: {
  href: string
  children: React.ReactNode
  external?: boolean
  className?: string
}) {
  const cls = `link-underline text-ink-muted transition-colors duration-200 hover:text-ink ${className}`
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={cls} data-cursor="hover">
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={cls} data-cursor="hover">
      {children}
    </Link>
  )
}
