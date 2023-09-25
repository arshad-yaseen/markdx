import { RefObject } from "react"
import { atom } from "jotai"
import { editor } from "monaco-editor"

import { editorCodeType } from "types"

export const editorCodesState = atom<editorCodeType[]>([])

export const editorActiveSectionState = atom(0)

export const monacoInstanceState = atom<editor.IStandaloneCodeEditor | null>(
  null
)

export const previewSectionRefAtom = atom<RefObject<HTMLDivElement> | null>(
  null
)

export const editorSelectedContentAtom = atom("")
