import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    UNSPLASH_ACCESS_KEY: z.string().optional(),
    OPENAI_API_KEY: z.string().min(1),
    RAPID_API_KEY: z.string().optional(),
    DATABASE_URL: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    SMTP_FROM: z.string().email().min(1),
    NEXTAUTH_URL: z.string().url().optional(),
    NEXTAUTH_SECRET: z.string().min(1),
    STRIPE_API_KEY: z.string().optional(),
    STRIPE_WEBHOOK_SECRET: z.string().optional(),
    STRIPE_PRO_MONTHLY_PLAN_ID: z.string().optional(),
    DATABASE_URL: z.string().min(1),
    REDIS_URL: z.string().optional(),
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
    URLBAE_API_KEY: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().optional(),
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: z.string().optional(),
    NEXT_PUBLIC_APP_URL: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET:
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    RAPID_API_KEY: process.env.RAPID_API_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    SMTP_FROM: process.env.SMTP_FROM,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_PRO_MONTHLY_PLAN_ID: process.env.STRIPE_PRO_MONTHLY_PLAN_ID,
    DATABASE_URL: process.env.DATABASE_URL,
    REDIS_URL: process.env.REDIS_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    URLBAE_API_KEY: process.env.URLBAE_API_KEY,
  },
})
