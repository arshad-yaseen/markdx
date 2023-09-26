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

import CodeBlock from "../code-block"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import ParseMarkdown from "./parse-markdown"

function AskAI() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [previousGenerations, setPreviousGenerations] = useState("")
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

  const buildPrompt = (
    userPrompt: string,
    editorSelectedContent?: string,
    previousGenerations?: string
  ): OpenAIBody => {
    let systemPrompt = `Please provide a high-quality, professional response to the following prompt. Adhere to industry standards for quality and documentation.`

    let userPromptText = `${userPrompt}`

    if (editorSelectedContent) {
      editorSelectedContent = editorSelectedContent
      userPromptText += `\nThis:\n${editorSelectedContent}`
    }

    if (previousGenerations) {
      systemPrompt += `\nFor guidance, refer to these previous answers: ${previousGenerations}`
    }

    return {
      prompt: {
        system: systemPrompt,
        user: userPromptText,
      },
      max_tokens: 1000,
    }
  }

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
      const body = buildPrompt(
        user_prompt.toString(),
        editorSelectedContent,
        previousGenerations
      )

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
        setPreviousGenerations(
          `${previousGenerations},\n\nQuestion: ${user_prompt.toString()}\nAnswer: ${aiResponse}`
        )
        setGenerating(false)
      } catch (error) {
        // Handle any other errors that may occur
        console.error(error)
        setRequestingToAPI(false)
        toast.error("Something went wrong")
      }
    }
  }

  const clearChat = () => {
    setChats([
      {
        id: 1,
        user: "Hello, How can i help you?",
        ai: "",
      },
    ])
    setPreviousGenerations("")
  }

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          className={cn(
            "h-[750px] !rounded-xl px-8 pb-44 pt-5  text-sm sm:min-w-[600px]",
            { "pt-2": editorSelectedContent }
          )}
        >
          <div
            ref={chatWrapper}
            className="no-scrollbar w-full flex-1 flex-col overflow-scroll"
          >
            <h1 className="py-3 font-heading text-2xl">MarkGPT</h1>
            {chats.map((chat, index) => {
              return (
                <div key={index}>
                  {editorSelectedContent && (
                    <CodeBlock
                      value={editorSelectedContent}
                      language="markdown"
                      className="mt-3 max-h-[170px]"
                      copyable={false}
                    />
                  )}

                  <div className="mt-2 flex w-full items-center border-b py-4 text-[0.950rem]">
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
            className="absolute bottom-0 flex h-36 w-full flex-col items-center justify-center space-y-2 rounded-xl bg-background px-8"
          >
            <Button
              onClick={() => {
                copy(chats[chats.length - 1].ai)
                setCopied(true)
                setTimeout(() => {
                  setCopied(false)
                }, 1000)
              }}
              className={cn("invisible absolute top-0 w-fit opacity-0", {
                "visible opacity-100": !generating && previousGenerations,
              })}
              variant={"outline"}
            >
              {copied ? "Copied!" : "Copy answer"}
            </Button>

            <div className="relative flex w-full items-center">
              <Input
                autoComplete="off"
                spellCheck={false}
                className="h-12 w-full"
                placeholder={
                  editorSelectedContent
                    ? "Please rewrite the markdown in a formal style"
                    : "Write me a blog about elon musk in markdown"
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
          clearChat()
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
