"use client"

import { useEffect, useState } from "react"
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
  const [code, setCode] = useState("")
  const { theme } = useTheme()
  const [, setMonacoInstance] = useAtom(monacoInstanceState)

  const editorMount: OnMount = (editorL: monacoInstanceType) => {
    setMonacoInstance(editorL)
  }

  useEffect(() => {
    setCode(markdown)
  }, [markdown])

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "")
    onCodeChange(value || "")
  }

  return (
    <div className="relative flex h-full w-[45%] flex-col items-center">
      {loading && <EditorSkeleton className="px-14" />}

      <Editor
        language="markdown"
        value={code}
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
