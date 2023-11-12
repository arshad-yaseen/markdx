import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { CheckIcon, Loader2 } from "lucide-react"

import { PostCodesType } from "types"
import { handleSave } from "@/lib/utils"

import { Button } from "../ui/button"

interface SaveButtonProps {
  postCodes: PostCodesType[]
}

function SaveButton({ postCodes }: SaveButtonProps) {
  const pathname = usePathname()
  const markdownId = pathname?.split("/")[2]
  const saveButtonRef = useRef<HTMLButtonElement>(null)
  const [isSaved, setIsSaved] = useState<boolean>(false)
  const [isSaving, setIsSaving] = useState<boolean>(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      saveButtonRef.current?.click()
    }, 35000)

    return () => clearInterval(intervalId)
  }, [saveButtonRef])

  const savingIcon =
    isSaving && !isSaved ? (
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    ) : isSaved && isSaving ? (
      <CheckIcon className="mr-2 h-4 w-4" />
    ) : null

  return (
    <Button
      disabled={isSaving}
      variant={isSaving ? "outline" : "default"}
      ref={saveButtonRef}
      onClick={async () => {
        setIsSaving(true)
        await handleSave(postCodes, markdownId!)
        setIsSaved(true)
        const timeoutId = setTimeout(() => {
          setIsSaved(false)
          setIsSaving(false)
        }, 1000)
        return () => clearTimeout(timeoutId)
      }}
      className="mr-4"
    >
      {savingIcon}
      {isSaving ? "Saving" : "Save"}
    </Button>
  )
}

export default SaveButton
