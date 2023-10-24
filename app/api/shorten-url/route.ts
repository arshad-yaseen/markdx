import { env } from "process"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { url } = await req.json()

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
    return NextResponse.json(
      {
        error: true,
        message: "Network response was not ok",
      },
      {
        status: 500,
      }
    )
  }

  const shortUrlJson = await shortUrlRes.json()
  return NextResponse.json(
    {
      shorturl: shortUrlJson.shorturl,
      error: false,
    },
    {
      status: 200,
    }
  )
}
