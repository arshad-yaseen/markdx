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
          "placeholder:text-text-muted-foreground flex h-10 w-full rounded-lg border border-input bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-[border-color,box-shadow,background-color] duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200",
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
