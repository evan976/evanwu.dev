import * as React from 'react'
import { format } from 'date-fns'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { baseUrl } from '@/app/sitemap'
import { ArrowLeftIcon } from '@/components/icons'
import { getArticleBySlug, getArticleSlugs } from '@/lib/article'

export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = await getArticleSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) return

  const { title, description, publishedAt } = article.metadata

  const ogUrl = `/api/og?path=/articles/${slug}`

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: publishedAt,
      url: `/articles/${slug}`,
      images: [{ url: ogUrl }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: ogUrl }],
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const { title, description, publishedAt, readingTime } = article.metadata

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: title,
            datePublished: publishedAt,
            dateModified: publishedAt,
            description,
            image: `/api/og?path=/articles/${slug}`,
            url: `/articles/${slug}`,
            author: {
              '@type': 'Person',
              name: 'Evan',
            },
          }),
        }}
      />
      <div className="sm:px-8 mt-16 lg:mt-32">
        <div className="mx-auto w-full max-w-7xl lg:px-8">
          <div className="relative px-4 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-2xl lg:max-w-5xl">
              <div className="xl:relative">
                <div className="mx-auto max-w-2xl">
                  <Link
                    href="/articles"
                    aria-label="Go back to articles"
                    className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white ring-1 shadow-md shadow-zinc-800/5 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
                  >
                    <ArrowLeftIcon className="size-4" />
                  </Link>
                  <article>
                    <header className="flex flex-col">
                      <h1 className="mt-6 text-3xl font-bold tracking-tight text-zinc-800 sm:text-4xl dark:text-zinc-100">
                        {title}
                      </h1>
                      <div className="order-first flex items-center gap-4 text-sm">
                        <time
                          dateTime={publishedAt}
                          className="text-zinc-400 dark:text-zinc-500 flex items-center"
                        >
                          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                          <span className="ml-3">
                            {format(new Date(publishedAt), 'MMMM d, yyyy')}
                          </span>
                        </time>
                        <span className="text-zinc-400 dark:text-zinc-500">
                          {readingTime?.text}
                        </span>
                      </div>
                    </header>
                    <div className="mt-8 prose">
                      <React.Suspense>
                        <article.Component />
                      </React.Suspense>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
