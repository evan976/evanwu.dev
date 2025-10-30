import 'server-only'
import fs from 'node:fs/promises'
import path from 'node:path'
import type * as React from 'react'
import readingTime from 'reading-time'

type Metadata = {
  title: string
  description: string
  publishedAt: string
  readingTime: ReturnType<typeof readingTime>
  image?: string
}

async function readMDXFile(filePath: string) {
  const raw = await fs.readFile(filePath, 'utf-8')
  return raw
}

export async function getArticleBySlug(
  slug: string,
  locale: string,
): Promise<null | {
  Component: React.FC
  metadata: Metadata
}> {
  try {
    if (
      !(await fs
        .stat(path.join(process.cwd(), 'src', 'content', locale, `${slug}.mdx`))
        .catch(() => false))
    ) {
      return null
    }

    const module = await import(`../content/${locale}/${slug}.mdx`)
    const raw = await readMDXFile(
      path.join(process.cwd(), 'src', 'content', locale, `${slug}.mdx`),
    )

    if (!module.default) {
      return null
    }

    return {
      Component: module.default,
      metadata: {
        title: module.title,
        description: module.description,
        publishedAt: module.publishedAt,
        readingTime: readingTime(raw),
        image: module.image,
      },
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function getArticleSlugs(locale: string) {
  const slugs = []
  const files = await fs.readdir(
    path.join(process.cwd(), 'src', 'content', locale),
  )

  for (const file of files) {
    if (!file.endsWith('.mdx')) continue
    slugs.push(path.parse(file).name)
  }
  return slugs
}

export async function getArticles(locale: string) {
  const slugs = await getArticleSlugs(locale)
  const articles = []

  for (const slug of slugs) {
    const article = await getArticleBySlug(slug, locale)
    if (!article) continue
    articles.push({
      slug,
      ...article.metadata,
    })
  }

  return articles.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
}

export async function getPreviousOrNextArticleSlug(
  slug: string,
  locale: string,
) {
  const articles = await getArticles(locale)
  const index = articles.findIndex((article) => article.slug === slug)

  if (index === -1) {
    return {
      previous: undefined,
      next: undefined,
    }
  }
  const previous = index > 0 ? articles[index - 1].slug : undefined
  const next =
    index < articles.length - 1 ? articles[index + 1].slug : undefined
  return {
    previous,
    next,
  }
}
