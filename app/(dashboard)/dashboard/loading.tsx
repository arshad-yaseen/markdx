"use client"

import { DashboardInlineHeader } from "@/components/dashboard/dashboard-inline-header"
import { PostCreateButton } from "@/components/dashboard/post-create-button"
import { PostItem } from "@/components/dashboard/post-item"
import { DashboardShell } from "@/components/dashboard/shell"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardInlineHeader
        heading="Markdowns"
        text="Create and manage markdowns."
      >
        <PostCreateButton />
      </DashboardInlineHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
      </div>
    </DashboardShell>
  )
}
