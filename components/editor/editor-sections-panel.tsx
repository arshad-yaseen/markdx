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

function EditorSectionsPanel() {
  const [editorCodes, setEditorCodes] = useAtom(editorCodesState)
  const [editorActiveSection, setEditorActiveSection] = useAtom(
    editorActiveSectionState
  )
  const [sectionTitleInputFilled, setInputFilled] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [renameDialogOpen, setRenameDialogOpen] = useState(false)
  const [holdTimerId, setHoldTimerId] = useState<number>()
  const [isHoldedDeleteButton, setIsHoldedDeleteButton] = useState(false)

  const activeSectionName = editorCodes
    .filter((code) => {
      return code.section_id === editorActiveSection
    })
    .map((code) => {
      return code.section || "Loading..."
    })

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
          section_id: editorCodes.length,
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
        if (code.section_id === editorActiveSection) {
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

  // hold delete button for 2 seconds to delete

  function handleMouseDown() {
    const id = setTimeout(() => {
      setIsHoldedDeleteButton(true)
      if (editorCodes.length === 1) {
        toast.message("Can't delete. only have one section")
        return
      }
      if (editorActiveSection === 0) return
      setEditorCodes(
        editorCodes.filter((item) => item.section_id !== editorActiveSection)
      )
      setEditorActiveSection(0)
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
    <div className="animate-opacity-in flex min-h-full w-full items-center justify-center space-x-3">
      <Select
        onValueChange={(value) => {
          setEditorActiveSection(Number(value))
        }}
      >
        <SelectTrigger className="relative w-[220px]">
          <SelectValue placeholder={activeSectionName} />
        </SelectTrigger>
        <SelectContent>
          {editorCodes.map(
            (
              code: {
                section: string
                content: string
                section_id: number
              },
              index: number
            ) => {
              return (
                <SelectItem key={index} value={String(code.section_id)}>
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
          <DialogTrigger asChild>
            <Button
            variant="outline"
              onClick={() => {
                setDialogOpen(true)
              }}
            >
              Create new section
            </Button>
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
          <DialogTrigger asChild>
            <Button
            variant="outline"
              onClick={() => {
                setRenameDialogOpen(true)
              }}
            >
              <Edit2Icon className="h-3.5 w-3.5" />
            </Button>
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

export default EditorSectionsPanel
