"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Card, Button, Input, Select, SelectItem, Spinner } from "@heroui/react"
import { ArrowLeft } from "lucide-react"

const BANKS = [
  { key: "GTBank", label: "GTBank" },
  { key: "Access", label: "Access Bank" },
  { key: "UBA", label: "UBA" },
  { key: "Zenith", label: "Zenith Bank" },
  { key: "Wema", label: "Wema Bank" },
  { key: "Polaris", label: "Polaris Bank" },
]

export default function WithdrawPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [wallet, setWallet] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    accountName: "",
    amount: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

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
      await fetchWallet()
    }

    checkAuth()
  }, [router])

  const fetchWallet = async () => {
    try {
      setLoading(true)
      const session = await supabase.auth.getSession()
      const token = session.data.session?.access_token

      const response = await fetch("/api/wallet", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      setWallet(data)
    } catch (error) {
      console.error("Error fetching wallet:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.bankName || !formData.accountNumber || !formData.accountName || !formData.amount) {
      setError("Please fill in all fields")
      return
    }

    const amount = parseFloat(formData.amount)
    if (amount <= 0) {
      setError("Amount must be greater than 0")
      return
    }

    if (amount > wallet?.balance) {
      setError("Insufficient wallet balance")
      return
    }

    try {
      setSubmitting(true)
      const session = await supabase.auth.getSession()
      const token = session.data.session?.access_token

      const response = await fetch("/api/wallet/withdraw", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          bankName: formData.bankName,
          accountNumber: formData.accountNumber,
          accountName: formData.accountName,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Withdrawal failed")
      }

      setSuccess(true)
      setFormData({ bankName: "", accountNumber: "", accountName: "", amount: "" })
      
      // Refresh wallet balance
      setTimeout(() => {
        fetchWallet()
        setSuccess(false)
      }, 2000)
    } catch (error: any) {
      setError(error.message || "Withdrawal failed")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    )
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Withdraw Funds</h1>
          <p className="text-foreground/70">Transfer money from your wallet to your bank account</p>
        </div>

        {/* Balance Card */}
        <Card className="mb-8 p-6 bg-card border border-border">
          <p className="text-foreground/70 text-sm mb-2">Available Balance</p>
          <h2 className="text-3xl font-bold text-foreground">
            ₦{wallet?.balance?.toLocaleString() || "0"}
          </h2>
        </Card>

        {/* Withdrawal Form */}
        <Card className="p-6 bg-card border border-border">
          {success && (
            <div className="mb-4 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-green-900 dark:text-green-200">
                ✓ Withdrawal initiated! It will reach your account within 24 hours.
              </p>
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-900 dark:text-red-200">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Amount */}
            <div>
              <label className="text-foreground/70 text-sm block mb-2">Amount (₦)</label>
              <Input
                type="number"
                placeholder="Enter amount to withdraw"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                min="0"
                step="100"
                classNames={{
                  input: "text-foreground",
                }}
              />
            </div>

            {/* Bank */}
            <div>
              <label className="text-foreground/70 text-sm block mb-2">Bank Name</label>
              <Select
                selectedKeys={formData.bankName ? [formData.bankName] : []}
                onChange={(e) =>
                  setFormData({ ...formData, bankName: e.target.value })
                }
                placeholder="Select your bank"
                classNames={{
                  trigger: "bg-card border-foreground/20",
                }}
              >
                {BANKS.map((bank) => (
                  <SelectItem key={bank.key} value={bank.key}>
                    {bank.label}
                  </SelectItem>
                ))}
              </Select>
            </div>

            {/* Account Number */}
            <div>
              <label className="text-foreground/70 text-sm block mb-2">Account Number</label>
              <Input
                type="text"
                placeholder="10 digits"
                value={formData.accountNumber}
                onChange={(e) =>
                  setFormData({ ...formData, accountNumber: e.target.value })
                }
                maxLength={10}
                classNames={{
                  input: "text-foreground",
                }}
              />
            </div>

            {/* Account Name */}
            <div>
              <label className="text-foreground/70 text-sm block mb-2">Account Name</label>
              <Input
                type="text"
                placeholder="Your name as shown in bank"
                value={formData.accountName}
                onChange={(e) =>
                  setFormData({ ...formData, accountName: e.target.value })
                }
                classNames={{
                  input: "text-foreground",
                }}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={submitting}
              isLoading={submitting}
              className="w-full bg-foreground text-background"
            >
              {submitting ? "Processing..." : "Withdraw"}
            </Button>
          </form>

          {/* Warning */}
          <div className="mt-6 p-4 bg-foreground/5 border border-foreground/10 rounded-lg">
            <p className="text-foreground/70 text-sm">
              ⚠️ Withdrawals typically arrive within 24 hours. A ₦35 processing fee will be deducted.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
