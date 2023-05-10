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
