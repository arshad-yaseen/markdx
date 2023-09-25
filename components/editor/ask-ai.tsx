"use client"

import React, { FormEvent, useRef, useState } from "react"
import { editorSelectedContentAtom } from "@/atoms/editor"
import { OpenAICreateChat } from "@/utils/editor"
import copy from "copy-to-clipboard"
import { useAtomValue } from "jotai"
import { MoreHorizontalIcon, SendIcon, SparklesIcon } from "lucide-react"
import { toast } from "sonner"

import { ChatType, OpenAIBody } from "types"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import ParseMarkdown from "./parse-markdown"

function AskAI() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [previousAnswers, setPreviousAnswers] = useState("")
  const [requestingToAPI, setRequestingToAPI] = useState(false)
  const [AIThinking, setAIThinking] = useState(false)
  const chatWrapper = useRef(null)
  const [generating, setGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  const editorSelectedContent = useAtomValue(editorSelectedContentAtom)

  const [chats, setChats] = useState<ChatType[]>([
    {
      id: 1,
      user: "Hello, How can i help you?",
      ai: "",
    },
  ])

  const handleChat = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    if (!form) return
    const formData = new FormData(form)
    const { user_prompt } = Object.fromEntries(formData.entries())
    if (!requestingToAPI && user_prompt) {
      setRequestingToAPI(true)
      chats.pop()
      const prompt_input = form.querySelector("input")
      setAIThinking(true)
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
          system: `Please provide a response to the following prompt using a programming language of your choice. Your answer should be of a high level and adhere to industry standards for code quality and documentation.\n Please reference previous answers for guidance: ${previousAnswers}.
          `,
          user: `  
          ${editorSelectedContent}
            ${user_prompt}
          `,
        },
        max_tokens: 1000,
      } as OpenAIBody

      try {
        // Call the OpenAI API with the request body
        setGenerating(true)
        const res = await OpenAICreateChat(body)
        setAIThinking(false)

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
        setRequestingToAPI(false)
        setPreviousAnswers(`${previousAnswers},${aiResponse}`)
        setGenerating(false)
      } catch (error) {
        // Handle any other errors that may occur
        console.error(error)
        setRequestingToAPI(false)
        toast.error("Something went wrong")
      }
    }
  }

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          className={cn(
            "h-[700px] !rounded-2xl px-8 pb-44 pt-5  text-sm sm:min-w-[650px]",
            { "pt-2": editorSelectedContent }
          )}
        >
          <div
            ref={chatWrapper}
            className="no-scrollbar w-full flex-1 flex-col overflow-scroll"
          >
            {chats.map((chat, index) => {
              return (
                <div key={index}>
                  {editorSelectedContent && (
                    <div className="mt-5 flex w-full items-center rounded-md border p-4 text-[0.950rem]">
                      <p className="line-clamp-3 leading-relaxed text-muted-foreground">
                        {editorSelectedContent}
                      </p>
                    </div>
                  )}

                  <div className="mt-2 flex w-full items-center rounded-md bg-muted p-4 text-[0.950rem]">
                    {chat.user}
                  </div>
                  <ParseMarkdown
                    codeCopyable
                    code={chat.ai}
                    className="mt-6 text-[0.950rem] leading-6"
                  />
                  {AIThinking && (
                    <MoreHorizontalIcon className="mt-6 h-4 w-4 animate-pulse" />
                  )}
                  {/* Typing animation */}
                </div>
              )
            })}
          </div>
          <form
            onSubmit={handleChat}
            className="absolute bottom-0 flex h-36 w-full flex-col items-center justify-center space-y-2 rounded-2xl bg-background px-6"
          >
            {!generating && previousAnswers && (
              <Button
                onClick={() => {
                  copy(chats[chats.length - 1].ai)
                  setCopied(true)
                  setTimeout(() => {
                    setCopied(false)
                  }, 1000)
                }}
                className="absolute top-0 w-fit"
                variant={"outline"}
              >
                {copied ? "Copied!" : "Copy answer"}
              </Button>
            )}
            <div className="relative flex w-full items-center">
              <Input
                autoComplete="off"
                spellCheck={false}
                className="h-12 w-full"
                placeholder={
                  editorSelectedContent
                    ? "Please rewrite the markdown in a formal style"
                    : "Type your message here."
                }
                autoFocus
                name="user_prompt"
              />
              <button className="absolute right-6 w-fit">
                <SendIcon className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Button
        onClick={() => {
          setIsDialogOpen(true)
          // clear all
          setChats([
            {
              id: 1,
              user: "Hello, How can i help you?",
              ai: "",
            },
          ])
          setPreviousAnswers("")
        }}
        className={cn(
          "flex h-10 w-full justify-center px-6 transition-colors duration-200"
        )}
      >
        <SparklesIcon className="mr-2 h-4 w-4" /> Chat with AI
      </Button>
    </div>
  )
}

export default AskAI
