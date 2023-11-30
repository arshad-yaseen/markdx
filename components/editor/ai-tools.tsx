"use client"

import { useEffect, useState } from "react"
import { editorSelectedContentAtom, monacoInstanceState } from "@/atoms/editor"
import { listLanguages } from "@/utils/world-languages"
import { useAtomValue } from "jotai"
import { toast } from "sonner"

import "@/styles/mdx.css"
import { OpenAIBody } from "@/types"
import { editorAction } from "@/utils/editor"
import { PopoverClose } from "@radix-ui/react-popover"

import { PROMPT } from "@/config/editor"
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
import UpgradeToPRODialog from "./upgrade-to-pro-dialog"
import { OpenAICreateChat } from "@/utils/openai/chat"

function AITools({ isEligibleForAI }: { isEligibleForAI: boolean }) {
  const [requestingToAPI, setRequestingToAPI] = useState(false)
  const [worldlanguages, setWorldLanguages] = useState([])
  const monacoInstance = useAtomValue(monacoInstanceState)
  const editorSelectedContent = useAtomValue(editorSelectedContentAtom)
  const [upgradeToPRODialog, setUpgradeToPRODialog] = useState(false)

  const getLanguages = async () => {
    const languages = await listLanguages()
    setWorldLanguages(languages!)
  }

  useEffect(() => {
    getLanguages()
  }, [])

  const handleClick = async (
    options: OpenAIBody,
    action: "insert" | "set" | "insert-after" = "insert"
  ) => {
    if (!isEligibleForAI) {
      return setUpgradeToPRODialog(true)
    }

    if (requestingToAPI) {
      return toast.message("Please wait for current action to finish")
    } else if (options.messages[1].content === "") {
      return toast.message("Please select the markdown content")
    }
    setRequestingToAPI(true)
    if (requestingToAPI) return
    const body = {
      ...options,
    }
    const res = await OpenAICreateChat(body)
    if (res?.err) {
      toast.error(res?.message)
      setRequestingToAPI(false)
      return
    }

    let stopGeneration = false

    // show the toast with 'Stop Generating' button
    const stopToast = toast("Stop Generating", {
      action: {
        label: "Stop",
        onClick: () => {
          toast.dismiss(stopToast)
          setRequestingToAPI(false)
          stopGeneration = true
        },
      },
      position: "bottom-center",
      duration: 1000000000,
    })
    if (action === "insert-after") {
      editorAction.insertText(`${editorSelectedContent}\n\n`, monacoInstance!)
    }
    const data = res?.data
    const reader = data?.getReader()
    const decoder = new TextDecoder()
    let done = false
    while (!done && !stopGeneration) {
      const { value, done: doneReading } = (await reader?.read()) as any
      done = doneReading
      const chunkValue = decoder.decode(value)
      if (action === "insert" || action === "insert-after") {
        editorAction.insertText(chunkValue, monacoInstance!)
      } else if (action === "set") {
        editorAction.setText(chunkValue, monacoInstance!)
      }
    }
    setRequestingToAPI(false)
    toast.dismiss(stopToast)
  }

  return (
    <>
      <div className="no-scrollbar max-h-[51vh] space-y-4 overflow-y-scroll">
        <Button
          onClick={() => {
            handleClick({
              messages: [
                {
                  role: "system",
                  content: PROMPT.standardize_format,
                },
                {
                  role: "user",
                  content: editorSelectedContent,
                },
              ],
            })
          }}
          variant="outline"
          className="flex w-full justify-center px-6  "
        >
          Standardize format
        </Button>
        <Button
          onClick={() => {
            handleClick({
              messages: [
                {
                  role: "system",
                  content: PROMPT.concise_expression,
                },
                {
                  role: "user",
                  content: editorSelectedContent,
                },
              ],
            })
          }}
          variant="outline"
          className="flex w-full justify-center px-6 "
        >
          Concise expression
        </Button>
        <Button
          onClick={() => {
            handleClick({
              messages: [
                {
                  role: "system",
                  content: PROMPT.rephrase_text,
                },
                {
                  role: "user",
                  content: editorSelectedContent,
                },
              ],
            })
          }}
          variant="outline"
          className="flex w-full justify-center px-6 "
        >
          Rephrase
        </Button>
        <Button
          onClick={() => {
            handleClick(
              {
                messages: [
                  {
                    role: "system",
                    content: PROMPT.document_code,
                  },
                  {
                    role: "user",
                    content: editorSelectedContent,
                  },
                ],
              },
              "insert-after"
            )
          }}
          variant="outline"
          className="flex w-full justify-center px-6 "
        >
          Document code
        </Button>
        <Button
          onClick={() => {
            handleClick({
              messages: [
                {
                  role: "system",
                  content: PROMPT.optimize_headings,
                },
                {
                  role: "user",
                  content: editorSelectedContent,
                },
              ],
            })
          }}
          variant="outline"
          className="flex w-full justify-center px-6 "
        >
          Optimize headings
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
                handleClick({
                  messages: [
                    {
                      role: "system",
                      content: PROMPT.convert_code.replace(
                        "{to}",
                        to as string
                      ),
                    },
                    {
                      role: "user",
                      content: editorSelectedContent,
                    },
                  ],
                })
              }}
            >
              <Input
                spellCheck={false}
                autoComplete="off"
                name="to"
                placeholder="To language"
                autoFocus
              />
              <PopoverClose>
                <Button className="mt-3 w-full">Convert</Button>
              </PopoverClose>
            </form>
          </PopoverContent>
        </Popover>
        <Button
          onClick={() => {
            handleClick({
              messages: [
                {
                  role: "system",
                  content: PROMPT.grammar_correction,
                },
                {
                  role: "user",
                  content: editorSelectedContent,
                },
              ],
            })
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
            <div className="max-h-[400px] w-fit overflow-y-scroll">
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
                        handleClick({
                          messages: [
                            {
                              role: "system",
                              content: PROMPT.translate_text.replace(
                                "{language}",
                                language.name
                              ),
                            },
                            {
                              role: "user",
                              content: editorSelectedContent,
                            },
                          ],
                        })
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
        <Button
          onClick={() => {
            handleClick({
              messages: [
                {
                  role: "system",
                  content: PROMPT.accessibility_improvement,
                },
                {
                  role: "user",
                  content: editorSelectedContent,
                },
              ],
            })
          }}
          variant="outline"
          className="flex w-full justify-center px-6 "
        >
          Improve accessibility
        </Button>
        <Button
          onClick={() => {
            handleClick({
              messages: [
                {
                  role: "system",
                  content: PROMPT.code_formatting,
                },
                {
                  role: "user",
                  content: editorSelectedContent,
                },
              ],
            })
          }}
          variant="outline"
          className="flex w-full justify-center px-6 "
        >
          Format codes
        </Button>
        <Button
          onClick={() => {
            handleClick({
              messages: [
                {
                  role: "system",
                  content: PROMPT.bullet_point_optimization,
                },
                {
                  role: "user",
                  content: editorSelectedContent,
                },
              ],
            })
          }}
          variant="outline"
          className="flex w-full justify-center px-6 "
        >
          Optimize bullet points
        </Button>
        <Button
          onClick={() => {
            handleClick({
              messages: [
                {
                  role: "system",
                  content: PROMPT.consistency_check,
                },
                {
                  role: "user",
                  content: editorSelectedContent,
                },
              ],
            })
          }}
          variant="outline"
          className="flex w-full justify-center px-6 "
        >
          Check consistency
        </Button>
        <Button
          onClick={() => {
            handleClick({
              messages: [
                {
                  role: "system",
                  content: PROMPT.embed_media,
                },
                {
                  role: "user",
                  content: editorSelectedContent,
                },
              ],
            })
          }}
          variant="outline"
          className="flex w-full justify-center px-6 "
        >
          Embed media
        </Button>
        <Button
          onClick={() => {
            handleClick(
              {
                messages: [
                  {
                    role: "system",
                    content: PROMPT.fact_checking,
                  },
                  {
                    role: "user",
                    content: editorSelectedContent,
                  },
                ],
              },
              "insert-after"
            )
          }}
          variant="outline"
          className="flex w-full justify-center px-6 "
        >
          Fact check
        </Button>
        <Button
          onClick={() => {
            handleClick({
              messages: [
                {
                  role: "system",
                  content: PROMPT.hyperlink_implementation,
                },
                {
                  role: "user",
                  content: editorSelectedContent,
                },
              ],
            })
          }}
          variant="outline"
          className="flex w-full justify-center px-6 "
        >
          Implement hyperlinks
        </Button>
        <Button
          onClick={() => {
            handleClick(
              {
                messages: [
                  {
                    role: "system",
                    content: PROMPT.technical_explanation,
                  },
                  {
                    role: "user",
                    content: editorSelectedContent,
                  },
                ],
              },
              "insert-after"
            )
          }}
          variant="outline"
          className="flex w-full justify-center px-6 "
        >
          Explain technically
        </Button>
      </div>
      {/* Upgrade to pro dialog */}
      <UpgradeToPRODialog
        open={upgradeToPRODialog}
        setOpen={setUpgradeToPRODialog}
      />
    </>
  )
}

export default AITools
