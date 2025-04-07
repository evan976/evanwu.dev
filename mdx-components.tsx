import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import * as React from 'react'
import { MDXCode } from './components/mdx-code'

function getTextContent(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }

  if (React.isValidElement(node)) {
    if (node.type === 'small') {
      return ''
    }

    // @ts-ignore
    return getTextContent(node.props.children)
  }

  if (Array.isArray(node)) {
    return node.map(getTextContent).join('')
  }

  return ''
}

function slugify(str: React.ReactNode) {
  return getTextContent(str)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  return ({ children }: React.PropsWithChildren) => {
    const slug = slugify(children)
    return React.createElement(
      `h${level}`,
      {
        id: slug,
        'data-type': 'heading',
      },
      [
        React.createElement(
          'a',
          {
            href: `#${slug}`,
            key: `link-${slug}`,
            className: 'anchor',
          },
          children,
        ),
      ],
    )
  }
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,

    // headings
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),

    // link
    a: (props) => <Link {...props} />,

    // code
    code: ({ children, ...props }) => {
      if (typeof children !== 'string') {
        return <code {...props}>{children}</code>
      }

      if (children.startsWith('<')) {
        return <code {...props}>{children}</code>
      }

      return (
        <code {...props}>
          {children
            .split(/(<[^>]+>)/g)
            .map((part, i) =>
              part.startsWith('<') && part.endsWith('>') ? (
                <var key={i}>{part}</var>
              ) : (
                part
              ),
            )}
        </code>
      )
    },

    // pre
    pre: ({ children, ...props }) => {
      const child = React.Children.only(children) as React.ReactElement<{
        className?: string
        children: string
      }>
      if (!child) return null

      let { className, children: code } = child.props
      const lang = className ? className.replace('language-', '') : ''
      let filename = undefined

      const lines = code.split('\n')
      const filenameRegex = /\[\!code filename\:(.+)\]/
      const match = lines[0].match(filenameRegex)

      if (match) {
        filename = match[1]
        code = lines.splice(1).join('\n')
      }

      return <MDXCode source={{ lang, code }} filename={filename} />
    },
  }
}
