"use client"

import { useEffect, useState } from "react"
import {
  editorActiveSectionState,
  editorCodesState,
  monacoInstanceState,
} from "@/atoms/editor"
import { handleShortCut } from "@/utils/editor"
import { GET } from "@/utils/http.utils"
import { useAtom, useAtomValue } from "jotai"

import { editorCode } from "types"
import { defaultEditorContent } from "@/config/editor"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { withDesktopOnly } from "@/components/HOCs/with-desktop-only"
import AIToolsSection from "@/components/editor/ai-tools-section"
import EditorSection from "@/components/editor/editor-section"
import PreviewSection from "@/components/editor/preview-section"

type prevCodeType = {
  section: string
  section_id: number
  content: string
}

type Markdown = {
  markdownPost: {
    postCodes: editorCode[]
  }
}

function EditorPage({ params }: { params: { id: string } }) {
  const [editorCodes, setEditorCodes] = useAtom(editorCodesState)
  const editorActiveSection = useAtomValue(editorActiveSectionState)
  const [markdownCode, setMarkdownCode] = useState("")
  const monacoInstance = useAtomValue(monacoInstanceState)

  const markdownId = params.id

  const getMarkdownPost = async (markdownId: string) => {
    const markdown = await GET<Markdown>(`/api/posts/${markdownId}`, {
      showErrorToast: true,
      error: "Error fetching markdown post",
    })

    const markdownPost = markdown.markdownPost

    if (
      markdownPost?.postCodes?.length > 0 &&
      markdownPost.postCodes.length > 0
    ) {
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

  const onEditorCodeChange = (code: string) => {
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
      <AIToolsSection />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <EditorSection
            markdown={markdownCode}
            onCodeChange={onEditorCodeChange}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize={30} maxSize={70}>
          <PreviewSection
            code={editorCodes
              .map((code: editorCode) => code.content)
              .join("\n\n")}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default withDesktopOnly(EditorPage)
