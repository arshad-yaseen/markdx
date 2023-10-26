import { getServerSession } from "next-auth"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
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
    const session = await getServerSession(authOptions)

    const user = await db.user.findUnique({
      where: {
        id: session?.user.id,
      },
      select: {
        stripeSubscriptionId: true,
      },
    })

    const markdownPosts = await db.markdownPost.findMany({
      where: {
        userId: session?.user.id,
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

    const markdownPost = markdownPosts.find(
      (post) => post.markdownId === params.markdownId
    )

    // Check if the user has access to this post.
    if (!markdownPost) {
      return new Response(null, { status: 403 })
    }

    const isEligibleForAI = !!user?.stripeSubscriptionId
      ? true
      : markdownPosts.length < 2
      ? true
      : false

    return new Response(
      JSON.stringify({
        markdownPost,
        isEligibleForAI,
      })
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

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

    // Get the request body and validate it.
    const json = await req.json()
    const markdown_post = postPatchSchema.parse(json)

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToPost(params.markdownId))) {
      return new Response(null, { status: 403 })
    }

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

    await db.markdownPost.update({
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
