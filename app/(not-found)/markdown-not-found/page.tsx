import React from "react"
import Link from "next/link"
import { AlertCircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export const metadata = {
  title: "Markdown Not Found",
}

function MarkdownNotFound() {
  return (
    <main className="flex h-screen w-screen flex-col items-center pt-[200px]">
      <div className="flex h-[90px] w-[90px] items-center justify-center rounded-full border border-slate-300 bg-slate-200 dark:border-slate-700 dark:bg-slate-800">
        <AlertCircleIcon className="h-12 w-12 text-slate-500 dark:text-slate-400" />
      </div>
      <h1 className="mt-6 text-3xl font-bold tracking-tighter">
        Markdown Not Found
      </h1>
      <Link
        href={"/dashboard"}
        className={cn(
          buttonVariants({
            size: "lg",
          }),
          "mt-6 rounded-full font-semibold"
        )}
      >
        Go to dashboard
      </Link>

      <p className="mt-10 text-center text-sm text-slate-500">
        If you think this is a mistake, <br /> please contact us at{" "}
        <Link
          href="mailto:"
          className="text-foreground underline underline-offset-4"
        >
          m@arshadyaseen.com
        </Link>
      </p>
    </main>
  )
}

export default MarkdownNotFound
