import { ServerResponse } from "@/server/utils"

import { kvdel, kvgetdec, kvsetenc } from "@/lib/kv"
import { getCurrentUser } from "@/lib/session"

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json()
    const { apiKey } = body

    const { sessionUser: user } = await getCurrentUser()

    if (!user?.id) {
      return ServerResponse.unauthorized()
    }

    if (!apiKey) {
      return ServerResponse.badRequest("Missing API key")
    }

    await kvsetenc(user.id, "api_key", apiKey)

    return ServerResponse.success({
      body: { message: "API key saved" },
    })
  } catch (error) {
    return ServerResponse.internalServerError(
      error instanceof Error ? error.message : String(error)
    )
  }
}

export async function GET(): Promise<Response> {
  try {
    const { sessionUser: user } = await getCurrentUser()

    if (!user?.id) {
      return ServerResponse.unauthorized()
    }

    const apiKeyWithModel = (await kvgetdec(user.id, "api_key")) || ""
    const apiKey = apiKeyWithModel.split("::")[0]

    if (!apiKey) {
      return ServerResponse.notFound("API key not found")
    }

    return ServerResponse.success({
      body: { apiKey },
    })
  } catch (error) {
    return ServerResponse.internalServerError(
      error instanceof Error ? error.message : String(error)
    )
  }
}

export async function DELETE(): Promise<Response> {
  try {
    const { sessionUser: user } = await getCurrentUser()

    if (!user?.id) {
      return ServerResponse.unauthorized()
    }

    await kvdel(user.id, "api_key")
    return ServerResponse.success({
      body: { message: "API key deleted" },
    })
  } catch (error) {
    return ServerResponse.error(
      (error as any).message || String(error),
      (error as any).status ?? 500
    )
  }
}
