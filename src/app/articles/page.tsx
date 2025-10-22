import { format } from 'date-fns'
import { ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'
import { Layout } from '@/components/layout'
import { getArticles } from '@/lib/article'

export async function generateMetadata() {
  return {
    title: 'Articles',
    description:
      'All of my long-form thoughts on programming, open source, infrastructure, and more, collected in chronological order.',
  }
}

export default async function Page() {
  const articles = await getArticles()
  return (
    <Layout
      title="Articles"
      intro="All of my long-form thoughts on programming, open source, infrastructure, and more, collected in chronological order."
    >
      <div className="mt-16 sm:mt-20">
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="md:grid md:grid-cols-4 md:items-baseline"
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
                    dateTime={article.publishedAt}
                    className="md:hidden relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 flex items-center"
                    >
                      <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                    </span>
                    {format(new Date(article.publishedAt), 'MMMM d, yyyy')}
                  </time>
                  <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {article.description}
                  </p>
                  <div className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500">
                    Read article
                    <ChevronRightIcon
                      aria-hidden="true"
                      className="ml-1 mt-0.5 size-3"
                    />
                  </div>
                </div>
                <time
                  dateTime={article.publishedAt}
                  className="mt-1 max-md:hidden relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500"
                >
                  {format(new Date(article.publishedAt), 'MMMM d, yyyy')}
                </time>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
