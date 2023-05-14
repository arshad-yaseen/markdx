import React, { FormEvent, useRef, useState } from "react"
import { SendIcon } from "lucide-react"
import { toast } from "sonner"

import { ChatType, OpenAIBody } from "types"
import { OpenAICreateChat } from "@/lib/editor"
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import ParseMarkdown from "./ParseMarkdown"

function AskAI() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [previousAnswers, setPreviousAnswers] = useState("")
  const chatWrapper = useRef(null)
  const [chats, setChats] = useState<ChatType[]>([
    {
      id: 1,
      user: "Hello, how can I help you today?",
      ai: "",
    },
  ])

  const handleChat = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    if (!form) return
    const formData = new FormData(form)
    const { user_prompt } = Object.fromEntries(formData.entries())
    chats.pop()
    const prompt_input = form.querySelector("input")
    if (prompt_input) {
      prompt_input.value = ""
    }
    // Use functional updates to set the state of chats array and currentId
    setChats((prevChats) => [
      ...prevChats,
      {
        id: prevChats.length + 1,
        user: user_prompt.toString(),
        ai: "",
      },
    ])

    // Create the request body for OpenAI's API
    const body = {
      prompt: {
        system: `Answer to the following prompt.All codes must have language.based on this previous answers: ${previousAnswers}`,
        user: user_prompt.toString(),
      },
      max_tokens: 1000,
    } as OpenAIBody

    try {
      // Call the OpenAI API with the request body
      const res = await OpenAICreateChat(body)

      // Handle any errors returned by the API
      if (res?.err) {
        toast.error(res?.message)
        return
      }

      // Parse the response data
      const data = res.data
      const reader = data?.getReader()
      const decoder = new TextDecoder()
      let done = false
      let aiResponse = ""

      // Read the response data stream and update the chats state as chunks arrive
      while (!done) {
        const { value, done: doneReading } = (await reader?.read()) as any
        done = doneReading
        const chunkValue = decoder.decode(value)
        aiResponse += chunkValue
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === chats.length + 1 ? { ...chat, ai: aiResponse } : chat
          )
        )
        const chat = chatWrapper.current as any
        chat.scrollTop = chat.scrollHeight
      }
      setPreviousAnswers(`${previousAnswers},${aiResponse}`)
    } catch (error) {
      // Handle any other errors that may occur
      console.error(error)
      toast.error("Something went wrong")
    }
  }

  console.log(chats.length, chats)

  return (
    <div>
      <Dialog open={isDialogOpen}>
        <DialogOverlay onClick={() => setIsDialogOpen(false)} />
        <DialogContent className="h-[600px] px-8 pb-32 text-sm">
          <div
            ref={chatWrapper}
            className="ask-ai-chats-wrapper w-full flex-1 flex-col overflow-scroll"
          >
            {chats.map((chat) => {
              return (
                <>
                  <div className="mt-5 flex w-full items-center border-b py-3">
                    {chat.user}
                  </div>
                  <ParseMarkdown codeCopyable code={chat.ai} />
                </>
              )
            })}
          </div>
          <form
            onSubmit={handleChat}
            className="absolute bottom-0 flex h-32 w-full items-center rounded-lg bg-white px-6"
          >
            <Input
              autoComplete="off"
              spellCheck={false}
              className="h-12 w-full"
              placeholder="Ask something else..."
              autoFocus
              name="user_prompt"
            />
            <button className="absolute right-10 w-fit">
              <SendIcon className="h-5 w-5 text-gray-400" />
            </button>
          </form>
        </DialogContent>
      </Dialog>

      <Button
        onClick={() => setIsDialogOpen(true)}
        className="flex w-full justify-center px-6 "
      >
        Ask AI to write
      </Button>
    </div>
  )
}

export default AskAI
