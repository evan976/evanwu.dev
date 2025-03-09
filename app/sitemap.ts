import { getArticles } from '@/lib/article'

export const baseUrl = 'https://evanspace.me'

export default async function sitemap() {
  const blogs = getArticles().map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: article.metadata.publishedAt,
  }))

  const routes = ['', '/about', '/projects', '/articles', '/uses'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    }),
  )

  return [...routes, ...blogs]
}
