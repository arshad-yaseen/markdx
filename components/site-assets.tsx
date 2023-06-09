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
  const { theme: currentTheme } = useTheme()
  const [theme, setTheme] = useState("")

  useEffect(() => {
    setTheme(currentTheme!)
  }, [currentTheme])

  return type === "icon" ? (
    <Image
      src={`/logos/markdx-${theme === "dark" ? "white" : "black"}.svg`}
      priority
      alt="logo"
      className={cn("h-8 w-auto", className)}
      width={"0"}
      height={"0"}
    />
  ) : type === "hero-image" ? (
    <Image
      src={`/markdx-editor-frame-${theme === "dark" ? "dark" : "light"}.png`}
      priority
      alt="hero"
      className={cn("absolute h-auto  w-auto lg:-top-24", className)}
      width={1000}
      height={1000}
    />
  ) : null
}

export default SiteAssets
