import { ServerResponse } from "@/server/utils"
import * as z from "zod"

import { db } from "@/lib/db"
import { MarkdownAlreadyExistError } from "@/lib/exceptions"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { getCurrentUser } from "@/lib/session"

// Define the schema for post creation validation.
const postCreateSchema = z.object({
  code: z.object({
    section: z.string(),
    content: z.string(),
  }),
  markdown_id: z.string(),
})

// Handler for GET requests to retrieve markdown posts.
export async function GET() {
  try {
    const userId = (await getCurrentUser())?.id

    if(!userId) {
      return ServerResponse.unauthorized()
    }

    // Fetch posts from the database.
    const posts = await db.markdownPost.findMany({
      select: { id: true, createdAt: true, postCodes: true },
      where: { userId },
    })

    return ServerResponse.success({
      body: posts,
    })
  } catch (error) {
    return ServerResponse.internalServerError()
  }
}

// Handler for POST requests to create a new markdown post.
export async function POST(req: Request) {
  try {
    const userId = (await getCurrentUser())?.id

    if(!userId) {
      return ServerResponse.unauthorized()
    }

    // Parse and validate the request body.
    const json = await req.json()
    const body = postCreateSchema.parse(json)

    // Retrieve the user's subscription plan.
    const subscriptionPlan = await getUserSubscriptionPlan(userId)

    // For non-pro users, check the post count limit.
    if (!subscriptionPlan?.isPro) {
      const markdownCount = await db.markdownPost.count({
        where: { userId, markdownId: body.markdown_id },
      })

      if (markdownCount >= 3) {
        throw new MarkdownAlreadyExistError()
      }
    }

    // Create a new post in the database.
    const post = await db.markdownPost.create({
      data: { userId, markdownId: body.markdown_id },
      select: { markdownId: true },
    })

    return ServerResponse.success({
      body: post,
    })
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return ServerResponse.unprocessableEntity(error)
    }

    if (error instanceof MarkdownAlreadyExistError) {
      return ServerResponse.conflict("Markdown already exists")
    }

    return ServerResponse.internalServerError()
  }
}
