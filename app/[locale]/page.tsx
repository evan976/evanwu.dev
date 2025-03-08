import { Container } from '@/components/container'
import { useTranslations } from 'next-intl'
import * as React from 'react'

export default function Page() {
  const t = useTranslations('home')
  return (
    <React.Fragment>
      <Container className="mt-9">
        <div className="max-w-2xl text-lg">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            {t('title')}
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            {t('description')}
          </p>
        </div>
      </Container>
    </React.Fragment>
  )
}
