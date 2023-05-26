import { ChangeEvent, FormEvent, useState } from "react"
import { monacoInstanceState } from "@/atoms/editor"
import { editorAction, uploadFile } from "@/utils/editor"
import { useAtomValue } from "jotai"
import {
  ChevronLeftIcon,
  ImageIcon,
  Loader2Icon,
  SearchIcon,
} from "lucide-react"
import { toast } from "sonner"

import { UnsplashImageResponse } from "types"
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
import Assets from "./assets"

interface UnsplashSearchFormData {
  unsplash_image_query: string
  orientation: string
}

function EditorLeft() {
  const monacoInstance = useAtomValue(monacoInstanceState)
  const [isUploadingFile, setIsUploadingFile] = useState(false)
  const [isToolsPanelCollapsed, setIsToolsPanelCollapsed] = useState(
    localStorage.getItem("toolbar-collapse") === "true" ? true : false
  )
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
        // insert to the editor
        editorAction.insertText(res.markdown, monacoInstance!)
        setIsUploadingFile(false)
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
    <>
      <div
        className={`hidden h-full ${
          isToolsPanelCollapsed ? "invisible w-0 opacity-0" : "min-w-[18%]"
        } flex-col items-center border-r p-6 lg:flex `}
      >
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
            <div className="flex w-full flex-1 flex-col justify-end space-y-4 py-2">
              <Button
                disabled={isUploadingFile}
                variant="outline"
                className="relative"
              >
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
                  <ImageIcon className=" absolute left-4 h-3.5 w-3.5" />{" "}
                  Unsplash search
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
                          // Insert to the editor
                          editorAction.insertText(
                            `![${image.alt_description}](${image.urls.regular})`,
                            monacoInstance!
                          )
                          setUnsplashDialogOpen(false)
                        }}
                      />
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </TabsContent>
          <TabsContent value="assets">
            <Assets />
          </TabsContent>
        </Tabs>
      </div>
      <div
        className={`absolute bottom-0 ${
          isToolsPanelCollapsed ? "ml-6  w-[4%] -rotate-180" : "w-[18%] px-6"
        } left-0 z-10 flex h-20 items-center justify-end `}
      >
        <Button
          onClick={() => {
            setIsToolsPanelCollapsed(!isToolsPanelCollapsed)
            localStorage.setItem(
              "toolbar-collapse",
              `${!isToolsPanelCollapsed}`
            )
          }}
          variant="outline"
          className="h-8 w-8 px-0"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
      </div>
    </>
  )
}

export default EditorLeft
