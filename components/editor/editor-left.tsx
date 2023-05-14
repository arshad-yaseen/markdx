import { ChangeEvent, FormEvent, useState } from "react"
import { UnsplashImageResponse } from "@/types"
import copy from "copy-to-clipboard"
import { ImageIcon, Loader2Icon, SearchIcon } from "lucide-react"
import { toast } from "sonner"

import { uploadFile } from "@/lib/editor"
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import ImageWithSkeleton from "../image-with-skeleton"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import AITools from "./ai-tools"

interface UnsplashSearchFormData {
  unsplash_image_query: string
  orientation: string
}

function EditorLeft() {
  const [isUploadingFile, setIsUploadingFile] = useState(false)
  const [unsplashDialogOpen, setUnsplashDialogOpen] = useState(false)
  let imageQueries = ["minimalism", "nature", "mountains", "sky", "city"]
  let unsplashRandomQuery =
    imageQueries[Math.floor(Math.random() * imageQueries.length)]
  let [unsplashImages, setUnsplashImages] = useState<UnsplashImageResponse[]>(
    []
  )

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

  const getUnsplashImages = async (query: string, orientation: string) => {
    let response = await fetch(
      `/api/unsplash?query=${query}&orientation=${orientation}`
    )

    const images = await response.json()

    if (images.error) {
      toast.error(images.message)
      return
    }
    setUnsplashImages(images)
  }

  function handleUnsplashSearch(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    const formData = new FormData(event.currentTarget as HTMLFormElement)
    const data: UnsplashSearchFormData = {
      unsplash_image_query: "",
      orientation: "",
    }

    formData.forEach(
      (value, key) =>
        (data[key as keyof UnsplashSearchFormData] = value as string)
    )

    const { unsplash_image_query, orientation } = data

    getUnsplashImages(unsplash_image_query, orientation)
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
            <Dialog open={unsplashDialogOpen}>
              <DialogOverlay onClick={() => setUnsplashDialogOpen(false)} />
              <Button
                variant="outline"
                className="relative flex w-full justify-center px-6 "
                onClick={() => {
                  setUnsplashDialogOpen(true)
                  if (unsplashImages.length > 0) return
                  getUnsplashImages(unsplashRandomQuery, "landscape")
                }}
              >
                <ImageIcon className=" absolute left-4 h-3.5 w-3.5" /> Unsplash
                search
              </Button>
              <DialogContent className="flex h-[600px] flex-col px-6">
                <form onSubmit={handleUnsplashSearch}>
                  <div className="flex">
                    <div className="flex h-full w-1/2 justify-start">
                      <h1 className="font-heading text-xl">Unsplash</h1>
                    </div>
                    <div className="flex h-full w-1/2 justify-end">
                      <Select name="orientation" defaultValue="landscape">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Landscape" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="landscape">Landscape</SelectItem>
                          <SelectItem value="portrait">Portrait</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="relative mt-4 flex items-center">
                    <SearchIcon className="absolute left-4 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search image and press enter..."
                      className="h-11 pl-10"
                      name="unsplash_image_query"
                      autoComplete="off"
                      spellCheck={false}
                      autoFocus
                    />
                  </div>
                </form>
                <div className=" grid h-[550px] w-full grid-cols-1  gap-3 overflow-scroll py-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-5">
                  {unsplashImages.map((image) => (
                    <ImageWithSkeleton
                      key={image.id}
                      src={image.urls.regular}
                      alt={image.alt_description}
                      className="cursor-pointer rounded-md transition-opacity hover:opacity-80"
                      width={image.width}
                      height={image.height}
                      onClick={() => {
                        // Copy to clipboard
                        copy(
                          `![${image.alt_description}](${image.urls.regular})`
                        )
                        setUnsplashDialogOpen(false)
                        toast.success("Image url copied!")
                      }}
                    />
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </TabsContent>
        <TabsContent value="assets"></TabsContent>
      </Tabs>
    </div>
  )
}

export default EditorLeft
