"use client"

import { editorCodeState } from "@/atoms/editor"
import { useRecoilState } from "recoil"

import EditorLeft from "@/components/editor/EditorLeft"
import EditorSection from "@/components/editor/EditorSection"
import Preview from "@/components/editor/Preview"
import { Toaster } from "sonner"

function page() {
  const [editorCode, setEditorCode] = useRecoilState(editorCodeState)

  return (
    <div className="flex h-[92vh] w-full">
      <Toaster position="bottom-center" />
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
