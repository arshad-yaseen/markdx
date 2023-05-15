"use client"

import { useEffect, useState } from "react"
import Editor, { OnMount } from "@monaco-editor/react"
import { useTheme } from "next-themes"

import "@/styles/editor.css"
import { monacoInstanceState } from "@/atoms/editor"
import { useAtom } from "jotai"
import { monacoInstanceType } from "@/types"

function EditorSection({
  markdown,
  onCodeChange,
}: {
  markdown: string
  onCodeChange: (value: string) => void
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
    <div className="flex h-full w-[45%] flex-col items-center">
      <Editor
        language="markdown"
        value={code}
        onMount={editorMount}
        theme={theme === "dark" ? "vs-dark" : "vs-light"}
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
