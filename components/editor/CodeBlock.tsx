import hljs from "highlight.js"

import { cn } from "@/lib/utils"

function CodeBlock({
  language,
  value,
  preClass,
  codeClass,
}: {
  language: string
  value: string
  preClass?: string
  codeClass?: string
}) {
  value = value || ""
  hljs.getLanguage(language) ? (language = language) : (language = "plaintext")
  const highlightedCode = hljs.highlight(value, { language }).value

  return (
    <pre className={cn("flex w-full", preClass)}>
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
