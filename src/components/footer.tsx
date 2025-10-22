import { RssIcon } from 'lucide-react'
import Link from 'next/link'
import { Container } from '@/components/container'
import { ModeToggle } from '@/components/mode-toggle'

export function Footer() {
  return (
    <footer className="mt-16 sm:mt-24">
      <Container.Outer>
        <div className="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40">
          <Container.Inner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex gap-4 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                <Link
                  href="/rss.xml"
                  target="_blank"
                  rel="noopener"
                  aria-label="RSS Feed"
                >
                  <RssIcon className="size-4 text-zinc-500 dark:text-zinc-400 transition hover:text-teal-500 dark:hover:text-teal-400" />
                </Link>
              </div>
              <div className="flex items-center gap-6">
                <ModeToggle />
                <p
                  className="text-sm text-zinc-500 dark:text-zinc-400"
                  suppressHydrationWarning
                >
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
