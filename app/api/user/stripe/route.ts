import { ServerResponse } from "@/server/utils"
import { getServerSession } from "next-auth/next"
import { z } from "zod"

import { proPlan } from "@/config/subscriptions"
import { authOptions } from "@/lib/auth"
import { stripe } from "@/lib/stripe"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { absoluteUrl } from "@/lib/utils"

const billingUrl = absoluteUrl("/dashboard/billing")

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return ServerResponse.unauthorized()
    }

    const subscriptionPlan = await getUserSubscriptionPlan(session.user.id)

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
      customer_email: session.user.email!,
      billing_address_collection: "auto",
      line_items: [
        {
          price: proPlan.stripePriceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: session.user.id,
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
