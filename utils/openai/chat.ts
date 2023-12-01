import { OpenAIBody } from "@/types"

export const OpenAICreateChat = async (body: OpenAIBody) => {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...body,
      }),
    })

    if (!response.ok) {
      return {
        err: true,
        message: "Can't complete the request",
      }
    }

    const data = response.body
    return {
      data,
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Fetch error:", error)
    } else {
      console.error("An unexpected error occurred:", error)
    }

    return {
      err: true,
      message: "Error occurred while fetching from OpenAI",
    }
  }
}
