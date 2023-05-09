"use client"

import React from "react"
import Image from "next/image"
import { editorCodeState } from "@/atoms/editor"
import copy from "copy-to-clipboard"
import { useRecoilValue } from "recoil"

import { markdownto } from "@/lib/editor"

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
    },
    html: () => {
      const html = markdownto.html(editorCode)
      copy(html)
    },
    lexer: () => {
      const lexer = markdownto.lexer(editorCode)
      copy(JSON.stringify(lexer))
    },
  }

  return (
    <>
      <Button variant="secondary" className="mr-4">
        Download
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="mr-4">
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <span className="flex" onClick={() => handleExport.markdown()}>
              Markdown
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="flex">HTML</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="flex">Lexer data</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Image
        src="/exavatar.jpeg"
        alt="logo"
        className="rounded-full"
        width={30}
        height={30}
      />
    </>
  )
}

export default EditorNav
