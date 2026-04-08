type ArticleSummaryOptions = {
  description: string
  topics?: string[]
  locale?: string
}

type Reference = {
  label: string
  url: string
}

const INTERNAL_HOSTS = new Set(['evanwu.dev', 'www.evanwu.dev'])

function joinTopics(topics: string[]) {
  if (topics.length === 1) return topics[0]
  if (topics.length === 2) return `${topics[0]} and ${topics[1]}`

  return `${topics.slice(0, -1).join(', ')}, and ${topics.at(-1)}`
}

function joinTopicsZh(topics: string[]) {
  return topics.join('、')
}

export function buildArticleSummary({
  description,
  topics,
  locale = 'en',
}: ArticleSummaryOptions) {
  if (locale === 'zh') {
    const topicText =
      topics && topics.length > 0
        ? `文章会结合 ${joinTopicsZh(topics)} 讲清核心概念、实际取舍和适用场景，方便你先快速把握重点，再决定是否阅读全文。`
        : '文章会帮助你先快速把握核心概念、关键取舍和适用场景，再深入阅读完整内容。'

    return `${description} ${topicText}`
  }

  const topicText =
    topics && topics.length > 0
      ? `It focuses on ${joinTopics(topics)} so you can understand the main ideas, trade-offs, and practical context before reading the full article.`
      : 'It helps you understand the main ideas, trade-offs, and practical context before reading the full article.'

  return `${description} ${topicText}`
}

export function extractExternalReferences(content: string): Reference[] {
  const matches = content.matchAll(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g)
  const seen = new Set<string>()
  const references: Reference[] = []

  for (const match of matches) {
    const label = match[1]?.trim()
    const url = match[2]?.trim()

    if (!label || !url || seen.has(url)) continue

    try {
      const parsed = new URL(url)
      if (INTERNAL_HOSTS.has(parsed.hostname)) continue
    } catch {
      continue
    }

    seen.add(url)
    references.push({ label, url })
  }

  return references
}
