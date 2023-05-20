"use client"

import { useEffect, useState } from "react"
import { monacoInstanceState } from "@/atoms/editor"
import { listLanguages } from "@/utils/world-languages"
import { useAtomValue } from "jotai"
import { toast } from "sonner"

import "@/styles/mdx.css"
import { OpenAICreateChat, editorAction } from "@/utils/editor"

import { OpenAIBody } from "types"
import { AIConfig } from "@/config/editor"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import AskAI from "./ask-ai"

function AITools() {
  const [requestingToAPI, setRequestingToAPI] = useState(false)
  const [windowSelection, setWindowSelection] = useState("")
  const [worldlanguages, setWorldLanguages] = useState([])
  const monacoInstance = useAtomValue(monacoInstanceState)

  const getLanguages = async () => {
    const languages = await listLanguages()
    setWorldLanguages(languages!)
  }

  useEffect(() => {
    window.onselect = () => {
      setWindowSelection(window.getSelection()?.toString()!)
    }
    getLanguages()
  }, [])

  const handleClick = async (
    options: OpenAIBody,
    action: "insert" | "set" = "insert"
  ) => {
    const editorSelectedCode = window.getSelection()?.toString()
    if (requestingToAPI) {
      return toast.message("Please wait for current action to finish")
    } else if (!editorSelectedCode || !windowSelection) {
      return toast.message("Please select a text or code")
    }

    setRequestingToAPI(true)
    if (requestingToAPI) return
    const body = {
      ...options,
    }
    const res = await OpenAICreateChat(body)
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
      if (action === "insert") {
        editorAction.insertText(chunkValue, monacoInstance!)
      } else if (action === "set") {
        editorAction.setText(chunkValue, monacoInstance!)
      }
    }
    setRequestingToAPI(false)
  }

  return (
    <>
      <div className="space-y-4">
        <Button
          onClick={() => {
            const editorSelectedCode = window.getSelection()?.toString()
            console.log(editorSelectedCode || "wfwef")

            const options = {
              prompt: {
                system: AIConfig.prompts[0].system.regular || "",
                user: editorSelectedCode!,
              },
              max_tokens: 1000,
            }
            handleClick(options)
          }}
          variant="outline"
          className="flex w-full justify-center px-6  "
        >
          Standardize or Format
        </Button>
        <Button
          onClick={() => {
            const editorSelectedCode = window.getSelection()?.toString()
            console.log(editorSelectedCode || "wfwef")
            const options = {
              prompt: {
                system: AIConfig.prompts[1].system.regular || "",
                user: `This is the text or markdown to make short => \`${editorSelectedCode}\``,
              },
              max_tokens: editorSelectedCode?.split(" ").length! * 2,
            }
            handleClick(options)
          }}
          variant="outline"
          className="flex w-full justify-center px-6 "
        >
          Make short
        </Button>
        <Button
          onClick={() => {
            const editorSelectedCode = window.getSelection()?.toString()
            const options = {
              prompt: {
                system: AIConfig.prompts[2].system.regular || "",
                user: `This is the text or markdown to explain => \`${editorSelectedCode}\``,
              },
              max_tokens: 1000,
            }
            handleClick(options)
          }}
          variant="outline"
          className="flex w-full justify-center px-6 "
        >
          Explain
        </Button>
        <Button
          onClick={() => {
            const editorSelectedCode = window.getSelection()?.toString()
            if (!editorSelectedCode) {
              toast.message("Please select a code")
            } else {
              const options = {
                prompt: {
                  system: `${AIConfig.prompts[3].system.detailed}. then after ${AIConfig.prompts[3].system.simple}. Must use space between devide`,
                  user: `This is the text or markdown to document => \`${editorSelectedCode}\``,
                },
                max_tokens: editorSelectedCode?.length! * 3,
              }
              handleClick(options)
            }
          }}
          variant="outline"
          className="flex w-full justify-center px-6 "
        >
          Document code
        </Button>
        <Popover>
          <PopoverTrigger className="flex h-10 w-full items-center justify-center rounded-md border border-input px-6 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            Convert code
          </PopoverTrigger>
          <PopoverContent align="start">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target as HTMLFormElement)
                const { to } = Object.fromEntries(formData.entries())
                const code_for_convert = windowSelection
                if (!code_for_convert) {
                  toast.message("Please select a code")
                } else {
                  const options = {
                    prompt: {
                      system: `Please convert the provided code ${to}`,
                      user: `This is the code for convert => \`${code_for_convert}\``,
                    },
                    max_tokens: code_for_convert?.length! * 5,
                  }
                  handleClick(options)
                }
              }}
            >
              <Input
                spellCheck={false}
                autoComplete="off"
                name="to"
                defaultValue="To "
                autoFocus
              />
              <Button variant="outline" className="mt-3 w-full">
                Convert
              </Button>
            </form>
          </PopoverContent>
        </Popover>
        <Button
          onClick={() => {
            const editorSelectedCode = window.getSelection()?.toString()
            const options = {
              prompt: {
                system: AIConfig.prompts[4].system.regular || "",
                user: `This is the text or markdown to correct grammar => \`${editorSelectedCode}\``,
              },
              max_tokens: 500,
            }
            handleClick(options)
          }}
          variant="outline"
          className="flex w-full justify-center px-6 "
        >
          Correct grammar
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex h-10 w-full items-center justify-center rounded-md border border-input px-6 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            Translate
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className="h-[400px] w-fit overflow-y-scroll">
              {worldlanguages.map(
                (
                  language: {
                    name: string
                  },
                  index: number
                ) => {
                  return (
                    <DropdownMenuItem
                      onClick={() => {
                        const selectedText = windowSelection
                        const options = {
                          prompt: {
                            system:
                              AIConfig.prompts[5].system.regular?.replace(
                                "{language}",
                                language.name
                              ) || "",
                            user: selectedText,
                          },
                          max_tokens: selectedText?.length! * 6,
                        }

                        handleClick(options)
                      }}
                      key={index}
                    >
                      {language.name}
                    </DropdownMenuItem>
                  )
                }
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <AskAI />
      </div>
    </>
  )
}

export default AITools
