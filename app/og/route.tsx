import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

export function GET(request: Request) {
  const url = new URL(request.url)
  const title = url.searchParams.get('title') || "Evan's Blog"

  const logoPath = join(process.cwd(), 'public/logo.svg')

  const logo = Buffer.from(readFileSync(logoPath)).toString('base64')

  return new ImageResponse(
    <div tw="flex flex-col w-full h-full items-center justify-center bg-white font-sans">
      <div tw="flex flex-col w-full py-12 px-4 items-center justify-center p-8">
        <img
          src={`data:image/svg+xml;base64,${logo}`}
          height={64}
          alt="Evan's Blog"
        />
        <h2 tw="text-4xl font-bold tracking-tight text-center">{title}</h2>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  )
}
