import { cacheLife, cacheTag } from 'next/cache'
import RSS from 'rss'
import { getArticles } from '@/lib/mdx'
import { baseUrl } from '@/lib/site'

export async function generateRSS(locale: string) {
  'use cache'
  cacheLife('max')
  cacheTag('rss', `rss:${locale}`)

  const articles = await getArticles(locale)
  const latestArticleDate = articles[0]?.publishedAt

  const feedOptions = {
    title: "Evan's Blog | RSS Feed",
    description: "Welcome to Evan's Blog!",
    site_url: baseUrl,
    feed_url: `${baseUrl}/rss.xml`,
    pubDate: latestArticleDate ? new Date(latestArticleDate) : undefined,
    copyright: 'All rights reserved Evan Wu',
  }

  const feed = new RSS(feedOptions)

  articles.forEach((article) => {
    feed.item({
      title: article.title,
      description: article.description,
      url: `${baseUrl}/articles/${article.slug}`,
      date: article.publishedAt,
    })
  })

  return feed.xml({ indent: true })
}
