import { marked } from "marked"

export const markdownto = {
  html: (markdown: string) => marked.parse(markdown),
  lexer: (markdown: string) => marked.lexer(markdown),
}
