import { getTranslations } from 'next-intl/server'
import { Layout } from '@/components/layout'

export async function generateMetadata() {
  const t = await getTranslations('photography')
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function Page() {
  const t = await getTranslations()
  return (
    <Layout title={t('photography.title')} intro={t('photography.description')}>
      <div className="mt-16 sm:mt-20">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {t('common.coming_soon')}
        </p>
      </div>
    </Layout>
  )
}
