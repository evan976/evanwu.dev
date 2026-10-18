'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

export function Copyright() {
  const t = useTranslations('footer')
  const [year, setYear] = useState<number>()

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <p
      className="text-sm text-pretty text-neutral-500 dark:text-neutral-400"
      suppressHydrationWarning
    >
      {t('copyright', { year: year ?? '' })}
    </p>
  )
}
