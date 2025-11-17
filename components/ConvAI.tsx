"use client"

import { Button, Card, CardBody, Chip } from "@heroui/react"
import { useCallback, useState, useEffect, useMemo } from "react"
import { useConversation } from "@elevenlabs/react"
import { cn } from "@/lib/utils"
import { Orb } from "./orb"
import { MicIcon, StopCircle, AlertCircle } from 'lucide-react'

async function requestMicrophonePermission() {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true })
    return true
  } catch (error) {
    console.error("Microphone permission denied:", error)
    // Provide more specific guidance for the user/dev environment
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

export function ConvAI({ autoStart = false }: { autoStart?: boolean }) {
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
        const msg = typeof error === "string" ? error : (error && typeof error === "object" && "message" in (error as any) ? (error as any).message : String(error))
        setError(`Conversation error: ${msg || "Unknown error"}`)
      }
      setIsLoading(false)
    },
  })

  async function startConversation() {
    try {
      setIsLoading(true)
      setError(null)
      // prevent double-start when already connected or loading
      if (isLoading || conversation.status === "connected") {
        console.log("Conversation already starting or connected")
        setIsLoading(false)
        return
      }

      const hasPermission = await requestMicrophonePermission()
      if (!hasPermission) {
        setError(
          "Microphone permission is required for voice conversation. Please allow microphone access in your browser and try again. If you're in a remote/dev preview (Codespaces / GitHub.dev), microphone access may be blocked—test locally or grant permission in your environment.",
        )
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

      try {
        await conversation.startSession({ signedUrl })
      } catch (err) {
        console.error("startSession failed:", err)
        setError(err instanceof Error ? err.message : String(err))
      } finally {
        setIsLoading(false)
      }
    } catch (error) {
      console.error("Error starting conversation:", error)
      setError(
        error instanceof Error ? error.message : "Failed to start conversation",
      )
      setIsLoading(false)
    }
  }

  // Auto-start if requested
  useEffect(() => {
    if (autoStart) {
      startConversation()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart])

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
    <div className="w-full max-w-2xl mx-auto px-2">
      <div className="text-center">
        {/* Agent Name and Status */}
        <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mb-1">
          OyaTalk
        </h1>
        <p className="text-base text-foreground/70 mb-6">
          How can I help you today?
        </p>

        {/* Voice Orb */}
        <div className="flex justify-center mb-6">
          <div className="w-40 h-40 sm:w-48 sm:h-48">
            <Orb 
              agentState={
                !isConnected 
                  ? null 
                  : conversation.isSpeaking 
                    ? "talking" 
                    : "listening"
              }
              colors={["#CADCFC", "#A0B9D1"]}
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 flex flex-col gap-2 text-left">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-red-900 dark:text-red-200 text-sm">{isDemoMode ? "Demo Mode" : "Configuration Required"}</div>
                <div className="text-red-800 dark:text-red-300 text-xs mt-1 whitespace-pre-wrap">{error}</div>
              </div>
            </div>

            <div className="flex gap-2 mt-2">
              <Button
                onClick={() => startConversation()}
                className="bg-foreground text-background"
                size="sm"
                radius="full"
              >
                Retry
              </Button>

              {isConfigError && (
                <a
                  href="https://github.com/elevenlabs/convai-docs"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-foreground/70 underline self-center"
                >
                  Setup guide
                </a>
              )}
            </div>
          </div>
        )}

        {/* Control Button */}
        <div className="flex flex-row gap-2 justify-center items-center flex-wrap">
          <Button
            isLoading={isLoading}
            isDisabled={isLoading || isConnected}
            onClick={startConversation}
            className="bg-foreground text-background font-medium px-6"
            size="md"
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
              className="border-foreground/30 text-foreground font-medium"
              size="md"
              startContent={!isLoading && <StopCircle className="w-5 h-5" />}
              radius="full"
            >
              End
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
