import ReactMarkdown from 'react-markdown'

/* Shared markdown renderer styled to the site's design language */
export default function Prose({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        h2: ({ children }) => (
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-ink mt-14 mb-6">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="font-heading text-xl md:text-2xl font-semibold text-ink mt-10 mb-4">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="font-body text-lg text-ink/75 leading-relaxed mb-6">{children}</p>
        ),
        strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        ul: ({ children }) => <ul className="space-y-3 mb-6 list-none">{children}</ul>,
        ol: ({ children }) => (
          <ol className="space-y-3 mb-6 list-decimal pl-5 marker:text-muted marker:font-body">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="font-body text-lg text-ink/75 leading-relaxed">{children}</li>
        ),
        a: ({ children, href }) => (
          <a
            href={href}
            className="text-accent hover:underline underline-offset-4"
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {children}
          </a>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-accent pl-6 my-8 [&_p]:text-ink/60 [&_p]:text-xl">
            {children}
          </blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
