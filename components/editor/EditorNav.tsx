"use client"

import { editorCodeState } from "@/atoms/editor"
import copy from "copy-to-clipboard"
import { useRecoilValue } from "recoil"
import { toast } from "sonner"

import { markdownto } from "@/lib/editor"

import ModeToggle from "../mode-toggle"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

function EditorNav() {
  const editorCode = useRecoilValue(editorCodeState)

  const handleExport = {
    markdown: () => {
      copy(editorCode)
      toast.success("Copied markdown to clipboard")
    },
    html: () => {
      const html = markdownto.html(editorCode)
      copy(html)
      toast.success("Copied HTML to clipboard")
    },
    lexer: () => {
      const lexer = markdownto.lexer(editorCode)
      copy(JSON.stringify(lexer))
      toast.success("Copied lexer data to clipboard")
    },
  }

  const handleDownload = () => {
    const blob = new Blob([editorCode], { type: "text/markdown" })
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
            <span className="flex" >
              Markdown
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport.html()}>
            <span className="flex" >
              HTML
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport.lexer()}>
            <span className="flex" >
              Lexer data
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ModeToggle />
    </>
  )
}

export default EditorNav
