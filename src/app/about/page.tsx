import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/container'
import { GithubIcon, LinkedInIcon, XIcon } from '@/components/icons'

export const metadata = {
  title: 'About',
  description: 'I’m Evan. I live in Chengdu, China, where I build the future.',
}

export default function Page() {
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
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            I’m Evan. I live in Chengdu, China, where I build the future.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I’ve always been fascinated by how things work. As a kid, I spent
              countless hours taking apart old appliances around the
              house—radios, fans, even my dad’s cassette player—just to see what
              was inside and how it all fit together.
            </p>

            <p>
              At school, I was one of those students who always topped the
              class. But things changed in high school—I fell in love, and my
              grades fell with me. By the time I graduated, I found myself
              studying a major I didn’t really care about, feeling a little lost
              about what I truly wanted to do.
            </p>

            <p>
              That changed when I discovered programming. It started with a
              simple curiosity, but soon I realized I had both a deep interest
              and a bit of a knack for it. During my junior year, I made the
              decision to switch paths entirely. I spent nights and weekends
              teaching myself computer science, writing small programs, and
              building things just for fun.
            </p>

            <p>
              After graduation, all that effort paid off—I landed a solid offer
              in the tech industry, and I’ve been growing in this field ever
              since. Looking back, every misstep and detour somehow led me here,
              to a career I genuinely love.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul>
            <li className="flex">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://x.com/evan1297"
                className="group flex items-center text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
              >
                <XIcon
                  aria-hidden="true"
                  className="size-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500"
                />
                <span className="ml-4">Follow on X</span>
              </Link>
            </li>
            <li className="flex mt-4">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/evan976"
                className="group flex items-center text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
              >
                <GithubIcon
                  aria-hidden="true"
                  className="size-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500"
                />
                <span className="ml-4">Follow on Github</span>
              </Link>
            </li>
            <li className="flex mt-4">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/evan976"
                className="group flex items-center text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
              >
                <LinkedInIcon
                  aria-hidden="true"
                  className="size-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500"
                />
                <span className="ml-4">Follow on LinkedIn</span>
              </Link>
            </li>
            <li className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40 flex">
              <Link
                href="mailto:jihua.evan@icloud.com"
                className="group flex items-center text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="size-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500"
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
