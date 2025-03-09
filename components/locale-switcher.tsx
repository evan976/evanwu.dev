'use client'

import { setUserLocale } from '@/actions/locale'
import type { Locale } from '@/i18n/config'
import { cn } from '@/lib/utils'
import { Select } from '@headlessui/react'
import { useLocale } from 'next-intl'
import * as React from 'react'

export function LocaleSwitcher() {
  const locale = useLocale()
  const [isPending, startTransition] = React.useTransition()

  function onChange(value: string) {
    const locale = value as Locale
    startTransition(() => {
      setUserLocale(locale)
    })
  }

  return (
    <div className="relative">
      <Select
        className={cn(
          'outline-0 border-none text-sm appearance-none text-zinc-500 dark:text-zinc-400 px-4',
          {
            'pointer-events-none opacity-60': isPending,
          },
        )}
        name="language"
        aria-label="Switch language"
        defaultValue={locale}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="zh">简体中文</option>
        <option value="en">English</option>
      </Select>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="group pointer-events-none absolute -right-1 top-1.5 size-3.5 text-zinc-500 dark:text-zinc-400"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  )
}
