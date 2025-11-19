import axios from "axios"
import crypto from "crypto"

const MONNIFY_API_BASE = "https://api.monnify.com"
const API_KEY = process.env.NEXT_PUBLIC_MONNIFY_API_KEY!
const SECRET_KEY = process.env.MONNIFY_SECRET_KEY!
const CONTRACT_CODE = process.env.NEXT_PUBLIC_MONNIFY_CONTRACT_CODE!

interface DVAResponse {
  status: string
  message: string
  data?: {
    accountNumber: string
    accountName: string
    bankName: string
    bankCode: string
    accountReference: string
  }
}

interface PayoutResponse {
  status: string
  message: string
  data?: {
    transactionReference: string
    status: string
  }
}

class MonnifyService {
  private getAuthHeader() {
    const credentials = `${API_KEY}:${SECRET_KEY}`
    const base64Credentials = Buffer.from(credentials).toString("base64")
    return `Basic ${base64Credentials}`
  }

  async createDVA(
    userId: string,
    userName: string
  ): Promise<DVAResponse> {
    try {
      const response = await axios.post(
        `${MONNIFY_API_BASE}/api/v1/bank-transfer/reserved-accounts`,
        {
          accountReference: `PG-${userId}-${Date.now()}`,
          accountName: `PromptGuy – ${userName}`,
          currencyCode: "NGN",
          contractCode: CONTRACT_CODE,
          customerEmail: `user-${userId}@promptguy.ng`,
          customerName: userName,
          getAllAvailableBanks: false,
          preferredBanks: ["035", "005"], // Wema, Polaris
        },
        {
          headers: {
            Authorization: this.getAuthHeader(),
            "Content-Type": "application/json",
          },
        }
      )

      return response.data
    } catch (error) {
      console.error("Error creating DVA:", error)
      throw new Error("Failed to create Dedicated Virtual Account")
    }
  }

  async initiatePayout(
    amount: number,
    accountNumber: string,
    bankCode: string,
    accountName: string,
    narration: string
  ): Promise<PayoutResponse> {
    try {
      const response = await axios.post(
        `${MONNIFY_API_BASE}/api/v1/disbursements`,
        {
          amount,
          reference: `PAYOUT-${Date.now()}`,
          narration,
          destinationBankCode: bankCode,
          destinationAccountNumber: accountNumber,
          destinationAccountName: accountName,
          currency: "NGN",
        },
        {
          headers: {
            Authorization: this.getAuthHeader(),
            "Content-Type": "application/json",
          },
        }
      )

      return response.data
    } catch (error) {
      console.error("Error initiating payout:", error)
      throw new Error("Failed to initiate payout")
    }
  }

  verifyWebhookSignature(body: string, signature: string): boolean {
    const hash = crypto
      .createHmac("sha512", SECRET_KEY)
      .update(body)
      .digest("hex")
    return hash === signature
  }
}

export const monnifyService = new MonnifyService()
