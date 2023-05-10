"use client"

import { editorActiveSectionState, editorCodesState } from "@/atoms/editor"
import { useTheme } from "next-themes"
import { useRecoilState, useRecoilValue } from "recoil"
import { Toaster } from "sonner"

import { editorCodeType } from "types"
import EditorLeft from "@/components/editor/EditorLeft"
import EditorSection from "@/components/editor/EditorSection"
import Preview from "@/components/editor/Preview"

type prevCodeType = {
  id: number
  section: string
  content: string
}

function page() {
  const [editorCodes, setEditorCodes] = useRecoilState(editorCodesState)
  const editorActiveSection = useRecoilValue(editorActiveSectionState)
  const { theme } = useTheme()

  return (
    <div className="flex h-[92vh] w-full">
      <Toaster theme={theme === "dark" ? "dark" : "light"} />
      <EditorLeft />
      <EditorSection
        markdown={editorCodes[editorActiveSection].content}
        onCodeChange={(code) => {
          setEditorCodes((prev) => {
            return prev.map((prevCode: prevCodeType) => {
              if (prevCode.id === editorActiveSection) {
                return {
                  ...prevCode,
                  content: code,
                }
              }
              return prevCode
            })
          })
        }}
      />
      <Preview
        code={editorCodes
          .map((code: editorCodeType) => code.content)
          .join("\n\n")}
      />
    </div>
  )
}

export default page
