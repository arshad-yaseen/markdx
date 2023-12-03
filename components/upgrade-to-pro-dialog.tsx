"use client"

import React from "react"
import { useRouter } from "next/navigation"

import BringApiKey from "@/components/bring-api-key"

import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"

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
          The free plan includes 1 credit for AI features. Upgrade to the PRO
          plan for unlimited AI access.
        </DialogDescription>

        <div className="mt-6 flex w-full flex-col items-center space-x-2">
          <Button
            onClick={() => router.push("/dashboard/billing")}
            className="w-full"
          >
            Upgrade
          </Button>
          <span className="py-1.5">or</span>
          <BringApiKey variant={"outline"} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UpgradeToPRODialog
