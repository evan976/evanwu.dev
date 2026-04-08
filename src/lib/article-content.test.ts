import { describe, expect, test } from 'vitest'
import {
  buildArticleSummary,
  extractExternalReferences,
} from './article-content'

describe('buildArticleSummary', () => {
  test('creates a visible TL;DR paragraph with topic context', () => {
    const summary = buildArticleSummary({
      description:
        'A practical look at the biggest Next.js 16 features for React teams.',
      topics: ['Next.js', 'React', 'Performance'],
    })

    expect(summary).toContain(
      'A practical look at the biggest Next.js 16 features for React teams.',
    )
    expect(summary).toContain('Next.js, React, and Performance')
  })
})

describe('extractExternalReferences', () => {
  test('collects unique external markdown links and ignores internal links', () => {
    const references = extractExternalReferences(`
Read the [Next.js docs](https://nextjs.org/docs) first.
Compare them with the [React docs](https://react.dev/reference/react).
We also linked the [Next.js docs](https://nextjs.org/docs) again.
Ignore [internal article](https://evanwu.dev/articles/next-16).
`)

    expect(references).toEqual([
      {
        label: 'Next.js docs',
        url: 'https://nextjs.org/docs',
      },
      {
        label: 'React docs',
        url: 'https://react.dev/reference/react',
      },
    ])
  })
})
