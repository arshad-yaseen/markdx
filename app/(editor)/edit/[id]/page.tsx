"use client"

import React, { useState } from "react"

import EditorLeft from "@/components/editor/EditorLeft"
import EditorSection from "@/components/editor/EditorSection"
import Preview from "@/components/editor/Preview"

function page() {
  const markdown = `# Project title\n\nStart writing your markdown here`
  const [editorCode, setEditorCode] = useState(markdown)

  return (
    <div className="flex h-[92vh] w-full">
      <EditorLeft />
      <EditorSection
        markdown={markdown}
        onCodeChange={(code) => {
          setEditorCode(code)
        }}
      />
      <Preview code={editorCode} />
    </div>
  )
}

export default page
