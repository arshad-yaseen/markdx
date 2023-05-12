"use client"

import React, { FormEvent, useState } from "react"
import { editorActiveSectionState, editorCodesState } from "@/atoms/editor"
import { useAtom } from "jotai"
import { Edit2Icon, XIcon } from "lucide-react"
import { toast } from "sonner"

import { editorCodeType } from "types"

import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
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
  const [editorCodes, setEditorCodes] = useAtom(editorCodesState)
  const [editorActiveSection, setEditorActiveSection] = useAtom(
    editorActiveSectionState
  )
  const [sectionTitleInputFilled, setInputFilled] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [renameDialogOpen, setRenameDialogOpen] = useState(false)
  const [holdTimerId, setHoldTimerId] = useState<number>()
  const [isHoldedDeleteButton, setIsHoldedDeleteButton] = useState(false)

  // Handle the add section
  const handleAddSection = (e: FormEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      0: { value: string }
    }
    const title = target[0].value
    setEditorCodes((prev: editorCodeType[]) => {
      return [
        ...prev,
        {
          id: editorCodes.length,
          section: title,
          content: `## ${title}`,
        },
      ]
    })
    setEditorActiveSection(editorCodes.length)
    setDialogOpen(false)
  }

  // Rename the section name

  const handleRenameSectionName = (e: FormEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      0: { value: string }
    }
    const renamedTitle = target[0].value
    setEditorCodes(
      editorCodes.map((code) => {
        if (code.id === editorActiveSection) {
          return {
            ...code,
            section: renamedTitle,
          }
        }
        return code
      })
    )
    setRenameDialogOpen(false)
  }

  // hold for 2 seconds delete button to delete

  function handleMouseDown() {
    const id = setTimeout(() => {
      setIsHoldedDeleteButton(true)
      if (editorCodes.length === 1) {
        toast.message("Can't delete. only have one section")
        return
      }
      if (editorActiveSection === 0) return
      setEditorCodes(
        editorCodes.filter((item) => item.id !== editorActiveSection)
      )
      setEditorActiveSection(editorCodes[0].id)
    }, 1000) as unknown as number
    setHoldTimerId(id)
  }

  function handleMouseUp() {
    clearTimeout(holdTimerId!)
    setIsHoldedDeleteButton(false)
    if (!isHoldedDeleteButton && editorActiveSection !== 0) {
      toast.message("Hold for 1 second to delete")
    }
  }

  return (
    <div className="flex min-h-full w-[42%] items-center justify-center space-x-3">
      <Select
        onValueChange={(value) => {
          setEditorActiveSection(Number(value))
        }}
      >
        <SelectTrigger className="w-[220px]">
          <SelectValue
            placeholder={editorCodes
              .filter((code) => {
                return code.id === editorActiveSection
              })
              .map((code) => {
                return code.section || ""
              })}
          />
        </SelectTrigger>
        <SelectContent>
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
          <DialogOverlay onClick={() => setDialogOpen(false)} />
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
            <form className="flex w-full flex-col" onSubmit={handleAddSection}>
              <Input
                onChange={(e) => {
                  if (e.target.value.length > 0) {
                    setInputFilled(true)
                  } else {
                    setInputFilled(false)
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
      <div className="flex items-center">
        <Dialog open={renameDialogOpen}>
          <DialogOverlay onClick={() => setRenameDialogOpen(false)} />
          <DialogTrigger>
            <div
              className="flex h-10 w-full items-center justify-center rounded-md border border-input px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  disabled:pointer-events-none disabled:opacity-50"
              onClick={() => {
                setRenameDialogOpen(true)
              }}
            >
              <Edit2Icon className="h-3.5 w-3.5" />
            </div>
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center">
            <DialogHeader>
              <DialogTitle>Rename Section</DialogTitle>
            </DialogHeader>
            <form
              className="flex w-full flex-col"
              onSubmit={handleRenameSectionName}
            >
              <Input
                onChange={(e) => {
                  if (e.target.value.length > 0) {
                    setInputFilled(true)
                  } else {
                    setInputFilled(false)
                  }
                }}
                placeholder="New name"
                className="mt-4 w-full"
              />
              <div className="mt-4 flex w-full space-x-4">
                <Button
                  onClick={() => {
                    setRenameDialogOpen(false)
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
                  Rename
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <Button
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          variant="outline"
          className="ml-3 px-3"
        >
          <XIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default EditorToolsPanel
