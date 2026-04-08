import { baseUrl } from '@/lib/site'

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'Evan <noreply@evanwu.dev>',
      to,
      subject,
      html,
    }),
  })

  if (!res.ok) {
    const error = await res.text()
    console.error('Failed to send email:', error)
    throw new Error(`Failed to send email: ${error}`)
  }
}

export function buildUnsubscribeUrl(email: string) {
  const token = btoa(email)
  return `${baseUrl}/api/unsubscribe?email=${encodeURIComponent(email)}&token=${token}`
}
