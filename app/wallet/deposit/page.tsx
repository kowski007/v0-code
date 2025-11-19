"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Card, Button, Input, Spinner } from "@heroui/react"
import { ArrowLeft, Copy, Check } from "lucide-react"

export default function DepositPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [dvaInfo, setDvaInfo] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/")
        return
      }

      setUser(user)
      await fetchOrCreateDVA()
    }

    checkAuth()
  }, [router])

  const fetchOrCreateDVA = async () => {
    try {
      setLoading(true)
      const session = await supabase.auth.getSession()
      const token = session.data.session?.access_token

      const response = await fetch("/api/wallet/dva", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()
      setDvaInfo(data.data)
    } catch (error) {
      console.error("Error creating DVA:", error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            isIconOnly
            variant="light"
            onClick={() => router.push("/wallet")}
            className="mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">Add Funds to Wallet</h1>
          <p className="text-foreground/70">
            Transfer money to your PromptGuy wallet account
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Spinner />
          </div>
        ) : dvaInfo ? (
          <>
            {/* Instructions */}
            <Card className="mb-8 p-6 bg-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">How to Fund Your Wallet</h3>
              <ol className="space-y-3 text-foreground/70">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-foreground/20 flex items-center justify-center text-sm font-semibold">
                    1
                  </span>
                  <span>Copy your wallet account details below</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-foreground/20 flex items-center justify-center text-sm font-semibold">
                    2
                  </span>
                  <span>Open your bank app or mobile money service</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-foreground/20 flex items-center justify-center text-sm font-semibold">
                    3
                  </span>
                  <span>Transfer the exact amount to the account</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-foreground/20 flex items-center justify-center text-sm font-semibold">
                    4
                  </span>
                  <span>Your wallet will be credited automatically</span>
                </li>
              </ol>
            </Card>

            {/* Account Details */}
            <Card className="p-6 bg-card border border-border mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-6">Your Wallet Account</h3>

              <div className="space-y-4">
                {/* Account Number */}
                <div>
                  <label className="text-foreground/70 text-sm block mb-2">Account Number</label>
                  <div className="flex gap-2">
                    <Input
                      readOnly
                      value={dvaInfo.accountNumber}
                      className="font-mono"
                      classNames={{
                        input: "text-foreground",
                      }}
                    />
                    <Button
                      isIconOnly
                      onClick={() => copyToClipboard(dvaInfo.accountNumber)}
                      className="bg-foreground text-background"
                    >
                      {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </Button>
                  </div>
                </div>

                {/* Bank Name */}
                <div>
                  <label className="text-foreground/70 text-sm block mb-2">Bank Name</label>
                  <Input
                    readOnly
                    value={dvaInfo.bankName}
                    classNames={{
                      input: "text-foreground",
                    }}
                  />
                </div>

                {/* Account Name */}
                <div>
                  <label className="text-foreground/70 text-sm block mb-2">Account Name</label>
                  <Input
                    readOnly
                    value={dvaInfo.accountName}
                    classNames={{
                      input: "text-foreground",
                    }}
                  />
                </div>
              </div>

              <div className="mt-6 p-4 bg-foreground/5 border border-foreground/10 rounded-lg">
                <p className="text-foreground/70 text-sm">
                  💡 <strong>Tip:</strong> {dvaInfo.instruction}
                </p>
              </div>
            </Card>

            {/* Support */}
            <Card className="p-6 bg-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-3">Having trouble?</h3>
              <p className="text-foreground/70 mb-4">
                If your transfer hasn't arrived after 24 hours, contact our support team.
              </p>
              <Button
                variant="bordered"
                className="border-foreground text-foreground"
                onClick={() => {
                  window.location.href = "mailto:support@promptguy.ng"
                }}
              >
                Contact Support
              </Button>
            </Card>
          </>
        ) : (
          <Card className="p-6 bg-card border border-border text-center">
            <p className="text-foreground/70">Failed to create wallet account. Please try again.</p>
            <Button
              onClick={fetchOrCreateDVA}
              className="mt-4 bg-foreground text-background"
            >
              Retry
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}
