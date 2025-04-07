import { codeToHtml } from 'shiki'
import { CopyButton } from './copy-button'

export async function MDXCode({
  source,
  filename,
}: {
  source: {
    lang: string
    code: string
  }
  filename?: string
}) {
  const html = await codeToHtml(source.code, {
    lang: source.lang,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
  })

  return (
    <div className="rounded-lg not-prose my-6 border overflow-hidden border-zinc-200 dark:border-white/10">
      <div className="py-2.5 px-4 flex items-center justify-between bg-zinc-200/20 dark:bg-zinc-800/90 border-b border-zinc-200 dark:border-white/10">
        {filename ? (
          <span className="text-xs/5 text-zinc-400 dark:text-white/50">
            {filename}
          </span>
        ) : null}
        <CopyButton text={source.code} />
      </div>
      <div
        className="*:flex *:*:max-w-none *:*:shrink-0 *:*:grow *:overflow-auto *:p-4 *:text-sm/relaxed
          **:[.line]:isolate **:[.line]:not-last:min-h-[1lh] [&_code]:font-mono"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
