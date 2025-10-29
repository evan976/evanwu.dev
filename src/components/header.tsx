'use client'

import * as React from 'react'
import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { ChevronDownIcon, XIcon } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Container } from '@/components/container'
import { Link, usePathname } from '@/i18n/navigation'
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
                  <div className="h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10">
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
          'rounded-full bg-zinc-100 object-cover dark:bg-zinc-800',
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

function DesktopNavigation(props: React.HTMLAttributes<HTMLDetailsElement>) {
  const t = useTranslations('navigation')
  return (
    <nav {...props}>
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
        <NavItem href="/about">{t('about')}</NavItem>
        <NavItem href="/articles">{t('articles')}</NavItem>
        <NavItem href="/projects">{t('projects')}</NavItem>
        <NavItem href="/photography">{t('photography')}</NavItem>
        <NavItem href="/uses">{t('uses')}</NavItem>
      </ul>
    </nav>
  )
}

function MobileNavItem({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <li>
      <PopoverButton
        as={Link}
        href={href}
        className="block outline-hidden py-2.5"
      >
        {children}
      </PopoverButton>
    </li>
  )
}

function MobileNavigation(props: React.ComponentProps<typeof Popover>) {
  const t = useTranslations('navigation')
  return (
    <Popover {...props}>
      <PopoverButton className="group flex items-center rounded-full bg-white/90 px-4 py-2.5 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20 outline-hidden">
        {t('menu')}
        <ChevronDownIcon className="ml-3 h-auto w-3 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-400" />
      </PopoverButton>
      <Transition>
        <TransitionChild
          as={React.Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <PopoverBackdrop className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80" />
        </TransitionChild>
        <TransitionChild
          as={React.Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <PopoverPanel
            focus
            className="fixed inset-x-4 top-8 z-50 origin-top rounded-2xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800"
          >
            <div className="flex flex-row-reverse items-center justify-between">
              <PopoverButton
                aria-label="Close menu"
                className="-m-1 p-1 outline-hidden"
              >
                <XIcon className="size-5 text-zinc-500 dark:text-zinc-400" />
              </PopoverButton>
              <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                {t('menu')}
              </h2>
            </div>
            <nav className="mt-6">
              <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                <MobileNavItem href="/about">{t('about')}</MobileNavItem>
                <MobileNavItem href="/articles">{t('articles')}</MobileNavItem>
                <MobileNavItem href="/projects">{t('projects')}</MobileNavItem>
                <MobileNavItem href="/photography">
                  {t('photography')}
                </MobileNavItem>
                <MobileNavItem href="/uses">{t('uses')}</MobileNavItem>
              </ul>
            </nav>
          </PopoverPanel>
        </TransitionChild>
      </Transition>
    </Popover>
  )
}
