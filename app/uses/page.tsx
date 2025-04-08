import { Layout } from '@/components/layout'

export const metadata = {
  title: 'Uses',
  description: 'Software I use, gadgets I love, and other things I recommend.',
}

export default function Page() {
  return (
    <Layout
      title="Uses"
      intro="Software I use, gadgets I love, and other things I recommend."
    >
      <div className="mt-16 sm:mt-20">
        <div className="space-y-20">
          <section className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
            <div className="grid max-w-3xl grid-cols-1 items-baseline gap-y-8 md:grid-cols-4">
              <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                Workstation
              </h2>
              <div className="md:col-span-3">
                <ul className="space-y-16">
                  <li className="group relative flex flex-col items-start">
                    <h3 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                      13.6” MacBook Pro, M2, 16GB RAM (2022)
                    </h3>
                    <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                      My main machine. It&apos;s powerful enough to run most of
                      my development environments, and the screen is perfect for
                      coding.
                    </p>
                  </li>
                  <li className="group relative flex flex-col items-start">
                    <h3 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                      13.6” MacBook Air, M2, 16GB RAM (2022)
                    </h3>
                    <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                      My backup machine. It&apos;s not as powerful as my main
                      machine, but it&apos;s still a great machine. I bring it
                      with me when I work from offfice, because it&apos;s light
                      and easy to carry around.
                    </p>
                  </li>
                  <li className="group relative flex flex-col items-start">
                    <h3 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                      AOC 27” 144Hz 4K Monitor
                    </h3>
                    <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                      I use this monitor for everything, from coding to watching
                      movies. It&apos;s a great monitor for the price.
                    </p>
                  </li>
                  <li className="group relative flex flex-col items-start">
                    <h3 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                      Razer v2x 2.4Ghz Wireless Gaming Mouse
                    </h3>
                    <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                      The best wireless mouse I&apos;ve used. It&apos;s
                      comfortable, has a great battery life, and is very
                      responsive.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          <section className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
            <div className="grid max-w-3xl grid-cols-1 items-baseline gap-y-8 md:grid-cols-4">
              <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                Development
              </h2>
              <div className="md:col-span-3">
                <ul className="space-y-16">
                  <li className="group relative flex flex-col items-start">
                    <h3 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                      Cursor IDE
                    </h3>
                    <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                      AI-powered IDE. I use it for so many things. When I
                      don&apos;t want to write code by myself, I use it to
                      generate code for me.
                    </p>
                  </li>
                  <li className="group relative flex flex-col items-start">
                    <h3 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                      iTerm2
                    </h3>
                    <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                      iTerm2 is a replacement for Terminal and the successor to
                      iTerm. It brings a lot of features that I love from other
                      terminals like tmux and zsh.
                    </p>
                  </li>
                  <li className="group relative flex flex-col items-start">
                    <h3 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                      Notion
                    </h3>
                    <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                      The happier workspace. I use it for my notes and for my
                      project management. I like its simple and elegant user
                      interface.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          <section className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
            <div className="grid max-w-3xl grid-cols-1 items-baseline gap-y-8 md:grid-cols-4">
              <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                Design
              </h2>
              <div className="md:col-span-3">
                <ul className="space-y-16">
                  <li className="group relative flex flex-col items-start">
                    <h3 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                      Figma
                    </h3>
                    <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                      The collaborative interface design tool. I use it for all
                      of my design needs.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
}
