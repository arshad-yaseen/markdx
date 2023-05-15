import { atom } from "jotai"
import { editor } from "monaco-editor"

export const editorCodesState = atom([
  {
    id: 0,
    section: "Introduction",
    content: `# Project Title\n\nA brief description of what this project does.`,
  },
])

export const editorActiveSectionState = atom(0)

export const monacoInstanceState = atom<editor.IStandaloneCodeEditor | null>(
  null
)
