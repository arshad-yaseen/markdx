"use client"

import React, { FormEvent, useState } from "react"
import { usePathname } from "next/navigation"
import {
  editorActiveSectionState,
  editorCodesState,
  previewSectionRefAtom,
} from "@/atoms/editor"
import { editorCode } from "@/types"
import { useAtom, useAtomValue } from "jotai"
import { PenLine, XIcon } from "lucide-react"
import { toast } from "sonner"

import { handleSave } from "@/lib/utils"

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
  const previewSectionRef = useAtomValue(previewSectionRefAtom)

  const pathname = usePathname()
  const markdownId = pathname?.split("/")[2]

  // Handle the add section
  const handleAddSection = async (e: FormEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      0: { value: string }
    }
    const title = target[0].value
    const newEditorCodes = [
      ...editorCodes,
      {
        section_id: editorCodes.length,
        section: title,
        content: `## ${title}`,
      },
    ]
    setEditorCodes(newEditorCodes)
    setEditorActiveSection(newEditorCodes.length - 1)
    setDialogOpen(false)
    // Scroll to bottom of preview section
    previewSectionRef?.current?.scrollTo({
      top:
        previewSectionRef?.current?.scrollHeight +
        previewSectionRef?.current?.clientHeight,
      behavior: "smooth",
    })
    await handleSave(newEditorCodes, markdownId!)
  }

  // Rename the section name

  const handleRenameSectionName = async (e: FormEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      0: { value: string }
    }
    const renamedTitle = target[0].value
    const newEditorCodes = editorCodes.map((code: editorCode) => {
      if (code.section_id === editorActiveSection) {
        return {
          ...code,
          section: renamedTitle,
        }
      }
      return code
    })
    setEditorCodes(newEditorCodes)
    setRenameDialogOpen(false)
    await handleSave(newEditorCodes, markdownId!)
  }

  // hold delete button for 1 second to delete
  function handleMouseDown() {
    if (editorCodes.length === 1) {
      toast.message("Can't delete. only have one section")
      return
    }
    if (editorActiveSection === 0) return
    const id = setTimeout(async () => {
      setIsHoldedDeleteButton(true)
      const newEditorCodes = editorCodes.filter(
        (item: editorCode) => item.section_id !== editorActiveSection
      )
      setEditorCodes(newEditorCodes)
      setEditorActiveSection(
        newEditorCodes[newEditorCodes.length - 1].section_id
      )
      await handleSave(newEditorCodes, markdownId!)
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

  const loading = editorCodes.length === 0 || editorCodes[0].section === ""

  return (
    <div className="animate-opacity-in flex min-h-full w-full items-center justify-center space-x-3">
      <Select
        onValueChange={(value) => {
          setEditorActiveSection(Number(value))
        }}
        value={String(editorActiveSection)}
      >
        <SelectTrigger className="relative w-[160px] rounded-md lg:w-[220px]">
          {loading && "Loading..."}
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {editorCodes.map((code, index) => {
            return (
              <SelectItem key={index} value={String(code.section_id)}>
                {code.section}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
      <div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              onClick={() => {
                setDialogOpen(true)
              }}
              className="h-10"
            >
              <p className="hidden lg:block">Create new section</p>
              <p className="block lg:hidden">Create new</p>
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
                  type="button"
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
      <div className="hidden items-center lg:flex">
        <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              onClick={() => {
                setRenameDialogOpen(true)
              }}
              size="icon"
              className="h-10 w-10"
            >
              <PenLine className="h-4 w-4" />
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
                defaultValue={editorCodes![editorActiveSection!]?.section}
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
          className="ml-2 h-10 w-10"
          size="icon"
        >
          <XIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default EditorSectionsPanel
