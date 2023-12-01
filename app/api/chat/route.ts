import { ServerResponse } from "@/server/utils"
import { OpenAIBody } from "@/types"
import { OpenAIStream, StreamingTextResponse } from "ai"
import OpenAI from "openai"

import { env } from "@/env.mjs"
import { kvget, kvset } from "@/lib/kv"
import { openai } from "@/lib/openai"
import { getCurrentUser } from "@/lib/session"

if (!env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI")
}

export async function POST(req: Request): Promise<Response> {
  // Parse the request body.
  const body: OpenAIBody = (await req.json()) as OpenAIBody
  const { sessionUser: user } = await getCurrentUser()

  if (!user?.id) {
    return ServerResponse.unauthorized()
  }

  if (!body.messages) {
    return ServerResponse.error("Missing messages in request body")
  }

  const payload: OpenAI.ChatCompletionCreateParams = {
    ...body,
    model: env.OPENAI_MODEL,
    stream: true,
  }

  const response = await openai.chat.completions.create(payload)
  const user_ai_run_count = await kvget(user.id, "ai_run_count")

  // Count the number of times the user has used the AI.
  kvset(
    user.id,
    "ai_run_count",
    user_ai_run_count ? Number(user_ai_run_count) + 1 : 1
  )

  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}
