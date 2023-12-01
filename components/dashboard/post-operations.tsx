"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { editorActiveSectionState, editorCodesState } from "@/atoms/editor"
import { DELETE } from "@/utils/http.utils"
import { MarkdownPost } from "@prisma/client"
import { useAtom } from "jotai"
import { Loader2, MoreVerticalIcon, PenLine, TrashIcon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "../ui/button"

async function deletePost(markdownId: string) {
  await DELETE(`/api/posts/${markdownId}`, {
    error: "Your post was not deleted. Please try again.",
    showErrorToast: true,
  })

  return true
}

interface PostOperationsProps {
  post: Pick<MarkdownPost, "markdownId" | "id">
}

export function PostOperations({ post }: PostOperationsProps) {
  const router = useRouter()
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)
  const [, setEditorCodes] = useAtom(editorCodesState)
  const [, setEditorActiveSection] = useAtom(editorActiveSectionState)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
          <MoreVerticalIcon className="h-4 w-4" />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link
              onClick={() => {
                setEditorCodes([
                  {
                    section: "",
                    content: "",
                    section_id: 0,
                  },
                ])
                setEditorActiveSection(0)
              }}
              href={`/edit/${post.markdownId}`}
              className="flex w-full"
            >
              <PenLine className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
          >
            <TrashIcon className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this markdown?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                disabled={isDeleteLoading}
                onClick={async (event: any) => {
                  event.preventDefault()
                  setIsDeleteLoading(true)

                  const deleted = await deletePost(String(post.markdownId))

                  if (deleted) {
                    setIsDeleteLoading(false)
                    setShowDeleteAlert(false)
                    router.refresh()
                  }
                }}
              >
                {isDeleteLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <TrashIcon className="mr-2 h-4 w-4" />
                )}
                Delete
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
