import React from "react"
import Link from "next/link"
import { User } from "next-auth"

import { cn } from "@/lib/utils"

import SiteAssets from "./site-assets"
import { buttonVariants } from "./ui/button"

interface SiteHeaderProps {
  user: User | undefined
}

function SiteHeader({ user }: SiteHeaderProps) {
  return (
    <header className={`flex h-20 w-full px-6 lg:px-12`}>
      <div className={`flex h-full w-1/2 items-center`}>
        <Link href="/" className="flex items-center">
          <SiteAssets type="icon" />
          <h4 className="ml-2 font-heading text-xl font-bold">MarkDX</h4>
        </Link>
      </div>

      <div className={`flex h-full w-1/2 items-center justify-end`}>
        <Link
          href={user ? "/dashboard" : "/login"}
          className={cn(buttonVariants({ variant: "secondary" }), "")}
        >
          {user ? "Go to dashboard" : "Login"}
        </Link>
      </div>
    </header>
  )
}

export default SiteHeader
