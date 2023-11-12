import { OpenAIBody } from "@/types"
import OpenAI from "openai"

import { env } from "@/env.mjs"
import { openai_model } from "@/config/editor"

import { OpenAIStream } from "../../../utils/openai/OpenAIStream"

// Ensure the OpenAI API key is set in the environment variables.
if (!env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI")
}

// Set the runtime environment to 'edge'.
export const runtime = "edge"

// Handler for POST requests to interact with OpenAI's API.
export async function POST(req: Request): Promise<Response> {
  // Parse the request body.
  const body: OpenAIBody = (await req.json()) as OpenAIBody

  // Validate the presence of messages in the request body.
  if (!body.messages) {
    return new Response("No messages in the request", { status: 400 })
  }

  // Create the payload for the OpenAI API request.
  const payload: OpenAI.ChatCompletionCreateParams = {
    ...body,
    model: openai_model,
    stream: true,
  }

  // Initialize and handle the OpenAI stream.
  const stream = await OpenAIStream(payload)
  return new Response(stream)
}
