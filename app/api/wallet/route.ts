import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { walletService } from "@/lib/wallet-service"

export async function GET(req: NextRequest) {
  try {
    // Get the session
    const token = req.headers.get("authorization")?.split("Bearer ")[1]

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Verify token and get user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      )
    }

    // Get wallet
    const wallet = await walletService.getOrCreateWallet(user.id)

    return NextResponse.json({
      id: wallet.id,
      balance: wallet.balance,
      currency: wallet.currency,
      dvaAccountNumber: wallet.dvaAccountNumber,
      dvaBankName: wallet.dvaBankName,
      dvaAccountName: wallet.dvaAccountName,
      dvaReference: wallet.dvaReference,
    })
  } catch (error) {
    console.error("Error fetching wallet:", error)
    return NextResponse.json(
      { error: "Failed to fetch wallet" },
      { status: 500 }
    )
  }
}
