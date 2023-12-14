import { User } from "@prisma/client"
import { editor } from "monaco-editor"
import { OpenAI } from "openai"

export type editorCode = {
  section: string
  section_id: number
  content: string
}

export type UploadResponse = {
  markdown: string
  fileName: string
  message: string
}

export type UnsplashImageResponse = {
  id: string
  width: number
  height: number
  alt_description: string
  blur_hash: string
  urls: {
    raw: string
    full: string
    regular: string
    small: string
    thumb: string
  }
}

export type Chat = {
  id: number
  user: string
  ai: string
}

export type OpenAIBody = Omit<OpenAI.ChatCompletionCreateParams, "model"> & {
  model?: OpenAI.ChatCompletionCreateParams["model"]
}

export type monacoInstance = editor.IStandaloneCodeEditor

export type PostCodesType = {
  section_id: number
  section: string
  content: string
}

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> & {
    stripeCurrentPeriodEnd: number
    isPro: boolean
  }

export type SubscriptionPlan = {
  name: string
  description: string
  stripePriceId: string
}
