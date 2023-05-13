import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    UNSPLASH_ACCESS_KEY: z.string().min(1),
    OPENAI_API_KEY: z.string().min(1),
    RAPID_API_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_GITHUB_ACCESS_TOKEN: z.string().min(1),
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().min(1),
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_GITHUB_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET:
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    RAPID_API_KEY: process.env.RAPID_API_KEY,
  },
})
