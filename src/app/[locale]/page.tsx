import * as React from 'react'
import { ChevronRight } from 'lucide-react'
import * as motion from 'motion/react-client'
import Image from 'next/image'
import { getFormatter, getTranslations } from 'next-intl/server'
import { AuroraText } from '@/components/aurora-text'
import { Container } from '@/components/container'
import { Highlighter } from '@/components/highlighter'
import { Resume } from '@/components/resume'
import { SocialLink } from '@/components/social-link'
import { SubscribeForm } from '@/components/subscribe-form'
import { Link } from '@/i18n/navigation'
import { getArticles } from '@/lib/article'
import { links } from '@/lib/constants'
import beach from '@/public/beach.jpeg'
import fall from '@/public/fall.jpg'
import mountain from '@/public/mountain.jpg'
import sea from '@/public/sea.jpeg'
import snow from '@/public/snow.jpg'

export async function generateMetadata() {
  const t = await getTranslations()
  return {
    title: t('metadata.title'),
    description: t('home.description'),
  }
}

export default async function Page({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params
  const articles = await getArticles(locale)
  const t = await getTranslations()
  const formatter = await getFormatter()
  return (
    <React.Fragment>
      <Container className="mt-9">
        <div className="max-w-2xl text-lg">
          <h1 className="text-4xl font-black tracking-tight text-balance leading-tight text-neutral-800 dark:text-neutral-100 sm:text-5xl">
            {t.rich('home.title', {
              developer: (chunks) => (
                <Highlighter action="underline" color="#38bdf8">
                  <AuroraText>{chunks}</AuroraText>
                </Highlighter>
              ),
              designer: (chunks) => (
                <Highlighter action="underline" color="#FF9800">
                  <AuroraText
                    colors={['#f0b100', '#ff2056', '#e12afb', '#ff6900']}
                  >
                    {chunks}
                  </AuroraText>
                </Highlighter>
              ),
              open_source: (chunks) => (
                <AuroraText
                  colors={['#2b7fff', '#7ccf00', '#00b8db', '#00a6f4']}
                >
                  {chunks}
                </AuroraText>
              ),
            })}
          </h1>
          <p className="mt-6 text-base text-neutral-600 dark:text-neutral-400 text-balance">
            {t('home.description')}
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
              {articles.slice(0, 3).map((article) => (
                <article
                  key={article.slug}
                  className="group relative flex flex-col items-start"
                >
                  <h2 className="text-base font-semibold tracking-tight text-neutral-800 dark:text-neutral-100">
                    <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-neutral-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-xl dark:bg-neutral-800/50" />
                    <Link href={`/articles/${article.slug}`}>
                      <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
                      <span className="relative z-10">{article.title}</span>
                    </Link>
                  </h2>
                  <time
                    dateTime={article.publishedAt}
                    className="relative z-10 order-first mb-3 flex items-center text-sm text-neutral-400 dark:text-neutral-500 pl-3.5"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 flex items-center"
                    >
                      <span className="h-4 w-0.5 rounded-full bg-neutral-200 dark:bg-neutral-500" />
                    </span>
                    {formatter.relativeTime(new Date(article.publishedAt))}
                  </time>
                  <p
                    title={article.description}
                    className="relative z-10 mt-2 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2"
                  >
                    {article.description}
                  </p>
                  <div
                    aria-hidden="true"
                    className="relative z-10 mt-4 flex items-center text-sm font-medium text-violet-500"
                  >
                    {t('common.read_more')}
                    <ChevronRight className="ml-1 mt-0.5 size-3 group-hover:translate-x-0.5 transition-all duration-200" />
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
          className="aspect-9/10 cursor-pointer w-44 select-none p-1 flex-none bg-white sm:w-72 sm:rounded-2xl rounded-xl ring-2 ring-black/5 dark:ring-white/5 dark:bg-neutral-800 shrink-0 overflow-hidden"
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
