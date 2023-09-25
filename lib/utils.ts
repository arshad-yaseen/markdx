import crypto from "crypto"
import { PostCodesType } from "@/types"
import { ClassValue, clsx } from "clsx"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"

import { env } from "@/env.mjs"

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}

export function generateUniqueString(length: number) {
  let uniqueString = Date.now().toString(36)

  uniqueString += Math.random().toString(36).substring(2)

  uniqueString = crypto.createHash("sha256").update(uniqueString).digest("hex")

  uniqueString = uniqueString.substring(0, length)

  return uniqueString
}

export async function handleSave(
  postCodes: PostCodesType[],
  markdownId: string
) {
  const response = await fetch(`/api/posts/${String(markdownId)}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postCodes,
    }),
  })

  if (!response?.ok) {
    console.error(response)
    toast("Something went wrong.", {
      description: "Your markdown was not saved. Please try again.",
    })
    return false
  }
  return true
}
