import { baseUrl } from '@/app/sitemap'
import { getArticles } from '@/lib/article'

export async function GET() {
  const articles = getArticles()

  const itemsXml = articles
    .map(
      (article) =>
        `<item>
          <title>${article.metadata.title}</title>
          <link>${baseUrl}/articles/${article.slug}</link>
          <description>${article.metadata.description || ''}</description>
          <pubDate>${new Date(
            article.metadata.publishedAt,
          ).toUTCString()}</pubDate>
        </item>`,
    )
    .join('\n')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>Evan's Blog</title>
        <link>${baseUrl}</link>
        <description>This is my blog RSS feed</description>
        ${itemsXml}
      </channel>
    </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
