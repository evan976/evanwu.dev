'use client'

import * as React from 'react'
import { sendGAEvent } from '@next/third-parties/google'
import { MailIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { subscribe } from '@/actions/subscription'
import { Button } from '@/components/button'
import { cn } from '@/lib/utils'

const initialState = {
  success: false,
  message: '',
}

export function SubscribeForm() {
  const t = useTranslations('subscribe')
  const [email, setEmail] = React.useState('')
  const [formState, formAction, pending] = React.useActionState(
    subscribe,
    initialState,
  )

  return (
    <form
      action={formAction}
      className="rounded-2xl border border-neutral-100 p-6 dark:border-neutral-700/40"
    >
      <h2 className="flex items-center text-sm font-semibold text-neutral-900 dark:text-neutral-100">
        <MailIcon className="size-5 flex-none text-neutral-400 dark:text-neutral-500" />
        <span className="ml-3">{t('title')}</span>
      </h2>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        {t('description')}
      </p>
      <div className="mt-6 flex">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          name="email"
          placeholder={t('email')}
          aria-label={t('email')}
          className="min-w-0 flex-auto h-9 text-sm appearance-none rounded-md border border-neutral-900/10 bg-white px-3 py-2 shadow-md shadow-neutral-800/5 placeholder:text-neutral-400 focus:border-violet-500 focus:outline-hidden focus:ring-3 focus:ring-violet-500/10 dark:border-neutral-700 dark:bg-neutral-700/15 dark:text-neutral-200 dark:placeholder:text-neutral-500 dark:focus:border-violet-400 dark:focus:ring-violet-400/10 sm:text-sm transition-all duration-200"
        />
        <Button
          type="submit"
          disabled={pending}
          aria-disabled={pending}
          className="ml-4 flex-none min-w-16"
          onClick={() =>
            sendGAEvent('event', 'subscribe_button_click', {
              email,
            })
          }
        >
          {pending ? t('subscribing') : t('subscribe')}
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
