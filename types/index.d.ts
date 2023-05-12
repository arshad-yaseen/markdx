export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
  creator: {
    name: string
    twitter: string
    github: string
    website: string
  }
}
export type editorCodeType = {
  id: number
  section: string
  content: string
}

export type CloudinaryUploadResponse = {
  full_short_link: string
  full_short_link2: string
  full_short_link3: string
  full_share_link: string
}

export type UploadResponse = {
  markdown: string
  fileName: string
  urls: {
    short_link: string
    short_link_2: string
    shiny_link: string
  }
  message: string
}
