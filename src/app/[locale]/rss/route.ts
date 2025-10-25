import { generateRSS } from '@/lib/rss'

export async function GET() {
  const rssFeed = await generateRSS()

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
