import { cn } from '@/lib/utils'

function Outer({
  ref,
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div ref={ref} className={cn('sm:px-8', className)} {...props}>
      <div className="mx-auto max-w-7xl lg:px-8">{children}</div>
    </div>
  )
}

function Inner({
  ref,
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      ref={ref}
      className={cn('relative px-4 sm:px-8 lg:px-12', className)}
      {...props}
    >
      <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
    </div>
  )
}

export function Container({
  ref,
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <Outer ref={ref} className={className} {...props}>
      <Inner>{children}</Inner>
    </Outer>
  )
}

Container.Outer = Outer
Container.Inner = Inner
