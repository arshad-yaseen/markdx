"use client"

import { useState } from "react"
import { toast } from "sonner"

import { AIConfig } from "@/config/editor"
import { OpenAICreateChat } from "@/lib/editor"

import { Button } from "../ui/button"

function AITools() {
  const [requestingToAPI, setRequestingToAPI] = useState(false)

  const handleStandardize = async () => {
    setRequestingToAPI(true)
    if (requestingToAPI) return
    const editorSelectedCode = window.getSelection()?.toString()
    const body = {
      prompt: {
        system: AIConfig.prompts[0].system.regular || "",
        user: editorSelectedCode || "",
      },
      max_tokens: 500,
    }
    const res = await OpenAICreateChat(body)
    setRequestingToAPI(false)
    if (res?.err) {
      toast.error(res?.message)
      return
    }
    const data = res.data
    const reader = data?.getReader()
    const decoder = new TextDecoder()
    let done = false
    while (!done) {
      const { value, done: doneReading } = (await reader?.read()) as any
      done = doneReading
      const chunkValue = decoder.decode(value)
      console.log(chunkValue)
    }
  }

  return (
    <>
      <div className="space-y-4">
        <Button
          onClick={handleStandardize}
          variant="outline"
          className="flex w-full justify-center px-6  "
        >
          Standardize or Format
        </Button>
        <Button variant="outline" className="flex w-full justify-center px-6 ">
          Summarize
        </Button>
        <Button variant="outline" className="flex w-full justify-center px-6 ">
          Explain
        </Button>
        <Button variant="outline" className="flex w-full justify-center px-6 ">
          Document code
        </Button>
        <Button variant="outline" className="flex w-full justify-center px-6 ">
          Generate or Convert code
        </Button>
        <Button variant="outline" className="flex w-full justify-center px-6 ">
          Correct grammar
        </Button>
        <Button variant="outline" className="flex w-full justify-center px-6 ">
          Translate
        </Button>
        <Button className="flex w-full justify-center px-6 ">
          Ask AI to write
        </Button>
      </div>
    </>
  )
}

export default AITools
