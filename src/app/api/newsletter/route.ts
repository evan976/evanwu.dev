import { neon } from '@neondatabase/serverless'
import { type NextRequest, NextResponse } from 'next/server'
import { newArticleEmail } from '@/emails/new-article'
import { buildUnsubscribeUrl, sendEmail } from '@/lib/email'
import { baseUrl } from '@/lib/site'

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const expectedToken = `Bearer ${process.env.NEWSLETTER_SECRET}`

  if (!process.env.NEWSLETTER_SECRET || authHeader !== expectedToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = (await request.json()) as {
    slug?: string
    title?: string
    description?: string
  }
  const { slug, title, description } = body

  if (!slug || !title || !description) {
    return NextResponse.json(
      { error: 'Missing required fields: slug, title, description' },
      { status: 400 },
    )
  }

  const articleUrl = `${baseUrl}/articles/${slug}`

  const sql = neon(process.env.DATABASE_URL!)
  const subscribers = await sql`
    SELECT email FROM subscription
    WHERE unsubscribed_at IS NULL
    ORDER BY created_at
  `

  if (subscribers.length === 0) {
    return NextResponse.json({ sent: 0, message: 'No active subscribers' })
  }

  let sent = 0
  let failed = 0

  for (const { email } of subscribers) {
    try {
      const unsubscribeUrl = buildUnsubscribeUrl(email)
      const { subject, html } = newArticleEmail({
        title,
        description,
        articleUrl,
        unsubscribeUrl,
      })
      await sendEmail({ to: email, subject, html })
      sent++
    } catch {
      failed++
      console.error(`Failed to send newsletter to ${email}`)
    }
  }

  return NextResponse.json({ sent, failed, total: subscribers.length })
}
