"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { editorActiveSectionState, editorCodesState } from "@/atoms/editor"
import { POST } from "@/utils/http.utils"
import { useAtom } from "jotai"
import { Loader2, PlusIcon } from "lucide-react"

import { DefaultEditorContent, defaultEditorContent } from "@/config/editor"
import { cn, generateUUID } from "@/lib/utils"
import { Button, ButtonProps } from "@/components/ui/button"

interface PostCreateButtonProps extends ButtonProps {}

interface PostCreateResponse {
  markdownId: string
}

interface PostCreateBody {
  code: DefaultEditorContent
  markdown_id: string
}

export function PostCreateButton({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [, setEditorCodes] = useAtom(editorCodesState)
  const [, setEditorActiveSection] = useAtom(editorActiveSectionState)

  const router = useRouter()

  async function onClick() {
    setEditorCodes([
      {
        section: "",
        content: "",
        section_id: 0,
      },
    ])
    setEditorActiveSection(0)
    setIsLoading(true)

    const post = await POST<PostCreateResponse, PostCreateBody>(
      "/api/posts",
      {
        code: defaultEditorContent,
        markdown_id: generateUUID(),
      },
      {
        error: "Your post was not created. Please try again.",
        showErrorToast: true,
      }
    )

    setIsLoading(false)

    if (!post) {
      return
    }

    router.refresh()
    router.push(`/edit/${post.markdownId}`)
  }

  return (
    <>
      <Button
        onClick={onClick}
        className={cn(
          {
            "cursor-not-allowed opacity-60": isLoading,
          },
          className
        )}
        disabled={isLoading}
        variant={variant || "default"}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <PlusIcon className="mr-2 h-4 w-4" />
        )}
        New markdown
      </Button>
    </>
  )
}
