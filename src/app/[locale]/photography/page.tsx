import { getLocale, getTranslations } from 'next-intl/server'
import { Layout } from '@/components/layout'
import {
  canonicalForPath,
  defaultOgImage,
  languageAlternatesForPath,
} from '@/lib/metadata-urls'

export async function generateMetadata() {
  const [t, locale] = await Promise.all([
    getTranslations('photography'),
    getLocale(),
  ])
  const canonical = canonicalForPath('/photography', locale)
  return {
    title: t('seo_title'),
    description: t('description'),
    alternates: {
      canonical,
      languages: languageAlternatesForPath('/photography'),
    },
    openGraph: {
      title: t('seo_title'),
      description: t('description'),
      url: canonical,
      siteName: "Evan's Blog",
      locale,
      type: 'website',
      images: [defaultOgImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('seo_title'),
      description: t('description'),
      creator: '@evan1297',
      images: [defaultOgImage],
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
