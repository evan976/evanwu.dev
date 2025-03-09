import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function NotFound() {
  const t = useTranslations('not_found')
  return (
    <div className="sm:px-8 mt-16 lg:mt-32">
      <div className="mx-auto w-full max-w-7xl lg:px-8">
        <div className="relative px-4 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl lg:max-w-5xl">
            <div className="xl:relative">
              <div className="mx-auto max-w-2xl">
                <h1 className="text-4xl text-center text-balance font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                  {t('title')}
                </h1>
                <p className="mt-6 text-base text-center text-balance text-zinc-600 dark:text-zinc-400">
                  {t('description')}
                </p>
                <div className="mt-8 flex justify-center">
                  <Link
                    href="/"
                    aria-label={t('back_to_home')}
                    className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-teal-500 dark:hover:text-teal-400 hover:underline hover:underline-offset-2 transition-colors duration-200"
                  >
                    {t('back_to_home')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
