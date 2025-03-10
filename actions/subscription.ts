'use server'

import { createClient } from '@/lib/supabase'
import * as z from 'zod'

const schema = z.object({
  email: z.string().email(),
})

type FormState = {
  message: string
}

export async function subscribe(formState: FormState, formData: FormData) {
  const supabase = await createClient()

  try {
    const validatedData = schema.safeParse({
      email: formData.get('email'),
    })

    if (!validatedData.success) {
      return {
        success: false,
        message: 'Invalid email address',
      }
    }

    const response = await supabase.from('subscriptions').insert({
      email: validatedData.data.email,
    })

    if (response.error) {
      if (response.error.code === '23505') {
        return {
          success: false,
          message: 'You are already subscribed',
        }
      }
      return {
        success: false,
        message: response.error.message || 'Failed to subscribe',
      }
    }
    return {
      success: true,
      message: 'You have been subscribed',
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to subscribe',
    }
  }
}
