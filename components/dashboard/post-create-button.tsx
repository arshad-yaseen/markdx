"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { editorActiveSectionState, editorCodesState } from "@/atoms/editor"
import { DialogDescription } from "@radix-ui/react-dialog"
import { useAtom } from "jotai"
import { Loader2Icon, PlusIcon } from "lucide-react"
import { toast } from "sonner"

import { defaultEditorContent } from "@/config/editor"
import { cn, generateUniqueString } from "@/lib/utils"
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "../ui/dialog"

interface PostCreateButtonProps extends ButtonProps {}

export function PostCreateButton({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [upgradeToPRODialog, setUpgradeToPRODialog] = React.useState(false)
  const [, setEditorCodes] = useAtom(editorCodesState)
  const [, setEditorActiveSection] = useAtom(editorActiveSectionState)

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
      if (response.status === 402) {
        setUpgradeToPRODialog(true)
      } else if (response.status === 403) {
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
      <Dialog open={upgradeToPRODialog}>
        <DialogOverlay onClick={() => setUpgradeToPRODialog(false)} />
        <DialogContent className="flex flex-col items-center">
          <DialogHeader>
            <DialogTitle className="text-2xl">Upgrade to PRO</DialogTitle>
          </DialogHeader>
          <DialogDescription className="mt-2 w-full px-8 text-center">
            The free plan is limited to 2 markdowns. Upgrade to the PRO plan for
            unlimited markdowns.
          </DialogDescription>

          <div className="mt-4 flex w-full space-x-4">
            <Button
              onClick={() => {
                setUpgradeToPRODialog(false)
              }}
              variant="outline"
              className="mt-2 w-full"
            >
              Cancel
            </Button>
            <Button
              onClick={() => router.push("/dashboard/billing")}
              className="mt-2 w-full"
            >
              Upgrade
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <button
        onClick={onClick}
        className={cn(
          buttonVariants({ variant }),
          {
            "cursor-not-allowed opacity-60": isLoading,
          },
          className
        )}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <PlusIcon className="mr-2 h-4 w-4" />
        )}
        New markdown
      </button>
    </>
  )
}
