import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type * as React from 'react'
import readingTime from 'reading-time'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const filePath = path.join(__dirname, '../content')

type Metadata = {
  title: string
  description: string
  publishedAt: string
  readingTime: ReturnType<typeof readingTime>
}

async function readMDXFile(filePath: string) {
  const raw = await fs.readFile(filePath, 'utf-8')
  return raw
}

export async function getArticleBySlug(slug: string): Promise<null | {
  Component: React.FC
  metadata: Metadata
}> {
  try {
    if (
      !(await fs
        .stat(path.join(process.cwd(), 'content', `${slug}.mdx`))
        .catch(() => false))
    ) {
      return null
    }

    const module = await import(`../content/${slug}.mdx`)
    const raw = await readMDXFile(path.join(filePath, `${slug}.mdx`))

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
      },
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function getArticleSlugs() {
  const slugs = []
  const files = await fs.readdir(path.join(__dirname, '../content'))

  for (const file of files) {
    if (!file.endsWith('.mdx')) continue
    slugs.push(path.parse(file).name)
  }
  return slugs
}

export async function getArticles() {
  const slugs = await getArticleSlugs()
  const articles = []

  for (const slug of slugs) {
    const article = await getArticleBySlug(slug)
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
