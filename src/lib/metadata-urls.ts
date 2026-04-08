import { routing } from '@/i18n/routing'
import { baseUrl } from '@/lib/site'

/** Path after origin, e.g. `'/'`, `'/about'`, `'/articles/foo'`. */
export function canonicalForPath(path: string, locale: string) {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`
  if (path === '/') {
    return prefix === '' ? `${baseUrl}/` : `${baseUrl}/${locale}`
  }
  return `${baseUrl}${prefix}${path}`
}

export function languageAlternatesForPath(path: string) {
  return Object.fromEntries(
    routing.locales.map((loc) => [loc, canonicalForPath(path, loc)]),
  )
}

export const defaultOgImage = {
  url: '/og/opengraph-image.png',
  width: 1200,
  height: 630,
} as const
