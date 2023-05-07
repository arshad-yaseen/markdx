"use client";

import { githubRepo, siteConfig } from "@/config/site";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ModeToggle from "@/components/mode-toggle";

function SiteFooter() {


  return (
    <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
      <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
        <Image
          src="/logos/markdx-black.svg"
          alt="footer logo"
          width={30}
          height={30}
        />
        <p className="text-center text-sm leading-loose md:text-left">
          Built by{" "}
          <Link
            href={siteConfig.author.twitter}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            {siteConfig.author.name}
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
          . Ui inspirations by{" "}
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
  );
}

export default SiteFooter;
