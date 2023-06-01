import crypto from "crypto"
import { ClassValue, clsx } from "clsx"
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
