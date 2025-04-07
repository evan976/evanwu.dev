import { baseUrl } from '@/app/sitemap'
import { getArticles } from '@/lib/article'

export async function GET() {
  const articles = await getArticles()

  const itemsXml = articles
    .map(
      (article) =>
        `<item>
          <title>${article.title}</title>
          <link>${baseUrl}/articles/${article.slug}</link>
          <description>${article.description}</description>
          <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
        </item>`,
    )
    .join('\n')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>Evan</title>
        <link>${baseUrl}</link>
        <description>I build user interfaces</description>
        ${itemsXml}
      </channel>
    </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
