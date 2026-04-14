import { ChevronRightIcon } from 'lucide-react'
import { getFormatter, getLocale, getTranslations } from 'next-intl/server'
import { Layout } from '@/components/layout'
import { Link } from '@/i18n/navigation'
import { getArticles } from '@/lib/mdx'
import {
  canonicalForPath,
  defaultOgImage,
  languageAlternatesForPath,
} from '@/lib/metadata-urls'
import { buildArticlesPageSchemas } from '@/lib/schema'

export async function generateMetadata() {
  const [t, locale] = await Promise.all([
    getTranslations('articles'),
    getLocale(),
  ])
  const canonical = canonicalForPath('/articles', locale)
  return {
    title: t('seo_title'),
    description: t('description'),
    alternates: {
      canonical,
      languages: languageAlternatesForPath('/articles'),
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

export default async function Page({
  params,
}: PageProps<'/[locale]/articles'>) {
  const { locale } = await params
  const [articles, t, formatter] = await Promise.all([
    getArticles(locale),
    getTranslations(),
    getFormatter(),
  ])
  const articlePageSchemas = buildArticlesPageSchemas({ locale, articles })

  return (
    <Layout title={t('articles.title')} intro={t('articles.description')}>
      {articlePageSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
      <div className="mt-16 sm:mt-20">
        <div className="md:border-l md:border-neutral-100 md:pl-6 md:dark:border-neutral-700/40">
          <ol className="flex max-w-3xl flex-col space-y-16">
            {articles.map((article) => (
              <li key={article.slug}>
                <article className="group/article md:grid md:grid-cols-4 md:items-baseline">
                  <Link
                    href={`/articles/${article.slug}`}
                    className="group relative md:col-span-3 flex flex-col items-start rounded-2xl text-left no-underline outline-offset-4 transition-colors focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-neutral-200"
                  >
                    <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-neutral-50 opacity-0 transition-[transform,opacity] group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-xl dark:bg-neutral-800/50" />
                    <time
                      dateTime={article.publishedAt.toLocaleString()}
                      suppressHydrationWarning
                      className="md:hidden relative z-10 mb-3 flex items-center text-sm tabular-nums text-neutral-500 dark:text-neutral-400 pl-3.5"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-0 left-0 flex items-center"
                      >
                        <span className="h-4 w-0.5 rounded-full bg-neutral-200 dark:bg-neutral-500" />
                      </span>
                      {formatter.dateTime(new Date(article.publishedAt), {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                    <h2 className="relative z-10 text-base font-semibold text-balance text-neutral-800 dark:text-neutral-100">
                      {article.title}
                    </h2>
                    <p
                      className="relative z-10 mt-2 text-sm text-pretty text-neutral-600 dark:text-neutral-400 line-clamp-2"
                      title={article.description}
                    >
                      {article.description}
                    </p>
                    <div className="relative z-10 mt-4 flex items-center text-xs text-neutral-500 dark:text-neutral-400">
                      {t('common.read_more')}
                      <ChevronRightIcon
                        aria-hidden="true"
                        className="ml-1 mt-0.5 size-3 shrink-0 text-neutral-500 dark:text-neutral-400 group-hover/article:translate-x-0.5 transition-transform duration-200"
                      />
                    </div>
                  </Link>
                  <time
                    suppressHydrationWarning
                    dateTime={article.publishedAt.toLocaleString()}
                    className="mt-1 max-md:hidden relative z-10 order-first mb-3 flex items-center text-sm tabular-nums text-neutral-500 dark:text-neutral-400"
                  >
                    {formatter.dateTime(new Date(article.publishedAt), {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </time>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Layout>
  )
}
