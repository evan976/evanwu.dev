import { routing } from '@/i18n/routing'
import { baseUrl } from '@/lib/site'

type Schema = Record<string, unknown>

type ArticleListEntry = {
  slug: string
  title: string
}

type HomeSchemasOptions = {
  locale: string
  articles: ArticleListEntry[]
}

type ArticlesPageSchemasOptions = {
  locale: string
  articles: ArticleListEntry[]
}

type ArticleSchemasOptions = {
  locale: string
  url: string
  title: string
  description: string
  publishedAt: string
  updatedAt?: string
  image: string
  readingTimeMinutes?: number
  content: string
  topics?: string[]
}

const KNOWN_ENTITIES = [
  { name: 'React', type: 'SoftwareApplication' },
  { name: 'Next.js', type: 'SoftwareApplication' },
  { name: 'TypeScript', type: 'SoftwareApplication' },
  { name: 'Cloudflare', type: 'Organization' },
  { name: 'TanStack Start', type: 'SoftwareApplication' },
  { name: 'Solana', type: 'Thing' },
  { name: 'Anchor', type: 'SoftwareApplication' },
] as const

function withLocalePath(path: string, locale: string) {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`
  return `${baseUrl}${prefix}${path}`
}

function toThing(name: string) {
  return {
    '@type': 'Thing',
    name,
  }
}

function createAbout(topics: string[] | undefined, title: string) {
  if (topics && topics.length > 0) {
    return topics.map(toThing)
  }

  return [toThing(title)]
}

function extractMentions(content: string, title: string, description: string) {
  const haystack = `${title}\n${description}\n${content}`

  return KNOWN_ENTITIES.filter(({ name }) =>
    haystack.toLowerCase().includes(name.toLowerCase()),
  ).map(({ name, type }) => ({
    '@type': type,
    name,
  }))
}

export function buildRobotsRules() {
  return [
    {
      userAgent: '*',
      allow: '/',
    },
    {
      userAgent: 'GPTBot',
      allow: '/',
    },
    {
      userAgent: 'ChatGPT-User',
      allow: '/',
    },
    {
      userAgent: 'ClaudeBot',
      allow: '/',
    },
    {
      userAgent: 'CCBot',
      allow: '/',
    },
    {
      userAgent: 'Bytespider',
      allow: '/',
    },
  ]
}

export function buildHomeSchemas({
  locale,
  articles,
}: HomeSchemasOptions): Schema[] {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': withLocalePath('/', locale),
      name: "Evan's Blog",
      url: withLocalePath('/', locale),
      inLanguage: locale,
      about: [
        toThing('Frontend Development'),
        toThing('Open Source'),
        toThing('React'),
        toThing('TypeScript'),
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Evan Wu',
      url: baseUrl,
      jobTitle: 'Frontend Developer',
      sameAs: [
        'https://x.com/evan1297',
        'https://www.linkedin.com/in/evan976',
        'https://github.com/evan976',
        'https://t.me/evan9712',
      ],
      knowsAbout: [
        'Frontend Development',
        'Web Design',
        'Open Source',
        'React',
        'TypeScript',
      ],
      image: 'https://evanwu.dev/avatars/about.png',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Latest Articles',
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      numberOfItems: Math.min(articles.length, 3),
      itemListElement: articles.slice(0, 3).map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: withLocalePath(`/articles/${article.slug}`, locale),
        name: article.title,
      })),
    },
  ]
}

export function buildArticlesPageSchemas({
  locale,
  articles,
}: ArticlesPageSchemasOptions): Schema[] {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Articles',
      description:
        'All long-form thoughts on programming, open source, infrastructure, and more.',
      url: withLocalePath('/articles', locale),
      inLanguage: locale,
      about: [
        toThing('Frontend Development'),
        toThing('React'),
        toThing('TypeScript'),
        toThing('Web Performance'),
      ],
      author: {
        '@type': 'Person',
        name: 'Evan Wu',
        url: baseUrl,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'All Articles by Evan Wu',
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: withLocalePath(`/articles/${article.slug}`, locale),
        name: article.title,
      })),
    },
  ]
}

export function buildArticleSchemas({
  locale,
  url,
  title,
  description,
  publishedAt,
  updatedAt,
  image,
  readingTimeMinutes,
  content,
  topics,
}: ArticleSchemasOptions): Schema[] {
  const articlePath = new URL(url).pathname

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description,
      datePublished: publishedAt,
      dateModified: updatedAt ?? publishedAt,
      image,
      url,
      inLanguage: locale,
      wordCount: readingTimeMinutes
        ? Math.round(readingTimeMinutes * 200)
        : undefined,
      about: createAbout(topics, title),
      mentions: extractMentions(content, title, description),
      author: {
        '@type': 'Person',
        name: 'Evan Wu',
        url: baseUrl,
      },
      publisher: {
        '@type': 'Person',
        name: 'Evan Wu',
        url: baseUrl,
      },
      isPartOf: {
        '@type': 'Blog',
        name: "Evan's Blog",
        url: withLocalePath('/articles', locale),
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description,
      datePublished: publishedAt,
      dateModified: updatedAt ?? publishedAt,
      image,
      url,
      inLanguage: locale,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: withLocalePath('/', locale),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Articles',
          item: withLocalePath('/articles', locale),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: title,
          item: `${baseUrl}${articlePath}`,
        },
      ],
    },
  ]
}
