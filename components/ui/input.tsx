import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-lg border border-input bg-background py-1 pl-4 text-sm text-foreground shadow-sm transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-muted-foreground focus:border-black/40 focus:outline-none focus:ring-4 focus:ring-muted-foreground/20 dark:ring-white/30 dark:focus:border-white/70",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
