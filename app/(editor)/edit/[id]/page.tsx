"use client"

import { useEffect, useState } from "react"
import {
  editorActiveSectionState,
  editorCodesState,
  monacoInstanceState,
} from "@/atoms/editor"
import { handleShortCut } from "@/utils/editor"
import { useAtom, useAtomValue } from "jotai"

import { editorCode } from "types"
import { defaultEditorContent } from "@/config/editor"
import AIToolsSection from "@/components/editor/ai-tools-section"
import EditorSection from "@/components/editor/editor-section"
import MarkdownNotFound from "@/components/editor/markdown-not-found"
import PreviewSection from "@/components/editor/preview-section"

type prevCodeType = {
  section: string
  section_id: number
  content: string
}

export default function page({ params }: { params: { id: string } }) {
  const [editorCodes, setEditorCodes] = useAtom(editorCodesState)
  const editorActiveSection = useAtomValue(editorActiveSectionState)
  const [markdownCode, setMarkdownCode] = useState("")
  const monacoInstance = useAtomValue(monacoInstanceState)
  const [markdownNotFoundDialogOpen, setMarkdownNotFoundDialogOpen] =
    useState(false)
  const [isEligibleForAI, setIsEligibleForAI] = useState(true)

  const markdownId = params.id

  const getMarkdownPost = async (markdownId: string) => {
    const response = await fetch(`/api/posts/${markdownId}`, {
      method: "GET",
    })

    if (!response?.ok) {
      setMarkdownNotFoundDialogOpen(true)
      return
    }

    const resJson = await response.json()
    setIsEligibleForAI(resJson.isEligibleForAI)
    const markdownPost = resJson.markdownPost

    if (markdownPost.postCodes.length > 0) {
      let code = markdownPost.postCodes
      setEditorCodes(code)
      code
        .filter((code: editorCode) => {
          return code.section_id === editorActiveSection
        })
        .map((code: editorCode) => {
          setMarkdownCode(code.content)
        })
    } else {
      const defaultCode = [defaultEditorContent] as editorCode[]

      defaultCode
        .filter((code: editorCode) => {
          return code.section_id === editorActiveSection
        })
        .map((code: editorCode) => {
          setMarkdownCode(code.content)
        })
      setEditorCodes(defaultCode)
    }
  }

  useEffect(() => {
    editorCodes
      .filter((code: editorCode) => {
        return code.section_id === editorActiveSection
      })
      .map((code: editorCode) => {
        setMarkdownCode(code.content)
      })
  }, [editorActiveSection])

  useEffect(() => {
    getMarkdownPost(markdownId)
  }, [markdownId])

  return (
    <div
      onKeyDown={(event) => {
        handleShortCut(event, monacoInstance!)
      }}
      className="flex h-[92vh] w-full flex-col lg:flex-row"
    >
      <AIToolsSection isEligibleForAI={isEligibleForAI} />
      <EditorSection
        markdown={markdownCode}
        onCodeChange={(code) => {
          setEditorCodes((prev) => {
            return prev.map((prevCode: prevCodeType) => {
              if (prevCode.section_id === editorActiveSection) {
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
      <PreviewSection
        code={editorCodes.map((code: editorCode) => code.content).join("\n\n")}
      />
      {markdownNotFoundDialogOpen && (
        <MarkdownNotFound
          markdownNotFoundDialogOpen={markdownNotFoundDialogOpen}
        />
      )}
    </div>
  )
}
