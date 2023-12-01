"use client"

import React from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { getRepo } from "@/lib/apiClient"

import { Icons } from "./icons"

async function getStars() {
  const repo = await getRepo("arshad-yaseen", "markdx")
  return repo.stargazers_count
}

function OpenSource() {
  const [stars, setStars] = React.useState(0)

  React.useEffect(() => {
    getStars().then(setStars)
  }, [])

  return (
    <section id="open-source" className="md:pyb-12 container py-8 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Proudly Open Source
        </h2>
        <p className="my-6 max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          MarkDX is an open source project. You can find the <br /> source code
          on{" "}
          <Link
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
            href={siteConfig.links.github}
          >
            GitHub
          </Link>
          . Feel free to contribute to the project.
        </p>
        <Link
          target="_blank"
          rel="noreferrer"
          className="flex"
          href={siteConfig.links.github}
        >
          <div className="flex h-10 w-10 items-center justify-center space-x-2 rounded-md border border-muted bg-muted">
            <Icons.gitHub className="h-5 w-5" />
          </div>
          <div className="flex items-center">
            <div className="h-4 w-4 border-y-8 border-l-0 border-r-8 border-solid border-muted border-y-transparent"></div>
            <div className="flex h-10 items-center rounded-md border border-muted bg-muted px-4 font-medium">
              {stars} stars on GitHub
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}

export default OpenSource

export const revalidate = 60
