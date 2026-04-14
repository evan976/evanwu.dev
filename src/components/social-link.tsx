import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { links } from '@/lib/constants'

export function SocialLink({
  name,
  href,
}: {
  name: (typeof links)[number]['name']
  href: (typeof links)[number]['href']
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group -m-2.5 p-2.5"
      aria-label={`Follow on ${name}`}
    >
      <Image
        src={`/icons/social/${name}.svg`}
        alt={name}
        width={20}
        height={20}
        aria-hidden="true"
        className="opacity-50 transition-opacity group-hover:opacity-70 dark:invert"
      />
    </Link>
  )
}
