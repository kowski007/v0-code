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

    const url = new URL(req.url)
    const limit = parseInt(url.searchParams.get("limit") || "50", 10)

    const transactions = await walletService.getTransactionHistory(user.id, limit)

    return NextResponse.json({
      success: true,
      data: transactions,
    })
  } catch (error: any) {
    console.error("Error fetching transactions:", error)
    return NextResponse.json(
      { error: error.message || "Failed to fetch transactions" },
      { status: 500 }
    )
  }
}
