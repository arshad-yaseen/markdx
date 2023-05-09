import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import AITools from "./AITools"

function EditorLeft() {
  return (
    <div className="flex h-full w-[20%] flex-col items-center border-r p-6 ">
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
        </TabsContent>
        <TabsContent value="assets"></TabsContent>
      </Tabs>
    </div>
  )
}

export default EditorLeft
