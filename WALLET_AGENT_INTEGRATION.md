# PromptGuy Wallet + ElevenLabs Agent Integration

## How to Connect Wallet to Your Voice Agent

This guide shows you how to add wallet functionality to your ElevenLabs ConvAI agent.

## Overview

Your agent will be able to:
- Check wallet balance by voice
- Help user top up wallet
- Initiate withdrawals
- Tell transaction history

```
User: "PromptGuy, how much do I have in my wallet?"
Agent: "You have ₦12,500 in your wallet."

User: "Top up my wallet with ₦5,000"
Agent: "Transfer ₦5,000 to Wema Bank 0123456789 - PromptGuy John Doe"

User: "Withdraw ₦3,000 to my GTBank"
Agent: "I'll help. What's your GTBank account number?"
```

## Step 1: Get User Token in Agent

When the agent starts, get the user's authentication token:

```javascript
// In your agent initialization
const session = await supabase.auth.getSession()
const userToken = session.data.session?.access_token

// Pass this to the agent context
const agentConfig = {
  token: userToken,
  userId: user.id
}
```

## Step 2: Define Wallet Tools in Agent

Add these tools to your ElevenLabs agent configuration:

### Tool 1: Check Wallet Balance

```json
{
  "name": "check_wallet_balance",
  "description": "Check the user's current wallet balance in PromptGuy",
  "parameters": {
    "type": "object",
    "properties": {}
  }
}
```

### Tool 2: Get Wallet Account (for deposits)

```json
{
  "name": "get_wallet_account",
  "description": "Get the user's DVA (Dedicated Virtual Account) to deposit money",
  "parameters": {
    "type": "object",
    "properties": {}
  }
}
```

### Tool 3: Initiate Withdrawal

```json
{
  "name": "initiate_wallet_withdrawal",
  "description": "Withdraw money from wallet to user's bank account",
  "parameters": {
    "type": "object",
    "properties": {
      "amount": {
        "type": "number",
        "description": "Amount to withdraw in NGN"
      },
      "bankName": {
        "type": "string",
        "description": "Name of bank (GTBank, Access, UBA, Zenith, Wema, Polaris)"
      },
      "accountNumber": {
        "type": "string",
        "description": "10-digit bank account number"
      },
      "accountName": {
        "type": "string",
        "description": "Account name as shown in bank"
      }
    },
    "required": ["amount", "bankName", "accountNumber", "accountName"]
  }
}
```

### Tool 4: Get Transaction History

```json
{
  "name": "get_transaction_history",
  "description": "Get the user's wallet transaction history",
  "parameters": {
    "type": "object",
    "properties": {
      "limit": {
        "type": "number",
        "description": "Number of transactions to retrieve (default: 10)"
      }
    }
  }
}
```

## Step 3: Implement Tool Handlers

Create a function to handle tool calls:

```typescript
// In your ConvAI component or agent handler
async function handleWalletTool(
  toolName: string,
  toolInput: Record<string, any>,
  userToken: string
) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  
  try {
    switch (toolName) {
      case "check_wallet_balance":
        return await checkWalletBalance(userToken, baseUrl)
      
      case "get_wallet_account":
        return await getWalletAccount(userToken, baseUrl)
      
      case "initiate_wallet_withdrawal":
        return await initiateWithdrawal(toolInput, userToken, baseUrl)
      
      case "get_transaction_history":
        return await getTransactionHistory(toolInput, userToken, baseUrl)
      
      default:
        throw new Error(`Unknown wallet tool: ${toolName}`)
    }
  } catch (error) {
    console.error(`Error in wallet tool ${toolName}:`, error)
    throw error
  }
}
```

## Step 4: Implement Individual Tool Functions

```typescript
async function checkWalletBalance(userToken: string, baseUrl: string) {
  const response = await fetch(`${baseUrl}/api/wallet`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })
  
  if (!response.ok) throw new Error("Failed to fetch wallet")
  
  const data = await response.json()
  
  return {
    success: true,
    message: `Your wallet balance is ₦${data.balance.toLocaleString("en-NG")}`,
    balance: data.balance,
    currency: data.currency,
  }
}

async function getWalletAccount(userToken: string, baseUrl: string) {
  const response = await fetch(`${baseUrl}/api/wallet/dva`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
  })
  
  if (!response.ok) throw new Error("Failed to create DVA")
  
  const data = await response.json()
  
  return {
    success: true,
    message: `Transfer money to your account: ${data.data.accountName} at ${data.data.bankName} - ${data.data.accountNumber}. Your wallet will be credited automatically.`,
    accountNumber: data.data.accountNumber,
    bankName: data.data.bankName,
    accountName: data.data.accountName,
  }
}

async function initiateWithdrawal(
  toolInput: any,
  userToken: string,
  baseUrl: string
) {
  const response = await fetch(`${baseUrl}/api/wallet/withdraw`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: toolInput.amount,
      bankName: toolInput.bankName,
      accountNumber: toolInput.accountNumber,
      accountName: toolInput.accountName,
    }),
  })
  
  if (!response.ok) throw new Error("Failed to initiate withdrawal")
  
  const data = await response.json()
  
  return {
    success: true,
    message: data.data.message,
    reference: data.data.reference,
  }
}

async function getTransactionHistory(
  toolInput: any,
  userToken: string,
  baseUrl: string
) {
  const limit = toolInput.limit || 10
  
  const response = await fetch(
    `${baseUrl}/api/wallet/transactions?limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  )
  
  if (!response.ok) throw new Error("Failed to fetch transactions")
  
  const data = await response.json()
  
  const summary = data.data
    .slice(0, 5)
    .map(
      (tx: any) =>
        `${tx.description}: ${tx.type === "credit" ? "+" : "-"}₦${tx.amount} on ${new Date(tx.createdAt).toLocaleDateString()}`
    )
    .join("\n")
  
  return {
    success: true,
    message: `Here are your recent transactions:\n${summary}`,
    transactions: data.data,
  }
}
```

## Step 5: Add Tool Call Handler to ConvAI

In your `ConvAI.tsx` or agent component:

```typescript
"use client"

import { useConversation } from "@elevenlabs/react"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export function ConvAI() {
  const [userToken, setUserToken] = useState<string>("")
  
  const conversation = useConversation({
    mode: "webrtc",
    onToolCall: async (toolCall: any) => {
      // Handle wallet tool calls
      if (toolCall.name.startsWith("wallet_") || 
          ["check_wallet_balance", "get_wallet_account", "initiate_wallet_withdrawal", "get_transaction_history"].includes(toolCall.name)) {
        try {
          const result = await handleWalletTool(
            toolCall.name,
            toolCall.arguments,
            userToken
          )
          
          // Send result back to agent
          conversation.sendToolResult(toolCall.toolCall, result)
        } catch (error) {
          conversation.sendToolResult(toolCall.toolCall, {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
          })
        }
      }
    },
  })
  
  useEffect(() => {
    const getToken = async () => {
      const session = await supabase.auth.getSession()
      setUserToken(session.data.session?.access_token || "")
    }
    
    getToken()
  }, [])
  
  // Rest of ConvAI component...
}
```

## Step 6: Agent Prompting

Add this to your agent system prompt:

```
You have access to wallet management tools.

You can help users:
1. Check their wallet balance
2. Get their bank account details to deposit money
3. Withdraw money to their bank account
4. View transaction history

When a user asks about their wallet:
- First, always check the balance
- Speak naturally about their finances
- Use friendly, conversational language
- Always confirm actions before executing

Example conversations:
User: "How much money do I have?"
You: "Let me check your wallet balance."
[Call check_wallet_balance]
You: "You have ₦12,500 in your PromptGuy wallet."

User: "I want to add money"
You: "I can help. Let me get your bank account details."
[Call get_wallet_account]
You: "Transfer any amount to [bank details]. Your wallet will update automatically."

User: "Send me ₦5,000 to my bank"
You: "I'll help you withdraw ₦5,000. Which bank is it?"
User: "GTBank, account is 0123456789, name is John Doe"
You: "Confirming: ₦5,000 to GTBank 0123456789 - John Doe. Is that right?"
User: "Yes"
[Call initiate_wallet_withdrawal]
You: "Done! Your withdrawal has been initiated. It should arrive within 24 hours."
```

## Step 7: Test the Integration

1. Start your app: `npm run dev`
2. Go to `/chat` and start a conversation
3. Try these voice commands:
   - "How much is in my wallet?"
   - "Show me my account details to deposit"
   - "Withdraw 2000 to my bank"
   - "What did I spend last week?"

## Error Handling

The wallet API returns errors in a standardized format:

```typescript
// If user is not authenticated
{
  error: "Unauthorized",
  status: 401
}

// If API call fails
{
  error: "Failed to fetch wallet",
  status: 500
}

// If insufficient balance
{
  error: "Insufficient wallet balance",
  status: 400
}
```

Handle these in your tool handler:

```typescript
try {
  const result = await handleWalletTool(toolName, toolInput, userToken)
  return result
} catch (error) {
  return {
    success: false,
    error: error instanceof Error ? error.message : "Unknown error occurred"
  }
}
```

## Voice Prompts to Test

Try these voice commands with your agent:

```
1. "What's my wallet balance?"
   → Agent calls check_wallet_balance
   → Agent says: "You have ₦X in your wallet"

2. "How do I top up my wallet?"
   → Agent calls get_wallet_account
   → Agent gives you the bank details to transfer to

3. "I want to withdraw 3000 naira"
   → Agent collects: amount, bank, account, name
   → Agent calls initiate_wallet_withdrawal
   → Agent confirms withdrawal initiated

4. "Show me my recent transactions"
   → Agent calls get_transaction_history
   → Agent lists your last transactions

5. "Add 10000 to my wallet"
   → Agent calls get_wallet_account
   → Agent provides DVA account details
```

## Full Example Integration

See the complete integration example in the `ConvAI.tsx` component - it already has the structure ready, you just need to add the wallet tool handlers.

The agent will then be able to:
- ✅ Check balance by voice
- ✅ Guide user to deposit via DVA
- ✅ Collect info and process withdrawals
- ✅ Provide transaction history
- ✅ Handle errors gracefully

## Testing Webhook

To test the deposit webhook locally:

```bash
# 1. Make a test transfer to your DVA
# (Use real money or Monnify test account)

# 2. Manually trigger webhook in development
curl -X POST http://localhost:3000/api/wallet/webhook \
  -H "Content-Type: application/json" \
  -H "monnify-signature: <signature>" \
  -d '{
    "paymentReference": "test-ref",
    "amountPaid": 5000,
    "accountReference": "PG-userid-123456",
    "status": "PAID",
    "paidOn": "2024-11-19T10:00:00Z"
  }'

# 3. Check if wallet balance updated
```

## Deployment Notes

When deploying to Vercel:
1. Add `NEXT_PUBLIC_APP_URL=https://yourdomain.vercel.app` to env vars
2. Update Monnify webhook URL to production domain
3. Test deposits in production
4. Monitor logs for any webhook issues

That's it! Your voice agent now has a fully functional wallet system! 🎉
