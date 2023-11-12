import { ServerResponse } from "@/server/utils"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export const revalidate = 0
export const dynamic = "force-dynamic"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return ServerResponse.unauthorized()
  }
  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      stripeSubscriptionId: true,
    },
  })

  const markdownPostsCount = await db.markdownPost.count({
    where: {
      userId: session.user.id,
    },
  })
  if (!user || !markdownPostsCount) {
    return ServerResponse.notFound()
  }
  const isEligibleForAI = !!user.stripeSubscriptionId
    ? true
    : markdownPostsCount < 2
    ? true
    : false

  return ServerResponse.success({
    body: { isEligibleForAI },
  })
}
