import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

function modeToggle() {
  const { setTheme } = useTheme();

  const toggleTheme = (value: string) => {
    setTheme(value);
  };

  return (
    <Select onValueChange={toggleTheme}>
      <SelectTrigger className="border-none" asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 px-0 flex items-center justify-center "
        >
          <Moon className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Sun className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </SelectTrigger>
      <SelectContent align="end" className="mb-3">
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default modeToggle;
