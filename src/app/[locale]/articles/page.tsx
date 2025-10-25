import { ChevronRightIcon } from 'lucide-react'
import { getFormatter, getTranslations } from 'next-intl/server'
import { Layout } from '@/components/layout'
import { Link } from '@/i18n/navigation'
import { getArticles } from '@/lib/article'

export async function generateMetadata() {
  const t = await getTranslations('articles')
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function Page({
  params,
}: PageProps<'/[locale]/articles'>) {
  const { locale } = await params
  const articles = await getArticles(locale)
  const t = await getTranslations()
  const formatter = await getFormatter()
  return (
    <Layout title={t('articles.title')} intro={t('articles.description')}>
      <div className="mt-16 sm:mt-20">
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="group/article md:grid md:grid-cols-4 md:items-baseline"
              >
                <div className="md:col-span-3 group relative flex flex-col items-start">
                  <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                    <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-xl dark:bg-zinc-800/50" />
                    <Link href={`/articles/${article.slug}`}>
                      <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
                      <span className="relative z-10">{article.title}</span>
                    </Link>
                  </h2>
                  <time
                    dateTime={article.publishedAt.toLocaleString()}
                    suppressHydrationWarning
                    className="md:hidden relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 flex items-center"
                    >
                      <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                    </span>
                    {formatter.dateTime(new Date(article.publishedAt), {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </time>
                  <p
                    className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2"
                    title={article.description}
                  >
                    {article.description}
                  </p>
                  <div className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500">
                    {t('common.read_more')}
                    <ChevronRightIcon
                      aria-hidden="true"
                      className="ml-1 mt-0.5 size-3 group-hover/article:translate-x-0.5 transition-all duration-200"
                    />
                  </div>
                </div>
                <time
                  suppressHydrationWarning
                  dateTime={article.publishedAt.toLocaleString()}
                  className="mt-1 max-md:hidden relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500"
                >
                  {formatter.dateTime(new Date(article.publishedAt), {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
