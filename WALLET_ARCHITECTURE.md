# PromptGuy Wallet System - Architecture Diagram

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                           │
│  ┌──────────┐  ┌─────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │  Auth    │  │ Wallet  │  │ Deposit  │  │  Withdraw        │ │
│  │  Page    │  │ Page    │  │  Page    │  │  Page            │ │
│  └──────────┘  └─────────┘  └──────────┘  └──────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                          ↑↓
                    API Routes Layer
                          ↑↓
┌─────────────────────────────────────────────────────────────────┐
│                      NEXT.JS API ROUTES                         │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐ │
│  │ /api/wallet  │  │ /api/wallet/ │  │ /api/wallet/webhook   │ │
│  │              │  │   withdraw   │  │                       │ │
│  │ /api/wallet/ │  │              │  │ (Monnify Webhook)     │ │
│  │   dva        │  │ /api/wallet/ │  │                       │ │
│  │              │  │ transactions │  │                       │ │
│  └──────────────┘  └──────────────┘  └───────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
         ↓↓↓                                      ↑
    Business Logic                         Webhook Notifications
         ↓↓↓                                      ↑
┌─────────────────────────────────────────────────────────────────┐
│                    WALLET SERVICE LAYER                         │
│            (lib/wallet-service.ts)                              │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ • Get/Create Wallet                                     │   │
│  │ • Create DVA (Dedicated Virtual Account)               │   │
│  │ • Update Balance                                        │   │
│  │ • Log Transactions                                      │   │
│  │ • Initiate Withdrawal                                   │   │
│  │ • Get Transaction History                               │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
         ↓↓↓                                      ↓↓↓
    Wallet Storage                      Payment Processing
         ↓↓↓                                      ↓↓↓
┌──────────────────────────┐      ┌──────────────────────────────┐
│   SUPABASE DATABASE      │      │   EXTERNAL PAYMENT APIs      │
│  ┌────────────────────┐  │      │  ┌──────────────────────────┐│
│  │ wallets table      │  │      │  │  Monnify                 ││
│  │ • user_id          │  │      │  │  ┌────────────────────┐  ││
│  │ • balance          │  │      │  │  │ • Create DVA       │  ││
│  │ • dva_account_*    │  │      │  │  │ • Initiate Payout  │  ││
│  │ • dva_reference    │  │      │  │  │ • Webhook          │  ││
│  └────────────────────┘  │      │  │  └────────────────────┘  ││
│  ┌────────────────────┐  │      │  │                          ││
│  │ transactions       │  │      │  │ Supabase Auth            ││
│  │ • wallet_id        │  │      │  │ • User signup/login      ││
│  │ • type (±)         │  │      │  │ • Session management     ││
│  │ • amount           │  │      │  └──────────────────────────┘│
│  │ • status           │  │      │                              │
│  │ • metadata         │  │      └──────────────────────────────┘
│  └────────────────────┘  │
│  ┌────────────────────┐  │
│  │ Supabase Auth      │  │
│  │ • users            │  │
│  │ • sessions         │  │
│  └────────────────────┘  │
└──────────────────────────┘
```

## Data Flow - Deposit Flow

```
USER INITIATES DEPOSIT
         ↓
    /wallet/deposit page loads
         ↓
    POST /api/wallet/dva
         ↓
    Wallet Service calls:
    • getOrCreateWallet()
    • monnifyService.createDVA()
         ↓
    Monnify API returns:
    {
      accountNumber: "0123456789",
      bankName: "Wema Bank",
      accountName: "PromptGuy – John Doe"
    }
         ↓
    User sees bank account details
    User transfers money from their bank
         ↓
         ↓ (HOURS LATER)
         ↓
    Monnify detects transfer
    Sends POST to /api/wallet/webhook
         ↓
    Backend verifies webhook signature
    Finds wallet by dva_reference
    Calls updateBalance() → +₦5000
    Logs transaction
    Returns 200 OK
         ↓
    Wallet balance updated
    User sees ₦5000 in wallet
```

## Data Flow - Withdrawal Flow

```
USER INITIATES WITHDRAWAL
         ↓
    /wallet/withdraw page
    Enter: amount, bank, account, name
         ↓
    POST /api/wallet/withdraw
         ↓
    Wallet Service:
    1. Validates balance >= amount
    2. Calls monnifyService.initiatePayout()
    3. Updates balance -₦3000
    4. Logs transaction
    5. Returns success
         ↓
    Monnify:
    1. Receives payout request
    2. Sends to recipient bank via NIP
    3. Returns transaction reference
         ↓
    User sees "Withdrawal initiated"
    Money lands in bank (24 hours)
    Transaction logged
```

## User Authentication Flow

```
UNAUTHENTICATED USER
         ↓
    Clicks navbar "Sign In"
         ↓
    Goes to /auth
         ↓
    Signs up/logs in
         ↓
    Supabase Auth validates
    Returns session token
         ↓
    Stored in browser (secure)
         ↓
    Redirected to /wallet
         ↓
    Token sent with each API request
    Authorization: Bearer <token>
         ↓
    Backend verifies with Supabase
    If valid → returns data
    If invalid → 401 Unauthorized
```

## Database Schema

```
auth.users (Supabase Built-in)
├── id (UUID)
├── email
├── encrypted_password
├── email_confirmed_at
└── created_at

wallets
├── id (UUID PK)
├── user_id (UUID FK → auth.users.id)
├── balance (decimal 15,2)
├── currency (NGN)
├── dva_account_number (varchar)
├── dva_bank_name (varchar)
├── dva_account_name (varchar)
├── dva_reference (varchar UNIQUE)
├── created_at (timestamp)
└── updated_at (timestamp)

wallet_transactions
├── id (UUID PK)
├── wallet_id (UUID FK → wallets.id)
├── type (enum: credit/debit)
├── amount (decimal 15,2)
├── description (text)
├── provider_reference (varchar)
├── status (enum: pending/completed/failed)
├── metadata (jsonb)
└── created_at (timestamp)

Functions:
└── update_wallet_balance(wallet_id, delta)
    Updates balance atomically
```

## API Route Structure

```
/app/api/wallet/
├── route.ts
│   └── GET /api/wallet
│       Returns: { balance, currency, dva_account_number, ... }
│
├── dva/
│   └── route.ts
│       POST /api/wallet/dva
│       Returns: { accountNumber, bankName, accountName, instruction }
│
├── withdraw/
│   └── route.ts
│       POST /api/wallet/withdraw
│       Body: { amount, bankName, accountNumber, accountName }
│       Returns: { status, message, reference }
│
├── transactions/
│   └── route.ts
│       GET /api/wallet/transactions?limit=50
│       Returns: [{ id, type, amount, description, createdAt, ... }]
│
└── webhook/
    └── route.ts
        POST /api/wallet/webhook (from Monnify)
        Body: { paymentReference, amountPaid, accountReference, status }
        Returns: { success, message }
```

## Page Routing

```
/
└── Home page (public)

/auth
└── Authentication (public)
    ├── Sign up form
    └── Sign in form

/wallet (protected)
├── GET user wallet
├── Display balance
├── Show DVA details
└── Transaction history

/wallet/deposit (protected)
├── Generate or get DVA
├── Display bank account
└── Copy-to-clipboard buttons

/wallet/withdraw (protected)
├── Form for withdrawal
├── Bank selector
├── Account entry
└── Amount input
```

## Component Structure

```
layout.tsx
├── Navbar
│   ├── OrbLogo
│   ├── Navigation links
│   ├── ThemeToggle
│   └── AuthNavigation (new)
│       └── User dropdown with wallet link
└── Children pages

auth-navigation.tsx (new)
├── Check if user logged in
├── If not → Show Sign In button
└── If yes → Show wallet dropdown

Pages:
├── /auth/page.tsx
│   └── Tabs for signup/login
├── /wallet/page.tsx
│   ├── Balance card
│   ├── Action buttons
│   ├── DVA info
│   └── Transaction history
├── /wallet/deposit/page.tsx
│   ├── DVA creation
│   ├── Account display
│   └── Copy buttons
└── /wallet/withdraw/page.tsx
    ├── Amount input
    ├── Bank selector
    ├── Account form
    └── Submit button
```

## Security Architecture

```
┌─────────────────────────────────────────────────────┐
│ Client (Browser)                                    │
│ • No API keys stored                                │
│ • Only has Anon Key (limited read)                  │
│ • User session token in secure storage              │
└─────────────────────────────────────────────────────┘
              ↑                           ↓
         HTTPS/TLS                   CORS Validated
              ↓                           ↑
┌─────────────────────────────────────────────────────┐
│ Next.js Backend (API Routes)                        │
│ • Verifies user token with Supabase                 │
│ • Uses Service Role Key (full access)               │
│ • Verifies Monnify webhook signature                │
│ • Never exposes sensitive data to frontend          │
└─────────────────────────────────────────────────────┘
              ↑                           ↓
        Environment Variables         Service Role
              ↓                           ↑
┌─────────────────────────────────────────────────────┐
│ Supabase                                            │
│ • Stores user credentials encrypted                 │
│ • Database isolated per user (RLS optional)         │
│ • Auth token required for queries                   │
└─────────────────────────────────────────────────────┘
              ↑                           ↓
         Encrypted                   Verified
              ↓                           ↑
┌─────────────────────────────────────────────────────┐
│ Monnify                                             │
│ • Webhook signature verification                    │
│ • API key/secret used only server-side              │
│ • No card data stored                               │
│ • PCI DSS compliant                                 │
└─────────────────────────────────────────────────────┘
```

## Deployment Architecture

```
┌──────────────────────────────────────────────────────┐
│ Vercel (Frontend + API)                              │
│ • Hosts Next.js application                          │
│ • Runs API routes                                    │
│ • Environment variables stored securely              │
│ • Auto-deploys on GitHub push                        │
└──────────────────────────────────────────────────────┘
            ↓                              ↓
       HTTPS/TLS                      HTTPS/TLS
            ↓                              ↓
┌──────────────────────────────┐  ┌──────────────────────┐
│ Supabase                     │  │ Monnify              │
│ • PostgreSQL Database        │  │ • DVA Creation       │
│ • Auth Service               │  │ • Payout API         │
│ • Real-time Webhooks         │  │ • Webhook Sender     │
│ • Auto-backups               │  │                      │
└──────────────────────────────┘  └──────────────────────┘
```

This architecture ensures:
✅ Security (no keys exposed)
✅ Scalability (Vercel + Supabase auto-scale)
✅ Reliability (database backups, webhooks)
✅ Performance (API routes are serverless)
✅ Compliance (PCI DSS via Monnify)
