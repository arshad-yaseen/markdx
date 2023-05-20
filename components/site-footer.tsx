"use client"

import React from "react"
import Link from "next/link"

import { githubRepo, siteConfig } from "@/config/site"
import ModeToggle from "@/components/mode-toggle"
import SiteAssets from "./site-assets"

function SiteFooter() {
  return (
    <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
      <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
      <SiteAssets type="icon" />

        <p className="text-center text-sm leading-loose md:text-left">
          Built by{" "}
          <Link
            href={siteConfig.creator.twitter}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            {siteConfig.creator.name}
          </Link>
          . Hosted on{" "}
          <Link
            href="https://vercel.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Vercel
          </Link>
          . UI inspirations by{" "}
          <Link
            href="https://tx.shadcn.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Taxonomy
          </Link>
          . The source code is available on{" "}
          <Link
            href={githubRepo}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </Link>
          .
        </p>
      </div>
      <ModeToggle />
    </div>
  )
}

export default SiteFooter
