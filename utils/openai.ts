import { OpenAIBody } from "@/types"
import { ChatCompletionMessageParam } from "openai/resources"

import { example_chat_api_messages, models } from "@/config/ai"

type OpenAIResponse = {
  isSuccess: boolean
  message: {
    content: string | ReadableStream<Uint8Array>
    role: string
  } | null
  error: {
    message: string
    statusCode?: number
  } | null
}

type OpenAIOptions = {
  apiKey?: string
  body: OpenAIBody
  type?: "chat" | "vision"
  streamResponse?: boolean
}

export async function createChat({
  apiKey,
  body,
  type = "chat",
  streamResponse = true,
}: OpenAIOptions): Promise<OpenAIResponse> {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        openai_body: body,
        api_key: apiKey,
        type: type,
        stream_response: streamResponse,
      }),
    })

    if (!response.ok) {
      // If the response status is not in the 200-299 range, handle it as an error.
      const errorData = await response.json()
      return {
        isSuccess: false,
        message: null,
        error: {
          message: errorData?.error?.message || "An error occurred",
          statusCode: response.status,
        },
      }
    }

    let data

    if (streamResponse) {
      data = {
        content: response.body,
        role: "assistant",
      }
    } else {
      const res_json = await response.json()
      data = res_json.choices[0].message
    }

    // Check if the data returned is as expected.
    if (data) {
      return {
        isSuccess: true,
        message: data,
        error: null,
      }
    } else {
      return {
        isSuccess: false,
        message: null,
        error: {
          message: "Response did not contain expected data",
          statusCode: response.status,
        },
      }
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: null,
      error: {
        message: (error as any).message,
        statusCode: 500,
      },
    }
  }
}

export const isCorrectApiKey = (apiKey: string | undefined): boolean => {
  return !!apiKey && apiKey.startsWith("sk-") && apiKey.length > 30
}

export const validateApiKey = async (
  apiKey: string
): Promise<{
  error: boolean
  message: string | undefined
  code: string
}> => {
  const body = {
    messages: example_chat_api_messages as Array<ChatCompletionMessageParam>,
  }
  const isSupportedKey = await createChat({
    apiKey,
    body,
    streamResponse: false,
    type: "chat",
  })

  if (isSupportedKey.isSuccess) {
    return {
      error: false,
      message: "API key is valid",
      code: "valid_api_key",
    }
  } else if (isSupportedKey.error?.statusCode === 401) {
    return {
      error: true,
      message: "API key is invalid",
      code: "invalid_api_key",
    }
  } else if (
    isSupportedKey.error?.statusCode === 404 &&
    isSupportedKey.error?.message.includes(models.chat)
  ) {
    return {
      error: true,
      message: "API key is not supported",
      code: "unsupported_api_key",
    }
  } else {
    return {
      error: true,
      message: isSupportedKey.error?.message,
      code: "server_error",
    }
  }
}
