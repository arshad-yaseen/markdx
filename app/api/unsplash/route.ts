import { NextRequest } from "next/server"
import { ServerResponse } from "@/server/utils"
import { GET as HTTP_GET } from "@/utils/http.utils"

import { env } from "@/env.mjs"
import { getCurrentUser } from "@/lib/session"

export async function GET(req: NextRequest) {
  const endpoint = "https://api.unsplash.com/search/photos"
  const accessKey = env.UNSPLASH_ACCESS_KEY

  const { sessionUser } = await getCurrentUser()
  const userId = sessionUser?.id

  if (!userId) {
    return ServerResponse.unauthorized()
  }

  const { searchParams } = new URL(req.url)
  const query = searchParams.get("query") || "minimal"
  const orientation = searchParams.get("orientation") || "landscape"

  if (!accessKey) {
    return ServerResponse.error("AccessKey Missing")
  }

  try {
    const data = await HTTP_GET<{
      results: object[]
    }>(`${endpoint}?query=${query}&per_page=30&orientation=${orientation}`, {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    })

    const results = data.results.map((result: object) => result)

    return ServerResponse.success({
      body: results,
    })
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error)
    return ServerResponse.error(
      (error as unknown as any).response.data == "Rate Limit Exceeded"
        ? "Too many Unsplash images. Wait and try again."
        : "Something went wrong"
    )
  }
}
