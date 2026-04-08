'use server'

import { neon } from '@neondatabase/serverless'
import * as z from 'zod'
import { welcomeEmail } from '@/emails/welcome'
import { buildUnsubscribeUrl, sendEmail } from '@/lib/email'

const schema = z.object({
  email: z.email(),
})

export async function subscribe(_: unknown, formData: FormData) {
  const sql = neon(process.env.DATABASE_URL!)

  const validatedData = schema.safeParse({
    email: formData.get('email'),
  })

  if (!validatedData.success) {
    return {
      success: false,
      message: 'Invalid email address',
    }
  }

  const { email } = validatedData.data

  const existing = await sql`
    SELECT 1 FROM subscription WHERE email = ${email}
    AND unsubscribed_at IS NULL
    LIMIT 1
  `

  if (existing.length > 0) {
    return {
      success: false,
      message: 'This email is already subscribed',
    }
  }

  await sql`
    INSERT INTO subscription (email)
    VALUES (${email})
    ON CONFLICT (email)
    DO UPDATE SET unsubscribed_at = NULL, created_at = now()
  `

  try {
    const unsubscribeUrl = buildUnsubscribeUrl(email)
    const { subject, html } = welcomeEmail(unsubscribeUrl)
    await sendEmail({ to: email, subject, html })
  } catch {
    console.error('Welcome email failed, but subscription succeeded')
  }

  return {
    success: true,
    message: 'You have been subscribed',
  }
}
