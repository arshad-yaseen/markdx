"use client"

import { editorCodeState } from "@/atoms/editor"
import { useRecoilState } from "recoil"

import EditorLeft from "@/components/editor/EditorLeft"
import EditorSection from "@/components/editor/EditorSection"
import Preview from "@/components/editor/Preview"

function page() {
  const [editorCode, setEditorCode] = useRecoilState(editorCodeState)

  return (
    <div className="flex h-[92vh] w-full">
      <EditorLeft />
      <EditorSection
        markdown={editorCode}
        onCodeChange={(code) => {
          setEditorCode(code)
        }}
      />
      <Preview code={editorCode} />
    </div>
  )
}

export default page
