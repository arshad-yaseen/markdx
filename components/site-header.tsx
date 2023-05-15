"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"

import { Button } from "./ui/button"

function SiteHeader() {
  const { theme } = useTheme()
  const router = useRouter()

  return (
    <header className={`flex h-20 w-full px-6 lg:px-12`}>
      <div className={`flex h-full w-1/2 items-center`}>
        <Link href="/" className="flex items-center">
          <Image
            src={
              theme === "dark" || theme === "system"
                ? "/logos/markdx-white.svg"
                : "/logos/markdx-black.svg"
            }
            priority
            alt="logo"
            className="h-8 w-auto"
            width={"0"}
            height={"0"}
          />
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
