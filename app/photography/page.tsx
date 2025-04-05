import { Container } from '@/components/container'

export default function Page() {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Coming soon
        </h1>
        <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
          This page is under construction, please check back later.
        </p>
      </header>
    </Container>
  )
}
