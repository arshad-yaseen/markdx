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
export type editorCodeType = {
  section: string
  section_id: number
  content: string
}

export type CloudinaryUploadResponse = {
  full_short_link: string
  full_short_link2: string
  full_short_link3: string
  full_share_link: string
}

export type UploadResponse = {
  markdown: string
  fileName: string
  urls: {
    short_link: string
    short_link_2: string
    shiny_link: string
  }
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

export type ChatType = {
  id: number
  user: string
  ai: string
}

export type monacoInstanceType = editor.IStandaloneCodeEditor

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