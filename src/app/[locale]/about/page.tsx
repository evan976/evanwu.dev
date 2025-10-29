import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Container } from '@/components/container'
import { GithubIcon, LinkedInIcon, XIcon } from '@/components/icons'
import { Link } from '@/i18n/navigation'

export async function generateMetadata() {
  const t = await getTranslations('about')
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function Page() {
  const t = await getTranslations('about')
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                priority
                src="/about.png"
                alt="Evan"
                width={800}
                height={800}
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight leading-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            {t('description')}
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>{t('content.childhood')}</p>
            <p>{t('content.school')}</p>
            <p>{t('content.programming')}</p>
            <p>{t('content.graduation')}</p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul>
            <li className="flex">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://x.com/evan1297"
                className="group flex items-center text-sm font-medium text-zinc-800 transition hover:text-violet-500 dark:text-zinc-200 dark:hover:text-violet-500"
              >
                <XIcon
                  aria-hidden="true"
                  className="size-6 flex-none fill-zinc-500 transition group-hover:fill-violet-500"
                />
                <span className="ml-4">{t('follow_on_x')}</span>
              </Link>
            </li>
            <li className="flex mt-4">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/evan976"
                className="group flex items-center text-sm font-medium text-zinc-800 transition hover:text-violet-500 dark:text-zinc-200 dark:hover:text-violet-500"
              >
                <GithubIcon
                  aria-hidden="true"
                  className="size-6 flex-none fill-zinc-500 transition group-hover:fill-violet-500"
                />
                <span className="ml-4">{t('follow_on_github')}</span>
              </Link>
            </li>
            <li className="flex mt-4">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/evan976"
                className="group flex items-center text-sm font-medium text-zinc-800 transition hover:text-violet-500 dark:text-zinc-200 dark:hover:text-violet-500"
              >
                <LinkedInIcon
                  aria-hidden="true"
                  className="size-6 flex-none fill-zinc-500 transition group-hover:fill-violet-500"
                />
                <span className="ml-4">{t('follow_on_linkedin')}</span>
              </Link>
            </li>
            <li className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40 flex">
              <Link
                href="mailto:jihua.evan@icloud.com"
                className="group flex items-center text-sm font-medium text-zinc-800 transition hover:text-violet-500 dark:text-zinc-200 dark:hover:text-violet-500"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="size-6 flex-none fill-zinc-500 transition group-hover:fill-violet-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
                  />
                </svg>
                <span className="ml-4">jihua.evan@icloud.com</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  )
}
