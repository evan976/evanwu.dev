import { RssIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { ChangeLanguage } from '@/components/change-language'
import { Container } from '@/components/container'
import { ModeToggle } from '@/components/mode-toggle'
import { Link } from '@/i18n/navigation'

export function Footer() {
  const t = useTranslations('footer')
  return (
    <footer className="mt-16 sm:mt-24">
      <Container.Outer>
        <div className="border-t border-neutral-100 pt-10 pb-16 dark:border-neutral-700/40">
          <Container.Inner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex gap-4 text-sm font-medium text-neutral-800 dark:text-neutral-200">
                <Link
                  href="/rss"
                  target="_blank"
                  rel="noopener"
                  aria-label="RSS Feed"
                >
                  <RssIcon className="size-4 text-neutral-500 dark:text-neutral-400 transition hover:text-violet-500 dark:hover:text-violet-400" />
                </Link>
              </div>
              <div className="flex items-center gap-6">
                <ChangeLanguage />
                <ModeToggle />
                <p
                  className="text-sm text-neutral-500 dark:text-neutral-400"
                  suppressHydrationWarning
                >
                  {t('copyright', { year: new Date().getFullYear() })}
                </p>
              </div>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  )
}
