import { ChangeEvent, useState } from "react"
import copy from "copy-to-clipboard"
import { ImageIcon, Loader2Icon } from "lucide-react"
import { toast } from "sonner"

import { uploadFile } from "@/lib/editor"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import AITools from "./AITools"

function EditorLeft() {
  const [isUploadingFile, setIsUploadingFile] = useState(false)

  async function handleUploadFile(event: ChangeEvent<HTMLInputElement>) {
    setIsUploadingFile(true)
    uploadFile(event)
      .then((res) => {
        copy(res.markdown)
        setIsUploadingFile(false)
        toast.success(res.message)
      })
      .catch((err) => {
        setIsUploadingFile(false)
        toast.error(err.message)
      })
  }

  return (
    <div className="flex h-full w-[20%] flex-col items-center border-r p-6 ">
      <Tabs defaultValue="tools" className="w-full">
        <TabsList className="w-ful mb-6 flex">
          <TabsTrigger value="tools" className="w-full">
            AI tools
          </TabsTrigger>
          <TabsTrigger value="assets" className="w-full">
            Assets
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tools">
          <AITools />
          <hr className="my-4" />
          <div className="flex w-full flex-1 flex-col justify-end space-y-4 py-6">
            <Button variant="outline" className="relative">
              {isUploadingFile && (
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              )}{" "}
              {isUploadingFile ? "Uploading" : "Upload"} file
              <Input
                onChange={handleUploadFile}
                type="file"
                className="absolute h-fit w-fit opacity-0"
                accept="image/*,video/*"
              />
            </Button>
            <Button
              variant="outline"
              className="relative flex w-full justify-center px-6 "
            >
              <ImageIcon className=" absolute left-4 h-3.5 w-3.5" /> Unsplash
              search
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="assets"></TabsContent>
      </Tabs>
    </div>
  )
}

export default EditorLeft
