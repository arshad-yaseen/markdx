"use client"

import { useEffect, useState } from "react"
import Editor from "@monaco-editor/react"
import { useTheme } from "next-themes"

import "@/styles/editor.css"
import { editorState } from "@/atoms/editor"
import { useAtom } from "jotai"

function EditorSection({
  markdown,
  onCodeChange,
}: {
  markdown: string
  onCodeChange: (value: string) => void
}) {
  const [code, setCode] = useState("")
  const { theme } = useTheme()
  const [, setEditor] = useAtom(editorState)

  useEffect(() => {
    setCode(markdown)
  }, [markdown])

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "")
    onCodeChange(value || "")
  }

  function handleEditorDidMount(editor: any) {
    setEditor(editor)
  }

  return (
    <div className="flex h-full w-[42%] flex-col items-center">
      <Editor
        language="markdown"
        value={code}
        theme={theme === "dark" ? "vs-dark" : "vs-light"}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
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
