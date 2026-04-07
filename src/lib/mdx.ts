import 'server-only'
import fs from 'node:fs/promises'
import path from 'node:path'
import { cache } from 'react'
import readingTime from 'reading-time'

type Metadata = {
  title: string
  description: string
  publishedAt: string
  readingTime: ReturnType<typeof readingTime>
  image?: string
}

const FRONTMATTER_REGEX = /---\s*([\s\S]*?)\s*---/

function parseFrontmatter(fileContent: string) {
  const match = FRONTMATTER_REGEX.exec(fileContent)
  const frontMatterBlock = match![1]
  const content = fileContent.replace(FRONTMATTER_REGEX, '').trim()
  const frontMatterLines = frontMatterBlock.trim().split('\n')
  const metadata: Record<string, string> = {}

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1')
    metadata[key.trim()] = value
  })

  return { metadata, content }
}

async function readMDXFile(filePath: string) {
  const raw = await fs.readFile(filePath, 'utf-8')
  return raw
}

export const getArticleBySlug = cache(async function getArticleBySlug(
  slug: string,
  locale: string,
): Promise<null | {
  metadata: Metadata
  content: string
}> {
  try {
    if (
      !(await fs
        .stat(path.join(process.cwd(), 'src', 'content', locale, `${slug}.mdx`))
        .catch(() => false))
    ) {
      return null
    }

    const raw = await readMDXFile(
      path.join(process.cwd(), 'src', 'content', locale, `${slug}.mdx`),
    )
    const { metadata, content } = parseFrontmatter(raw)
    return {
      metadata: {
        title: metadata.title,
        description: metadata.description,
        publishedAt: metadata.publishedAt,
        readingTime: readingTime(content),
        image: metadata.image,
      },
      content,
    }
  } catch (error) {
    console.error(error)
    return null
  }
})

export async function getArticleSlugs(locale: string) {
  const dir = path.join(process.cwd(), 'src', 'content', locale)
  try {
    const files = await fs.readdir(dir)
    const slugs = []
    for (const file of files) {
      if (!file.endsWith('.mdx')) continue
      slugs.push(path.parse(file).name)
    }
    return slugs
  } catch {
    return []
  }
}

export const getArticles = cache(async (locale: string) => {
  const slugs = await getArticleSlugs(locale)

  const results = await Promise.all(
    slugs.map(async (slug) => {
      const article = await getArticleBySlug(slug, locale)
      if (!article) return null
      return { slug, ...article.metadata }
    }),
  )

  return results
    .filter((a): a is NonNullable<typeof a> => a !== null)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
})

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
