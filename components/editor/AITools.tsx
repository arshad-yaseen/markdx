import React from "react"
import { ImageIcon, UploadIcon } from "lucide-react"

import { Button } from "../ui/button"

function AITools() {
  return (
    <>
      <div className="space-y-4">
        <Button variant="outline" className="flex w-full justify-center px-6  ">
          Standardize or Format
        </Button>
        <Button variant="outline" className="flex w-full justify-center px-6 ">
          Summarize
        </Button>
        <Button variant="outline" className="flex w-full justify-center px-6 ">
          Explain
        </Button>
        <Button variant="outline" className="flex w-full justify-center px-6 ">
          Document code
        </Button>
        <Button variant="outline" className="flex w-full justify-center px-6 ">
          Generate or Convert code
        </Button>
        <Button variant="outline" className="flex w-full justify-center px-6 ">
          Correct grammar
        </Button>
        <Button variant="outline" className="flex w-full justify-center px-6 ">
          Translate
        </Button>
        <Button className="flex w-full justify-center px-6 ">
          Ask AI to write
        </Button>
      </div>
      <hr className="my-4" />
      <div className="flex w-full flex-1 flex-col justify-end space-y-4 py-6">
        <Button
          variant="outline"
          className="relative flex w-full justify-center px-6 "
        >
          <UploadIcon className=" absolute left-4 h-3.5 w-3.5" /> Upload files
        </Button>
        <Button
          variant="outline"
          className="relative flex w-full justify-center px-6 "
        >
          <ImageIcon className=" absolute left-4 h-3.5 w-3.5" /> Unsplash search
        </Button>
      </div>
    </>
  )
}

export default AITools
