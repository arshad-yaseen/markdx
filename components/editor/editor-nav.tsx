"use client"

import { editorCodesState } from "@/atoms/editor"
import { markdownto } from "@/utils/editor"
import copy from "copy-to-clipboard"
import { useAtomValue } from "jotai"
import { toast } from "sonner"

import { editorCodeType } from "types"

import ModeToggle from "../mode-toggle"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import EditorKbdShortcuts from "./editor-kbd-shortcuts"

function EditorNav() {
  const editorCodes = useAtomValue(editorCodesState) as editorCodeType[]
  const fullCode = editorCodes
    .map((code: editorCodeType) => code.content)
    .join("\n\n") as string

  const handleExport = {
    markdown: () => {
      copy(fullCode)
      toast.success("Copied Markdown to clipboard")
    },
    html: () => {
      const html = markdownto.html(fullCode)
      copy(html)
      toast.success("Copied HTML to clipboard")
    },
    lexer: () => {
      const lexer = markdownto.lexer(fullCode)
      copy(JSON.stringify(lexer))
      toast.success("Copied Lexer data to clipboard")
    },
  }

  const handleDownload = () => {
    const blob = new Blob([fullCode], { type: "text/markdown" })
    const downloadLink = document.createElement("a")
    downloadLink.download = "README.md"
    downloadLink.href = URL.createObjectURL(blob)
    document.body.appendChild(downloadLink)
    downloadLink.click()
  }

  return (
    <>
      <Button variant="secondary" className="mr-4" onClick={handleDownload}>
        Download
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="mr-4">
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleExport.markdown()}>
            <span className="flex">Markdown</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport.html()}>
            <span className="flex">HTML</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport.lexer()}>
            <span className="flex">Lexer data</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditorKbdShortcuts />
      <ModeToggle />
    </>
  )
}

export default EditorNav
