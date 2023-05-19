import { editorCodeType } from "types"
import { atom } from "jotai"
import { editor } from "monaco-editor"

export const editorCodesState = atom<editorCodeType[]>([])

export const editorActiveSectionState = atom(0)

export const monacoInstanceState = atom<editor.IStandaloneCodeEditor | null>(
  null
)
