import type { UrlObject } from 'node:url'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ChevronRightIcon } from './icons'

export function Card({
  className,
  children,
  as,
  ...props
}: React.ComponentProps<'div'> & {
  as?: React.ElementType
}) {
  const Component = as ?? 'div'
  return (
    <Component
      className={cn('group relative flex flex-col items-start', className)}
      {...props}
    >
      {children}
    </Component>
  )
}

export function CardLink({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <>
      <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
      <Link {...props}>
        <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </Link>
    </>
  )
}

export function CardTitle({
  className,
  children,
  href,
  ...props
}: React.ComponentProps<'h2'> & {
  href?: string | UrlObject
}) {
  return (
    <h2
      className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100"
      {...props}
    >
      {href ? <CardLink href={href}>{children}</CardLink> : children}
    </h2>
  )
}

export function CardDescription({
  className,
  children,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400',
        className,
      )}
      {...props}
    >
      {children}
    </p>
  )
}

export function CardCTA({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
    </div>
  )
}

export function CardEyebrow({
  className,
  children,
  as,
  decorate = false,
  ...props
}: React.ComponentProps<React.ElementType> & {
  as?: React.ElementType
  decorate?: boolean
}) {
  const Component = as ?? 'div'
  return (
    <Component
      className={cn(
        className,
        'relative z-10 order-first mb-3 flex items-center text-sm text-zinc-500 dark:text-zinc-500',
        decorate && 'pl-3.5',
      )}
      {...props}
    >
      {decorate && (
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
        </span>
      )}
      {children}
    </Component>
  )
}
