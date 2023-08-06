import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import { PostCodesType } from "types"

import { Button } from "../ui/button"

interface SaveButtonProps {
  isSaving: boolean
  postCodes: PostCodesType[]
  onSave: () => void
  onSaved: () => void
}

async function handleSave(postCodes: PostCodesType[], markdownId: string) {
  const response = await fetch(`/api/posts/${String(markdownId)}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postCodes,
    }),
  })

  if (!response?.ok) {
    console.error(response)
    return false
  }
  return true
}

function SaveButton({ isSaving, postCodes, onSave, onSaved }: SaveButtonProps) {
  const pathname = usePathname()
  const markdownId = pathname.split("/")[2]
  const saveButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const intervalId = setInterval(() => {
      saveButtonRef.current?.click()
    }, 35000)
    return () => {
      clearInterval(intervalId)
    }
  }, [saveButtonRef])

  return (
    <Button
      disabled={isSaving}
      variant={isSaving ? "outline" : "default"}
      ref={saveButtonRef}
      onClick={async () => {
        onSave()
        const res = await handleSave(postCodes, markdownId)
        if (res) {
          onSaved()
        } else {
          onSaved()
          toast("Something went wrong.", {
            description: "Your markdown was not saved. Please try again.",
          })
        }
      }}
      className="mr-4"
    >
      {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{" "}
      {isSaving ? "Saving" : "Save"}
    </Button>
  )
}

export default SaveButton
