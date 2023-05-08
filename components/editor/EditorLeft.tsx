import React from "react"

import { Button } from "../ui/button"

function EditorLeft() {
  return (
    <div className="flex h-full w-[20%] flex-col items-center border-r p-6 ">
      <div className="space-y-4">
        <Button variant="outline" className="w-full ">
          Standardize or Format
        </Button>
        <Button variant="outline" className="w-full ">
          Summarize
        </Button>
        <Button variant="outline" className="w-full ">
          Explain
        </Button>
        <Button variant="outline" className="w-full ">
          Document code
        </Button>
        <Button variant="outline" className="w-full ">
          Generate or Convert code
        </Button>
        <Button variant="outline" className="w-full ">
          Correct grammar
        </Button>
        <Button variant="outline" className="w-full ">
          Translate
        </Button>
        <Button className="w-full ">Ask AI to write</Button>
      </div>
      <hr />
      <div className="flex w-full flex-1 flex-col justify-end space-y-4 py-6">
        <Button variant="outline" className="w flex">
          Download
        </Button>
        <Button variant="outline" className="w flex">
          Show preview
        </Button>
      </div>
    </div>
  )
}

export default EditorLeft
