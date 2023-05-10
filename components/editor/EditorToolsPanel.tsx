"use client"

import React, { useState } from "react"
import { editorActiveSectionState, editorCodesState } from "@/atoms/editor"
import { useRecoilState } from "recoil"

import { editorCodeType } from "types"

import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

function EditorToolsPanel() {
  const [editorCodes, setEditorCodes] = useRecoilState(editorCodesState)
  const [editorActiveSection, setEditorActiveSection] = useRecoilState(
    editorActiveSectionState
  )
  const [sectionTitleInputFilled, setSectionTitleInputFilled] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className="flex min-h-full w-[42%] items-center justify-center space-x-3">
      <Select
        onValueChange={(value) => {
          setEditorActiveSection(Number(value))
        }}
      >
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder={editorCodes[editorActiveSection].section} />
        </SelectTrigger>
        <SelectContent className="capitalize">
          {editorCodes.map(
            (
              code: {
                id: number
                section: string
                content: string
              },
              index: number
            ) => {
              return (
                <SelectItem key={index} value={String(code.id)}>
                  {code.section}
                </SelectItem>
              )
            }
          )}
        </SelectContent>
      </Select>
      <div>
        <Dialog open={dialogOpen}>
          <DialogTrigger>
            <div
              className="flex h-10 w-full items-center justify-center rounded-md border border-input px-6 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              onClick={() => {
                setDialogOpen(true)
              }}
            >
              Create new section
            </div>
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center">
            <DialogHeader>
              <DialogTitle>New Section</DialogTitle>
            </DialogHeader>
            <form
              className="flex w-full flex-col"
              onSubmit={(e) => {
                e.preventDefault()
                setEditorActiveSection(editorCodes.length)
                const target = e.target as typeof e.target & {
                  0: { value: string }
                }
                const title = target[0].value
                setEditorCodes((prev: editorCodeType[]) => {
                  console.log(prev)

                  return [
                    ...prev,
                    {
                      id: editorCodes.length,
                      section: title,
                      content: "",
                    },
                  ]
                })
                setDialogOpen(false)
              }}
            >
              <Input
                onChange={(e) => {
                  if (e.target.value.length > 0) {
                    setSectionTitleInputFilled(true)
                  } else {
                    setSectionTitleInputFilled(false)
                  }
                }}
                placeholder="Section Title"
                className="mt-4 w-full"
              />
              <div className="mt-4 flex w-full space-x-4">
                <Button
                  onClick={() => {
                    setDialogOpen(false)
                  }}
                  variant="outline"
                  className="mt-2 w-full"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!sectionTitleInputFilled}
                  className="mt-2 w-full"
                >
                  Add section
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default EditorToolsPanel
