import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import {
  MarkdownAlreadyExistError,
  RequiresProPlanError,
} from "@/lib/exceptions"
import { getUserSubscriptionPlan } from "@/lib/subscription"

const postCreateSchema = z.object({
  code: z.object({
    section: z.string(),
    content: z.string(),
  }),
  markdown_id: z.string(),
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session
    const posts = await db.markdownPost.findMany({
      select: {
        id: true,
        createdAt: true,
        postCodes: true,
      },
      where: {
        userId: (user as any)?.id,
      },
    })

    return new Response(JSON.stringify(posts))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    const json = await req.json()
    const body = postCreateSchema.parse(json)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session
    const subscriptionPlan = await getUserSubscriptionPlan(user.id)

    // If user is on a free plan.
    // Check if user has reached limit of 3 posts.
    if (!subscriptionPlan?.isPro) {
      const count = await db.markdownPost.count({
        where: {
          userId: user.id,
        },
      })
      const markdownCount = await db.markdownPost.count({
        where: {
          userId: user.id,
          markdownId: body.markdown_id,
        },
      })

      if (count >= 2) {
        throw new RequiresProPlanError()
      } else if (markdownCount > 0) {
        throw new MarkdownAlreadyExistError()
      }
    }

    const post = await db.markdownPost.create({
      data: {
        userId: String(session.user.id),
        markdownId: body.markdown_id,
      },
      select: {
        markdownId: true,
      },
    })

    return new Response(JSON.stringify(post))
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(error.issues)
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    console.error(error)

    if (error instanceof RequiresProPlanError) {
      return new Response("Requires Pro Plan", { status: 402 })
    } else if (error instanceof MarkdownAlreadyExistError) {
      return new Response("Markdown ID Already Exist", { status: 403 })
    }

    return new Response(null, { status: 500 })
  }
}
