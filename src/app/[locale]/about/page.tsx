import { FileTextIcon } from 'lucide-react'
import Image from 'next/image'
import { getLocale, getTranslations } from 'next-intl/server'
import { Container } from '@/components/container'
import { GithubIcon, LinkedInIcon, XIcon } from '@/components/icons'
import { Link } from '@/i18n/navigation'
import {
  canonicalForPath,
  defaultOgImage,
  languageAlternatesForPath,
} from '@/lib/metadata-urls'

export async function generateMetadata() {
  const [t, locale] = await Promise.all([getTranslations('about'), getLocale()])
  const canonical = canonicalForPath('/about', locale)
  return {
    title: t('seo_title'),
    description: t('description'),
    alternates: {
      canonical,
      languages: languageAlternatesForPath('/about'),
    },
    openGraph: {
      title: t('seo_title'),
      description: t('description'),
      url: canonical,
      siteName: "Evan's Blog",
      locale,
      type: 'website',
      images: [defaultOgImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('seo_title'),
      description: t('description'),
      creator: '@evan1297',
      images: [defaultOgImage],
    },
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
                src="/avatars/about.png"
                alt="Portrait photo of Evan Wu, frontend developer"
                width={800}
                height={800}
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-neutral-100 object-cover dark:bg-neutral-800"
              />
            </div>
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold text-balance leading-tight text-neutral-800 sm:text-5xl dark:text-neutral-100">
            {t('description')}
          </h1>
          <div className="mt-6 space-y-7 text-base text-pretty text-neutral-600 dark:text-neutral-400">
            <section>
              <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                {t('content.childhood_heading')}
              </h3>
              <p>{t('content.childhood')}</p>
            </section>
            <section>
              <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                {t('content.school_heading')}
              </h3>
              <p>{t('content.school')}</p>
            </section>
            <section>
              <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                {t('content.programming_heading')}
              </h3>
              <p>{t('content.programming')}</p>
            </section>
            <section>
              <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                {t('content.graduation_heading')}
              </h3>
              <p>{t('content.graduation')}</p>
            </section>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul>
            <li className="flex">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://x.com/evan1297"
                className="group flex items-center text-sm font-medium text-neutral-800 transition hover:text-neutral-950 dark:text-neutral-200 dark:hover:text-neutral-50"
              >
                <XIcon
                  aria-hidden="true"
                  className="size-6 flex-none fill-neutral-500 transition group-hover:fill-neutral-900 dark:group-hover:fill-neutral-100"
                />
                <span className="ml-4">{t('follow_on_x')}</span>
              </Link>
            </li>
            <li className="flex mt-4">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/evan976"
                className="group flex items-center text-sm font-medium text-neutral-800 transition hover:text-neutral-950 dark:text-neutral-200 dark:hover:text-neutral-50"
              >
                <GithubIcon
                  aria-hidden="true"
                  className="size-6 flex-none fill-neutral-500 transition group-hover:fill-neutral-900 dark:group-hover:fill-neutral-100"
                />
                <span className="ml-4">{t('follow_on_github')}</span>
              </Link>
            </li>
            <li className="flex mt-4">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/evan976"
                className="group flex items-center text-sm font-medium text-neutral-800 transition hover:text-neutral-950 dark:text-neutral-200 dark:hover:text-neutral-50"
              >
                <LinkedInIcon
                  aria-hidden="true"
                  className="size-6 flex-none fill-neutral-500 transition group-hover:fill-neutral-900 dark:group-hover:fill-neutral-100"
                />
                <span className="ml-4">{t('follow_on_linkedin')}</span>
              </Link>
            </li>
            <li className="mt-8 border-t border-neutral-100 pt-8 dark:border-neutral-700/40 flex flex-col gap-4">
              <Link
                href="mailto:jihua.evan@icloud.com"
                className="group flex items-center text-sm font-medium text-neutral-800 transition hover:text-neutral-950 dark:text-neutral-200 dark:hover:text-neutral-50"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="size-6 flex-none fill-neutral-500 transition group-hover:fill-neutral-900 dark:group-hover:fill-neutral-100"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
                  />
                </svg>
                <span className="ml-4">jihua.evan@gmail.com</span>
              </Link>
              <Link
                href="https://cv.evanwu.dev"
                className="group flex items-center text-sm font-medium text-neutral-800 transition hover:text-neutral-950 dark:text-neutral-200 dark:hover:text-neutral-50 ml-0.5"
              >
                <FileTextIcon
                  aria-hidden="true"
                  className="size-5 text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-100"
                />
                <span className="ml-4">cv.evanwu.dev</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  )
}
