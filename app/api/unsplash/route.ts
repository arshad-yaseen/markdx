import { NextRequest } from "next/server"

import { env } from "@/env.mjs"

export const runtime = "edge"

export async function GET(req: NextRequest) {
  const endpoint = "https://api.unsplash.com/search/photos"
  const accessKey = env.UNSPLASH_ACCESS_KEY

  const { searchParams } = new URL(req.url)
  const query = searchParams.get("query") || "minimal"
  const orientation = searchParams.get("orientation") || "landscape"

  if (!accessKey) {
    return new Response(
      JSON.stringify({
        error: true,
        message: "AccessKey Missing",
      }),
      {
        status: 500,
      }
    )
  }

  try {
    const response = await fetch(
      `${endpoint}?query=${query}&per_page=30&orientation=${orientation}`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      }
    )

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: true,
          message: "Network response was not ok",
        }),
        {
          status: 500,
        }
      )
    }

    const data = await response.json()
    const results = data.results.map((result: object) => result)

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=60",
      },
    })
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error)

    return new Response(
      JSON.stringify({
        error: true,
        message:
          (
            error as {
              response: {
                data: string
              }
            }
          )?.response?.data == "Rate Limit Exceeded"
            ? "Too many Unsplash images. Wait and try again."
            : "Something went wrong",
      }),
      {
        status: 500,
      }
    )
  }
}
