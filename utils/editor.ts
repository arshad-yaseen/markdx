import { ChangeEvent, KeyboardEvent } from "react"
import { marked } from "marked"

import { OpenAIBody, UploadResponse, monacoInstanceType } from "types"
import { editorConfig, shortcuts } from "@/config/editor"
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
            markdown = `<video controls ><source src="${url.full_short_link3}" type="${selectedFile?.type}"></video>`

            if (typeof url === "string") {
              markdown = `<video controls ><source src="${url}" type="${selectedFile?.type}"></video>`
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
    data,
  }
}

export const editorAction = {
  insertText: (text: string, monacoInstance: monacoInstanceType) => {
    if (monacoInstance) {
      const selection = monacoInstance.getSelection()
      const id = { major: 1, minor: 1 }
      const op = {
        identifier: id,
        range: selection!,
        text,
        forceMoveMarkers: true,
      }
      monacoInstance.executeEdits("", [op])
    }
  },
  setText: (text: string, monacoInstance: monacoInstanceType) => {
    monacoInstance.setValue(text)
  },
}

export const handleShortCut = (
  event: KeyboardEvent<HTMLDivElement>,
  monacoInstance: monacoInstanceType
) => {
  if (event.metaKey && event.ctrlKey && event.key === "c") {
    event.preventDefault()
    editorAction.insertText(shortcuts.codeBlock.output, monacoInstance)
  } else if (event.metaKey && event.ctrlKey && event.key === "t") {
    event.preventDefault()
    editorAction.insertText(shortcuts.table.output, monacoInstance)
  } else if (event.metaKey && event.ctrlKey && event.key === "i") {
    event.preventDefault()
    editorAction.insertText(shortcuts.image.output, monacoInstance)
  } else if (event.metaKey && event.ctrlKey && event.key === "l") {
    event.preventDefault()
    editorAction.insertText(shortcuts.link.output, monacoInstance)
  } else if (event.metaKey && event.ctrlKey && event.key === "n") {
    event.preventDefault()
    editorAction.insertText(shortcuts.linkWithImage.output, monacoInstance)
  } else if (event.metaKey && event.ctrlKey && event.key === "v") {
    event.preventDefault()
    editorAction.insertText(shortcuts.video.output, monacoInstance)
  } else if (event.metaKey && event.ctrlKey && event.key === "p") {
    event.preventDefault()
    editorAction.insertText(shortcuts.alignCenter.output, monacoInstance)
  }
}

export const getTitle = (markdown: string = "") => {
  const regex = /^# (.+)/m // Matches the first line starting with a '# ' across multiple lines

  const match = markdown.match(regex)
  const heading = match ? match[1] : null // Extract the captured heading text

  return heading
}
