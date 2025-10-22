import * as React from 'react'
import type { Metadata } from 'next'
import { format, isToday } from 'date-fns'
import { ArrowRight, Briefcase, ChevronRight } from 'lucide-react'
import * as motion from 'motion/react-client'
import Image from 'next/image'
import Link from 'next/link'
import { AuroraText } from '@/components/aurora-text'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Highlighter } from '@/components/highlighter'
import { SocialLink } from '@/components/social-link'
import { SubscribeForm } from '@/components/subscribe-form'
import { getArticles } from '@/lib/article'
import { links, resume } from '@/lib/constants'
import beach from '@/public/beach.jpeg'
import fall from '@/public/fall.jpg'
import mountain from '@/public/mountain.jpg'
import sea from '@/public/sea.jpeg'
import snow from '@/public/snow.jpg'

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
            <span>Frontend</span>{' '}
            <Highlighter action="underline" color="#38bdf8">
              <AuroraText>developer,</AuroraText>
            </Highlighter>{' '}
            <Highlighter action="underline" color="#FF9800">
              <AuroraText colors={['#f0b100', '#ff2056', '#e12afb', '#ff6900']}>
                designer,
              </AuroraText>
            </Highlighter>{' '}
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
      <Container>
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            <React.Suspense>
              {articles.map((article) => (
                <article
                  key={article.slug}
                  className="group relative flex flex-col items-start"
                >
                  <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                    <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-xl dark:bg-zinc-800/50" />
                    <Link href={`/articles/${article.slug}`}>
                      <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
                      <span className="relative z-10">{article.title}</span>
                    </Link>
                  </h2>
                  <time
                    dateTime={article.publishedAt}
                    className="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 flex items-center"
                    >
                      <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                    </span>
                    {format(new Date(article.publishedAt), 'MMMM d, yyyy')}
                  </time>
                  <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {article.description}
                  </p>
                  <div
                    aria-hidden="true"
                    className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
                  >
                    Read article
                    <ChevronRight className="ml-1 mt-0.5 size-3" />
                  </div>
                </article>
              ))}
            </React.Suspense>
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
    '1.990229deg',
    '-9.00747deg',
    '0.19904deg',
    '8.1674deg',
    '-4.90447deg',
  ]

  return (
    <div className="flex justify-center items-center py-16 sm:py-24 overflow-hidden">
      {[sea, beach, fall, mountain, snow].map((image, imageIndex) => (
        <motion.div
          key={imageIndex}
          tabIndex={0}
          className="aspect-[9/10] cursor-pointer w-44 select-none p-1 flex-none bg-white sm:w-72 sm:rounded-2xl rounded-xl ring-2 ring-black/5 dark:ring-white/5 dark:bg-zinc-800 shrink-0 overflow-hidden"
          initial={{
            scale: 1.0,
            transform: `rotate(${rotations[imageIndex % rotations.length]})`,
            zIndex: 1,
          }}
          whileHover={{
            scale: 1.1,
            transform: 'rotate(0deg)',
            zIndex: 100,
          }}
        >
          <div className="relative size-full">
            <Image
              src={image}
              alt="Photo"
              priority
              fill
              draggable={false}
              sizes="(min-width: 640px) 18rem, 11rem"
              className="rounded-lg sm:rounded-xl object-cover shrink-0"
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function Resume() {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <Briefcase className="size-5 flex-none text-zinc-400 dark:text-zinc-500" />
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
                role="tooltip"
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
        <ArrowRight className="size-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-all duration-200" />
      </Button>
    </div>
  )
}
