"use server"

import { env } from "@/env.mjs"

export const listLanguages = async () => {
  const options = {
    method: "GET",
    headers: {
      "content-type": "application/octet-stream",
      "X-RapidAPI-Key": `${env.RAPID_API_KEY}`,
      "X-RapidAPI-Host": "dnaber-languagetool.p.rapidapi.com",
    },
  }

  try {
    const response = await fetch(
      "https://dnaber-languagetool.p.rapidapi.com/v2/languages",
      options
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}
