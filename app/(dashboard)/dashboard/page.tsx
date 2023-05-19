import { redirect } from "next/navigation"
import { getTitle } from "@/utils/editor"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { DashboardInlineHeader } from "@/components/dashboard/dashboard-inline-header"
import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder"
import { PostCreateButton } from "@/components/dashboard/post-create-button"
import { PostItem } from "@/components/dashboard/post-item"
import { DashboardShell } from "@/components/dashboard/shell"

async function Dashboard() {
  const user = (await getCurrentUser()) as any

  console.log(user)

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const posts = await db.markdownPost.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      markdownId: true,
      userId: true,
      createdAt: true,
      postCodes: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return (
    <DashboardShell>
      <DashboardInlineHeader
        heading="Markdowns"
        text="Create and manage markdowns."
      >
        <PostCreateButton />
      </DashboardInlineHeader>
      <div>
        {posts?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {posts.map((post) => (
              <PostItem
                key={post.id}
                post={post}
                title={getTitle(post.postCodes[0]?.content) || ""}
              />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>
              No markdowns created
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any markdowns yet. Start creating content.
            </EmptyPlaceholder.Description>
            <PostCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}

export default Dashboard
