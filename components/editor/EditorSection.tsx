"use client"

import { useState } from "react"
import Editor from "@monaco-editor/react"
import { useTheme } from "next-themes"

import "@/styles/editor.css"

function EditorSection({
  markdown,
  onCodeChange,
}: {
  markdown: string
  onCodeChange: (value: string) => void
}) {
  const [code, setCode] = useState(markdown)
  const { theme } = useTheme()

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "")
    onCodeChange(value || "")
  }

  return (
    <div className="flex h-full w-[45%] flex-col items-center">
      <Editor
        language="markdown"
        value={code}
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
        className="px-10"
      />
    </div>
  )
}

export default EditorSection
