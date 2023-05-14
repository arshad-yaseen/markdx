"use client"

import { useState } from "react"
import copy from "copy-to-clipboard"
import { Search } from "lucide-react"
import { toast } from "sonner"

import { assets } from "@/lib/assets-list"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

function Assets() {
  const [searchValue, setSearchValue] = useState<string>("")
  const [isInputsValidated, setIsInputsValidated] = useState(false)

  const handleShieldChange = (e: any, shield: any) => {
    const form = e.currentTarget as HTMLFormElement
    const formDatasObject = Object.fromEntries(new FormData(form).entries())
    const keys = Object.keys(formDatasObject)
    let markdown_code = shield.code
    keys.forEach((key) => {
      markdown_code = markdown_code.replace(
        `[${key}]`,
        encodeURIComponent(formDatasObject[key] as string)
      )
    })

    const isAllRequiredFieldsFilled = form?.checkValidity()
    if (isAllRequiredFieldsFilled) {
      setIsInputsValidated(true)
      const urlMatch = markdown_code.match(/\((.*?)\)/)
      if (urlMatch) {
        const url = urlMatch[1]
        const shield_image_element = (
          e.currentTarget as HTMLFormElement
        ).querySelector("img")
        if (shield_image_element) {
          let [baseUrl, queryParams] = url.split("?")

          let paramsArr = queryParams.split("&")

          paramsArr = paramsArr.filter(
            (param: any) => param.split("=")[1] !== ""
          )

          let cleanedParams = paramsArr.join("&")

          let cleanedUrl = `${baseUrl}?${cleanedParams}`
          shield_image_element.setAttribute("src", cleanedUrl)
        }
      } else {
        console.log("No URL found")
      }
    } else {
      setIsInputsValidated(false)
    }
  }

  return (
    <div className="w-full">
      <div className="flex h-16  w-full items-center justify-center">
        <div className="relative flex w-full items-center">
          <Input
            onChange={(e) => {
              setSearchValue(e.target.value)
            }}
            type="text"
            placeholder="Search..."
            className="pl-9"
          />
          <Search className="absolute left-3 h-4 w-4 text-slate-500" />
        </div>
      </div>
      <div className="no-scrollbar flex h-[70vh] w-full flex-col overflow-scroll py-6">
        <h4 className="py-3 text-sm font-medium">Snippets</h4>
        <hr />
        <div className="flex flex-wrap py-6 ">
          {assets.snippets
            .filter(
              (snippet) =>
                searchValue.length === 0 ||
                snippet.keywords.some((keyword) =>
                  keyword.toLowerCase().includes(searchValue.toLowerCase())
                )
            )
            .map((snippet, index) => (
              <Dialog key={index}>
                <DialogOverlay />
                <DialogTrigger asChild>
                  <div
                    key={index}
                    className="flex h-12 w-1/2 cursor-pointer items-center justify-start overflow-hidden p-2 transition-opacity duration-150 hover:opacity-80"
                  >
                    <img src={snippet.default_image_url} alt={snippet.name} />
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{snippet.name}</DialogTitle>
                  </DialogHeader>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      const form = e.target as HTMLFormElement
                      const formDatasObject = Object.fromEntries(
                        new FormData(form).entries()
                      )
                      const keys = Object.keys(formDatasObject)
                      let markdown_code = snippet.code
                      keys.forEach((key) => {
                        markdown_code = markdown_code.replace(
                          `[${key}]`,
                          encodeURIComponent(formDatasObject[key] as string)
                        )
                      })

                      const cleanedMarkdownCode = markdown_code.replace(
                        /\((https?:\/\/\S+)\)/g,
                        (match, group1) => {
                          const cleanedUrl = new URL(group1)
                          const searchParams = cleanedUrl.searchParams
                          searchParams.forEach((value, key) => {
                            if (value === "") {
                              searchParams.delete(key)
                            }
                          })
                          return `(${cleanedUrl.href})`
                        }
                      )

                      copy(cleanedMarkdownCode)
                      toast.success(
                        "Copied to clipboard, paste it where you want!"
                      )
                    }}
                    onChange={(e) => {
                      const form = e.currentTarget
                      if (form.checkValidity()) {
                        setIsInputsValidated(true)
                      } else {
                        setIsInputsValidated(true)
                      }
                    }}
                  >
                    <div className="grid gap-4 py-4">
                      {snippet.placeholders?.map((placeholder, index) => (
                        <div key={index} className="flex flex-col py-2">
                          <Label htmlFor="name" className="mb-3 text-left">
                            {placeholder.name}{" "}
                            <span className="text-xs text-gray-400">
                              {placeholder.optional ? " · Optional" : ""}
                            </span>
                          </Label>
                          <Input
                            id={placeholder.name}
                            className="col-span-3"
                            placeholder={placeholder.description}
                            name={placeholder.replacer}
                            defaultValue={placeholder.defaultValue || ""}
                            spellCheck={false}
                            required
                            autoComplete="off"
                          />
                        </div>
                      ))}
                    </div>
                    <DialogFooter>
                      <a href={snippet.default_url} target="_blank">
                        <img
                          src={snippet.default_image_url}
                          alt={snippet.name}
                          className="absolute left-6"
                        />
                      </a>
                      <Button type="submit" disabled={!isInputsValidated}>
                        Copy snippet
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            ))}
        </div>
        <h4 className="py-3 text-sm font-medium">Static</h4>
        <hr />

        <div className="flex flex-wrap py-6">
          {assets.static
            .filter((staticAsset) => {
              const assetName = staticAsset.name.toLowerCase()

              return (
                searchValue.length === 0 ||
                assetName.includes(searchValue.toLowerCase())
              )
            })
            .map((staticAsset, index) => (
              <div
                key={index}
                onClick={() => {
                  copy(staticAsset.code)
                  toast.success("Copied to clipboard, paste it where you want!")
                }}
                className="flex h-10 w-1/2 cursor-pointer items-center justify-start overflow-hidden p-2 transition-opacity duration-150 hover:opacity-80"
              >
                <img
                  src={staticAsset.default_image_url}
                  alt={staticAsset.name}
                />
              </div>
            ))}
        </div>

        <h4 className="py-3 text-sm font-medium">Shields</h4>
        <hr />

        <div className="flex flex-wrap py-6">
          {assets.shields
            .filter(
              (shield) =>
                searchValue.length === 0 ||
                shield.keywords?.some((keyword) =>
                  keyword.toLowerCase().includes(searchValue.toLowerCase())
                )
            )
            .map((shield, index) => (
              <Dialog key={index}>
                <DialogOverlay />
                <DialogTrigger asChild>
                  <div
                    key={index}
                    className="flex h-10 w-1/2 cursor-pointer items-center justify-start overflow-hidden p-2 transition-opacity duration-150 hover:opacity-80"
                  >
                    <img src={shield.default_image_url} alt={shield.name} />
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{shield.name}</DialogTitle>
                  </DialogHeader>
                  <form
                    id="shield-form"
                    onSubmit={(e) => {
                      e.preventDefault()
                      const form = e.target as HTMLFormElement
                      const formDatasObject = Object.fromEntries(
                        new FormData(form).entries()
                      )
                      const keys = Object.keys(formDatasObject)
                      let markdown_code = shield.code
                      keys.forEach((key) => {
                        markdown_code = markdown_code?.replace(
                          `[${key}]`,
                          encodeURIComponent(formDatasObject[key] as string)
                        )
                      })
                      if (!form.checkValidity()) {
                        e.preventDefault()
                        setIsInputsValidated(false)
                        toast.error("Please fill all the fields")
                        return
                      }
                      setIsInputsValidated(true)
                      const cleanedMarkdownCode = markdown_code?.replace(
                        /\((https?:\/\/\S+)\)/g,
                        (match, group1) => {
                          const cleanedUrl = new URL(group1)
                          const searchParams = cleanedUrl.searchParams
                          searchParams.forEach((value, key) => {
                            if (value === "") {
                              searchParams.delete(key)
                            }
                          })
                          return `(${cleanedUrl.href})`
                        }
                      )
                      copy(cleanedMarkdownCode)
                      toast.success(
                        "Copied to clipboard, paste it where you want!"
                      )
                    }}
                    onChange={(e) => {
                      handleShieldChange(e, shield)
                    }}
                  >
                    <div className="grid max-h-[370px] gap-4 overflow-auto  py-4 pb-6">
                      {shield.placeholders?.map((placeholder, index) => (
                        <div key={index} className="flex flex-col py-2">
                          <Label htmlFor="name" className="mb-3 text-left">
                            {placeholder.name}{" "}
                            <span className="text-xs text-gray-400">
                              {placeholder.optional ? " · Optional" : ""}
                            </span>
                          </Label>
                          {placeholder.name == "Style" ? (
                            <Select
                              defaultValue="flat"
                              name={placeholder.replacer}
                              required={!placeholder.optional || false}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="flat" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="flat">flat</SelectItem>
                                <SelectItem value="plastic">plastic</SelectItem>
                                <SelectItem value="social">social</SelectItem>
                                <SelectItem value="flat-sqaure">
                                  flat-square
                                </SelectItem>
                                <SelectItem value=" for-the-badge">
                                  for-the-badge
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <Input
                              id={placeholder.name}
                              className="col-span-3"
                              placeholder={placeholder.description}
                              name={placeholder.replacer}
                              defaultValue={placeholder.defaultValue || ""}
                              required={!placeholder.optional || false}
                              spellCheck={false}
                              autoComplete="off"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    <DialogFooter className="flex items-center pt-8 ">
                      <img
                        src={shield.default_image_url}
                        alt={shield.name}
                        className="absolute left-6"
                      />
                      <Button type="submit" disabled={!isInputsValidated}>
                        Copy shield
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Assets
