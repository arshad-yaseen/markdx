import React from "react";
import { LaptopIcon, MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

function modeToggle() {
  const { setTheme } = useTheme();

  const toggleTheme = (value: string) => {
    setTheme(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 px-0 flex items-center justify-center "
        >
          <SunIcon className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => toggleTheme("light")}>
          <span className="flex">
            <SunIcon className="mr-2 h-4 w-4" /> Light
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toggleTheme("dark")}>
          <span className="flex">
            <MoonIcon className="mr-2 h-4 w-4" /> Dark
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toggleTheme("system")}>
          <span className="flex">
            <LaptopIcon className="mr-2 h-4 w-4" /> System
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default modeToggle;
