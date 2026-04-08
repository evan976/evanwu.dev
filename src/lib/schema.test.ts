import { describe, expect, test } from 'vitest'
import {
  buildArticleSchemas,
  buildHomeSchemas,
  buildRobotsRules,
} from './schema'

describe('buildHomeSchemas', () => {
  test('returns top-level schema objects with @type', () => {
    const schemas = buildHomeSchemas({
      locale: 'en',
      articles: [
        {
          slug: 'react-server-component',
          title: 'React Server Components',
        },
      ],
    })

    expect(schemas.length).toBeGreaterThan(0)

    for (const schema of schemas) {
      expect(schema['@type']).toBeTruthy()
    }
  })

  test('does not emit FAQPage schema', () => {
    const schemas = buildHomeSchemas({
      locale: 'en',
      articles: [],
    })

    expect(schemas.some((schema) => schema['@type'] === 'FAQPage')).toBe(false)
  })
})

describe('buildArticleSchemas', () => {
  test('includes Article schema, freshness, and entity recognition', () => {
    const schemas = buildArticleSchemas({
      locale: 'en',
      url: 'https://evanwu.dev/articles/next-16',
      title: 'What changed in Next.js 16?',
      description:
        'A practical look at the biggest Next.js 16 features for React teams.',
      publishedAt: '2026-04-01',
      updatedAt: '2026-04-07',
      image: 'https://evanwu.dev/articles/next-16.png',
      readingTimeMinutes: 6,
      content:
        'Next.js 16 improves caching, routing, and developer tooling for React applications.',
      topics: ['Next.js', 'React', 'Web Development'],
    })

    const articleSchema = schemas.find(
      (schema) => schema['@type'] === 'Article',
    )

    expect(articleSchema).toBeDefined()
    expect(articleSchema?.dateModified).toBe('2026-04-07')
    expect(articleSchema?.about).toEqual([
      { '@type': 'Thing', name: 'Next.js' },
      { '@type': 'Thing', name: 'React' },
      { '@type': 'Thing', name: 'Web Development' },
    ])
    expect(articleSchema?.mentions).toContainEqual({
      '@type': 'SoftwareApplication',
      name: 'Next.js',
    })
  })

  test('does not emit FAQPage schema', () => {
    const schemas = buildArticleSchemas({
      locale: 'en',
      url: 'https://evanwu.dev/articles/next-16',
      title: 'What changed in Next.js 16?',
      description:
        'A practical look at the biggest Next.js 16 features for React teams.',
      publishedAt: '2026-04-01',
      updatedAt: '2026-04-07',
      image: 'https://evanwu.dev/articles/next-16.png',
      readingTimeMinutes: 6,
      content:
        'Next.js 16 improves caching, routing, and developer tooling for React applications.',
      topics: ['Next.js', 'React', 'Web Development'],
    })

    expect(schemas.some((schema) => schema['@type'] === 'FAQPage')).toBe(false)
  })
})

describe('buildRobotsRules', () => {
  test('adds explicit allow rules for AI crawlers', () => {
    const rules = buildRobotsRules()

    expect(rules).toContainEqual({
      userAgent: 'GPTBot',
      allow: '/',
    })
    expect(rules).toContainEqual({
      userAgent: 'ClaudeBot',
      allow: '/',
    })
    expect(rules).toContainEqual({
      userAgent: 'CCBot',
      allow: '/',
    })
  })
})
