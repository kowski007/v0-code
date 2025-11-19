import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { walletService } from "@/lib/wallet-service"

export async function POST(req: NextRequest) {
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

    const { amount, bankName, accountNumber, accountName } = await req.json()

    if (!amount || !bankName || !accountNumber || !accountName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const result = await walletService.initiateWithdrawal(
      user.id,
      amount,
      bankName,
      accountNumber,
      accountName
    )

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error: any) {
    console.error("Error initiating withdrawal:", error)
    return NextResponse.json(
      { error: error.message || "Failed to initiate withdrawal" },
      { status: 500 }
    )
  }
}
