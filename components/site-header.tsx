"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import SiteAssets from "./site-assets"
import { Button } from "./ui/button"

function SiteHeader() {
  const router = useRouter()

  return (
    <header className={`flex h-20 w-full px-6 lg:px-12`}>
      <div className={`flex h-full w-1/2 items-center`}>
        <Link href="/" className="flex items-center">
          <SiteAssets type="icon" />
          <h4 className="ml-2 font-heading text-xl font-bold">MarkDX</h4>
        </Link>
      </div>

      <div className={`flex h-full w-1/2 items-center justify-end`}>
        <Button variant="secondary" onClick={() => router.push("/login")}>
          Login
        </Button>
      </div>
    </header>
  )
}

export default SiteHeader
