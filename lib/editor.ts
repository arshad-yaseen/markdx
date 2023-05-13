import { ChangeEvent } from "react"
import { marked } from "marked"

import { OpenAIBody, UploadResponse } from "types"
import { editorConfig } from "@/config/editor"
import { cloudinaryUpload } from "@/lib/apiClient"

export const markdownto = {
  html: (markdown: string) => marked.parse(markdown),
  lexer: (markdown: string) => marked.lexer(markdown),
}

export async function uploadFile(
  event: ChangeEvent<HTMLInputElement>
): Promise<UploadResponse> {
  return new Promise<UploadResponse>((resolve, reject) => {
    const selectedFile = event.target.files?.[0]
    const fileName = selectedFile?.name.split(".")[0] || ""
    const isImage = selectedFile?.type.includes("image")
    const fileSizeInMB = selectedFile?.size! / (1024 * 1024) // Convert bytes to MB
    const maxSizeInMB = editorConfig.uploadMaxVideoSize

    if (!isImage && fileSizeInMB > maxSizeInMB) {
      reject({ message: `Video size should be less than ${maxSizeInMB}mb` })
      return
    }

    if (!selectedFile) {
      reject({ message: "No file selected" })
      return
    }

    cloudinaryUpload(selectedFile)
      .then((url) => {
        if (url) {
          let markdown
          if (isImage) {
            markdown = `<!-- Choose what you want -->\n![${fileName}](${url.full_short_link})\n![${fileName}](${url.full_short_link2})\n![${fileName}](${url.full_short_link3})`

            if (typeof url === "string") {
              markdown = `![${fileName}](${url})`
            }
          } else {
            markdown = `<video controls preload="auto" src="${url.full_short_link3}" />`

            if (typeof url === "string") {
              markdown = `<video controls preload="auto" src="${url}" />`
            }
          }

          resolve({
            markdown,
            fileName,
            urls: {
              short_link: url.full_short_link,
              shiny_link: url.full_short_link3,
              short_link_2: url.full_short_link2,
            },
            message: isImage
              ? "Images copied to clipboard"
              : "Video copied to clipboard",
          })
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const OpenAICreateChat = async (body: OpenAIBody) => {
  const response = await fetch("/api/openai-generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...body,
    }),
  })

  if (!response.ok) {
    console.error(response.statusText)
    return {
      err: true,
      message: "Can't do this action. Try again!",
    }
  }

  // This data is a ReadableStream
  const data = response.body
  if (!data) {
    return {
      err: true,
      message: "Something went wrong!",
    }
  }

  return {
    data
  }
}
