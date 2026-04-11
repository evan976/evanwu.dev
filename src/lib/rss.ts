import RSS from 'rss'
import { getArticles } from '@/lib/mdx'
import { baseUrl } from '@/lib/site'

export async function generateRSS(locale: string) {
  const feedOptions = {
    title: "Evan's Blog | RSS Feed",
    description: "Welcome to Evan's Blog!",
    site_url: baseUrl,
    feed_url: `${baseUrl}/rss.xml`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}`,
  }

  const feed = new RSS(feedOptions)

  const articles = await getArticles(locale)

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
