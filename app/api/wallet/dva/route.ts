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

    // Get user profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .single()

    const userName = profile?.full_name || user.email?.split("@")[0] || "User"

    // Create DVA
    const dvaResult = await walletService.createDVA(user.id, userName)

    return NextResponse.json({
      success: true,
      data: {
        accountNumber: dvaResult.accountNumber,
        bankName: dvaResult.bankName,
        accountName: dvaResult.accountName,
        instruction: dvaResult.instruction,
      },
    })
  } catch (error: any) {
    console.error("Error creating DVA:", error)
    return NextResponse.json(
      { error: error.message || "Failed to create DVA" },
      { status: 500 }
    )
  }
}
