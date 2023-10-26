import { OpenAIBody } from "@/types"
import OpenAI from "openai"

import { env } from "@/env.mjs"
import { openai_model } from "@/config/editor"

import { OpenAIStream } from "../../../utils/openai/OpenAIStream"

if (!env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI")
}

export const runtime = "edge"

export async function POST(req: Request): Promise<Response> {
  const body = (await req.json()) as OpenAIBody

  if (!body.messages) {
    return new Response("No messages in the request", { status: 400 })
  }

  const payload: OpenAI.ChatCompletionCreateParams = {
    ...body,
    model: openai_model,
    stream: true,
  }

  const stream = await OpenAIStream(payload)
  return new Response(stream)
}
