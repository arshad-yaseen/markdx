"use client"

import Link from "next/link"

import { githubRepo } from "@/config/site"

import { Icons } from "./icons"
import SiteAssets from "./site-assets"
import { Button } from "./ui/button"

function SiteHero() {
  return (
    <section className="flex w-full flex-col items-center ">
      <h1 className="mt-12 px-6 text-center font-heading text-3xl sm:text-5xl lg:text-6xl">
        Make standard Markdown <br /> more powerful with AI.
      </h1>
      <p className="mt-7 max-w-[30rem] px-6 text-center leading-normal text-muted-foreground sm:text-[1.20rem] sm:leading-8">
        MarkDX is a Markdown editor that uses AI to make your Markdown standard.
      </p>
      <div className="flex items-center space-x-4">
        <Link href="/dashboard">
          <Button size="lg" className="mt-12">
            Start writing
          </Button>
        </Link>
        <Link href={githubRepo} target="_blank">
          <Button variant="outline" size="lg" className="mt-12">
            <Icons.gitHub className="mr-2 h-4 w-4" /> Github
          </Button>
        </Link>
      </div>
      <div className="relative flex  h-[45vh] w-full justify-center overflow-hidden">
        <SiteAssets type="hero-image" />
      </div>
    </section>
  )
}

export default SiteHero
