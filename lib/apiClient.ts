import { GET, POST } from "@/utils/http.utils"

import { env } from "@/env.mjs"

export const getRepo = async (owner: string, repo: string) => {
  const data = await GET<{
    stargazers_count: number
  }>(`https://api.github.com/repos/${owner}/${repo}`)
  return data
}

export const cloudinaryUpload = async (
  file: File
): Promise<string | undefined> => {
  if (!file || (!file.type.includes("image") && !file.type.includes("video"))) {
    return undefined
  }

  const formData = new FormData()
  formData.append("file", file, file.name)
  formData.append("upload_preset", env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)
  formData.append("cloud_name", env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!)

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!}/${
        file.type.includes("image") ? "image" : "video"
      }/upload`,
      {
        method: "POST",
        body: formData,
      }
    )

    console.log("res", res)

    const image = await res.json()

    console.log("image", image)

    const urlBae = await POST<
      {
        shorturl: string
        error?: string
      },
      {
        url: string
      }
    >("/api/shorten-url", {
      url: image.secure_url,
    })

    console.log(urlBae)

    if (urlBae.error) {
      return image.secure_url
    } else {
      return urlBae.shorturl
    }
  } catch (err) {
    console.error(err)
    return undefined
  }
}
