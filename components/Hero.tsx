import Image from "next/image"
import Link from "next/link"
import { GithubIcon } from "lucide-react"

import { githubRepo } from "@/config/site"

import HeroImage from "../public/markdx-editor-frame.png"
import { Button } from "./ui/button"

function Hero() {
  const randomId = Math.random().toString(36).substring(2, 15)

  return (
    <section className="flex w-full flex-col items-center ">
      <h1 className="mt-12 px-6 text-center font-heading text-3xl sm:text-5xl lg:text-6xl">
        Make standard Markdown <br /> more powerful with AI.
      </h1>
      <p className="mt-7 max-w-[30rem] px-6 text-center leading-normal text-muted-foreground sm:text-[1.20rem] sm:leading-8">
        MarkDX is a Markdown editor that uses AI to make your Markdown standard.
      </p>
      <div className="flex items-center space-x-4">
        <Link href={`/edit/${randomId}`}>
          <Button size="lg" className="mt-12">
            Start writing
          </Button>
        </Link>
        <Link href={githubRepo} target="_blank">
          <Button variant="outline" size="lg" className="mt-12">
            <GithubIcon className="mr-1 h-4 w-4" /> Github
          </Button>
        </Link>
      </div>
      <div className="relative flex  h-[45vh] w-full justify-center overflow-hidden">
        <Image
          src={HeroImage}
          priority
          alt="hero"
          className="absolute h-auto  w-auto lg:-top-24"
          width={1000}
          height={1000}
        />
      </div>
    </section>
  )
}

export default Hero
