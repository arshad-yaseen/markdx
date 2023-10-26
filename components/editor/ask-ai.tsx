"use client"

import React, { FormEvent, useRef, useState } from "react"
import { editorSelectedContentAtom } from "@/atoms/editor"
import { OpenAICreateChat } from "@/utils/editor"
import copy from "copy-to-clipboard"
import { useAtomValue } from "jotai"
import {
  CopyCheckIcon,
  CopyIcon,
  MoreHorizontalIcon,
  SendIcon,
  SparklesIcon,
  SquareIcon,
} from "lucide-react"
import OpenAI from "openai"
import { toast } from "sonner"

import { Chat, OpenAIBody } from "types"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"

import { ChatScrollAnchor } from "../chat-scroll-anchor"
import CodeBlock from "../code-block"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import ParseMarkdown from "./parse-markdown"
import UpgradeToPRODialog from "./upgrade-to-pro-dialog"

function AskAI({ isEligibleForAI }: { isEligibleForAI: boolean }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [requestingToAPI, setRequestingToAPI] = useState(false)
  const [AIThinking, setAIThinking] = useState(false)
  const chatWrapper = useRef(null)
  const [generating, setGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [messages, setMessages] = useState<OpenAI.ChatCompletionMessageParam[]>(
    []
  )
  const [upgradeToPRODialog, setUpgradeToPRODialog] = useState(false)

  const editorSelectedContent = useAtomValue(editorSelectedContentAtom)

  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      user: "Hello, How can i help you?",
      ai: "",
    },
  ])

  const buildPrompt = (
    userPrompt: string,
    editorSelectedContent: string
  ): OpenAIBody => {
    if (editorSelectedContent) {
      return {
        messages: [
          ...messages,
          {
            role: "system",
            content: userPrompt,
          },
          {
            role: "user",
            content: editorSelectedContent,
          },
        ],
      }
    }
    return {
      messages: [
        ...messages,
        {
          role: "user",
          content: userPrompt,
        },
      ],
    }
  }

  let stopGenerating = useRef<boolean>(false)

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

      const body = buildPrompt(user_prompt.toString(), editorSelectedContent)

      try {
        // Call the OpenAI API with the request body
        setGenerating(true)
        const res = await OpenAICreateChat(body)
        setAIThinking(false)

        // Handle any errors returned by the API
        if (res?.err) {
          toast.error(res?.message)
          setRequestingToAPI(false)
          return
        }

        // Parse the response data
        const data = res.data
        const reader = data?.getReader()
        const decoder = new TextDecoder()
        let done = false
        let aiResponse = ""

        while (!done) {
          if (stopGenerating.current) {
            break
          }
          const { value, done: doneReading } = (await reader?.read()) as any
          done = doneReading
          const chunkValue = decoder.decode(value)
          aiResponse += chunkValue
          setChats((prevChats) =>
            prevChats.map((chat) =>
              chat.id === chats.length + 1 ? { ...chat, ai: aiResponse } : chat
            )
          )
        }
        stopGenerating.current = false
        setRequestingToAPI(false)
        // set the messages for history
        setMessages(
          buildPrompt(user_prompt.toString(), editorSelectedContent).messages
        )
        setGenerating(false)
      } catch (error) {
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
        user: `${
          editorSelectedContent
            ? "How can i help you with this markdown?"
            : "Hello, How can i help you?"
        }`,
        ai: "",
      },
    ])
    setMessages([])
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
            <ChatScrollAnchor trackVisibility={generating} />
          </div>
          <form
            onSubmit={handleChat}
            className="absolute bottom-0 flex h-36 w-full flex-col items-center justify-center space-y-2 rounded-xl bg-background px-8"
          >
            <div className="relative flex w-full items-center">
              <Button
                onClick={() => {
                  copy(chats[chats.length - 1].ai)
                  setCopied(true)
                  setTimeout(() => {
                    setCopied(false)
                  }, 1000)
                }}
                className={cn(
                  "invisible absolute top-[-100%] w-fit opacity-0",
                  {
                    "visible opacity-100": !generating && messages.length > 0,
                  }
                )}
                variant={"outline"}
              >
                {!copied ? (
                  <CopyIcon className="mr-2 h-3.5 w-3.5" />
                ) : (
                  <CopyCheckIcon className="mr-2 h-3.5 w-3.5" />
                )}
                {copied ? "Copied!" : "Copy answer"}
              </Button>
              {!stopGenerating.current && generating && (
                <Button
                  variant={"outline"}
                  className="absolute top-[-100%] w-fit"
                  onClick={() => {
                    stopGenerating.current = true
                    setGenerating(false)
                  }}
                >
                  <SquareIcon className="mr-2 h-3.5 w-3.5" />
                  Stop Generating
                </Button>
              )}
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
          if (!isEligibleForAI) {
            setUpgradeToPRODialog(true)
            return
          }
          setIsDialogOpen(true)
          clearChat()
        }}
        className={cn(
          "flex h-10 w-full justify-center px-6 transition-colors duration-200"
        )}
      >
        <SparklesIcon className="mr-2 h-4 w-4" />{" "}
        {editorSelectedContent ? "Ask AI" : "Chat with AI"}
      </Button>
      {/* Upgrade to pro dialog */}
      <UpgradeToPRODialog
        open={upgradeToPRODialog}
        setOpen={setUpgradeToPRODialog}
      />
    </div>
  )
}

export default AskAI
