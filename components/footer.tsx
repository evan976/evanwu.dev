import { Container } from '@/components/container'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { LocaleSwitcher } from './locale-switcher'

function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      prefetch
      href={href}
      className="transition hover:text-teal-500 dark:hover:text-teal-400"
    >
      {children}
    </Link>
  )
}

export function Footer() {
  const t = useTranslations('nav')
  return (
    <footer className="mt-32">
      <Container.Outer>
        <div className="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40">
          <Container.Inner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                <NavLink href="/about">{t('about')}</NavLink>
                <NavLink href="/projects">{t('projects')}</NavLink>
                <NavLink href="/photography">{t('photography')}</NavLink>
                <NavLink href="/uses">{t('uses')}</NavLink>
              </div>
              <div className="flex items-center gap-6">
                <LocaleSwitcher />
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  &copy; {new Date().getFullYear()} Evan. All rights reserved.
                </p>
              </div>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  )
}
