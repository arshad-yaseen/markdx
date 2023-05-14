"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"

import EditorNav from "./editor/editor-nav"
import EditorSectionsPanel from "./editor/editor-sections-panel"
import { Button } from "./ui/button"

function SiteHeader() {
  const { theme } = useTheme()
  const pathname = usePathname()
  const isEditor = pathname.includes("/edit")

  return (
    <header
      className={`w-full ${
        isEditor ? "h-[8vh] border-b px-3 lg:px-7" : "h-20 px-6 lg:px-12"
      }  flex  `}
    >
      <div
        className={`flex h-full ${isEditor ? "w-[20%]" : "w-1/2"} items-center`}
      >
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
          <h4 className="ml-2 font-heading text-xl font-bold">
            {isEditor ? "Editor" : "MarkDX"}
          </h4>
        </Link>
      </div>
      {isEditor && <EditorSectionsPanel />}

      <div
        className={`flex h-full ${
          isEditor ? "w-[35%]" : "w-1/2"
        }  items-center justify-end`}
      >
        {isEditor ? <EditorNav /> : <Button variant="secondary">Login</Button>}
      </div>
    </header>
  )
}

export default SiteHeader
