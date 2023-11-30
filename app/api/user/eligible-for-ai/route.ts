import { ServerResponse } from "@/server/utils"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

export const revalidate = 0
export const dynamic = "force-dynamic"

export async function GET() {
  const userId = (await getCurrentUser())?.id

    if(!userId) {
      return ServerResponse.unauthorized()
    }

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      stripeSubscriptionId: true,
    },
  })

  const markdownPostsCount = await db.markdownPost.count({
    where: {
      userId: userId,
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
