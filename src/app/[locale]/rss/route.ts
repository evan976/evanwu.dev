import type { NextRequest } from 'next/server'
import { routing } from '@/i18n/routing'
import { generateRSS } from '@/lib/rss'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<'/[locale]/rss'>,
) {
  const { locale } = await ctx.params
  const rssFeed = await generateRSS(locale)

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
