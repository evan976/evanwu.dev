import type { NextRequest } from 'next/server'
import { generateRSS } from '@/lib/rss'

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
