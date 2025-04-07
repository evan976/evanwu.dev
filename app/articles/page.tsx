import {
  Card,
  CardCTA,
  CardDescription,
  CardEyebrow,
  CardTitle,
} from '@/components/card'
import { Layout } from '@/components/layout'
import { getArticles } from '@/lib/article'
import { format } from 'date-fns'

export async function generateMetadata() {
  return {
    title: 'Articles',
    description:
      'All of my long-form thoughts on programming, open source, infrastructure, and more, collected in chronological order.',
  }
}

export default async function Page() {
  const articles = await getArticles()
  return (
    <Layout
      title="Articles"
      intro="All of my long-form thoughts on programming, open source, infrastructure, and more, collected in chronological order."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16 ml-2">
          {articles.map((article) => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

function Article({
  article,
}: {
  article: Awaited<ReturnType<typeof getArticles>>[number]
}) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <CardTitle href={`/articles/${article.slug}`}>
          {article.title}
        </CardTitle>
        <CardEyebrow
          as="time"
          dateTime={article.publishedAt}
          className="md:hidden"
          decorate
        >
          {format(new Date(article.publishedAt ?? new Date()), 'MMMM d, yyyy')}
        </CardEyebrow>
        <CardDescription>{article.description}</CardDescription>
        <CardCTA>Read article</CardCTA>
      </Card>
    </article>
  )
}
