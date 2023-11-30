import { OpenAIBody } from "@/types"
import OpenAI from "openai"

import { env } from "@/env.mjs"

import { OpenAIStream, StreamingTextResponse } from 'ai';

import { ServerResponse } from "@/server/utils"
import { getCurrentUser } from "@/lib/session"
import { openai } from "@/lib/openai"

if (!env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI")
}

export async function POST(req: Request): Promise<Response> {
  // Parse the request body.
  const body: OpenAIBody = (await req.json()) as OpenAIBody
  const userId = (await getCurrentUser())?.id

  if(!userId) {
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

  const response = await openai.chat.completions.create(payload);
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
