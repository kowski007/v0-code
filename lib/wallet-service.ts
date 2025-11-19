import { supabase, supabaseAdmin } from "./supabase"
import { monnifyService } from "./monnify"

interface WalletData {
  id: string
  userId: string
  balance: number
  currency: string
  dvaAccountNumber: string | null
  dvaBankName: string | null
  dvaAccountName: string | null
  dvaReference: string | null
  createdAt: string
  updatedAt: string
}

interface TransactionData {
  id: string
  walletId: string
  type: "credit" | "debit"
  amount: number
  description: string
  providerReference?: string
  status: "pending" | "completed" | "failed"
  metadata?: Record<string, any>
  createdAt: string
}

export class WalletService {
  // Get or create wallet for a user
  async getOrCreateWallet(userId: string): Promise<WalletData> {
    // First, try to get existing wallet
    const { data: existingWallet, error: fetchError } = await supabase
      .from("wallets")
      .select("*")
      .eq("user_id", userId)
      .single()

    if (existingWallet) {
      return {
        id: existingWallet.id,
        userId: existingWallet.user_id,
        balance: existingWallet.balance,
        currency: existingWallet.currency,
        dvaAccountNumber: existingWallet.dva_account_number,
        dvaBankName: existingWallet.dva_bank_name,
        dvaAccountName: existingWallet.dva_account_name,
        dvaReference: existingWallet.dva_reference,
        createdAt: existingWallet.created_at,
        updatedAt: existingWallet.updated_at,
      }
    }

    // If wallet doesn't exist, create one
    const { data: newWallet, error: createError } = await supabase
      .from("wallets")
      .insert([
        {
          user_id: userId,
          balance: 0,
          currency: "NGN",
        },
      ])
      .select()
      .single()

    if (createError || !newWallet) {
      throw new Error("Failed to create wallet")
    }

    return {
      id: newWallet.id,
      userId: newWallet.user_id,
      balance: newWallet.balance,
      currency: newWallet.currency,
      dvaAccountNumber: null,
      dvaBankName: null,
      dvaAccountName: null,
      dvaReference: null,
      createdAt: newWallet.created_at,
      updatedAt: newWallet.updated_at,
    }
  }

  // Create DVA for wallet top-up
  async createDVA(userId: string, userName: string): Promise<any> {
    try {
      // Get user's wallet
      const wallet = await this.getOrCreateWallet(userId)

      // Create DVA via Monnify
      const dvaResponse = await monnifyService.createDVA(userId, userName)

      if (!dvaResponse.data) {
        throw new Error("Failed to get DVA details from Monnify")
      }

      // Update wallet with DVA details
      const { data: updatedWallet, error } = await supabase
        .from("wallets")
        .update({
          dva_account_number: dvaResponse.data.accountNumber,
          dva_bank_name: dvaResponse.data.bankName,
          dva_account_name: dvaResponse.data.accountName,
          dva_reference: dvaResponse.data.accountReference,
        })
        .eq("id", wallet.id)
        .select()
        .single()

      if (error) {
        throw error
      }

      return {
        accountNumber: dvaResponse.data.accountNumber,
        bankName: dvaResponse.data.bankName,
        accountName: dvaResponse.data.accountName,
        instruction: `Transfer the exact amount to this account. Your wallet will be credited automatically.`,
      }
    } catch (error) {
      console.error("Error creating DVA:", error)
      throw error
    }
  }

  // Get wallet balance
  async getBalance(userId: string): Promise<number> {
    const wallet = await this.getOrCreateWallet(userId)
    return wallet.balance
  }

  // Update wallet balance (internal use - typically via webhook)
  async updateBalance(
    walletId: string,
    amount: number,
    type: "credit" | "debit"
  ): Promise<void> {
    const delta = type === "credit" ? amount : -amount

    const { error } = await supabase.rpc("update_wallet_balance", {
      wallet_id: walletId,
      delta,
    })

    if (error) {
      throw error
    }
  }

  // Log transaction
  async logTransaction(
    walletId: string,
    type: "credit" | "debit",
    amount: number,
    description: string,
    providerReference?: string,
    metadata?: Record<string, any>
  ): Promise<TransactionData> {
    const { data: transaction, error } = await supabase
      .from("wallet_transactions")
      .insert([
        {
          wallet_id: walletId,
          type,
          amount,
          description,
          provider_reference: providerReference,
          status: "completed",
          metadata,
        },
      ])
      .select()
      .single()

    if (error || !transaction) {
      throw error || new Error("Failed to log transaction")
    }

    return {
      id: transaction.id,
      walletId: transaction.wallet_id,
      type: transaction.type,
      amount: transaction.amount,
      description: transaction.description,
      providerReference: transaction.provider_reference,
      status: transaction.status,
      metadata: transaction.metadata,
      createdAt: transaction.created_at,
    }
  }

  // Initiate withdrawal
  async initiateWithdrawal(
    userId: string,
    amount: number,
    bankName: string,
    accountNumber: string,
    accountName: string
  ): Promise<any> {
    try {
      const wallet = await this.getOrCreateWallet(userId)

      if (wallet.balance < amount) {
        throw new Error("Insufficient wallet balance")
      }

      // Get bank code (simplified - in production, use a complete bank lookup)
      const bankCodes: Record<string, string> = {
        "GTBank": "058",
        "Access": "044",
        "UBA": "033",
        "Zenith": "057",
        "Wema": "035",
      }

      const bankCode = bankCodes[bankName] || "058"

      // Initiate payout via Monnify
      const payoutResponse = await monnifyService.initiatePayout(
        amount,
        accountNumber,
        bankCode,
        accountName,
        `PromptGuy Wallet Withdrawal`
      )

      // Create pending transaction
      await this.logTransaction(
        wallet.id,
        "debit",
        amount,
        `Withdrawal to ${bankName} - ${accountNumber}`,
        payoutResponse.data?.transactionReference,
        { bankName, accountNumber }
      )

      // Update balance immediately
      await this.updateBalance(wallet.id, amount, "debit")

      return {
        status: "success",
        message: `Withdrawal of ₦${amount} initiated. It will reach your account within 24 hours.`,
        reference: payoutResponse.data?.transactionReference,
      }
    } catch (error) {
      console.error("Error initiating withdrawal:", error)
      throw error
    }
  }

  // Get transaction history
  async getTransactionHistory(
    userId: string,
    limit: number = 50
  ): Promise<TransactionData[]> {
    const wallet = await this.getOrCreateWallet(userId)

    const { data: transactions, error } = await supabase
      .from("wallet_transactions")
      .select("*")
      .eq("wallet_id", wallet.id)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) {
      throw error
    }

    return transactions?.map((t: any) => ({
      id: t.id,
      walletId: t.wallet_id,
      type: t.type,
      amount: t.amount,
      description: t.description,
      providerReference: t.provider_reference,
      status: t.status,
      metadata: t.metadata,
      createdAt: t.created_at,
    })) || []
  }
}

export const walletService = new WalletService()
