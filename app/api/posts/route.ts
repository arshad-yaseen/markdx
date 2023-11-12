import { ServerResponse } from "@/server/utils"
import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { MarkdownAlreadyExistError } from "@/lib/exceptions"
import { getUserSubscriptionPlan } from "@/lib/subscription"

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
    const session = await getServerSession(authOptions)

    // Check if the user session exists.
    if (!session) {
      return ServerResponse.unauthorized()
    }

    const { user } = session
    // Fetch posts from the database.
    const posts = await db.markdownPost.findMany({
      select: { id: true, createdAt: true, postCodes: true },
      where: { userId: user.id },
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
    const session = await getServerSession(authOptions)

    if (!session) {
      return ServerResponse.unauthorized()
    }

    // Parse and validate the request body.
    const json = await req.json()
    const body = postCreateSchema.parse(json)

    const { user } = session
    // Retrieve the user's subscription plan.
    const subscriptionPlan = await getUserSubscriptionPlan(user.id)

    // For non-pro users, check the post count limit.
    if (!subscriptionPlan?.isPro) {
      const markdownCount = await db.markdownPost.count({
        where: { userId: user.id, markdownId: body.markdown_id },
      })

      if (markdownCount >= 3) {
        throw new MarkdownAlreadyExistError()
      }
    }

    // Create a new post in the database.
    const post = await db.markdownPost.create({
      data: { userId: user.id, markdownId: body.markdown_id },
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
