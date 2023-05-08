import { github } from "@/api/github";
import { githubRepo } from "@/config/site";
import { Github } from "lucide-react";
import Link from "next/link";
import React from "react";

export async function getStars() {
  console.log(process.env.GITHUB_ACCESS_TOKEN);

  const repo = await github.getRepo("arshad-yaseen", "markdx");

  return repo.stargazers_count;
}

function OpenSource() {
  return (
    <section id="open-source" className="container py-8 md:pyb-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Proudly Open Source
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          MarkDX is an open source project. You can find the <br /> source code
          on{" "}
          <Link
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
            href={githubRepo}
          >
            GitHub
          </Link>
          . Feel free to contribute to the project.
        </p>
        <Link
          target="_blank"
          rel="noreferrer"
          className="flex"
          href={githubRepo}
        >
          <div className="flex h-10 w-10 items-center justify-center space-x-2 rounded-md border border-muted bg-muted">
            <Github className="h-5 w-5" />
          </div>
          <div className="flex items-center">
            <div className="h-4 w-4 border-y-8 border-l-0 border-r-8 border-solid border-muted border-y-transparent"></div>
            <div className="flex h-10 items-center rounded-md border border-muted bg-muted px-4 font-medium">
              {getStars() || "0"} stars on GitHub
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default OpenSource;
