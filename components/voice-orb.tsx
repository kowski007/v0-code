"use client"

import { cn } from "@/lib/utils"

interface VoiceOrbProps {
  isActive?: boolean
  isSpeaking?: boolean
  className?: string
}

export function VoiceOrb({ isActive = false, isSpeaking = false, className }: VoiceOrbProps) {
  return (
    <div
      className={cn(
        "orb",
        isSpeaking && "orb-pulse",
        className,
      )}
    />
  )
}
