import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "placeholder:text-text-muted-foreground flex min-h-[60px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-[border-color,box-shadow,background-color] duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium focus:border-foreground/40 focus:outline-none focus:ring-4 focus:ring-foreground/10",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }