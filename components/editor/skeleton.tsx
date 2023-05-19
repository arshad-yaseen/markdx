import React from "react"

import { cn } from "@/lib/utils"

import { Skeleton } from "../ui/skeleton"

interface EditorSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  props?: any
  className?: any
}

function EditorSkeleton({ props, className }: EditorSkeletonProps) {
  return (
    <div className={cn("absolute top-0 w-full py-12", className)} {...props}>
      <Skeleton className="h-4 w-2/5" />
      <Skeleton className="mt-2 h-4 w-[60%]" />
      <Skeleton className="mt-2 h-4 w-[60%]" />
    </div>
  )
}

export default EditorSkeleton
