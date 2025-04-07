import { AuroraText } from '@/components/aurora-text'
import { Button } from '@/components/button'
import {
  Card,
  CardCTA,
  CardDescription,
  CardEyebrow,
  CardTitle,
} from '@/components/card'
import { Container } from '@/components/container'
import { ArrowDownIcon, BriefcaseIcon } from '@/components/icons'
import { SocialLink } from '@/components/social-link'
import { SubscribeForm } from '@/components/subscribe-form'
import { getArticles } from '@/lib/article'
import { links, resume } from '@/lib/constants'
import { cn } from '@/lib/utils'
import beach from '@/public/beach.jpg'
import computer from '@/public/computer.jpg'
import mountain from '@/public/mountain.jpg'
import peace from '@/public/peace.jpg'
import travel from '@/public/travel.jpg'
import { format, isToday } from 'date-fns'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

export const metadata: Metadata = {
  title: 'Frontend developer, designer, and open source enthusiast',
  description:
    'I’m Evan, a frontend developer based in Chengdu, China. I like to build products that help people live better lives, I wish to make the world a better place.',
}

export default async function Page() {
  const articles = await getArticles()
  return (
    <React.Fragment>
      <Container className="mt-9">
        <div className="max-w-2xl text-lg">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            <span>Frontend</span> <AuroraText>developer,</AuroraText>{' '}
            <AuroraText colors={['#f0b100', '#ff2056', '#e12afb', '#ff6900']}>
              designer,
            </AuroraText>{' '}
            <span>and</span>{' '}
            <AuroraText colors={['#2b7fff', '#7ccf00', '#00b8db', '#00a6f4']}>
              open source
            </AuroraText>{' '}
            <span>enthusiast</span>
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I’m Evan, a frontend developer based in Chengdu, China. I like to
            build products that help people live better lives, I wish to make
            the world a better place.
          </p>
          <div className="mt-6 flex gap-6">
            {links.map((link) => (
              <SocialLink key={link.name} name={link.name} href={link.href} />
            ))}
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
            <SubscribeForm />
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

function Article({
  article,
}: { article: Awaited<ReturnType<typeof getArticles>>[number] }) {
  return (
    <Card as="article">
      <CardTitle href={`/articles/${article?.slug}`}>{article.title}</CardTitle>
      <CardEyebrow as="time" dateTime={article.publishedAt} decorate>
        {format(new Date(article.publishedAt ?? new Date()), 'MMMM d, yyyy')}
      </CardEyebrow>
      <CardDescription>{article.description}</CardDescription>
      <CardCTA>Read article</CardCTA>
    </Card>
  )
}

function Resume() {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="size-6 flex-none" />
        <span className="ml-3">Work Experience</span>
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
        More in LinkedIn
        <ArrowDownIcon className="size-4 -rotate-90 stroke-zinc-400 group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50 group-hover:translate-x-0.5 transition-all duration-200" />
      </Button>
    </div>
  )
}
