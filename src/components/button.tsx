import type { UrlObject } from 'node:url'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const variantStyles = {
  primary:
    'bg-zinc-800 font-medium text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70',
  secondary:
    'bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70',
} as const

type ButtonAsLink = {
  href?: string | UrlObject
  variant?: keyof typeof variantStyles
} & Omit<React.ComponentProps<typeof Link>, 'variant'>

type ButtonAsButton = {
  href?: never
  variant?: keyof typeof variantStyles
} & Omit<React.ComponentProps<'button'>, 'variant'>

type ButtonProps = ButtonAsLink | ButtonAsButton

export function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  const baseClassName = cn(
    'inline-flex items-center gap-2 h-9 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none',
    variantStyles[variant],
    className,
  )

  if ('href' in props && props.href !== undefined) {
    return <Link className={baseClassName} {...props} />
  }

  return <button className={baseClassName} {...props} />
}
