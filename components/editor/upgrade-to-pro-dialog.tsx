"use client"

import React from "react"
import { useRouter } from "next/navigation"

import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"

function UpgradeToPRODialog({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const router = useRouter()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Upgrade to PRO
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="w-full px-8 text-center">
          The free plan includes 3 credits for AI features. Upgrade to the PRO
          plan for unlimited AI access.
        </DialogDescription>

        <div className="mt-4 flex w-full space-x-4">
          <Button
            onClick={() => {
              setOpen(false)
            }}
            variant="outline"
            className="mt-2 w-full"
          >
            Cancel
          </Button>
          <Button
            onClick={() => router.push("/dashboard/billing")}
            className="mt-2 w-full"
          >
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UpgradeToPRODialog
