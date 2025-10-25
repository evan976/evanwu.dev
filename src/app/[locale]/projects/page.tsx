import { LinkIcon } from 'lucide-react'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Layout } from '@/components/layout'
import { Link } from '@/i18n/navigation'
import { projects } from '@/lib/constants'

export async function generateMetadata() {
  const t = await getTranslations('projects')
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function Page() {
  const t = await getTranslations('projects')
  return (
    <Layout title={t('title')} intro={t('description')}>
      <ul className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <li
            key={project.name}
            className="group relative flex flex-col items-start"
            title={project.description}
          >
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image
                src={project.logo}
                alt={project.name}
                className="h-8 w-8 rounded-full"
                width={32}
                height={32}
              />
            </div>
            <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
              <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50" />
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
                <span className="relative z-10">{project.name}</span>
              </Link>
            </h2>
            <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
              {project.description}
            </p>
            <p className="relative z-10 mt-6 flex items-center text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
              <LinkIcon className="size-3.5" />
              <span className="ml-2">{new URL(project.url).hostname}</span>
            </p>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
