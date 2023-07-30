import { OpenAIBody } from "types"
import { env } from "@/env.mjs"

import {
  OpenAIStream,
  OpenAIStreamPayload,
} from "../../../utils/openai/OpenAIStream"
import { openai_model } from "@/config/editor"

if (!env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI")
}

export const runtime = "edge"

export async function POST(req: Request): Promise<Response> {
  const {
    prompt,
    max_tokens,
    temperature,
    top_p,
    frequency_penalty,
    presence_penalty,
    n,
  } = (await req.json()) as OpenAIBody

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 })
  }

  const payload: OpenAIStreamPayload = {
    model: openai_model,
    messages: [
      { role: "system", content: prompt.system },
      { role: "user", content: prompt.user },
    ],
    max_tokens: max_tokens || 200,
    temperature: temperature || 0.7,
    top_p: top_p || 1,
    frequency_penalty: frequency_penalty || 1,
    presence_penalty: presence_penalty || 1,
    n: n || 1,
    stream: true,
  }

  const stream = await OpenAIStream(payload)
  return new Response(stream)
}
