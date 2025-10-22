'use server'

import { neon } from '@neondatabase/serverless'
import * as z from 'zod'

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
    SELECT 1 FROM subscription WHERE email = ${email} LIMIT 1
  `

  if (existing.length > 0) {
    return {
      success: false,
      message: 'This email is already subscribed',
    }
  }

  const result = await sql`
    INSERT INTO subscription (email) VALUES (${email})
  `

  if (result.length === 0) {
    return {
      success: true,
      message: 'You have been subscribed',
    }
  }

  return {
    success: false,
    message: 'Failed to subscribe',
  }
}
