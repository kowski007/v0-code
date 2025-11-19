"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Card, Button, Tabs } from "@heroui/react"
import { CreditCard, Send, History, Plus } from "lucide-react"

export default function WalletPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [wallet, setWallet] = useState<any>(null)
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

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
      await fetchWallet(user)
    }

    checkAuth()
  }, [router])

  const fetchWallet = async (user: any) => {
    try {
      const session = await supabase.auth.getSession()
      const token = session.data.session?.access_token

      const response = await fetch("/api/wallet", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      setWallet(data)

      // Fetch transactions
      const txResponse = await fetch("/api/wallet/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const txData = await txResponse.json()
      setTransactions(txData.data || [])
    } catch (error) {
      console.error("Error fetching wallet:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Wallet</h1>
          <p className="text-foreground/70">Manage your PromptGuy wallet and transactions</p>
        </div>

        {/* Balance Card */}
        <Card className="mb-8 p-6 bg-card border border-border">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-foreground/70 text-sm mb-2">Wallet Balance</p>
              <h2 className="text-4xl font-bold text-foreground">
                ₦{wallet?.balance?.toLocaleString() || "0"}
              </h2>
            </div>
            <CreditCard className="w-10 h-10 text-foreground/50" />
          </div>
          <p className="text-foreground/60 text-xs">
            Currency: {wallet?.currency || "NGN"}
          </p>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Button
            onClick={() => router.push("/wallet/deposit")}
            className="bg-foreground text-background"
            startContent={<Plus className="w-5 h-5" />}
          >
            Add Funds
          </Button>
          <Button
            onClick={() => router.push("/wallet/withdraw")}
            variant="bordered"
            className="border-foreground text-foreground"
            startContent={<Send className="w-5 h-5" />}
          >
            Withdraw
          </Button>
          <Button
            onClick={() => {
              supabase.auth.signOut()
              router.push("/")
            }}
            variant="light"
            className="text-foreground"
          >
            Sign Out
          </Button>
        </div>

        {/* DVA Information */}
        {wallet?.dvaAccountNumber && (
          <Card className="mb-8 p-6 bg-card border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Your Wallet Account
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-foreground/70 text-sm">Account Number</p>
                <p className="text-foreground font-mono">{wallet.dvaAccountNumber}</p>
              </div>
              <div>
                <p className="text-foreground/70 text-sm">Bank Name</p>
                <p className="text-foreground">{wallet.dvaBankName}</p>
              </div>
              <div>
                <p className="text-foreground/70 text-sm">Account Name</p>
                <p className="text-foreground">{wallet.dvaAccountName}</p>
              </div>
              <p className="text-foreground/60 text-xs pt-2">
                Use this account to top up your wallet. Funds will be credited automatically.
              </p>
            </div>
          </Card>
        )}

        {/* Transaction History */}
        <Card className="p-6 bg-card border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <History className="w-5 h-5" />
            Transaction History
          </h3>
          {transactions.length > 0 ? (
            <div className="space-y-3">
              {transactions.map((tx: any) => (
                <div
                  key={tx.id}
                  className="flex justify-between items-center py-3 border-b border-border/30 last:border-b-0"
                >
                  <div>
                    <p className="text-foreground font-medium">{tx.description}</p>
                    <p className="text-foreground/60 text-xs">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p
                    className={`font-semibold ${
                      tx.type === "credit" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {tx.type === "credit" ? "+" : "-"}₦{tx.amount}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-foreground/60 text-center py-8">
              No transactions yet. Start by adding funds to your wallet.
            </p>
          )}
        </Card>
      </div>
    </div>
  )
}
