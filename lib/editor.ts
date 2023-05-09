import { marked } from "marked"

export const markdownto = {
    html: (markdown: string) => marked(markdown),
    lexer: (markdown: string) => marked.lexer(markdown),
}
