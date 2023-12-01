import { ServerResponse } from "@/server/utils"
import * as z from "zod"

import { free_credits } from "@/config/subscriptions"
import { db } from "@/lib/db"
import { kvget, kvset } from "@/lib/kv"
import { getCurrentUser } from "@/lib/session"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { postPatchSchema } from "@/lib/validations/post"

// Set the revalidation interval (currently set to 0, meaning no revalidation).
export const revalidate = 0

// Define the schema for the route context validation.
const routeContextSchema = z.object({
  params: z.object({
    markdownId: z.string(),
  }),
})

// Function to verify if the current user has access to a specific post.
async function verifyCurrentUserHasAccessToPost(markdownId: string) {
  const { sessionUser } = await getCurrentUser()
  const userId = sessionUser?.id

  if (!userId) {
    return false
  }
  // Count the posts with the given markdownId and userId.
  const count = await db.markdownPost.count({
    where: {
      markdownId,
      userId: userId,
    },
  })

  // Returns true if at least one post is found.
  return count > 0
}

// Handler for GET requests to fetch a markdown post.
export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)
    const { sessionUser: user } = await getCurrentUser()
    const markdownId = params.markdownId
    const userId = user?.id

    if (!userId) {
      return ServerResponse.unauthorized()
    }

    const { isPro: isUserPro } = await getUserSubscriptionPlan(userId)
    const user_ai_run_count = await kvget(userId, "ai_run_count")

    // Try fetching the post from KV store.
    const markdownPostfromKv = await kvget(userId, `markdown-${markdownId}`)
    let markdownPost = markdownPostfromKv

    // Fetch from database if not found in KV store.
    if (!markdownPost) {
      const markdownPost = await db.markdownPost.findUnique({
        where: { markdownId, userId: userId },
        select: {
          postCodes: true,
          createdAt: true,
          userId: true,
          id: true,
          markdownId: true,
          updatedAt: true,
        },
      })

      if (!markdownPost) return ServerResponse.unauthorized()

      await kvset(
        user.id,
        `markdown-${markdownId}`,
        JSON.stringify(markdownPost)
      )
    }

    // Return the markdown post and eligibility status.
    return ServerResponse.success({
      body: {
        markdownPost,
        // user_ai_run_count === undefined -- if user starting for first time and cookie not set
        isEligibleForAI:
          user_ai_run_count === undefined
            ? true
            : isUserPro || Number(user_ai_run_count) <= free_credits,
      },
    })
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return ServerResponse.unprocessableEntity(error)
    }

    return ServerResponse.internalServerError()
  }
}

// Handler for PATCH requests to update a markdown post.
export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)
    const { sessionUser } = await getCurrentUser()
    const userId = sessionUser?.id

    if (!userId) {
      return ServerResponse.unauthorized()
    }

    // Parse and validate the request body.
    const json = await req.json()
    const markdown_post = postPatchSchema.parse(json)
    const markdownId = params.markdownId

    if (!(await verifyCurrentUserHasAccessToPost(markdownId))) {
      return ServerResponse.unauthorized()
    }

    // Update the post in the database.
    await db.markdownPost.update({
      where: { markdownId },
      data: {
        postCodes: {
          deleteMany: {},
          create: markdown_post.postCodes,
        },
      },
    })

    // Update the post in the KV store.
    await kvset(userId, `markdown-${markdownId}`, JSON.stringify(markdown_post))

    return ServerResponse.success({
      body: null,
    })
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return ServerResponse.unprocessableEntity(error)
    }

    return ServerResponse.internalServerError()
  }
}

// Handler for DELETE requests to remove a markdown post.
export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)
    const { sessionUser } = await getCurrentUser()
    const userId = sessionUser?.id

    if (!userId) {
      return ServerResponse.unauthorized()
    }

    if (!(await verifyCurrentUserHasAccessToPost(params.markdownId))) {
      return ServerResponse.unauthorized()
    }

    // Delete the post with the specified markdownId.
    await db.markdownPost.delete({
      where: { markdownId: params.markdownId },
    })

    return ServerResponse.success({
      body: null,
    })
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      // Return a 422 Unprocessable Entity response if validation fails.
      return ServerResponse.unprocessableEntity(error)
    }

    // Return a 500 Internal Server Error for other errors.
    return ServerResponse.internalServerError()
  }
}
