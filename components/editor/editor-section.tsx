"use client"

import Editor, { OnMount } from "@monaco-editor/react"
import { useTheme } from "next-themes"

import "@/styles/editor.css"
import { monacoInstanceState } from "@/atoms/editor"
import { monacoInstanceType } from "@/types"
import { useAtom } from "jotai"

import EditorSkeleton from "./skeleton"

function EditorSection({
  markdown,
  onCodeChange,
  loading,
}: {
  markdown: string
  onCodeChange: (value: string) => void
  loading: boolean
}) {
  const { theme } = useTheme()
  const [, setMonacoInstance] = useAtom(monacoInstanceState)

  const editorMount: OnMount = (editorL: monacoInstanceType) => {
    setMonacoInstance(editorL)
  }

  const handleEditorChange = (value: string | undefined) => {
    onCodeChange(value || "")
  }

  return (
    <div className="relative flex h-[50%] w-full flex-1 flex-col items-center lg:h-full lg:w-[46%]">
      {loading && <EditorSkeleton className="px-14" />}

      <Editor
        language="markdown"
        value={markdown}
        onMount={editorMount}
        theme={theme === "dark" ? "vs-dark" : "vs-light"}
        loading={<EditorSkeleton className="px-14" />}
        onChange={handleEditorChange}
        options={{
          minimap: {
            enabled: false,
          },
          wordWrap: "on",
          wrappingIndent: "indent",
          scrollBeyondLastLine: false,
          scrollbar: {
            vertical: "hidden",
            horizontal: "hidden",
          },
          lineNumbers: "off",
          overviewRulerLanes: 0,
          lineDecorationsWidth: 0,
          lineNumbersMinChars: 0,
          glyphMargin: false,
          folding: false,
          renderLineHighlight: "none",
          fontSize: 14,
          padding: {
            top: 48,
            bottom: 650,
          },
        }}
        className="px-14"
      />
    </div>
  )
}

export default EditorSection
