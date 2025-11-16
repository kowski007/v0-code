"use client"

import { Button, Card, CardBody, Chip } from "@heroui/react"
import { useCallback, useState, useEffect, useMemo } from "react"
import { useConversation } from "@elevenlabs/react"
import { cn } from "@/lib/utils"
import { SegmentedOrb } from "./segmented-orb"
import { MicIcon, StopCircle, AlertCircle } from 'lucide-react'

async function requestMicrophonePermission() {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true })
    return true
  } catch (error) {
    console.error("Microphone permission denied:", error)
    return false
  }
}

async function getSignedUrl(): Promise<{ signedUrl: string; isDemo?: boolean }> {
  try {
    const response = await fetch("/api/signed-url")

    if (!response.ok) {
      let errorData
      try {
        errorData = await response.json()
      } catch {
        errorData = { error: `HTTP ${response.status}: ${response.statusText}` }
      }

      throw new Error(errorData.details || errorData.error || `HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()

    if (!data.signedUrl) {
      throw new Error("No signed URL in response")
    }

    return { signedUrl: data.signedUrl, isDemo: data.isDemo }
  } catch (error) {
    console.error("Error in getSignedUrl:", error)
    throw error
  }
}

export function ConvAI() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDemoMode, setIsDemoMode] = useState(false)

  const conversation = useConversation({
    mode: "webrtc",
    onConnect: () => {
      console.log("Connected to conversation")
      setError(null)
    },
    onDisconnect: () => {
      console.log("Disconnected from conversation")
      setIsLoading(false)
    },
    onError: (error) => {
      console.error("Conversation error:", error)
      if (isDemoMode) {
        setError("Demo mode: This is a placeholder connection. Set up your AGENT_ID for real functionality.")
      } else {
        setError(`Conversation error: ${error.message || "Unknown error"}`)
      }
      setIsLoading(false)
    },
  })

  async function startConversation() {
    try {
      setIsLoading(true)
      setError(null)

      const hasPermission = await requestMicrophonePermission()
      if (!hasPermission) {
        setError("Microphone permission is required for voice conversation")
        setIsLoading(false)
        return
      }

      const { signedUrl, isDemo } = await getSignedUrl()

      if (isDemo) {
        setIsDemoMode(true)
        setError(
          "Demo mode: Using placeholder agent ID. Set up your AGENT_ID environment variable for real functionality.",
        )
        setIsLoading(false)
        return
      }

      await conversation.startSession({ signedUrl })
      setIsLoading(false)
    } catch (error) {
      console.error("Error starting conversation:", error)
      setError(error instanceof Error ? error.message : "Failed to start conversation")
      setIsLoading(false)
    }
  }

  const stopConversation = useCallback(async () => {
    try {
      setIsLoading(true)
      await conversation.endSession()
      setError(null)
      setIsDemoMode(false)
    } catch (error) {
      console.error("Error stopping conversation:", error)
      setError(error instanceof Error ? error.message : "Failed to stop conversation")
    } finally {
      setIsLoading(false)
    }
  }, [conversation])

  const isConfigError = error?.includes("AGENT_ID") || error?.includes("ELEVENLABS_API_KEY")
  const isConnected = conversation.status === "connected"

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="text-center">
        {/* Agent Name and Status */}
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-2">
          OyaPrompt
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          How can I help you today?
        </p>

        {/* Voice Orb */}
        <div className="flex justify-center mb-12">
          <div className="w-48 h-48 sm:w-56 sm:h-56">
            <SegmentedOrb 
              isActive={isConnected} 
              isSpeaking={isConnected && conversation.isSpeaking}
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 rounded-lg bg-red-50 border border-red-200 flex gap-3 text-left">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-red-900 text-sm">{isDemoMode ? "Demo Mode" : "Configuration Required"}</div>
              <div className="text-red-800 text-xs mt-1">{error}</div>
            </div>
          </div>
        )}

        {/* Control Button */}
        <div className="flex flex-col gap-3">
          <Button
            isLoading={isLoading}
            isDisabled={isLoading || isConnected}
            onClick={startConversation}
            className="bg-gray-900 text-white font-medium w-full sm:w-auto px-8"
            size="lg"
            startContent={!isLoading && <MicIcon className="w-5 h-5" />}
            radius="full"
          >
            {isLoading ? "Starting..." : "Start a call"}
          </Button>

          {isConnected && (
            <Button
              isLoading={isLoading}
              onClick={stopConversation}
              variant="bordered"
              className="border-gray-300 text-gray-900 font-medium w-full sm:w-auto"
              size="lg"
              startContent={!isLoading && <StopCircle className="w-5 h-5" />}
              radius="full"
            >
              End Conversation
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
