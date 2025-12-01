import languine from 'languine.json'
import { routing } from '@/i18n/routing'
import { getArticles } from '@/lib/mdx'

export const baseUrl = 'https://evanwu.dev'

const locales = [...languine.locale.targets, languine.locale.source]

function getLocalizedPath(path: string, locale: string) {
  if (locale === routing.defaultLocale) {
    return path
  }
  return `/${locale}${path}`
}

export default async function sitemap() {
  const allRoutes = []

  for (const locale of locales) {
    const articles = (await getArticles(locale)).map((article) => ({
      url: `${baseUrl}${getLocalizedPath(`/articles/${article.slug}`, locale)}`,
      lastModified: article.publishedAt,
    }))

    const routes = [
      '/',
      '/about',
      '/projects',
      '/articles',
      '/photography',
      '/uses',
    ].map((route) => ({
      url: `${baseUrl}${getLocalizedPath(route, locale)}`,
      lastModified: new Date().toISOString().split('T')[0],
    }))

    allRoutes.push(...routes, ...articles)
  }

  return allRoutes
}
