import React from "react"
import {
  BoldIcon,
  Code2Icon,
  CodeIcon,
  HeadingIcon,
  ImagePlusIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  StrikethroughIcon,
  TableIcon,
} from "lucide-react"

import { Button } from "../ui/button"

function EditorToolsPanel() {
  return (
    <div className="flex min-h-full w-[42%] items-center justify-center space-x-3">
      <Button
        variant="outline"
        className="flex h-fit w-fit items-center justify-center p-1.5"
      >
        <BoldIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        className="flex h-fit w-fit items-center justify-center p-1.5"
      >
        <ItalicIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        className="flex h-fit w-fit items-center justify-center p-1.5"
      >
        <StrikethroughIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        className="flex h-fit w-fit items-center justify-center p-1.5"
      >
        <HeadingIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        className="flex h-fit w-fit items-center justify-center p-1.5"
      >
        <Code2Icon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        className="flex h-fit w-fit items-center justify-center p-1.5"
      >
        <ImagePlusIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        className="flex h-fit w-fit items-center justify-center p-1.5"
      >
        <TableIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        className="flex h-fit w-fit items-center justify-center p-1.5"
      >
        <CodeIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        className="flex h-fit w-fit items-center justify-center p-1.5"
      >
        <LinkIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        className="flex h-fit w-fit items-center justify-center p-1.5"
      >
        <QuoteIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        className="flex h-fit w-fit items-center justify-center p-1.5"
      >
        <ListIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        className="flex h-fit w-fit items-center justify-center p-1.5"
      >
        <ListOrderedIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default EditorToolsPanel
