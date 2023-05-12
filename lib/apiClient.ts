import { CloudinaryUploadResponse } from "types"

export const getRepo = async (owner: string, repo: string) => {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: {
      Authorization: process.env.GITHUB_ACCESS_TOKEN!,
    },
    next: {
      revalidate: 60,
    },
  })
  const data = await res.json()

  return data
}

export const cloudinaryUpload = async (
  file: File
): Promise<CloudinaryUploadResponse | undefined> => {
  if (!file || (!file.type.includes("image") && !file.type.includes("video"))) {
    return undefined
  }

  const formData = new FormData()
  formData.append("file", file, file.name)
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
  )
  formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!)

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env
        .NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!}/${
        file.type.includes("image") ? "image" : "video"
      }/upload`,
      {
        method: "POST",
        body: formData,
      }
    )

    const image = await res.json()
    const shortenedLink = await fetch(
      `https://api.shrtco.de/v2/shorten?url=${image.secure_url}`
    )

    if (shortenedLink.ok) {
      const responseJson = await shortenedLink.json()
      return responseJson.result
    } else {
      return image.secure_url
    }
  } catch (err) {
    console.error(err)
    return undefined
  }
}