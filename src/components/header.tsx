'use client'

import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { ChevronDownIcon, XIcon } from 'lucide-react'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type Variants,
} from 'motion/react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Container } from '@/components/container'
import { Link, usePathname } from '@/i18n/navigation'
import { navigation } from '@/lib/constants'
import { cn } from '@/lib/utils'
import avatarImage from '@/public/avatar.png'

export function Header() {
  const pathname = usePathname()
  const isHomePage = /^(\/|(\/[a-z]{2,4})?\/?)$/.test(pathname)
  const headerRef = React.useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  const avatarScale = useTransform(scrollY, [0, 200], [1, 0.6], {
    clamp: false,
  })

  const clampedAvatarScale = useTransform(avatarScale, (latest) => {
    return latest < 0.6 ? 0.6 : latest
  })

  return (
    <React.Fragment>
      <header className="pointer-events-none z-50 flex flex-col">
        {isHomePage && (
          <React.Fragment>
            <div className="order-last mt-[calc(--spacing(16)-(--spacing(3)))]" />
            <Container className="top-0 order-last -mb-3 pt-3">
              <div className="top-(--avatar-top,--spacing(3)) w-full">
                <motion.div
                  className="origin-top-left"
                  style={{
                    scale: clampedAvatarScale,
                  }}
                >
                  <Avatar large className="block h-16 w-16" />
                </motion.div>
              </div>
            </Container>
          </React.Fragment>
        )}
        <div ref={headerRef} className="top-0 z-10 h-16 pt-6">
          <Container className="top-(--header-top,--spacing(6)) w-full">
            <div className="relative flex gap-4">
              {!isHomePage && (
                <div className="absolute left-0 top-0">
                  <div className="h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-neutral-800/5 ring-1 ring-neutral-900/5 backdrop-blur dark:bg-neutral-800/90 dark:ring-white/10">
                    <Avatar />
                  </div>
                </div>
              )}
              <div className="flex flex-1 justify-end md:justify-center">
                <MobileNavigation className="pointer-events-auto md:hidden" />
                <DesktopNavigation className="pointer-events-auto hidden md:block" />
              </div>
            </div>
          </Container>
        </div>
      </header>
      {isHomePage && <div className="flex-none" />}
    </React.Fragment>
  )
}

function Avatar({
  large = false,
  className,
  style,
}: {
  large?: boolean
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <Link
      prefetch
      href="/"
      aria-label="Back to home"
      className={cn('pointer-events-auto', className)}
      style={style}
    >
      <Image
        priority
        src={avatarImage}
        alt="Avatar"
        sizes={large ? '4rem' : '2.25rem'}
        className={cn(
          'rounded-full bg-neutral-100 object-cover dark:bg-neutral-800',
          large ? 'h-16 w-16' : 'h-9 w-9',
        )}
      />
    </Link>
  )
}

function NavItem({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isActive = pathname.includes(href)

  return (
    <li>
      <Link
        href={href}
        className={cn(
          'relative block px-3 whitespace-nowrap py-2.5 transition',
          isActive
            ? 'text-violet-500 dark:text-violet-400'
            : 'hover:text-violet-500 dark:hover:text-violet-400',
        )}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-linear-to-r from-violet-500/0 via-violet-500/40 to-violet-500/0 dark:from-violet-400/0 dark:via-violet-400/40 dark:to-violet-400/0" />
        )}
      </Link>
    </li>
  )
}

const variants: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    zIndex: 0,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    zIndex: 200,
  },
}

function DesktopNavigation({
  className,
  ...props
}: React.ComponentProps<typeof motion.nav>) {
  const t = useTranslations('navigation')
  const [visible, setVisible] = React.useState(true)
  const { scrollYProgress } = useScroll()

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setVisible(latest === 0 || latest >= 0.5)
  })

  return (
    <motion.nav
      {...props}
      className={cn(className, 'fixed top-6 left-1/2 -translate-x-1/2')}
      variants={variants}
      animate={visible ? 'visible' : 'hidden'}
      initial="visible"
      transition={{
        duration: 0.2,
        ease: 'easeOut',
      }}
    >
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-neutral-800 shadow-lg shadow-neutral-800/5 ring-1 ring-neutral-900/5 backdrop-blur dark:bg-neutral-800/90 dark:text-neutral-200 dark:ring-white/10">
        {navigation.map(({ name, href }) => (
          <NavItem key={name} href={href}>
            {t(name)}
          </NavItem>
        ))}
      </ul>
    </motion.nav>
  )
}

function MobileNavigation({
  className,
  ...props
}: React.ComponentProps<typeof Dialog.Trigger>) {
  const t = useTranslations('navigation')
  const [open, onOpenChange] = React.useState(false)
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className={cn(
            'group flex items-center rounded-full bg-white/90 px-4 py-2.5 text-sm font-medium text-neutral-800 shadow-lg shadow-neutral-800/5 ring-1 ring-neutral-900/5 backdrop-blur dark:bg-neutral-800/90 dark:text-neutral-200 dark:ring-white/10 dark:hover:ring-white/20',
            className,
          )}
          {...props}
        >
          {t('menu')}
          <ChevronDownIcon className="ml-3 h-auto w-3 text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-400" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-100 bg-neutral-800/40 backdrop-blur-sm dark:bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed z-100 gap-4 transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-300 inset-x-0 top-0 data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top p-4">
          <div className="bg-white rounded-2xl p-6 shadow-lg ring-1 ring-neutral-900/5 dark:bg-neutral-900 dark:ring-neutral-800">
            <div className="flex items-center justify-between">
              <Dialog.Title asChild>
                <h2 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  {t('navigation')}
                </h2>
              </Dialog.Title>
              <Dialog.Description className="sr-only">
                {t('navigation')}
              </Dialog.Description>
              <Dialog.Close asChild>
                <button type="button">
                  <XIcon className="size-5 text-neutral-500 dark:text-neutral-400" />
                </button>
              </Dialog.Close>
            </div>
            <nav className="mt-4">
              <ul className="-my-2 divide-y divide-neutral-100 text-base text-neutral-800 dark:divide-neutral-100/5 dark:text-neutral-300">
                {navigation.map(({ name, href }) => (
                  <li key={name}>
                    <Link
                      href={href}
                      className="block outline-hidden py-2.5"
                      onClick={() => onOpenChange(false)}
                    >
                      {t(name)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
