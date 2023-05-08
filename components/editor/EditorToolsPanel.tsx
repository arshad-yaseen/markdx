import React from "react";
import { Button } from "../ui/button";
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
} from "lucide-react";

function EditorToolsPanel() {
  return (
    <div className="min-h-full w-[45%] flex justify-center space-x-3 items-center">
      <Button
        variant="outline"
        className="flex justify-center h-fit items-center w-fit p-1.5"
      >
        <BoldIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        className="flex justify-center h-fit items-center w-fit p-1.5"
      >
        <ItalicIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        className="flex justify-center h-fit items-center w-fit p-1.5"
      >
        <StrikethroughIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        className="flex justify-center h-fit items-center w-fit p-1.5"
      >
        <HeadingIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        className="flex justify-center h-fit items-center w-fit p-1.5"
      >
        <Code2Icon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        className="flex justify-center h-fit items-center w-fit p-1.5"
      >
        <ImagePlusIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        className="flex justify-center h-fit items-center w-fit p-1.5"
      >
        <TableIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        className="flex justify-center h-fit items-center w-fit p-1.5"
      >
        <CodeIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        className="flex justify-center h-fit items-center w-fit p-1.5"
      >
        <LinkIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        className="flex justify-center h-fit items-center w-fit p-1.5"
      >
        <QuoteIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        className="flex justify-center h-fit items-center w-fit p-1.5"
      >
        <ListIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        className="flex justify-center h-fit items-center w-fit p-1.5"
      >
        <ListOrderedIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default EditorToolsPanel;
