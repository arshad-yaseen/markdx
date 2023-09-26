import { SubscriptionPlan } from "types"
import { env } from "@/env.mjs"

export const freePlan: SubscriptionPlan = {
  name: "Free",
  description:
    "The free plan is limited to 2 markdowns. Upgrade to the PRO plan for unlimited markdowns.",
  stripePriceId: "",
}

export const proPlan: SubscriptionPlan = {
  name: "PRO",
  description: "The PRO plan has unlimited markdowns.",
  stripePriceId: env.STRIPE_PRO_MONTHLY_PLAN_ID || "",
}

export const markdownLimit = 2
