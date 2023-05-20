import { CardSkeleton } from "@/components/card-skeleton"
import { DashboardInlineHeader } from "@/components/dashboard/dashboard-inline-header"
import { DashboardShell } from "@/components/dashboard/shell"

export default function DashboardBillingLoading() {
  return (
    <DashboardShell>
      <DashboardInlineHeader
        heading="Upgrade"
        text="Manage billing and your subscription plan."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}
