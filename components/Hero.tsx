import React from "react";
import { Button } from "./ui/button";
import { Github } from "lucide-react";
import Image from "next/image";
import HeroImage from "../public/markdx-editor-frame.png";
import Link from "next/link";
import { githubRepo } from "@/config/site";

function Hero() {
  return (
    <section className="w-full flex flex-col items-center ">
      <h1 className="lg:text-6xl sm:text-5xl text-3xl px-6 mt-12 font-heading text-center">
        Make standard Markdown <br /> more powerful with AI.
      </h1>
      <p className="max-w-[30rem] mt-7 sm:text-[1.20rem] px-6 text-center leading-normal text-muted-foreground sm:leading-8">
        MarkDX is a Markdown editor that uses AI to make your Markdown standard.
      </p>
      <div className="flex items-center space-x-4">
        <Button size="lg" className="mt-12">
          Start writing
        </Button>
        <Link href={githubRepo} target="_blank">
          <Button variant="outline" size="lg" className="mt-12">
            <Github className="h-4 w-4 mr-1" /> Github
          </Button>
        </Link>
      </div>
      <div className="h-[45vh] w-full  flex overflow-hidden justify-center relative">
        <Image
          src={HeroImage}
          priority
          alt="hero"
          className="absolute lg:-top-24  h-auto w-auto"
          width={1000}
          height={1000}
        />
      </div>
    </section>
  );
}

export default Hero;
