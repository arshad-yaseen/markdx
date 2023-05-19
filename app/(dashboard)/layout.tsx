import React from "react"
import { notFound } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import SiteFooter from "@/components/site-footer"

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
      <main className="flex w-full flex-1 flex-col overflow-hidden px-52 py-12">
        {children}
      </main>
      <SiteFooter />
    </main>
  )
}

export default DashboardLayout
