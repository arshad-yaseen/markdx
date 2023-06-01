import { getServerSession } from "next-auth"
import * as z from "zod"

import { env } from "@/env.mjs"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { redis } from "@/lib/redis"
import { postPatchSchema } from "@/lib/validations/post"

export const revalidate = 0

const routeContextSchema = z.object({
  params: z.object({
    markdownId: z.string(),
  }),
})

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToPost(params.markdownId))) {
      return new Response(null, { status: 403 })
    }

    // Delete the post.
    await db.markdownPost.delete({
      where: {
        markdownId: params.markdownId,
      },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    console.log(error)

    return new Response(null, { status: 500 })
  }
}

export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

    if (env.REDIS_URL) {
      const cacheKey = `markdownPost:${params.markdownId}`
      const cachedData = await redis.get(cacheKey)

      if (cachedData) {
        return new Response(JSON.stringify(JSON.parse(cachedData)))
      }
    }

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToPost(params.markdownId))) {
      return new Response(null, { status: 403 })
    }

    // Delete the post.
    const markdownPost = await db.markdownPost.findMany({
      where: {
        markdownId: params.markdownId,
      },
      select: {
        postCodes: true,
        createdAt: true,
        userId: true,
        id: true,
        markdownId: true,
        updatedAt: true,
      },
    })

    return new Response(JSON.stringify(markdownPost[0]))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    console.log(error)

    return new Response(null, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToPost(params.markdownId))) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const json = await req.json()
    const markdown_post = postPatchSchema.parse(json)

    // Update the post.
    // TODO: Implement sanitization for content.
    await db.markdownPost.update({
      where: {
        markdownId: params.markdownId,
      },
      data: {
        postCodes: {
          deleteMany: {}, // Delete all existing postCodes associated with the MarkdownPost
        },
      },
    })

    const updatedData = await db.markdownPost.update({
      where: {
        markdownId: params.markdownId,
      },
      data: {
        postCodes: {
          create: markdown_post.postCodes, // Place new array
        },
      },
      select: {
        postCodes: true,
        createdAt: true,
        userId: true,
        id: true,
        markdownId: true,
        updatedAt: true,
      },
    })

    const cacheKey = `markdownPost:${params.markdownId}`

    if (env.REDIS_URL) {
      redis.set(cacheKey, JSON.stringify(updatedData))
    }

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error.issues)
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    console.log(error)

    return new Response(null, { status: 500 })
  }
}

async function verifyCurrentUserHasAccessToPost(markdownId: string) {
  const session = await getServerSession(authOptions)
  const count = await db.markdownPost.count({
    where: {
      markdownId: String(markdownId),
      userId: session?.user.id,
    },
  })

  return count > 0
}
