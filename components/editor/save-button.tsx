import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { Loader2 } from "lucide-react"

import { PostCodesType } from "types"
import { handleSave } from "@/lib/utils"

import { Button } from "../ui/button"

interface SaveButtonProps {
  isSaving: boolean
  postCodes: PostCodesType[]
  onSave: () => void
  onSaved: () => void
}

function SaveButton({ isSaving, postCodes, onSave, onSaved }: SaveButtonProps) {
  const pathname = usePathname()
  const markdownId = pathname?.split("/")[2]
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
        onSave?.()
        await handleSave(postCodes, markdownId!)
        onSaved?.()
      }}
      className="mr-4"
    >
      {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{" "}
      {isSaving ? "Saving" : "Save"}
    </Button>
  )
}

export default SaveButton
