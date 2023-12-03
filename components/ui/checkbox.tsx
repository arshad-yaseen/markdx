"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { motion } from "framer-motion"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    indeterminate?: boolean
  }
>(({ className, indeterminate, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "disabled:opacity-disabled border-gray-10 hover:border-gray-11 peer h-4 w-4 shrink-0 rounded-[4.5px] border shadow-small transition-all duration-200 hover:bg-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        indeterminate &&
          "opacity-disabled transition-colors duration-200 hover:bg-secondary",
        className
      )}
      disabled={indeterminate ? true : props.disabled}
      checked={indeterminate ? false : props.checked}
      {...props}
    >
      {indeterminate && (
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-xl">-</span>
        </div>
      )}
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current ")}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.2,
            bounce: 0.2,
            bounceDamping: 10,
            bounceStiffness: 100,
            damping: 10,
          }}
        >
          <CheckIcon className="h-2.5 w-2.5" />
        </motion.div>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
