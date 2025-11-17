"use client"


import { useState } from "react"
import { Button } from "@heroui/react"
import { Mic } from "lucide-react"
import { ConvAI } from "./ConvAI"

export function CtaMicrophone() {
  const [open, setOpen] = useState(false)

  return (
    <div className="w-full py-4 flex justify-center">
      <Button
        isIconOnly
        className="bg-foreground text-background w-14 h-14 flex items-center justify-center"
        radius="full"
        onClick={() => setOpen(true)}
        aria-label="Open chat agent"
      >
        <Mic className="w-6 h-6" />
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-background rounded-xl shadow-xl p-4 max-w-sm w-full relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-3 right-3 text-foreground text-xl leading-none w-6 h-6 flex items-center justify-center hover:opacity-70"
              onClick={() => setOpen(false)}
              aria-label="Close chat agent"
            >
              ×
            </button>
            <ConvAI autoStart={true} />
          </div>
        </div>
      )}
    </div>
  )
}
