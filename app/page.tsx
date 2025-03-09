import { Button } from '@/components/button'
import {
  Card,
  CardCTA,
  CardDescription,
  CardEyebrow,
  CardTitle,
} from '@/components/card'
import { Container } from '@/components/container'
import { ArrowDownIcon, BriefcaseIcon, MailIcon } from '@/components/icons'
import { resume } from '@/constants'
import { type Article as ArticleType, getArticles } from '@/lib/article'
import { cn } from '@/lib/utils'
import beach from '@/public/beach.jpg'
import computer from '@/public/computer.jpg'
import mountain from '@/public/mountain.jpg'
import peace from '@/public/peace.jpg'
import travel from '@/public/travel.jpg'
import { format, isToday } from 'date-fns'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

export async function generateMetadata() {
  const t = await getTranslations('home')
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default function Page() {
  const t = useTranslations('home')
  const articles = getArticles()
  return (
    <React.Fragment>
      <Container className="mt-9">
        <div className="max-w-2xl text-lg">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            {t('title')}
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            {t('description')}
          </p>
          <div className="mt-6 flex gap-6">
            <Link
              href="https://x.com/evan1297"
              target="_blank"
              rel="noopener noreferrer"
              className="group -m-1 p-1"
              aria-label="Follow on X"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"
              >
                <path d="M13.3174 10.7749L19.1457 4H17.7646L12.7039 9.88256L8.66193 4H4L10.1122 12.8955L4 20H5.38119L10.7254 13.7878L14.994 20H19.656L13.3171 10.7749H13.3174ZM11.4257 12.9738L10.8064 12.0881L5.87886 5.03974H8.00029L11.9769 10.728L12.5962 11.6137L17.7652 19.0075H15.6438L11.4257 12.9742V12.9738Z" />
              </svg>
            </Link>
            <Link
              href="https://www.linkedin.com/in/evan976"
              target="_blank"
              rel="noopener noreferrer"
              className="group -m-1 p-1"
              aria-label="Follow on LinkedIn"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"
              >
                <path d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 01-1.548-1.549 1.548 1.548 0 111.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z" />
              </svg>
            </Link>
            <Link
              href="https://t.me/evan97777"
              target="_blank"
              rel="noopener noreferrer"
              className="group -m-1 p-1"
              aria-label="Follow on Telegram"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"
              >
                <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12.3584 9.38246C11.3857 9.78702 9.4418 10.6244 6.5266 11.8945C6.05321 12.0827 5.80524 12.2669 5.78266 12.4469C5.74451 12.7513 6.12561 12.8711 6.64458 13.0343C6.71517 13.0565 6.78832 13.0795 6.8633 13.1039C7.37388 13.2698 8.06071 13.464 8.41776 13.4717C8.74164 13.4787 9.10313 13.3452 9.50222 13.0711C12.226 11.2325 13.632 10.3032 13.7203 10.2832C13.7826 10.269 13.8689 10.2513 13.9273 10.3032C13.9858 10.3552 13.98 10.4536 13.9739 10.48C13.9361 10.641 12.4401 12.0318 11.666 12.7515C11.4351 12.9661 11.2101 13.1853 10.9833 13.4039C10.509 13.8611 10.1533 14.204 11.003 14.764C11.8644 15.3317 12.7323 15.8982 13.5724 16.4971C13.9867 16.7925 14.359 17.0579 14.8188 17.0156C15.0861 16.991 15.3621 16.7397 15.5022 15.9903C15.8335 14.2193 16.4847 10.3821 16.6352 8.80083C16.6484 8.6623 16.6318 8.485 16.6185 8.40717C16.6052 8.32934 16.5773 8.21844 16.4762 8.13635C16.3563 8.03913 16.1714 8.01863 16.0887 8.02009C15.7125 8.02672 15.1355 8.22737 12.3584 9.38246Z" />
              </svg>
            </Link>
            <Link
              href="https://github.com/evan976"
              target="_blank"
              rel="noopener noreferrer"
              className="group -m-1 p-1"
              aria-label="Follow on GitHub"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.475 2 2 6.588 2 12.253c0 4.537 2.862 8.369 6.838 9.727.5.09.687-.218.687-.487 0-.243-.013-1.05-.013-1.91C7 20.059 6.35 18.957 6.15 18.38c-.113-.295-.6-1.205-1.025-1.448-.35-.192-.85-.667-.013-.68.788-.012 1.35.744 1.538 1.051.9 1.551 2.338 1.116 2.912.846.088-.666.35-1.115.638-1.371-2.225-.256-4.55-1.14-4.55-5.062 0-1.115.387-2.038 1.025-2.756-.1-.256-.45-1.307.1-2.717 0 0 .837-.269 2.75 1.051.8-.23 1.65-.346 2.5-.346.85 0 1.7.115 2.5.346 1.912-1.333 2.75-1.05 2.75-1.05.55 1.409.2 2.46.1 2.716.637.718 1.025 1.628 1.025 2.756 0 3.934-2.337 4.806-4.562 5.062.362.32.675.936.675 1.897 0 1.371-.013 2.473-.013 2.82 0 .268.188.589.688.486a10.039 10.039 0 0 0 4.932-3.74A10.447 10.447 0 0 0 22 12.253C22 6.588 17.525 2 12 2Z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />
            <Resume />
          </div>
        </div>
      </Container>
    </React.Fragment>
  )
}

function Photos() {
  const rotations = [
    'rotate-2',
    '-rotate-2',
    'rotate-2',
    'rotate-2',
    '-rotate-2',
  ]

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[beach, computer, peace, mountain, travel].map((image, imageIndex) => (
          <div
            key={imageIndex}
            className={cn(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
              rotations[imageIndex % rotations.length],
            )}
          >
            <Image
              src={image}
              alt="Photo"
              priority
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function Article({ article }: { article: ArticleType }) {
  const t = useTranslations('home')
  return (
    <Card as="article">
      <CardTitle href={`/articles/${article?.slug}`}>
        {article?.metadata.title}
      </CardTitle>
      <CardEyebrow as="time" dateTime={article?.metadata.publishedAt} decorate>
        {format(
          new Date(article?.metadata.publishedAt ?? new Date()),
          'MMMM d, yyyy',
        )}
      </CardEyebrow>
      <CardDescription>{article?.metadata.description}</CardDescription>
      <CardCTA>{t('articles.read_article')}</CardCTA>
    </Card>
  )
}

function Newsletter() {
  const t = useTranslations('home')
  return (
    <form
      action="/thank-you"
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="size-6 flex-none" />
        <span className="ml-3">{t('newsletter.title')}</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {t('newsletter.description')}
      </p>
      <div className="mt-6 flex">
        <input
          type="email"
          placeholder={t('newsletter.placeholder')}
          aria-label={t('newsletter.placeholder')}
          required
          className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-2 shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/15 dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
        />
        <Button type="submit" className="ml-4 flex-none min-w-16">
          {t('newsletter.join')}
        </Button>
      </div>
    </form>
  )
}

function Resume() {
  const t = useTranslations('home')
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="size-6 flex-none" />
        <span className="ml-3">{t('resume.title')}</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image
                src={role.logo}
                alt={role.company}
                className="size-7 rounded-full"
                unoptimized
              />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                <Link
                  href={role.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {role.company}
                </Link>
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {role.title}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="ml-auto text-xs text-zinc-500 dark:text-zinc-500"
                aria-label={`${format(new Date(role.start), 'MMMM yyyy')} until ${isToday(new Date(role.end)) ? 'Present' : format(new Date(role.end), 'MMMM yyyy')}`}
              >
                <time dateTime={role.start}>
                  {format(new Date(role.start), 'MMM yyyy')}
                </time>
                <span aria-hidden="true" className="mx-1">
                  -
                </span>
                <time dateTime={role.end.toLocaleString()}>
                  {isToday(new Date(role.end))
                    ? 'Present'
                    : format(new Date(role.end), 'MMM yyyy')}
                </time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
      <Button
        href="https://www.linkedin.com/in/evan976"
        target="_blank"
        rel="noopener noreferrer"
        variant="secondary"
        className="group mt-6 w-full"
      >
        {t('resume.more')}
        <ArrowDownIcon className="size-4 -rotate-90 stroke-zinc-400 group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50 group-hover:translate-x-0.5 transition-all duration-200" />
      </Button>
    </div>
  )
}
