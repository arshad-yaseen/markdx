import { ServerResponse } from "@/server/utils"
import { kv } from "@vercel/kv"
import * as z from "zod"

import { db } from "@/lib/db"
import { postPatchSchema } from "@/lib/validations/post"
import { getCurrentUser } from "@/lib/session"

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
  const userId = (await getCurrentUser())?.id

  if(!userId) {
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

// Handler for DELETE requests to remove a markdown post.
export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)
    const userId = (await getCurrentUser())?.id

    if(!userId) {
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

// Handler for GET requests to fetch a markdown post.
export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)
    const userId = (await getCurrentUser())?.id

    if(!userId) {
      return ServerResponse.unauthorized()
    }

    // Try fetching the post from KV store.
    const markdownPostfromKv = await kv.get(
      `${params.markdownId}_${userId}`
    )
    let markdownPost = markdownPostfromKv

    // Fetch from database if not found in KV store.
    if (!markdownPost) {
      const markdownPosts = await db.markdownPost.findMany({
        where: { userId: userId },
        select: {
          postCodes: true,
          createdAt: true,
          userId: true,
          id: true,
          markdownId: true,
          updatedAt: true,
        },
      })

      // Find the specific post matching the markdownId and userId.
      markdownPost = markdownPosts.find(
        (post) =>
          post.markdownId === params.markdownId &&
          post.userId === userId
      )

      if (!markdownPost) return ServerResponse.unauthorized()
      await kv.set(
        `${params.markdownId}_${userId}`,
        JSON.stringify(markdownPost)
      )
    }

    // Return the markdown post and eligibility status.
    return ServerResponse.success({
      body: { markdownPost },
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
    const userId = (await getCurrentUser())?.id

    if(!userId) {
      return ServerResponse.unauthorized()
    }

    // Parse and validate the request body.
    const json = await req.json()
    const markdown_post = postPatchSchema.parse(json)

    if (!(await verifyCurrentUserHasAccessToPost(params.markdownId))) {
      return ServerResponse.unauthorized()
    }

    // Update the post in the database.
    await db.markdownPost.update({
      where: { markdownId: params.markdownId },
      data: {
        postCodes: {
          deleteMany: {},
          create: markdown_post.postCodes,
        },
      },
    })

    // Update the post in the KV store.
    await kv.set(
      `${params.markdownId}_${userId}`,
      JSON.stringify(markdown_post)
    )

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
