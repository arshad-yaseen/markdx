"use client"

import React from "react"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { XCircle } from "lucide-react"

function MarkdownNotFound({
  markdownNotFoundDialogOpen
}:{
  markdownNotFoundDialogOpen: boolean
}) {

  const router = useRouter()

  return (
    <Dialog open={markdownNotFoundDialogOpen}>
    <DialogContent className="flex flex-col items-center">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-center">
          😢 <br />
          Markdown not found
        </DialogTitle>
      </DialogHeader>
      <DialogDescription className="w-full px-8 text-center">
        The markdown you are looking for was not found.
      </DialogDescription>

      <div className="mt-4 flex w-full space-x-4">
        <Button
          onClick={() =>router.push("/")}
          variant="outline"
          className="mt-2 w-full"
        >
          Back
        </Button>
        <Button
          onClick={() => router.push("/dashboard")}
          className="mt-2 w-full"
        >
          Create new markdown
        </Button>
      </div>
    </DialogContent>
  </Dialog>
  )
}

export default MarkdownNotFound
