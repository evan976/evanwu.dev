import { getArticles } from '@/lib/article'

export const baseUrl = 'https://evanwu.dev'

export default async function sitemap() {
  const articles = (await getArticles()).map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: article.publishedAt,
  }))

  const routes = [
    '',
    '/about',
    '/projects',
    '/articles',
    '/photography',
    '/uses',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...articles]
}
