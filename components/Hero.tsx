import React from "react";
import { Button } from "./ui/button";
import { Github } from "lucide-react";
import Image from "next/image";
import HeroImage from "../public/markdx-editor-frame.png";

function Hero() {
  return (
    <div className="w-full flex flex-col items-center ">
      <h1 className="text-[4rem] leading-[4rem] mt-12 font-heading text-center">
        Make standard Markdown <br /> more powerful with AI.
      </h1>
      <p className="max-w-[30rem] mt-7 sm:text-[1.20rem] text-center leading-normal text-muted-foreground sm:leading-8">
        MarkDX is a Markdown editor that uses AI to make your Markdown standard.
      </p>
      <div className="flex items-center space-x-4">
        <Button size="lg" className="mt-12">
          Start writing
        </Button>
        <Button variant="outline" size="lg" className="mt-12">
          <Github className="h-4 w-4 mr-1" /> Github
        </Button>
      </div>
      <div className="h-[45vh] w-full  flex overflow-hidden justify-center relative">
        <Image
          src={HeroImage}
          priority
          alt="hero"
          className="absolute -top-24 h-auto w-auto"
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
}

export default Hero;
