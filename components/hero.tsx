"use client"

import { Button } from "@heroui/react"
import Link from "next/link"
import { SegmentedOrb } from "./segmented-orb"
import { ChevronRight } from 'lucide-react'

export function Hero() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 pt-12 pb-0 gap-4">
      {/* Orb */}
      <div className="w-32 h-32 sm:w-40 sm:h-40">
        <SegmentedOrb />
      </div>

      {/* Title Section */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-6">
          <h1 className="text-4xl sm:text-5xl font-semibold text-foreground">
            Welcome to OyaTalk
          </h1>
          <span className="inline-block px-3 py-1 text-xs font-medium text-muted-foreground border border-border rounded-full">
            Experimental
          </span>
        </div>

        <p className="text-lg text-muted-foreground mb-0 leading-relaxed">
          The personal AI voice assistant, built with ElevenLabs Agents.
        </p>
      </div>
    </div>
  )
}
