import React, { useEffect, useState } from "react"
import { OPENAI_USAGE_POLICIES } from "@/constants/links"
import { DELETE, GET, POST } from "@/utils/http.utils"
import { isCorrectApiKey, validateApiKey } from "@/utils/openai"
import { ArrowTopRightIcon } from "@radix-ui/react-icons"
import { KeyIcon, Loader2Icon } from "lucide-react"
import { toast } from "sonner"

import { models } from "@/config/ai"
import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const BringApiKey = (props: ButtonProps) => {
  const [apiKey, setApiKey] = useState<string>("")
  const [accepted, setAccepted] = useState<boolean | "indeterminate">(false)
  const [isSecureOpen, setIsSecureOpen] = useState<boolean>(false)
  const [saving, setSaving] = useState<boolean>(false)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [deleting, setDeleting] = useState<boolean>(false)
  const [isApiKeyFromSession, setIsApiKeyFromSession] = useState<boolean>(false)

  const saveApiKey = async (apiKey: string) => {
    if (saving) return
    if (!isCorrectApiKey(apiKey)) {
      toast.error("Incorrect API key")
      return
    }

    setSaving(true)

    const isValid = await validateApiKey(apiKey)

    if (isValid.error) {
      if (isValid.statusCode === 404) {
        await save(models.chat_old)
      } else {
        toast.error(isValid.message)
      }
      setSaving(false)
    } else {
      await save(models.chat)
    }
  }

  const save = async (model: string) => {
    const keyToSave = `${apiKey}::${model}`

    await POST(
      "/api/api-key",
      { apiKey: keyToSave },
      {
        error: "API key not saved",
        showErrorToast: true,
      }
    )

    setSaving(false)
    toast.success("API key saved successfully")
    setIsDialogOpen(false)
    setIsApiKeyFromSession(true)
  }

  const handleDelete = async () => {
    if (deleting) return
    setDeleting(true)

    await DELETE("/api/api-key", {
      error: "API key not deleted",
      showErrorToast: true,
    })

    setDeleting(false)

    toast.success("API key deleted successfully")
    reset()
  }

  const reset = () => {
    setApiKey("")
    setAccepted(false)
    setIsSecureOpen(false)
    setSaving(false)
    setDeleting(false)
    setIsApiKeyFromSession(false)
    setIsDialogOpen(false)
  }

  useEffect(() => {
    getApiKeyFromSession()
  }, [])

  const getApiKeyFromSession = async () => {
    const key_res = await GET<{ apiKey: string }>("/api/api-key", {
      error: "Could not fetch API key",
    })
    if (key_res.apiKey) {
      setAccepted(true)
      setApiKey(key_res.apiKey)
      setIsApiKeyFromSession(true)
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className={cn("w-full", props.className)} {...props}>
          <KeyIcon className="mr-2 inline-block h-4 w-4" />
          {isApiKeyFromSession ? "Change" : "Bring"} OpenAI API Key
        </Button>
      </DialogTrigger>
      <DialogContent className=" md:!rounded-xl md:p-10">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-semibold">
            Your own OpenAI API Key
          </DialogTitle>
          <DialogDescription>
            <p className="text-center tracking-tight text-muted-foreground">
              You need to bring your OpenAI API key to use AI.
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="py-0.5"></div>
        <div className="flex flex-col space-y-5">
          <div className="flex justify-center">
            <Input
              type="text"
              placeholder="Enter your OpenAI API key"
              className="h-11 w-full "
              value={apiKey}
              spellCheck={false}
              onChange={(e) => {
                setApiKey(e.target.value)
              }}
            />
          </div>
          <div className="flex w-full justify-between py-1">
            <div className="flex items-center space-x-2">
              <Checkbox
                onCheckedChange={(checked: boolean) => {
                  setAccepted(checked)
                }}
                checked={accepted}
                id="terms"
              />
              <Label
                onClick={() => {
                  window.open(OPENAI_USAGE_POLICIES, "_blank")
                }}
                className="hover:text-gray-12/80 cursor-pointer text-sm font-medium leading-none transition-colors peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept OpenAI usage policies{" "}
                <ArrowTopRightIcon className="inline-block h-3.5 w-3.5" />
              </Label>
            </div>
            <button
              onClick={() => {
                setIsSecureOpen(!isSecureOpen)
              }}
              className="hover:text-gray-12/80 text-sm font-medium transition-colors"
            >
              Secure?
            </button>
          </div>
          {isSecureOpen && (
            <div className="flex flex-col space-y-5">
              <p className="text-sm text-muted-foreground">
                Your API key is stored exclusively in the session store and is
                encrypted, guaranteeing maximum security and privacy.
              </p>
              <p className="text-sm text-muted-foreground">
                Our website is open source. Check out the code to see how we
                protect your API key!
              </p>
            </div>
          )}
          <div className="py-0.5 "></div>
          <div className="flex w-full justify-end space-x-2">
            {isApiKeyFromSession && (
              <Button
                className="px-6"
                variant={"outline"}
                onClick={() => handleDelete()}
                disabled={saving || deleting}
              >
                <Loader2Icon
                  className={
                    deleting
                      ? "mr-2 inline-block h-4 w-4 animate-spin"
                      : "hidden"
                  }
                />
                Delete
              </Button>
            )}
            <Button
              disabled={
                saving || deleting || !isCorrectApiKey(apiKey) || !accepted
              }
              className="px-6"
              onClick={() => saveApiKey(apiKey)}
            >
              <Loader2Icon
                className={
                  saving ? "mr-2 inline-block h-4 w-4 animate-spin" : "hidden"
                }
              />
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default BringApiKey
