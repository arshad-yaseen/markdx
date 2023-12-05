import { SubscriptionPlan } from "types"
import { env } from "@/env.mjs"

export const freePlan: SubscriptionPlan = {
  name: "Free",
  description:
    "The free plan not include any credits for AI features. Upgrade to the PRO plan for unlimited AI access.",
  stripePriceId: "",
}

export const proPlan: SubscriptionPlan = {
  name: "PRO",
  description: "The PRO plan includes unlimited credits for AI features.",
  stripePriceId: env.STRIPE_PRO_MONTHLY_PLAN_ID || "",
}

export const free_credits = 0
