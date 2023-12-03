import { ServerResponse } from "@/server/utils"
import { OpenAIBody } from "@/types"
import { isCorrectApiKey } from "@/utils/openai"
import { OpenAIStream, StreamingTextResponse } from "ai"
import OpenAI from "openai"

import { env } from "@/env.mjs"
import { models } from "@/config/ai"
import { free_credits } from "@/config/subscriptions"
import { kvget, kvgetdec, kvset } from "@/lib/kv"
import { getCurrentUser } from "@/lib/session"
import { getUserSubscriptionPlan } from "@/lib/subscription"

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json()
    const {
      openai_body,
      type = "chat",
      api_key,
      stream_response = true,
    }: {
      openai_body: OpenAIBody
      type: "chat" | "vision"
      api_key: string
      stream_response: boolean
    } = body

    const { sessionUser: user } = await getCurrentUser()

    if (!user?.id) {
      return ServerResponse.unauthorized()
    }

    // Get the User provided API Key and API key compatible OpenAI model from KV store.
    const api_key_with_model_from_kv = await kvgetdec(user.id, "api_key")
    const api_key_from_kv = api_key_with_model_from_kv?.split("::")[0]
    const model_from_kv = api_key_with_model_from_kv?.split("::")[1]

    // The count of the number of times the user has used the AI.
    const user_ai_run_count = await kvget(user?.id!, "ai_run_count")
    const { isPro } = await getUserSubscriptionPlan(user?.id!)

    // Check if the user has exceeded the free credits limit.
    // user_ai_run_count !== undefined -- if user generating openai chat first time and cookie not set
    if (
      user_ai_run_count !== undefined &&
      Number(user_ai_run_count) >= free_credits &&
      !isPro &&
      !api_key_from_kv &&
      !api_key
    ) {
      return ServerResponse.error(
        "You have exceeded the free credits limit, please upgrade to pro plan to continue using the AI.",
        402
      )
    }

    if (!openai_body) {
      return ServerResponse.badRequest("Missing openai_body")
    } else if (!openai_body.messages) {
      return ServerResponse.badRequest("Missing openai_body.messages")
    }

    if (!user?.id) {
      return ServerResponse.unauthorized()
    }

    let OPENAI_API_KEY

    if (isPro) {
      OPENAI_API_KEY = env.OPENAI_API_KEY
    } else if (api_key) {
      OPENAI_API_KEY = api_key
    } else if (api_key_from_kv) {
      OPENAI_API_KEY = api_key_from_kv
    } else if (user_ai_run_count === null) {
      // if user generating openai chat first time and cookie not set
      OPENAI_API_KEY = env.OPENAI_API_KEY
    }

    if (!OPENAI_API_KEY) {
      return ServerResponse.unauthorized("Missing OPENAI_API_KEY")
    }

    if (!isCorrectApiKey(OPENAI_API_KEY)) {
      return ServerResponse.unauthorized("Invalid OPENAI_API_KEY")
    }

    const openai = new OpenAI({ apiKey: OPENAI_API_KEY })

    const payload: OpenAI.ChatCompletionCreateParams = {
      ...openai_body,
      model: model_from_kv
        ? model_from_kv
        : type === "chat"
        ? models.chat
        : models.vision,
      stream: stream_response,
    }

    const response = await openai.chat.completions.create(payload)

    // Increment the count of the number of times the user has used the AI.
    await kvset(
      user?.id!,
      "ai_run_count",
      !user_ai_run_count ? 1 : Number(user_ai_run_count) + 1
    )

    if (stream_response) {
      // @ts-ignore
      const stream = OpenAIStream(response)
      return new StreamingTextResponse(stream)
    } else {
      return ServerResponse.success({ body: response })
    }
  } catch (error) {
    return ServerResponse.error(
      (error as any).message || String(error),
      (error as any).status ?? 500
    )
  }
}
