import { Resend } from 'resend'
import { baseUrl } from '@/lib/site'

let resendInstance: Resend | null = null

function getResend() {
  if (!resendInstance) {
    resendInstance = new Resend(process.env.RESEND_API_KEY)
  }
  return resendInstance
}

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) {
  const resend = getResend()
  const { error } = await resend.emails.send({
    from: 'Evan <noreply@evanwu.dev>',
    to,
    subject,
    html,
  })

  if (error) {
    console.error('Failed to send email:', error)
    throw new Error(`Failed to send email: ${error.message}`)
  }
}

export function buildUnsubscribeUrl(email: string) {
  const token = btoa(email)
  return `${baseUrl}/api/unsubscribe?email=${encodeURIComponent(email)}&token=${token}`
}
