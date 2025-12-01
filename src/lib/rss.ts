import RSS from 'rss'
import { baseUrl } from '@/app/sitemap'
import { getArticles } from '@/lib/mdx'

export async function generateRSS(locale: string) {
  const siteUrl =
    process.env.NODE_ENV === 'production' ? baseUrl : 'http://localhost:3000'

  const feedOptions = {
    title: "Evan's Blog | RSS Feed",
    description: "Welcome to Evan's Blog!",
    site_url: siteUrl,
    feed_url: `${siteUrl}/rss.xml`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}`,
  }

  const feed = new RSS(feedOptions)

  const articles = await getArticles(locale)

  articles.forEach((article) => {
    feed.item({
      title: article.title,
      description: article.description,
      url: `${siteUrl}/articles/${article.slug}`,
      date: article.publishedAt,
    })
  })

  return feed.xml({ indent: true })
}
