"use client"

import React from "react"
import Link from "next/link"
import { CreditCardIcon, LayoutDashboardIcon, LogOutIcon } from "lucide-react"
import { User } from "next-auth"
import { signOut } from "next-auth/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import BringApiKey from "@/components/bring-api-key"

import SiteAssets from "../site-assets"
import { UserAvatar } from "./user-avatar"

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email">
}

function DashboardHeader({ user }: UserAccountNavProps) {
  return (
    <header className={`sticky flex h-16 w-full border-b px-6 lg:px-12`}>
      <div className={`flex h-full w-1/2 items-center`}>
        <Link href="/dashboard" className="flex items-center">
          <SiteAssets type="icon" />
          <h4 className="ml-2 font-heading text-lg">MarkDX</h4>
        </Link>
      </div>

      <div className={`flex h-full w-1/2 items-center justify-end`}>
        <BringApiKey className="mr-6 w-fit" variant={"outline"} />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserAvatar
              className="h-8 w-8"
              user={{ name: user.name || null, image: user.image || null }}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[170px]">
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                {user.name && (
                  <p className="text-sm font-medium">{user.name}</p>
                )}
                {user.email && (
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    {user.email}
                  </p>
                )}
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard">
                {" "}
                <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/billing">
                <CreditCardIcon className="mr-2 h-4 w-4" />
                Billing
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={(event) => {
                event.preventDefault()
                signOut({
                  callbackUrl: `${window.location.origin}/login`,
                })
              }}
            >
              <LogOutIcon className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default DashboardHeader
