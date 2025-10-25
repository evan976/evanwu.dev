'use client'

import { RotateCw } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/button'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations('error')
  return (
    <html lang="en">
      <body className="flex h-screen flex-col items-center justify-center">
        <h2 className="text-4xl font-bold text-zinc-800 dark:text-zinc-100">
          {t('title')}
        </h2>
        <pre className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-x-auto">
          {error.message}
        </pre>
        <Button
          variant="primary"
          onClick={() => reset()}
          aria-label={t('try_again')}
          className="mt-4"
        >
          <RotateCw className="size-3" />
          <span>{t('try_again')}</span>
        </Button>
      </body>
    </html>
  )
}
