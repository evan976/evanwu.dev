import type { UrlObject } from 'node:url'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

const variantStyles = {
  primary:
    'bg-violet-500 font-medium text-neutral-100 hover:bg-violet-600 active:bg-violet-700 active:text-neutral-100/70 dark:bg-violet-500 dark:hover:bg-violet-600 dark:active:bg-violet-500 dark:active:text-neutral-100/70',
  secondary:
    'bg-neutral-50 font-medium text-neutral-900 hover:bg-neutral-100 active:bg-neutral-100 active:text-neutral-900/60 dark:bg-neutral-800/50 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 dark:active:bg-neutral-800/50 dark:active:text-neutral-50/70',
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
    'inline-flex items-center gap-2 h-9 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition duration-200 active:transition-none',
    variantStyles[variant],
    className,
  )

  if ('href' in props && props.href !== undefined) {
    return <Link className={baseClassName} {...props} />
  }

  return <button className={baseClassName} {...props} />
}
