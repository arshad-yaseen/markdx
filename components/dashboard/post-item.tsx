"use client"

import Link from "next/link"
import { editorActiveSectionState, editorCodesState } from "@/atoms/editor"
import { MarkdownPost } from "@prisma/client"
import { useAtom } from "jotai"

import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

import { PostOperations } from "./post-operations"

interface PostItemProps {
  post: Pick<MarkdownPost, "id" | "createdAt" | "markdownId">
  title: string
}

export function PostItem({ post, title }: PostItemProps) {
  const [, setEditorCodes] = useAtom(editorCodesState)
  const [, setEditorActiveSection] = useAtom(editorActiveSectionState)

  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/edit/${post.markdownId}`}
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
          className="font-semibold hover:underline"
        >
          {title}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(post.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <PostOperations post={{ id: post.id, markdownId: post.markdownId }} />
    </div>
  )
}

PostItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
