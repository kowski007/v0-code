# PromptGuy Wallet System Setup Guide

## Architecture Overview

```
Frontend (React/Next.js)
    ↓
Supabase Auth & Database
    ↓
Next.js API Routes
    ↓
Monnify DVA API (Deposits)
Monnify Payout API (Withdrawals)
```

## Setup Instructions

### 1. Supabase Setup

1. Create a Supabase project at https://supabase.com
2. Go to your project dashboard
3. Run the SQL queries from `lib/database.sql` in the SQL Editor

```sql
-- Copy all content from lib/database.sql and run in Supabase SQL Editor
```

4. Get your credentials:
   - Go to Settings → API
   - Copy `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - Copy `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Copy `service_role secret` → `SUPABASE_SERVICE_ROLE_KEY`

### 2. Monnify Setup

1. Create a Monnify account at https://monnify.com
2. Go to Settings → API Keys
3. Copy your credentials:
   - API Key → `NEXT_PUBLIC_MONNIFY_API_KEY`
   - Secret Key → `MONNIFY_SECRET_KEY`
   - Contract Code → `NEXT_PUBLIC_MONNIFY_CONTRACT_CODE`

4. Set up Webhook URL in Monnify:
   - Go to Settings → Webhooks
   - Add webhook: `https://yourapp.com/api/wallet/webhook`
   - Event: `TRANSFER.SUCCESS`

### 3. Environment Variables

Create `.env.local` with:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx

# Monnify
NEXT_PUBLIC_MONNIFY_API_KEY=xxxxx
MONNIFY_SECRET_KEY=xxxxx
NEXT_PUBLIC_MONNIFY_CONTRACT_CODE=xxxxx

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Install Dependencies

```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs axios
```

### 5. Run Development Server

```bash
npm run dev
```

## Features

### User Wallet Pages

- **`/auth`** - Sign up / Login
- **`/wallet`** - View balance, transactions, account details
- **`/wallet/deposit`** - Get DVA account to receive transfers
- **`/wallet/withdraw`** - Withdraw to bank account

### API Endpoints

- `GET /api/wallet` - Get wallet info
- `POST /api/wallet/dva` - Create/get DVA
- `POST /api/wallet/withdraw` - Initiate withdrawal
- `GET /api/wallet/transactions` - Get transaction history
- `POST /api/wallet/webhook` - Monnify webhook handler

### Database Schema

**wallets**
- user_id (FK to auth.users)
- balance (decimal)
- currency (NGN)
- dva_account_number
- dva_bank_name
- dva_account_name
- dva_reference

**wallet_transactions**
- wallet_id (FK)
- type (credit/debit)
- amount
- description
- provider_reference
- status
- metadata

## Integration with Voice Agent

To call wallet from ElevenLabs agent:

```javascript
// Get wallet balance
const response = await fetch("/api/wallet", {
  headers: {
    Authorization: `Bearer ${userToken}`
  }
});

// Initiate withdrawal
const response = await fetch("/api/wallet/withdraw", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${userToken}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    amount: 5000,
    bankName: "GTBank",
    accountNumber: "0123456789",
    accountName: "John Doe"
  })
});
```

## Voice Agent Tool Definition

For ElevenLabs agent function calling:

```json
{
  "name": "check_wallet_balance",
  "description": "Check the user's PromptGuy wallet balance",
  "parameters": {
    "type": "object",
    "properties": {}
  }
}
```

```json
{
  "name": "initiate_wallet_withdrawal",
  "description": "Withdraw money from wallet to bank account",
  "parameters": {
    "type": "object",
    "properties": {
      "amount": {"type": "number"},
      "bankName": {"type": "string"},
      "accountNumber": {"type": "string"},
      "accountName": {"type": "string"}
    },
    "required": ["amount", "bankName", "accountNumber", "accountName"]
  }
}
```

## Testing

1. Sign up at `/auth`
2. Go to `/wallet`
3. Click "Add Funds"
4. Transfer money to your DVA account
5. Wallet balance updates automatically via webhook
6. Withdraw to your bank account

## Security Notes

- All sensitive keys stored in `.env.local` (server-side only)
- Monnify webhook signature verified
- Supabase RLS policies recommended (add later)
- Rate limiting on API endpoints recommended
- User authentication required for all wallet endpoints

## Troubleshooting

### Wallet not crediting after transfer
- Check Monnify webhook configuration
- Verify webhook URL is accessible
- Check server logs for errors

### DVA not created
- Verify Monnify credentials are correct
- Check API key has correct permissions
- Ensure contract code is valid

### Auth issues
- Clear browser cookies
- Check Supabase auth settings
- Verify redirect URLs in Supabase

## Next Steps

1. Add RLS policies to Supabase tables
2. Add rate limiting to API routes
3. Add error handling and logging
4. Test webhook in production
5. Add more wallet features (transfers between users, etc.)
