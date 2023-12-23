import React, { Fragment } from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "./ui/button"

function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  const toggleTheme = (value: string) => {
    setTheme(value)
  }

  return (
    <Fragment>
      <Button
        variant="ghost"
        size="sm"
        className="flex h-8 w-8 items-center justify-center px-0"
        onClick={() => {
          toggleTheme(resolvedTheme === "dark" ? "light" : "dark")
        }}
      >
        <SunIcon className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </Fragment>
  )
}
export default ModeToggle
