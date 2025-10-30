'use client'

import { format, isToday } from 'date-fns'
import { ArrowRight, Briefcase } from 'lucide-react'
import Image from 'next/image'
import { useFormatter, useTranslations } from 'next-intl'
import { Button } from '@/components/button'
import { Link } from '@/i18n/navigation'
import { resume } from '@/lib/constants'

export function Resume() {
  const t = useTranslations('work_experience')
  const formatter = useFormatter()
  return (
    <div className="rounded-2xl border border-neutral-100 p-6 dark:border-neutral-700/40">
      <h2 className="flex items-center text-sm font-semibold text-neutral-900 dark:text-neutral-100">
        <Briefcase className="size-5 flex-none text-neutral-400 dark:text-neutral-500" />
        <span className="ml-3">{t('title')}</span>
      </h2>
      <ul className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-neutral-800/5 ring-1 ring-neutral-900/5 dark:border dark:border-neutral-700/50 dark:bg-neutral-800 dark:ring-0">
              <Image
                src={role.logo}
                alt={role.company}
                className="size-7 rounded-full"
                unoptimized
              />
            </div>
            <div className="flex flex-auto flex-wrap gap-x-2">
              <div className="sr-only">{t('company')}</div>
              <div className="w-full flex-none text-sm font-medium text-neutral-900 dark:text-neutral-100">
                <Link
                  href={role.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {role.company}
                </Link>
              </div>
              <div className="sr-only">{t('role')}</div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                {t(role.title)}
              </div>
              <div className="sr-only">{t('date')}</div>
              <div
                role="tooltip"
                className="ml-auto text-xs text-neutral-500 dark:text-neutral-500"
                aria-label={`${format(new Date(role.start), 'MMMM yyyy')} until ${isToday(new Date(role.end)) ? 'Present' : format(new Date(role.end), 'MMMM yyyy')}`}
              >
                <time
                  suppressHydrationWarning
                  dateTime={role.start.toLocaleString()}
                >
                  {formatter.dateTime(new Date(role.start), {
                    month: 'short',
                    year: 'numeric',
                  })}
                </time>
                <span aria-hidden="true" className="mx-1">
                  -
                </span>
                <time
                  suppressHydrationWarning
                  dateTime={role.end.toLocaleString()}
                >
                  {isToday(new Date(role.end))
                    ? t('present')
                    : formatter.dateTime(new Date(role.end), {
                        month: 'short',
                        year: 'numeric',
                      })}
                </time>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Button
        href="https://www.linkedin.com/in/evan976"
        target="_blank"
        rel="noopener noreferrer"
        variant="secondary"
        className="group mt-6 w-full"
      >
        {t('more')}
        <ArrowRight className="size-3.5 text-neutral-400 group-hover:translate-x-0.5 transition-all duration-200" />
      </Button>
    </div>
  )
}
