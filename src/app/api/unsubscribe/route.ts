import { neon } from '@neondatabase/serverless'
import { type NextRequest, NextResponse } from 'next/server'
import { baseUrl } from '@/lib/site'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const email = searchParams.get('email')
  const token = searchParams.get('token')

  if (!email || !token) {
    return NextResponse.redirect(`${baseUrl}?unsubscribed=invalid`)
  }

  const expectedToken = btoa(email)
  if (token !== expectedToken) {
    return NextResponse.redirect(`${baseUrl}?unsubscribed=invalid`)
  }

  try {
    const sql = neon(process.env.DATABASE_URL!)
    await sql`
      UPDATE subscription
      SET unsubscribed_at = now()
      WHERE email = ${email}
      AND unsubscribed_at IS NULL
    `
  } catch (error) {
    console.error('Unsubscribe failed:', error)
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Unsubscribed</title>
</head>
<body style="margin:0;padding:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <div style="text-align:center;padding:40px">
    <h1 style="font-size:24px;font-weight:700;color:#171717;margin:0 0 12px">You've been unsubscribed</h1>
    <p style="font-size:15px;color:#525252;margin:0 0 24px">You will no longer receive emails from Evan's Blog.</p>
    <a href="${baseUrl}" style="display:inline-block;padding:10px 20px;background:#171717;color:#fff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:500">
      Back to site
    </a>
  </div>
</body>
</html>`

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  })
}
