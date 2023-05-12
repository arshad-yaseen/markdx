import { ChangeEvent } from "react"
import { marked } from "marked"

import { editorConfig } from "@/config/editor"
import { cloudinaryUpload } from "@/lib/apiClient"

export const markdownto = {
  html: (markdown: string) => marked.parse(markdown),
  lexer: (markdown: string) => marked.lexer(markdown),
}

export async function uploadFile(
  event: ChangeEvent<HTMLInputElement>
): Promise<{
  markdown: string
  fileName: string
  url: string
  message: string
}> {
  return new Promise<{
    markdown: string
    fileName: string
    url: string
    message: string
  }>((resolve, reject) => {
    const selectedFile = event.target.files?.[0]
    const fileName = event.target.files?.[0].name.split(".")[0] || ""
    const isImage = selectedFile?.type.includes("image")
    const fileSizeInMB = selectedFile?.size! / (1024 * 1024) // Convert bytes to MB
    const maxSizeInMB = editorConfig.uploadMaxVideoSize

    if (!isImage && fileSizeInMB > maxSizeInMB) {
      reject({ message: `Video size must be below ${maxSizeInMB}mb` })
    }

    if (!selectedFile) {
      reject({ message: "No file selected" })
      return
    }

    cloudinaryUpload(selectedFile)
      .then((url) => {
        if (url) {
          if (isImage) {
            const markdown = `![${fileName}](${url})`
            resolve({
              markdown,
              fileName,
              url,
              message: "Image copied to clipboard",
            })
          } else {
            const markdown = `<video controls preload="auto" src="${url}" />`
            resolve({
              markdown,
              fileName,
              url,
              message: "Video copied to clipboard",
            })
          }
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}
