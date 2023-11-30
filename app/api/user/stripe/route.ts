import { ServerResponse } from "@/server/utils"
import { z } from "zod"

import { proPlan } from "@/config/subscriptions"
import { stripe } from "@/lib/stripe"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { absoluteUrl } from "@/lib/utils"
import { getCurrentUser } from "@/lib/session"

const billingUrl = absoluteUrl("/dashboard/billing")

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const user = (await getCurrentUser())

    if(!user?.id) {
      return ServerResponse.unauthorized()
    }

    const subscriptionPlan = await getUserSubscriptionPlan(user.id)

    // The user is on the pro plan.
    // Create a portal session to manage subscription.
    if (subscriptionPlan.isPro && subscriptionPlan.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscriptionPlan.stripeCustomerId,
        return_url: billingUrl,
      })

      return ServerResponse.success({
        body: { url: stripeSession.url },
      })
    }

    // The user is on the free plan.
    // Create a checkout session to upgrade.
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      customer_email: user.email!,
      billing_address_collection: "auto",
      line_items: [
        {
          price: proPlan.stripePriceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id,
      },
    })

    return ServerResponse.success({
      body: { url: stripeSession.url },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ServerResponse.unprocessableEntity(error)
    }

    return ServerResponse.internalServerError()
  }
}
