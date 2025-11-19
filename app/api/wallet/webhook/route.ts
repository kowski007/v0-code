import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { walletService } from "@/lib/wallet-service"
import { monnifyService } from "@/lib/monnify"

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get("monnify-signature") || ""

    // Verify webhook signature
    if (!monnifyService.verifyWebhookSignature(body, signature)) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      )
    }

    const payload = JSON.parse(body)

    // Extract transaction details
    const {
      paymentReference,
      amountPaid,
      accountReference,
      status,
      paidOn,
    } = payload

    if (status !== "PAID") {
      return NextResponse.json({
        success: true,
        message: "Webhook received but payment not completed",
      })
    }

    // Find wallet by DVA reference
    const { data: wallet, error: walletError } = await supabaseAdmin
      .from("wallets")
      .select("*")
      .eq("dva_reference", accountReference)
      .single()

    if (walletError || !wallet) {
      console.error("Wallet not found for reference:", accountReference)
      return NextResponse.json(
        { error: "Wallet not found" },
        { status: 404 }
      )
    }

    // Update wallet balance
    await walletService.updateBalance(wallet.id, amountPaid, "credit")

    // Log transaction
    await walletService.logTransaction(
      wallet.id,
      "credit",
      amountPaid,
      "Wallet top-up via bank transfer",
      paymentReference,
      { paidOn, accountReference }
    )

    return NextResponse.json({
      success: true,
      message: "Wallet credited successfully",
    })
  } catch (error) {
    console.error("Webhook processing error:", error)
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    )
  }
}
