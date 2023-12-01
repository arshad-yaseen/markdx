"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

function SiteAssets({
  type,
  className,
}: {
  className?: string
  type: "icon" | "hero-image"
}) {
  const { resolvedTheme } = useTheme()
  const [theme, setTheme] = useState("")

  useEffect(() => {
    setTheme(resolvedTheme!)
  }, [resolvedTheme])

  return type === "icon" ? (
    <Image
      src={`/logos/markdx-${theme === "dark" ? "white" : "black"}.svg`}
      alt="logo"
      className={cn("", className)}
      width={30}
      height={30}
    />
  ) : type === "hero-image" ? (
    <Image
      src={`/markdx-editor-frame-${theme === "dark" ? "dark" : "light"}.png`}
      priority
      alt="hero"
      className={cn("absolute lg:-top-10", className)}
      width={900}
      height={900}
    />
  ) : null
}

export default SiteAssets
