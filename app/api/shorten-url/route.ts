import { env } from "process"
import { NextRequest } from "next/server"
import { ServerResponse } from "@/server/utils"
import { getCurrentUser } from "@/lib/session"

export async function POST(req: NextRequest) {
  const { url } = await req.json()

  const userId = (await getCurrentUser())?.id

    if(!userId) {
      return ServerResponse.unauthorized()
    }

  const shortUrlRes = await fetch("https://urlbae.com/api/url/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + env.URLBAE_API_KEY! || "",
    },
    body: JSON.stringify({
      url: url,
    }),
  })

  if (shortUrlRes.status !== 200) {
    return ServerResponse.error("Network response was not ok")
  }

  const shortUrlJson = await shortUrlRes.json()
  return ServerResponse.success({
    body: {
      shorturl: shortUrlJson.shorturl,
      error: false,
    },
  })
}
