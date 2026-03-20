import { getLocale, getTranslations } from 'next-intl/server'
import { baseUrl } from '@/app/sitemap'
import { Layout } from '@/components/layout'
import { routing } from '@/i18n/routing'

export async function generateMetadata() {
  const t = await getTranslations('photography')
  const locale = await getLocale()
  const localePath = locale === routing.defaultLocale ? '' : `/${locale}`
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${baseUrl}${localePath}/photography`,
    },
  }
}

export default async function Page() {
  const t = await getTranslations()
  return (
    <Layout title={t('photography.title')} intro={t('photography.description')}>
      <div className="mt-16 sm:mt-20">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {t('common.coming_soon')}
        </p>
      </div>
    </Layout>
  )
}
