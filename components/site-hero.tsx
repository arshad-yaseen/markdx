"use client"

import Link from "next/link"
import { SparklesIcon } from "lucide-react"
import { Balancer } from "react-wrap-balancer"

import { githubRepo } from "@/config/site"

import { Icons } from "./icons"
import SiteAssets from "./site-assets"
import { Button } from "./ui/button"

function SiteHero() {
  return (
    <section className="flex w-full flex-col items-center ">
      <div className="gradient-box mt-4 rounded-full px-6 py-2.5 text-sm font-medium">
        <span className="relative z-30">
          Now featuring support for GPT-4{" "}
          <SparklesIcon className="mb-1 inline-block h-4 w-4" />
        </span>
      </div>
      <Balancer
        as="h1"
        className="mt-8 px-6 text-center lg:font-heading font-sans lg:tracking-normal tracking-tight text-4xl font-bold drop-shadow-sm sm:text-5xl lg:text-6xl"
      >
        <p className="relative inline-block">
          <span className="z-0 bg-gradient-to-b from-foreground  to-foreground/70 bg-clip-text pb-1 text-transparent dark:from-white dark:to-white">
            Magically
          </span>
        </p>{" "}
        {""}
        Supercharge Your <br /> Markdown with {""}
        <span className="z-0 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text pb-1 text-transparent dark:from-white dark:to-white">
          AI
        </span>
      </Balancer>
      <Balancer className="mt-7 max-w-[30rem] px-6 text-center leading-normal text-muted-foreground sm:text-[1.20rem] sm:leading-8">
        MarkDX is a Markdown editor that uses AI to make your Markdown standard.
      </Balancer>
      <div className="flex flex-col items-center sm:flex-row sm:space-x-4">
        <Link href="/dashboard">
          <Button size="lg" className="mb-4 mt-10 sm:mb-0 sm:mt-12">
            Start writing for free
          </Button>
        </Link>
        <Link href={githubRepo} target="_blank">
          <Button variant="fancy" size="lg" className="sm:mt-12">
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
