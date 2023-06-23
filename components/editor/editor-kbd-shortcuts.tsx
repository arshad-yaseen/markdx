import { CommandIcon } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "../ui/button"
import ParseMarkdown from "./parse-markdown"

function EditorKbdShortcuts() {
  const shortcuts = `## Keyboard Shortcuts\nTo increase your productivity when working with markdown, you can use the following keyboard shortcuts by pressing \`Cmd + Ctrl\`:\n- \`t\`: Insert a table\n- \`i\`: Insert an image\n- \`v\`: Insert a video\n- \`l\`: Insert a link\n- \`n\`: Insert a linked image\n- \`c\`: Add code block\n- \`p\`: Align text to center.`

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="mr-1 flex h-8 w-8 items-center justify-center px-0"
        >
          <CommandIcon className="h-4 w-4 cursor-pointer" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <ParseMarkdown code={shortcuts} />
      </DialogContent>
    </Dialog>
  )
}

export default EditorKbdShortcuts
