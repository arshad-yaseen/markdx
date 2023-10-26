import { SubscriptionPlan } from "types"
import { env } from "@/env.mjs"

export const freePlan: SubscriptionPlan = {
  name: "Free",
  description:
    "The free plan includes one markdown for AI features. Upgrade to the PRO plan for full access.",
  stripePriceId: "",
}

export const proPlan: SubscriptionPlan = {
  name: "PRO",
  description: "The PRO plan offers unlimited markdowns with AI features.",
  stripePriceId: env.STRIPE_PRO_MONTHLY_PLAN_ID || "",
}
