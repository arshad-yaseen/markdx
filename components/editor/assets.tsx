import { assets } from "@/utils/assets-list"

import CodeBlock from "../code-block"
import "@/styles/mdx.css"
import { useState } from "react"
import { monacoInstanceState } from "@/atoms/editor"
import { editorAction } from "@/utils/editor"
import { useAtomValue } from "jotai"
import { SearchIcon } from "lucide-react"

import { Input } from "../ui/input"

export default function Assets() {
  const [searchValue, setSearchValue] = useState("")
  const monacoInstance = useAtomValue(monacoInstanceState)

  return (
    <div className=" relative flex h-[70vh] w-full flex-col">
      <div className=" sticky top-0 z-50 flex w-full items-center">
        <Input
          onChange={(e) => setSearchValue(e.target.value)}
          className="h-10 bg-background pl-9"
          placeholder="Search asset..."
          autoFocus
          autoComplete="off"
          spellCheck={false}
        />
        <SearchIcon className="absolute left-3.5 h-3.5 w-3.5 text-slate-500" />
      </div>
      <div className="no-scrollbar w-full  space-y-4 overflow-scroll py-4">
        {assets
          .filter((asset) =>
            searchValue.length === 0 || asset.keywords
              ? asset.keywords?.some((keyword) =>
                  keyword.toLowerCase().includes(searchValue.toLowerCase())
                )
              : asset.name.includes(searchValue.toLowerCase())
          )
          .map((asset, index) => {
            return (
              <div
                onClick={() => {
                  editorAction.insertText(asset.code, monacoInstance!)
                }}
              >
                <CodeBlock
                  key={index}
                  language="markdown"
                  value={asset.code || ""}
                  codeClass="text-xs no-scrollbar"
                  copyable={false}
                  preClass="hover:border-foreground w-52 cursor-pointer transition-all duration-200"
                />
              </div>
            )
          })}
      </div>
    </div>
  )
}
