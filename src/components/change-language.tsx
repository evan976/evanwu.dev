'use client'

import * as React from 'react'
import { useParams } from 'next/navigation'
import { type Locale, useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'

export function ChangeLanguage() {
  const locale = useLocale()
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const pathname = usePathname()
  const params = useParams()

  function onSelectChange(nextLocale: Locale) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale, scroll: false },
      )
    })
  }

  return (
    <button
      type="button"
      aria-label="Change language"
      disabled={isPending}
      className="text-sm text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-300 uppercase"
      onClick={() => onSelectChange(locale === 'en' ? 'zh' : 'en')}
    >
      {locale}
    </button>
  )
}
