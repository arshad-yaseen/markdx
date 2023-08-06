"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import { UserSubscriptionPlan } from "types"
import { cn, formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface BillingFormProps extends React.HTMLAttributes<HTMLFormElement> {
  subscriptionPlan: UserSubscriptionPlan & {
    isCanceled: boolean
  }
}

export function BillingForm({
  subscriptionPlan,
  className,
  ...props
}: BillingFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  let isPro = subscriptionPlan.isPro && subscriptionPlan.stripeSubscriptionId

  async function onSubmit(event: any) {
    event.preventDefault()
    setIsLoading(!isLoading)

    // Get a Stripe session URL.
    const response = await fetch("/api/users/stripe")

    if (!response?.ok) {
      return toast.error("Something went wrong.", {
        description: "Please refresh the page and try again.",
      })
    }

    // Redirect to the Stripe session.
    // This could be a checkout page for initial upgrade.
    // Or portal to manage existing subscription.
    const session = await response.json()
    if (session) {
      window.location.href = session.url
    }
  }

  return (
    <form className={cn(className)} onSubmit={onSubmit} {...props}>
      <Card className="relative">
        <Badge variant="outline" className="absolute right-4 top-4">
          {subscriptionPlan.name} plan
        </Badge>
        <CardHeader>
          {!isPro && (
            <CardTitle className="my-4 text-4xl">
              $2{" "}
              <span className="text-lg font-medium text-muted-foreground">
                /month
              </span>
            </CardTitle>
          )}

          <CardTitle>Subscription Plan</CardTitle>
        </CardHeader>
        <CardContent>{subscriptionPlan.description}</CardContent>
        <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
          <button
            type="submit"
            className={cn(buttonVariants())}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {subscriptionPlan.isPro ? "Manage Subscription" : "Upgrade to PRO"}
          </button>
          {subscriptionPlan.isPro ? (
            <p className="rounded-full text-xs font-medium">
              {subscriptionPlan.isCanceled
                ? "Your plan will be canceled on "
                : "Your plan renews on "}
              {formatDate(subscriptionPlan.stripeCurrentPeriodEnd)}.
            </p>
          ) : null}
        </CardFooter>
      </Card>
    </form>
  )
}
