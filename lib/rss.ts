import RSS from 'rss'
import { baseUrl } from '@/app/sitemap'
import { getArticles } from './article'

export async function generateRSS() {
  const site_url =
    process.env.NODE_ENV === 'production' ? baseUrl : 'http://localhost:3002'

  const feedOptions = {
    title: "Evan's Blog | RSS Feed",
    description: "Welcome to Evan's Blog!",
    site_url: site_url,
    feed_url: `${site_url}/rss.xml`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}`,
  }

  const feed = new RSS(feedOptions)

  const articles = await getArticles()

  articles.forEach((article) => {
    feed.item({
      title: article.title,
      description: article.description,
      url: `${site_url}/articles/${article.slug}`,
      date: article.publishedAt,
    })
  })

  return feed.xml({ indent: true })
}
