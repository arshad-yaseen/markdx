import { getServerSession } from "next-auth"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { postPatchSchema } from "@/lib/validations/post"

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
    const user = await getCurrentUser()

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToPost(params.markdownId))) {
      return new Response(null, { status: 403 })
    }

    // Delete the post.
    const markdownPost = await db.markdownPost.findMany({
      where: {
        markdownId: params.markdownId,
        userId: (user as any).id,
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

    return new Response(JSON.stringify(markdownPost))
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

    await db.markdownPost.update({
      where: {
        markdownId: params.markdownId,
      },
      data: {
        postCodes: {
          create: markdown_post.postCodes, // Place new array
        },
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
