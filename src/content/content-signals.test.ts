import fs from 'node:fs/promises'
import path from 'node:path'
import { describe, expect, test } from 'vitest'
import { extractExternalReferences } from '@/lib/article-content'

async function readContent(relativePath: string) {
  return fs.readFile(path.join(process.cwd(), relativePath), 'utf8')
}

describe('article reference signals', () => {
  test('key comparison and release articles include multiple external references', async () => {
    const files = [
      'src/content/en/tanstack-start-vs-next.mdx',
      'src/content/zh/tanstack-start-vs-next.mdx',
      'src/content/en/next-16.mdx',
      'src/content/zh/next-16.mdx',
      'src/content/en/use-optimistic-to-make-your-app-feel-instant.mdx',
      'src/content/zh/use-optimistic-to-make-your-app-feel-instant.mdx',
    ]

    for (const file of files) {
      const content = await readContent(file)
      const references = extractExternalReferences(content)

      expect(references.length, file).toBeGreaterThanOrEqual(3)
    }
  })
})
