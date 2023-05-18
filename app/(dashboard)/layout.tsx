import React from "react"
import { notFound } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import DashboardHeader from "@/components/dashboard/dashboard-header"

interface DashboardLayout {
  children: React.ReactNode
}

export const metadata = {
  title: "Dashboard",
}

async function DashboardLayout({ children }: DashboardLayout) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  return (
    <main className="flex min-h-screen w-full flex-col">
      <DashboardHeader
        user={{
          name: user.name,
          image: user.image,
          email: user.email,
        }}
      />
      {children}
    </main>
  )
}

export default DashboardLayout
