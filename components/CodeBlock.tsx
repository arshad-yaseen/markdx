import hljs from "highlight.js"

import { cn } from "@/lib/utils"

import CopyButton from "./copy-button"

function CodeBlock({
  language,
  value,
  preClass,
  codeClass,
  copyable,
}: {
  language: string
  value: string
  preClass?: string
  codeClass?: string
  copyable?: boolean
}) {
  value = value || ""
  hljs.getLanguage(language) ? (language = language) : (language = "plaintext")
  const highlightedCode = hljs.highlight(value, { language }).value

  return (
    <pre className={cn("relative flex w-full", preClass)}>
      <CopyButton value={value} copyable={copyable} />
      <code
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
        className={cn(
          `hljs ${language} max-h-[600px] min-w-full overflow-scroll rounded-lg border px-4 py-3 text-sm`,
          codeClass
        )}
      ></code>
    </pre>
  )
}

export default CodeBlock
