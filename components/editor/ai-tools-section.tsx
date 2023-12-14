import React, { useEffect, useState } from "react"
import { ChevronLeftIcon } from "lucide-react"

import { useLocalStorage } from "@/lib/hooks/use-localstorage"
import UnsplashDialog from "@/components/editor/unsplash-dialog"

import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import AITools from "./ai-tools"
import AskAI from "./ask-ai"
import Assets from "./assets"

function AIToolsSection() {
  const [isToolsPanelCollapsedStore, setIsToolsPanelCollapsedStore] =
    useLocalStorage("toolbar-collapse", "false")
  const [isToolsPanelCollapsed, setIsToolsPanelCollapsed] = useState(false)

  useEffect(() => {
    setIsToolsPanelCollapsed(isToolsPanelCollapsedStore === "true")
  }, [isToolsPanelCollapsedStore])

  return (
    <>
      <div
        className={`relative hidden h-full ${
          isToolsPanelCollapsed ? "invisible w-0 opacity-0" : "min-w-[18%]"
        } flex-col items-center border-r p-6 lg:flex `}
      >
        <Tabs defaultValue="tools" className="w-full">
          <TabsList className="w-ful mb-6 flex">
            <TabsTrigger value="tools" className="w-full">
              AI tools
            </TabsTrigger>
            <TabsTrigger value="assets" className="w-full">
              Assets
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tools">
            <AITools />
            <hr className="my-4" />
            <div className="flex w-full flex-1 flex-col justify-end space-y-2 py-2">
              <AskAI />
              <UnsplashDialog />
            </div>
          </TabsContent>
          <TabsContent value="assets">
            <Assets />
          </TabsContent>
        </Tabs>
      </div>
      {/*  Tools panel collapse button */}
      <div
        className={`absolute bottom-0 ${
          isToolsPanelCollapsed ? "ml-6  w-[4%] -rotate-180" : "w-[18%] px-6"
        } left-0 z-10 flex h-20 items-center justify-end`}
      >
        <Button
          onClick={() => {
            setIsToolsPanelCollapsed(!isToolsPanelCollapsed)
            setIsToolsPanelCollapsedStore(String(!isToolsPanelCollapsed)) // Setting to localStorage
          }}
          variant="outline"
          className="hidden h-8 w-8 items-center justify-center px-0 lg:flex"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
      </div>
    </>
  )
}

export default AIToolsSection
