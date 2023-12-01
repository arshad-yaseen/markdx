import { env } from "process"
import { NextRequest } from "next/server"
import { ServerResponse } from "@/server/utils"
import { POST as HTTP_POST } from "@/utils/http.utils"

import { getCurrentUser } from "@/lib/session"

export async function POST(req: NextRequest) {
  const { url } = await req.json()

  const { sessionUser } = await getCurrentUser()
  const userId = sessionUser?.id

  if (!userId) {
    return ServerResponse.unauthorized()
  }

  const shortUrlJson = await HTTP_POST<{ shorturl: string }, { url: string }>(
    "https://urlbae.com/api/url/add",
    { url: url },
    {
      headers: {
        Authorization: "Bearer " + env.URLBAE_API_KEY! || "",
      },
    }
  )

  return ServerResponse.success({
    body: {
      shorturl: shortUrlJson.shorturl,
      error: false,
    },
  })
}
