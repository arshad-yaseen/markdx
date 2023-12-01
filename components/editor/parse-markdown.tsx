import React from "react"
import ReactMarkdown from "react-markdown"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeKatex from "rehype-katex"
import rehypeRaw from "rehype-raw"
import rehypeSlug from "rehype-slug"
import remarkEmoji from "remark-emoji"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"

import "katex/dist/katex.min.css"
// KaTeX CSS

import { cn } from "@/lib/utils"

import CodeBlock from "../code-block"

interface ComponentTypes {
  className?: string
  href?: string
  [key: string]: any
}

function ParseMarkdown({
  code,
  codeCopyable = false,
  codeClass = "",
  className,
}: {
  code: string
  codeCopyable?: boolean
  codeClass?: string
  className?: string
}) {
  const components = {
    h1: ({ className, ...props }: ComponentTypes) => (
      <h1
        className={cn(
          "mt-4 scroll-m-20 text-3xl font-bold tracking-tight ",
          className
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }: ComponentTypes) => (
      <h2
        className={cn(
          "mt-10 scroll-m-20 border-b pb-1 text-2xl font-semibold tracking-tight first:mt-0",
          className
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }: ComponentTypes) => (
      <h3
        className={cn(
          "mt-8 scroll-m-20 text-lg font-medium tracking-tight",
          className
        )}
        {...props}
      />
    ),
    h4: ({ className, ...props }: ComponentTypes) => (
      <h4
        className={cn(
          "text-md mt-8 scroll-m-20 font-medium tracking-tight",
          className
        )}
        {...props}
      />
    ),
    h5: ({ className, ...props }: ComponentTypes) => (
      <h5
        className={cn(
          "text-md mt-8 scroll-m-20 font-medium tracking-tight",
          className
        )}
        {...props}
      />
    ),
    h6: ({ className, ...props }: ComponentTypes) => (
      <h6
        className={cn(
          "mt-8 scroll-m-20 text-base font-medium tracking-tight",
          className
        )}
        {...props}
      />
    ),
    a: ({ className, href, ...props }: ComponentTypes) => {
      const isHashURL = href?.includes("#") // Ex. https://example.com#section

      return (
        <a
          className={cn("font-medium underline underline-offset-4", className)}
          {...props}
          href={href}
          target={isHashURL ? "_self" : "_blank"}
        />
      )
    },
    p: ({ className, ...props }: ComponentTypes) => (
      <p
        className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
        {...props}
      />
    ),
    ul: ({ className, ...props }: ComponentTypes) => (
      <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
    ),
    ol: ({ className, ...props }: ComponentTypes) => (
      <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
    ),
    li: ({ className, ...props }: ComponentTypes) => (
      <li className={cn("mt-2", className)} {...props} />
    ),
    blockquote: ({ className, ...props }: ComponentTypes) => (
      <blockquote
        className={cn(
          "mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground",
          className
        )}
        {...props}
      />
    ),
    img: ({
      className,
      alt,
      ...props
    }: React.ImgHTMLAttributes<HTMLImageElement>) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className={cn("my-2 inline-flex rounded-lg  border", className)}
        alt={alt}
        {...props}
      />
    ),
    iframe: ({ className, ...props }: ComponentTypes) => (
      <iframe
        className={cn(
          "my-4 inline-flex max-w-full rounded-lg border",
          className
        )}
        {...props}
      />
    ),
    div: ({ className, ...props }: ComponentTypes) => (
      <div className={cn("", className)} {...props} />
    ),
    hr: ({ ...props }: ComponentTypes) => (
      <hr className="my-4 md:my-8" {...props} />
    ),
    table: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLTableElement>) => (
      <div className="my-6 w-full overflow-hidden rounded-lg border">
        <table className={cn("w-full", className)} {...props} />
      </div>
    ),
    tr: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLTableRowElement>) => (
      <tr className={cn("m-0  p-0", className)} {...props} />
    ),
    th: ({ className, ...props }: ComponentTypes) => (
      <th
        className={cn(
          " px-4 py-2 text-left font-semibold  [&[align=center]]:text-center [&[align=right]]:text-right",
          className
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }: ComponentTypes) => (
      <td
        className={cn(
          "border-t px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
          className
        )}
        {...props}
      />
    ),
    pre: ({ className, ...props }: ComponentTypes) => (
      <pre className={cn("mt-5 flex w-full", className)} {...props} />
    ),
    video: ({ className, ...props }: ComponentTypes) => (
      <div className="min-h-[300px] w-full">
        <video
          className={cn("my-4 inline-flex rounded-lg border", className)}
          {...props}
          controls
        />
      </div>
    ),
    code({ inline, className, children, ...props }: ComponentTypes) {
      const match = /language-(\w+)/.exec(className || "")
      return !inline && match ? (
        <CodeBlock
          value={String(children).replace(/\n$/, "")}
          language={match[1]}
          {...props}
          copyable={codeCopyable}
          codeClass={codeClass}
        />
      ) : (
        <code
          {...props}
          className={cn("rounded-sm border bg-muted px-1 text-sm", className)}
        >
          {children}
        </code>
      )
    },
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkEmoji, remarkMath]}
      rehypePlugins={[
        rehypeRaw,
        rehypeSlug,
        rehypeAutolinkHeadings,
        // @ts-ignore
        rehypeKatex,
      ]}
      components={components}
      className={cn("markdown", className)}
    >
      {code}
    </ReactMarkdown>
  )
}

export default ParseMarkdown
