import { baseUrl } from '@/app/sitemap'
import { ImageResponse } from 'next/og'
import { type NextRequest, NextResponse } from 'next/server'
import openGraphScraper from 'open-graph-scraper-lite'

const HOST =
  process.env.NODE_ENV === 'production' ? baseUrl : 'http://localhost:4000'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path') ?? '/'

  const response = await fetch(`${HOST}${path}`)

  if (!response.ok) {
    return NextResponse.error()
  }

  const html = await response.text()

  const { result } = await openGraphScraper({ html })

  if (!result.success) {
    return NextResponse.error()
  }

  const regex = /(.*?) - (.*?)?$/
  let title = result.ogTitle ?? ''
  let description = result.ogDescription ?? ''
  const matches = regex.exec(title)

  if (matches) {
    title = matches[1] ?? result.ogTitle ?? ''
  }

  if (!title) {
    return NextResponse.error()
  }

  if (description.split(' ').length > 2) {
    description = `${description.split(' ').slice(0, -1).join(' ')}\xa0${description.split(' ').at(-1)}`
  }

  const geist = await loadGeistFont()

  return new ImageResponse(
    <div
      style={{
        fontFamily: 'Geist',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
      }}
    >
      <h1
        style={{
          fontSize: 60,
          fontWeight: 500,
          color: '#fff',
          textAlign: 'center',
        }}
      >
        {title}
      </h1>
      <p
        style={{
          fontSize: 20,
          color: '#999',
          textAlign: 'center',
          padding: '0 20px',
        }}
      >
        {description}
      </p>
    </div>,
    {
      width: 1200,
      height: 630,
      headers: {
        'Cache-Control':
          process.env.NODE_ENV === 'development'
            ? 'no-cache, no-store'
            : 'public, no-transform, s-maxage=31536000, max-age=600',
      },
      fonts: [
        {
          name: 'Geist',
          data: geist,
          style: 'normal',
        },
      ],
    },
  )
}

async function loadGeistFont() {
  const url = 'https://fonts.googleapis.com/css2?family=Geist:wght@400'
  const css = await (await fetch(url)).text()
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (resource) {
    const response = await fetch(resource[1])
    if (response.status === 200) {
      return await response.arrayBuffer()
    }
  }

  throw new Error('Failed to load font')
}
