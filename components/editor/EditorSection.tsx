"use client"

import { useState } from "react"
import Editor from "@monaco-editor/react"
import { useTheme } from "next-themes"

import { monacoConfig } from "@/config/editor"

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
    <div className="flex h-full w-[45%] flex-col items-center px-16 py-12">
      <Editor
        language={monacoConfig.language}
        value={code}
        theme={theme === "dark" ? "vs-dark" : "vs-light"}
        onChange={handleEditorChange}
        options={monacoConfig.options}
      />
    </div>
  )
}

export default EditorSection
