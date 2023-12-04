import { PostCodesType } from "@/types"
import { PATCH } from "@/utils/http.utils"
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

export function generateUUID() {
  return crypto.randomUUID()
}

export async function handleSave(
  postCodes: PostCodesType[],
  markdownId: string
) {
  try {
    await PATCH<
      {
        error?: string
      },
      {
        postCodes: PostCodesType[]
      }
    >(
      `/api/posts/${String(markdownId)}`,
      {
        postCodes,
      },
      {
        error: "Something went wrong.",
        showErrorToast: true,
      }
    )
  } catch (error) {
    console.error(error)
    toast("Something went wrong.", {
      description: "Your markdown was not saved. Please try again.",
    })
    return false
  }

  return true
}
