import React from "react"
import Link from "next/link"

import SiteAssets from "../site-assets"
import EditorNav from "./editor-nav"
import EditorSectionsPanel from "./editor-sections-manage-panel"

function EditorHeader() {
  return (
    <div className="flex w-full flex-col space-y-3 border-b py-6 lg:h-[8vh] lg:flex-row lg:space-y-0 lg:py-0">
      <div className="hidden h-full w-[18%] items-center px-6 lg:flex">
        <Link href="/dashboard" className="flex items-center">
          <SiteAssets type="icon" />
          <h4 className="ml-2 font-heading text-xl">Editor</h4>
        </Link>
      </div>
      <div className="flex h-full w-full items-center justify-center lg:w-[46%]">
        <EditorSectionsPanel />
      </div>
      <div className="flex h-full w-full flex-1 items-center justify-center lg:w-[36%] lg:justify-end lg:px-6">
        <EditorNav />
      </div>
    </div>
  )
}

export default EditorHeader
