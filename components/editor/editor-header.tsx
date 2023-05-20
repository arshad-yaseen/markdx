import React from "react"
import Link from "next/link"

import SiteAssets from "../site-assets"
import EditorNav from "./editor-nav"
import EditorSectionsPanel from "./editor-sections-panel"

function EditorHeader() {
  return (
    <div className="flex h-[8vh] w-full border-b">
      <div className="flex h-full w-[20%] items-center px-6">
        <Link href="/dashboard" className="flex items-center">
          <SiteAssets type="icon" />
          <h4 className="ml-2 font-heading text-xl font-bold">Editor</h4>
        </Link>
      </div>
      <div className="flex h-full w-[45%] items-center justify-center">
        <EditorSectionsPanel />
      </div>
      <div className="flex h-full w-[35%] items-center justify-end px-6">
        <EditorNav />
      </div>
    </div>
  )
}

export default EditorHeader
