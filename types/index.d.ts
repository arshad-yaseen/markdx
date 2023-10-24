import { User } from "@prisma/client"
import { editor } from "monaco-editor"

export type SiteConfig = {
  name: string
  short_name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
  creator: {
    name: string
    twitter: string
    github: string
    website: string
    mail: string
  }
}
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
  urls: {
    raw: string
    full: string
    regular: string
    small: string
    thumb: string
  }
}

export type OpenAIBody = {
  prompt: {
    system: string
    user: string
  }
  max_tokens?: number
  temperature?: number
  top_p?: number
  frequency_penalty?: number
  presence_penalty?: number
  n?: 1
  ApiKey?: string
}

export type AIConfigType = {
  prompts: Array<{
    system: {
      regular?: string
      common?: string
      detailed?: string
      simple?: string
    }
  }>
}

export type Chat = {
  id: number
  user: string
  ai: string
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
