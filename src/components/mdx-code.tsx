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
    <div className="rounded-xl relative not-prose my-6 border overflow-hidden border-zinc-200 dark:border-white/10">
      {filename && (
        <div className="py-2 px-4 flex items-center gap-x-2 bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-white/10">
          <span className="text-sm/5 text-zinc-500 font-mono dark:text-white/50">
            {filename}
          </span>
        </div>
      )}
      <CopyButton value={source.code} className="absolute top-3 right-4" />
      <div
        className="*:flex *:*:max-w-none *:*:shrink-0 *:*:grow *:overflow-auto *:p-4 *:text-sm/relaxed
          **:[.line]:isolate **:[.line]:not-last:min-h-lh [&_code]:font-mono"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
