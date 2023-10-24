import * as React from "react"
import TextareaAutosize from "react-textarea-autosize"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const AutoTextarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps & { minRows: number }
>(({ className, ...props }, ref) => {
  return (
    // @ts-ignore
    <TextareaAutosize
      className={cn(
        "placeholder:text-text-muted-foreground flex h-10 max-h-[500px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-[border-color,box-shadow,background-color] duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium focus:border-foreground/40 focus:outline-none focus:ring-4 focus:ring-foreground/10",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
AutoTextarea.displayName = "Textarea"

export { AutoTextarea }
