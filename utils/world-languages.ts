"use server"

import { GET } from "@/utils/http.utils"

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
    const data = GET<any[]>(
      "https://dnaber-languagetool.p.rapidapi.com/v2/languages",
      options
    )
    return data
  } catch (error) {
    console.error(error)
  }
}
