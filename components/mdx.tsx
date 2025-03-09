import { cn, slugify } from '@/lib/utils'
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import rehypeHighlight from 'rehype-highlight'

type CustomLinkProps = Omit<React.ComponentProps<typeof Link>, 'href'> & {
  href?: string
}

function CustomLink({ href, ...props }: CustomLinkProps) {
  if (href?.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href?.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function RoundedImage({
  alt,
  className,
  ...props
}: React.ComponentProps<typeof Image>) {
  return <Image alt={alt} className={cn('rounded-lg', className)} {...props} />
}

function createHeading(level: number) {
  const Heading = ({ children }: { children?: React.ReactNode }) => {
    const slug = slugify(children)
    return React.createElement(`h${level}`, { id: slug }, [
      React.createElement('a', {
        href: `#${slug}`,
        key: `link-${slug}`,
        className: 'anchor',
        children,
      }),
    ])
  }

  Heading.displayName = `Heading${level}`

  return Heading
}

const components: MDXRemoteProps['components'] = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  a: CustomLink,
  Image: RoundedImage,
}

export function CustomMDX(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          development: process.env.NODE_ENV !== 'production',
          rehypePlugins: [rehypeHighlight],
        },
      }}
    />
  )
}
