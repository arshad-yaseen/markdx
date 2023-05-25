"use client"

import { useEffect, useState } from "react"
import { monacoInstanceState } from "@/atoms/editor"
import { listLanguages } from "@/utils/world-languages"
import { useAtomValue } from "jotai"
import { MoreHorizontalIcon } from "lucide-react"
import { toast } from "sonner"

import "@/styles/mdx.css"
import { OpenAICreateChat } from "@/utils/editor"

import { OpenAIBody } from "types"
import { AIConfig } from "@/config/editor"
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog"
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

import CodeBlock from "../code-block"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import AskAI from "./ask-ai"

function AITools() {
  const [requestingToAPI, setRequestingToAPI] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [generatedText, setGeneratedText] = useState("")
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

  const handleClick = async (options: OpenAIBody) => {
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
      setGeneratedText((prev) => prev + chunkValue)
    }
    setRequestingToAPI(false)
  }

  return (
    <>
      <Dialog open={isDialogOpen}>
        <DialogOverlay
          onClick={() => {
            setIsDialogOpen(false)
            setGeneratedText("")
          }}
        />
        <DialogContent className="flex flex-col items-center justify-center space-y-2">
          {generatedText ? (
            <CodeBlock
              language="markdown"
              value={generatedText}
              codeWrap
              preClass="border-none"
            />
          ) : (
            <MoreHorizontalIcon className="h-3 w-3 animate-ping" />
          )}
        </DialogContent>
      </Dialog>

      <div className="space-y-4">
        <Button
          onClick={() => {
            setGeneratedText("")
            if (requestingToAPI) {
              toast.message("Please wait for current action to finish")
            } else {
              const editorSelectedCode = window.getSelection()?.toString()
              const options = {
                prompt: {
                  system: AIConfig.prompts[0].system.regular || "",
                  user: editorSelectedCode
                    ? editorSelectedCode
                    : monacoInstance?.getValue()!,
                },
                max_tokens: 1000,
              }
              handleClick(options)
              setIsDialogOpen(true)
            }
          }}
          variant="outline"
          className="flex w-full justify-center px-6  "
        >
          Standardize
        </Button>
        <Button
          onClick={() => {
            setGeneratedText("")
            if (requestingToAPI) {
              toast.message("Please wait for current action to finish")
            } else {
              const editorSelectedCode = window.getSelection()?.toString()
              const options = {
                prompt: {
                  system: AIConfig.prompts[1].system.regular || "",
                  user: `This is the text or markdown to make short => \`${
                    editorSelectedCode
                      ? editorSelectedCode
                      : monacoInstance?.getValue()
                  }\``,
                },
                max_tokens: editorSelectedCode
                  ? editorSelectedCode.split(" ").length! * 2
                  : monacoInstance?.getValue().split(" ").length! * 2,
              }
              handleClick(options)
              setIsDialogOpen(true)
            }
          }}
          variant="outline"
          className="flex w-full justify-center px-6 "
        >
          Make short
        </Button>
        <Button
          onClick={() => {
            setGeneratedText("")
            if (requestingToAPI) {
              toast.message("Please wait for current action to finish")
            } else {
              const editorSelectedCode = window.getSelection()?.toString()
              const options = {
                prompt: {
                  system: AIConfig.prompts[2].system.regular || "",
                  user: `This is the text or markdown to explain => \`${
                    editorSelectedCode
                      ? editorSelectedCode
                      : monacoInstance?.getValue()
                  }\``,
                },
                max_tokens: 1000,
              }
              handleClick(options)
              setIsDialogOpen(true)
            }
          }}
          variant="outline"
          className="flex w-full justify-center px-6 "
        >
          Explain
        </Button>
        <Button
          onClick={() => {
            setGeneratedText("")
            if (requestingToAPI) {
              toast.message("Please wait for current action to finish")
            } else {
              const editorSelectedCode = window.getSelection()?.toString()
              if (!editorSelectedCode) {
                toast.error("Please select a code")
              } else {
                const options = {
                  prompt: {
                    system: `${AIConfig.prompts[3].system.detailed}. then after ${AIConfig.prompts[3].system.simple}. Must use space between devide`,
                    user: `This is the text or markdown to document => \`${editorSelectedCode}\``,
                  },
                  max_tokens: editorSelectedCode?.length! * 3,
                }
                handleClick(options)
                setIsDialogOpen(true)
              }
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
                setGeneratedText("")
                if (requestingToAPI) {
                  toast.message("Please wait for current action to finish")
                } else {
                  const formData = new FormData(e.target as HTMLFormElement)
                  const { to } = Object.fromEntries(formData.entries())
                  const code_for_convert = windowSelection
                  if (!code_for_convert) {
                    toast.error("Please select a code")
                  } else {
                    const options = {
                      prompt: {
                        system: `Please convert the provided code ${to}`,
                        user: `This is the code for convert => \`${code_for_convert}\``,
                      },
                      max_tokens: code_for_convert?.length! * 5,
                    }
                    handleClick(options)
                    setIsDialogOpen(true)
                  }
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
            setGeneratedText("")
            if (requestingToAPI) {
              toast.message("Please wait for current action to finish")
            } else {
              const editorSelectedCode = window.getSelection()?.toString()
              const options = {
                prompt: {
                  system: AIConfig.prompts[4].system.regular || "",
                  user: `This is the text or markdown to correct grammar => \`${
                    editorSelectedCode
                      ? editorSelectedCode
                      : monacoInstance?.getValue()
                  }\``,
                },
                max_tokens: 500,
              }
              handleClick(options)
              setIsDialogOpen(true)
            }
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
                        setGeneratedText("")
                        if (requestingToAPI) {
                          toast.message(
                            "Please wait for current action to finish"
                          )
                        } else {
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
                          console.log(options)

                          handleClick(options)
                          setIsDialogOpen(true)
                        }
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
