import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AlertCircleIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const metadata = {
    title: "Markdown Not Found"
}

function MarkdownNotFound() {
  return (
    <main className='w-screen h-screen flex flex-col items-center pt-[200px]'>
        <div className="h-[90px] w-[90px] border border-slate-300 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 dark:border-slate-700">
            <AlertCircleIcon className="h-12 w-12 text-slate-500 dark:text-slate-400" />
        </div>
        <h1 className="text-3xl mt-6 tracking-tighter font-bold">
        Markdown Not Found
        </h1>
        <Link
        href={"/dashboard"}
        className={
            cn(buttonVariants({
                size: "lg",
            }),"mt-6 rounded-full font-semibold")
        } >
            Go to dashboard
        </Link>

        <p
            className="mt-10 text-sm text-slate-500 text-center"
        >
            If you think this is a mistake, <br /> please contact us at <Link href="mailto:" className="text-foreground underline underline-offset-4" >
                m@arshadyaseen.com
            </Link>
        </p>
    </main>
  )
}

export default MarkdownNotFound
