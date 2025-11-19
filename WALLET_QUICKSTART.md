# PromptGuy Wallet - Quick Start (5 Minutes)

## What You Just Got

A complete wallet system with:
- User authentication
- Dedicated Virtual Accounts (DVA) for deposits
- Bank withdrawal support
- Transaction history
- Beautiful UI
- Ready for Vercel

## Quick Setup (Copy-Paste)

### Step 1: Create `.env.local`

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and fill in:

```env
# Get from https://supabase.com (your project settings)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx_your_key_xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx_your_key_xxxxx

# Get from https://monnify.com (settings > API)
NEXT_PUBLIC_MONNIFY_API_KEY=MK_LIVE_xxxxx
MONNIFY_SECRET_KEY=SK_LIVE_xxxxx
NEXT_PUBLIC_MONNIFY_CONTRACT_CODE=xxxxx

# No change needed
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 2: Create Supabase Project

1. Go to https://supabase.com
2. Click "New Project"
3. Enter project name: "promptguy"
4. Enter password (save it!)
5. Choose region closest to Nigeria
6. Click "Create new project"
7. Wait for it to finish (~2 minutes)
8. Go to Settings → API
9. Copy your URL and keys into `.env.local`

### Step 3: Run Database Schema

In Supabase dashboard:

1. Go to SQL Editor
2. Click "New Query"
3. Open `lib/database.sql` from your project
4. Copy all the SQL
5. Paste into Supabase SQL Editor
6. Click "Run"

### Step 4: Configure Monnify

1. Go to https://monnify.com/signup
2. Sign up for account
3. Complete KYC
4. Go to Settings → API & Webhooks
5. Copy API Key, Secret Key, Contract Code to `.env.local`
6. In Webhooks section, add:
   - URL: `http://localhost:3000/api/wallet/webhook` (for testing)
   - Event: `TRANSFER.SUCCESS`
   - Click "Add Webhook"

### Step 5: Test Locally

```bash
npm install
npm run dev
```

Then visit:
- http://localhost:3000 (home)
- http://localhost:3000/auth (sign up)
- http://localhost:3000/wallet (your wallet)

## Test the Full Flow

1. **Sign up**: Create account at `/auth`
2. **View wallet**: Go to `/wallet` (balance = ₦0)
3. **Add funds**: Click "Add Funds"
4. **See DVA**: Copy the account details
5. **Deposit**: Transfer money from your bank (it will be auto-credited)
6. **Withdraw**: Click "Withdraw" to send money back to your bank

## Deploy to Vercel

1. **Push to GitHub**
```bash
git add .
git commit -m "Add wallet system"
git push origin main
```

2. **Deploy**
   - Go to https://vercel.com
   - Click "Import Project"
   - Select your repo
   - Add environment variables (same as `.env.local`)
   - Click "Deploy"

3. **Update Monnify Webhook**
   - In Monnify dashboard:
   - Change webhook URL to: `https://yourdomain.vercel.app/api/wallet/webhook`
   - Save

4. **Test Deposits**
   - Transfer money to your DVA
   - Should see ₦ appear in your wallet within 5 seconds

## Common Issues

### "Unauthorized" when accessing wallet
→ You need to sign in at `/auth` first

### DVA not created
→ Check Monnify API keys in `.env.local`

### Wallet not crediting after transfer
→ Check Monnify webhook is set up correctly
→ Check server logs for errors

### "No environment variables"
→ Make sure `.env.local` is in root folder
→ Restart dev server after adding `.env.local`

## File Locations

New files created:
```
/app/api/wallet/*          - All wallet API routes
/app/auth/page.tsx         - Login page
/app/wallet/*              - Wallet pages
/components/auth-navigation.tsx - User menu
/lib/supabase.ts           - Supabase setup
/lib/monnify.ts            - Monnify API
/lib/wallet-service.ts     - Wallet logic
/lib/database.sql          - Database schema
```

## Pages You Can Visit

- `/` → Home page
- `/auth` → Sign up / Login
- `/wallet` → Main wallet dashboard
- `/wallet/deposit` → Add funds
- `/wallet/withdraw` → Withdraw

## Next: Connect to Voice Agent

Once wallet is working, add to ElevenLabs agent:

```python
# In your agent function calling handler:
@agent.tool
def get_wallet_balance(user_id):
    response = requests.get(
        f"{APP_URL}/api/wallet",
        headers={"Authorization": f"Bearer {user_token}"}
    )
    return response.json()
```

## Documentation

- See `WALLET_SETUP.md` for full setup guide
- See `WALLET_IMPLEMENTATION.md` for what was built
- See `lib/database.sql` for database schema
- See `lib/wallet-service.ts` for business logic

## Support

Need help?
1. Check error messages in browser console
2. Check server logs: `npm run dev` output
3. Check Supabase dashboard for database status
4. Check Monnify API status page

## Ready?

```bash
npm run dev
# Visit http://localhost:3000/auth
```

Let's go! 🚀
