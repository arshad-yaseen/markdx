import { assets } from "@/lib/assets-list"

import CodeBlock from "../code-block"
import "@/styles/mdx.css"
import { useState } from "react"
import { SearchIcon } from "lucide-react"

import { Input } from "../ui/input"

export default function Assets() {
  const [searchValue, setSearchValue] = useState("")

  return (
    <div className=" relative flex h-[80vh] w-full flex-col">
      <div className=" sticky top-0 z-50 flex w-full items-center">
        <Input
          onChange={(e) => setSearchValue(e.target.value)}
          className="bg-background pl-9"
          placeholder="Search asset..."
          autoFocus
          autoComplete="off"
          spellCheck={false}
        />
        <SearchIcon className="absolute left-3.5 h-4 w-4 text-slate-500" />
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
              <CodeBlock
                key={index}
                language="markdown"
                value={asset.code || ""}
                codeClass="text-xs no-scrollbar"
                copyOnHover
              />
            )
          })}
      </div>
    </div>
  )
}
