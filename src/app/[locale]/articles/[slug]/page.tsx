import * as React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  getFormatter,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server'
import { baseUrl } from '@/app/sitemap'
import { ArticleWidget } from '@/components/article-widget'
import { ArrowLeftIcon } from '@/components/icons'
import { Link } from '@/i18n/navigation'
import {
  getArticleBySlug,
  getArticleSlugs,
  getPreviousOrNextArticleSlug,
} from '@/lib/article'

export const dynamicParams = false

export async function generateStaticParams({
  params,
}: {
  params: Promise<{
    locale: string
  }>
}) {
  const { locale } = await params
  const slugs = await getArticleSlugs(locale)
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string
    locale: string
  }>
}): Promise<Metadata | undefined> {
  const { slug, locale } = await params
  const article = await getArticleBySlug(slug, locale)

  if (!article) return

  const { title, description, publishedAt, image } = article.metadata

  const ogUrl = image ? image : `/api/og?path=/articles/${slug}`

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      siteName: "Evan's Blog",
      locale,
      publishedTime: publishedAt,
      url: `/articles/${slug}`,
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

export default async function Page({
  params,
}: PageProps<'/[locale]/articles/[slug]'>) {
  const { slug, locale } = await params

  const article = await getArticleBySlug(slug, locale)
  const adjacent = await getPreviousOrNextArticleSlug(slug, locale)
  const t = await getTranslations('articles')
  const formatter = await getFormatter()

  if (!article) {
    notFound()
  }

  const { title, description, publishedAt, readingTime, image } =
    article.metadata

  setRequestLocale(locale)

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
            image: image || `/api/og?path=/articles/${slug}`,
            url: `/articles/${slug}`,
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
                    className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white ring-1 shadow-md shadow-neutral-800/5 ring-neutral-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-neutral-700/50 dark:bg-neutral-800 dark:ring-0 dark:ring-white/10 dark:hover:border-neutral-700 dark:hover:ring-white/20"
                  >
                    <ArrowLeftIcon className="size-4" />
                  </Link>
                  <article>
                    <header className="flex flex-col">
                      <h1 className="mt-6 text-3xl font-bold tracking-tight text-neutral-800 sm:text-4xl dark:text-neutral-100">
                        {title}
                      </h1>
                      <div className="order-first flex items-center gap-4 text-sm">
                        <time
                          suppressHydrationWarning
                          dateTime={publishedAt.toLocaleString()}
                          className="text-neutral-400 dark:text-neutral-500 flex items-center"
                        >
                          <span className="h-4 w-0.5 rounded-full bg-neutral-200 dark:bg-neutral-500" />
                          <span className="ml-3">
                            {formatter.dateTime(new Date(publishedAt), {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </time>
                        <span className="text-neutral-400 dark:text-neutral-500">
                          {t('reading_time', {
                            minutes: Math.ceil(readingTime?.minutes || 0),
                          })}
                        </span>
                      </div>
                    </header>
                    {image && (
                      <div className="mt-8 w-full p-1 rounded-xl overflow-hidden bg-white ring-1 ring-neutral-900/10 dark:bg-neutral-800/50 dark:ring-white/10">
                        <Image
                          src={image}
                          alt={title}
                          width={1200}
                          height={630}
                          sizes="(min-width: 1024px) 100vw, 100vw"
                          priority
                          className="rounded-lg object-cover"
                        />
                      </div>
                    )}
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
      <ArticleWidget previous={adjacent.previous} next={adjacent.next} />
    </section>
  )
}
