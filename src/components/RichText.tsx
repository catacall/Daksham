import React from 'react'

const IS_BOLD = 1
const IS_ITALIC = 2
const IS_UNDERLINE = 4
const IS_STRIKETHROUGH = 8
const IS_CODE = 16

function renderTextNode(node: any, index: number) {
  let text = node.text || ''
  if (!text) return null

  let element: React.ReactNode = text

  const format = node.format || 0

  if (format & IS_BOLD) {
    element = <strong>{element}</strong>
  }
  if (format & IS_ITALIC) {
    element = <em>{element}</em>
  }
  if (format & IS_UNDERLINE) {
    element = <u>{element}</u>
  }
  if (format & IS_STRIKETHROUGH) {
    element = <span className="line-through">{element}</span>
  }
  if (format & IS_CODE) {
    element = (
      <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono text-red-600">
        {element}
      </code>
    )
  }

  return <React.Fragment key={index}>{element}</React.Fragment>
}

function renderNodes(nodes: any[]): React.ReactNode[] {
  return nodes
    .map((node, index) => {
      if (!node) return null

      switch (node.type) {
        case 'text':
          return renderTextNode(node, index)

        case 'paragraph':
          return (
            <p key={index} className="leading-relaxed text-muted font-sans text-base md:text-lg my-4">
              {node.children ? renderNodes(node.children) : null}
            </p>
          )

        case 'heading': {
          const Tag = (node.tag || 'h2') as any
          const sizeClasses: Record<string, string> = {
            h1: 'text-3xl md:text-4xl lg:text-5xl mt-10 mb-6 font-display font-medium text-foreground uppercase tracking-wide',
            h2: 'text-2xl md:text-3xl lg:text-4xl mt-8 mb-4 font-display font-medium text-foreground uppercase tracking-wide',
            h3: 'text-xl md:text-2xl lg:text-3xl mt-6 mb-3 font-display font-medium text-foreground uppercase tracking-wide',
            h4: 'text-lg md:text-xl mt-4 mb-2 font-display font-medium text-foreground uppercase tracking-wide',
            h5: 'text-base md:text-lg mt-4 mb-2 font-display font-medium text-foreground uppercase tracking-wide',
            h6: 'text-sm md:text-base mt-4 mb-2 font-display font-medium text-foreground uppercase tracking-wide',
          }
          const className = sizeClasses[node.tag] || sizeClasses.h2
          return (
            <Tag key={index} className={className}>
              {node.children ? renderNodes(node.children) : null}
            </Tag>
          )
        }

        case 'list': {
          const ListTag = node.listType === 'number' ? 'ol' : 'ul'
          const listClass =
            node.listType === 'number'
              ? 'list-decimal pl-6 my-4 space-y-2 text-muted font-sans text-base md:text-lg'
              : 'list-disc pl-6 my-4 space-y-2 text-muted font-sans text-base md:text-lg'
          return (
            <ListTag key={index} className={listClass}>
              {node.children ? renderNodes(node.children) : null}
            </ListTag>
          )
        }

        case 'listitem':
          return (
            <li key={index} className="leading-relaxed">
              {node.children ? renderNodes(node.children) : null}
            </li>
          )

        case 'link': {
          const url = node.fields?.url || '#'
          const newTab = node.fields?.newTab || false
          return (
            <a
              key={index}
              href={url}
              target={newTab ? '_blank' : undefined}
              rel={newTab ? 'noopener noreferrer' : undefined}
              className="text-accent underline decoration-accent/30 hover:decoration-accent transition-colors font-medium"
            >
              {node.children ? renderNodes(node.children) : null}
            </a>
          )
        }

        default:
          if (node.children) {
            return <React.Fragment key={index}>{renderNodes(node.children)}</React.Fragment>
          }
          return null
      }
    })
    .filter(Boolean) as React.ReactNode[]
}

interface RichTextProps {
  content: any
  className?: string
}

export default function RichText({ content, className = '' }: RichTextProps) {
  if (!content) return null

  if (typeof content === 'string') {
    return (
      <p className={`leading-relaxed text-muted font-sans whitespace-pre-wrap ${className}`}>
        {content}
      </p>
    )
  }

  const root = content.root || content

  if (!root || !root.children) return null

  return (
    <div className={`prose prose-slate max-w-none space-y-4 ${className}`}>
      {renderNodes(root.children)}
    </div>
  )
}
