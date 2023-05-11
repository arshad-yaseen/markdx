import { ChangeEvent, useState } from "react"
import copy from "copy-to-clipboard"
import { ImageIcon, Loader2Icon } from "lucide-react"
import { toast } from "sonner"

import { editorConfig } from "@/config/editor"
import { cloudinaryUpload } from "@/lib/apiClient"

import { Button } from "../ui/button"
import { Input } from "../ui/input"

function AITools() {
  const [isUploadingFile, setIsUploadingFile] = useState(false)

  async function handleUploadFile(event: ChangeEvent<HTMLInputElement>) {
    setIsUploadingFile(true)
    const selectedFile = event.target.files?.[0]
    const fileName = event.target.files?.[0].name.split(".")[0]
    const isImage = selectedFile?.type.includes("image")
    const fileSizeInMB = selectedFile?.size! / (1024 * 1024) // Convert bytes to MB
    const maxSizeInMB = editorConfig.uploadMaxVideoSize

    if (!isImage && fileSizeInMB > maxSizeInMB) {
      toast.error(`Video size must be below ${maxSizeInMB}mb`)
      return
    }

    if (!selectedFile) return
    const url = await cloudinaryUpload(selectedFile)
    if (url) {
      setIsUploadingFile(false)
      if (isImage) {
        const imageMarkdown = `![${fileName}](${url})`
        copy(imageMarkdown)
        toast.success("Uploaded image code copied!")
      } else {
        const videoMarkdown = `<video controls preload="auto" src="${url}" />`
        copy(videoMarkdown)
        toast.success("Uploaded video code copied!")
      }
    }
  }

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
        <div className="relative flex h-10 w-full items-center justify-center rounded-md border border-input px-6 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ">
          {isUploadingFile && (
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
          )}{" "}
          {isUploadingFile ? "Uploading" : "Upload"} file
          <Input
            onChange={handleUploadFile}
            type="file"
            className="absolute h-full w-full opacity-0"
            accept="image/*,video/*"
          />
        </div>
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
