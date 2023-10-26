"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { editorActiveSectionState, editorCodesState } from "@/atoms/editor"
import { DialogDescription } from "@radix-ui/react-dialog"
import { useAtom } from "jotai"
import { Loader2, PlusIcon } from "lucide-react"
import { toast } from "sonner"

import { defaultEditorContent } from "@/config/editor"
import { cn, generateUniqueString } from "@/lib/utils"
import { Button, ButtonProps } from "@/components/ui/button"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"

interface PostCreateButtonProps extends ButtonProps {}

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
    setIsLoading(true)
    setEditorCodes([
      {
        section: "",
        content: "",
        section_id: 0,
      },
    ])
    setEditorActiveSection(0)

    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: defaultEditorContent,
        markdown_id: generateUniqueString(15),
      }),
    })

    setIsLoading(false)

    if (!response?.ok) {
      if (response.status === 403) {
        toast.message("Try again")
      }
    }

    const post = await response.json()

    // This forces a cache invalidation.
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
