'use client'

import * as React from 'react'
import { MailIcon } from 'lucide-react'
import { subscribe } from '@/actions/subscription'
import { Button } from '@/components/button'
import { cn } from '@/lib/utils'

const initialState = {
  success: false,
  message: '',
}

export function SubscribeForm() {
  const [formState, formAction, pending] = React.useActionState(
    subscribe,
    initialState,
  )

  return (
    <form
      action={formAction}
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="size-5 flex-none text-zinc-400 dark:text-zinc-500" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>
      <div className="mt-6 flex">
        <input
          required
          type="email"
          name="email"
          placeholder="Email address"
          aria-label="Email address"
          className="min-w-0 flex-auto h-9 text-sm appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-2 shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-hidden focus:ring-3 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/15 dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm transition-all duration-200"
        />
        <Button
          type="submit"
          disabled={pending}
          aria-disabled={pending}
          className="ml-4 flex-none min-w-16"
        >
          {pending ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </div>
      {formState.message && (
        <p
          aria-live="polite"
          role="status"
          className={cn(
            'mt-2 text-sm',
            formState.success
              ? 'text-green-500 dark:text-green-400'
              : 'text-red-500 dark:text-red-400',
          )}
        >
          {formState.message}
        </p>
      )}
    </form>
  )
}
