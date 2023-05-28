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

export const generateUniqueChars = (length: number) => {
  var chars = "abcdefghijklmnopqrstuvwxyz"
  var uniqueChars = ""

  while (uniqueChars.length < length) {
    var randomChar = chars.charAt(Math.floor(Math.random() * chars.length))
    if (uniqueChars.indexOf(randomChar) === -1) {
      uniqueChars += randomChar
    }
  }

  return uniqueChars
}
