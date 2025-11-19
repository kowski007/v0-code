# 🚀 PromptGuy Wallet - Deployment Checklist

## Pre-Deployment (Complete Before Going Live)

### Local Development ✓
- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Create `.env.local` file
- [ ] Add all environment variables
- [ ] Run `npm run dev`
- [ ] Test at http://localhost:3000

### Functionality Testing ✓
- [ ] Sign up works at `/auth`
- [ ] Login works
- [ ] Wallet loads at `/wallet`
- [ ] Balance displays correctly (₦0 initially)
- [ ] "Add Funds" button navigates to deposit page
- [ ] DVA account displays
- [ ] "Withdraw" button navigates to withdraw page
- [ ] Form validation works
- [ ] Error messages display properly

### Supabase Setup ✓
- [ ] Create Supabase project
- [ ] Get Project URL
- [ ] Get Anon Key
- [ ] Get Service Role Key
- [ ] Run database schema from `lib/database.sql`
- [ ] Verify tables created:
  - [ ] `wallets` table exists
  - [ ] `wallet_transactions` table exists
  - [ ] `update_wallet_balance` function exists
- [ ] Enable Auth (should be on by default)
- [ ] Configure redirect URLs for auth

### Monnify Setup ✓
- [ ] Create Monnify account
- [ ] Complete KYC verification
- [ ] Get API Key
- [ ] Get Secret Key
- [ ] Get Contract Code
- [ ] Configure webhook in Monnify dashboard:
  - [ ] URL: `http://localhost:3000/api/wallet/webhook`
  - [ ] Event: `TRANSFER.SUCCESS`
  - [ ] Save and verify

### Local Testing with Real Money (Optional) ✓
- [ ] Make small test transfer (₦100)
- [ ] Confirm wallet credits automatically
- [ ] Check transaction in `/wallet` history
- [ ] Test withdrawal with ₦50
- [ ] Confirm withdrawal initiated

---

## Deployment to Vercel

### Step 1: Push to GitHub ✓
```bash
git add .
git commit -m "Add PromptGuy wallet system"
git push origin main
```
- [ ] Code pushed to GitHub
- [ ] No `.env.local` committed (should be in `.gitignore`)

### Step 2: Connect to Vercel ✓
- [ ] Go to https://vercel.com
- [ ] Import project from GitHub
- [ ] Select your repository
- [ ] Configure project settings

### Step 3: Set Environment Variables ✓
In Vercel Project Settings → Environment Variables:
```
NEXT_PUBLIC_SUPABASE_URL = [your-supabase-url]
NEXT_PUBLIC_SUPABASE_ANON_KEY = [your-anon-key]
SUPABASE_SERVICE_ROLE_KEY = [your-service-role-key]
NEXT_PUBLIC_MONNIFY_API_KEY = [your-monnify-api-key]
MONNIFY_SECRET_KEY = [your-monnify-secret-key]
NEXT_PUBLIC_MONNIFY_CONTRACT_CODE = [your-contract-code]
NEXT_PUBLIC_APP_URL = https://[your-domain].vercel.app
```
- [ ] All variables added
- [ ] Variables saved

### Step 4: Deploy ✓
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete (3-5 mins)
- [ ] Check deployment status
- [ ] Verify build succeeded

### Step 5: Test Deployment ✓
- [ ] Visit `https://yourdomain.vercel.app`
- [ ] Test signup at `/auth`
- [ ] Test wallet at `/wallet`
- [ ] Test deposit page
- [ ] Test withdraw page
- [ ] Check for any console errors

---

## Post-Deployment Configuration

### Supabase Auth Redirect URLs ✓
In Supabase Dashboard → Authentication → URL Configuration:
- [ ] Add production domain to Authorized Redirect URLs:
  - `https://yourdomain.vercel.app/auth/callback`
  - `https://yourdomain.vercel.app`

### Monnify Production Configuration ✓
- [ ] Switch API keys to production keys (not sandbox)
- [ ] Update webhook URL in Monnify:
  - Old: `http://localhost:3000/api/wallet/webhook`
  - New: `https://yourdomain.vercel.app/api/wallet/webhook`
- [ ] Save webhook configuration
- [ ] Test webhook triggers properly

### Verify Production Webhook ✓
- [ ] Make test transfer in production
- [ ] Confirm wallet credits within 5 seconds
- [ ] Check Monnify webhook logs
- [ ] Verify no errors in Vercel logs

---

## Production Testing

### Smoke Tests ✓
- [ ] User signup works
- [ ] User login works
- [ ] Wallet displays correctly
- [ ] Navigation works
- [ ] Mobile responsiveness OK

### Full User Flow ✓
1. **Deposit Flow**
   - [ ] Sign up new account
   - [ ] Navigate to wallet
   - [ ] Click "Add Funds"
   - [ ] See DVA account
   - [ ] Transfer small amount
   - [ ] Wallet credits automatically

2. **Withdrawal Flow**
   - [ ] Click "Withdraw"
   - [ ] Enter amount, bank, account
   - [ ] Submit
   - [ ] See confirmation
   - [ ] Check transaction history

3. **Voice Agent (if connected)**
   - [ ] Test "What's my balance?"
   - [ ] Test "How do I deposit?"
   - [ ] Test "Withdraw ₦X to my bank"

### Error Handling ✓
- [ ] Try invalid email on signup
- [ ] Try weak password
- [ ] Try insufficient balance withdrawal
- [ ] Test with network disconnected
- [ ] Check error messages are helpful

---

## Monitoring & Maintenance

### Logging ✓
- [ ] Check Vercel logs for errors
- [ ] Monitor Supabase activity
- [ ] Check Monnify webhook logs
- [ ] Set up error notifications

### Performance ✓
- [ ] Page load times acceptable
- [ ] No N+1 database queries
- [ ] API response times < 1s
- [ ] No memory leaks

### Security ✓
- [ ] Environment variables not exposed
- [ ] HTTPS enforced
- [ ] Webhook signatures verified
- [ ] User isolation working
- [ ] Rate limiting enabled (optional)

### Backups ✓
- [ ] Supabase backups enabled
- [ ] Database exports scheduled
- [ ] Code backed up in GitHub
- [ ] Environment variables documented (securely)

---

## Documentation ✓

- [ ] README updated with wallet info
- [ ] API endpoints documented
- [ ] Setup guide created
- [ ] Troubleshooting guide ready
- [ ] Team trained on system

---

## Launch Day Checklist

### Final Checks (24 hours before)
- [ ] All tests passing
- [ ] No errors in logs
- [ ] Database healthy
- [ ] Webhook responding
- [ ] Performance acceptable

### Launch (GO TIME! 🚀)
- [ ] Announce on social media
- [ ] Send to beta users
- [ ] Monitor support channels
- [ ] Watch error logs
- [ ] Ready to scale

### Day 1 Monitoring
- [ ] Check every 2 hours
- [ ] Monitor for errors
- [ ] Track user signups
- [ ] Verify deposits working
- [ ] Test withdrawals
- [ ] Review feedback

---

## Troubleshooting During Launch

### Issue: Webhook not crediting wallet
**Solution:**
- [ ] Check Monnify webhook URL is correct
- [ ] Verify webhook is enabled in Monnify
- [ ] Check Vercel logs for webhook handler errors
- [ ] Confirm MONNIFY_SECRET_KEY is correct
- [ ] Manually test webhook with curl

### Issue: Users can't sign up
**Solution:**
- [ ] Check Supabase auth is enabled
- [ ] Verify NEXT_PUBLIC_SUPABASE_URL is correct
- [ ] Check database connection
- [ ] Review Supabase logs
- [ ] Test auth locally first

### Issue: Withdrawals not processing
**Solution:**
- [ ] Verify Monnify production keys are used
- [ ] Check Monnify account has balance
- [ ] Verify bank code mappings
- [ ] Test with small amount first
- [ ] Check Monnify API status

### Issue: Slow page loads
**Solution:**
- [ ] Check Vercel deployment size
- [ ] Optimize database queries
- [ ] Enable caching
- [ ] Check Supabase performance
- [ ] Review Next.js build size

---

## Post-Launch (Week 1)

### Monitoring ✓
- [ ] Daily error log review
- [ ] Weekly performance review
- [ ] Monitor Monnify API status
- [ ] Check user feedback

### Optimization ✓
- [ ] Fix any bugs found
- [ ] Optimize slow queries
- [ ] Update documentation
- [ ] Improve error messages

### Scaling ✓
- [ ] Monitor user growth
- [ ] Plan for scale
- [ ] Set up alerts
- [ ] Load test if needed

### Communication ✓
- [ ] Update team on metrics
- [ ] Report to stakeholders
- [ ] Plan next features
- [ ] Get user feedback

---

## Rollback Plan (If Needed)

If critical issue found:
1. [ ] Disable wallet feature flag
2. [ ] Revert to previous Vercel deployment
3. [ ] Investigate issue
4. [ ] Fix and test thoroughly
5. [ ] Redeploy
6. [ ] Monitor closely

---

## Success Metrics (After Launch)

### Technical
- [ ] 99% uptime
- [ ] < 1s API response time
- [ ] 0 critical errors
- [ ] Webhook 100% reliability

### User
- [ ] Signups working
- [ ] Deposits auto-crediting
- [ ] Withdrawals processing
- [ ] Voice agent working

### Business
- [ ] Users engaging with wallet
- [ ] Positive feedback
- [ ] No chargebacks
- [ ] Ready to scale

---

## Deployment Timeline

| Phase | Duration | Status |
|-------|----------|--------|
| Setup | 15 min | - |
| Deploy to Vercel | 5 min | - |
| Post-Deployment Config | 10 min | - |
| Testing | 20 min | - |
| Documentation | 10 min | - |
| **Total** | **~1 hour** | - |

---

## Emergency Contacts

- **Supabase Support:** https://supabase.com/support
- **Monnify Support:** support@monnify.com
- **Vercel Support:** https://vercel.com/support
- **Your Team Lead:** [Add contact info]

---

## Sign-Off

- [ ] Development Lead: _________________ Date: _______
- [ ] QA Lead: _________________ Date: _______
- [ ] Product Manager: _________________ Date: _______
- [ ] Security Review: _________________ Date: _______

---

## Notes

```
Add any additional notes, gotchas, or specific requirements here:

[Your notes here]
```

---

**Status: Ready for Deployment ✅**

**Last Updated:** 2024-11-19  
**Next Review:** After first 100 users or 1 week

---

## Quick Reference

### Credentials Needed
```
Supabase:
- URL: https://[xxx].supabase.co
- Anon Key: [xxx]
- Service Key: [xxx]

Monnify:
- API Key: MK_LIVE_[xxx]
- Secret Key: SK_LIVE_[xxx]
- Contract Code: [xxx]

Vercel:
- Domain: [yourdomain].vercel.app
```

### Key URLs
```
Production: https://yourdomain.vercel.app
Auth: https://yourdomain.vercel.app/auth
Wallet: https://yourdomain.vercel.app/wallet
Deposit: https://yourdomain.vercel.app/wallet/deposit
Withdraw: https://yourdomain.vercel.app/wallet/withdraw

API: https://yourdomain.vercel.app/api/wallet/...
Webhook: https://yourdomain.vercel.app/api/wallet/webhook
```

---

**You're all set! 🎉 Let's launch PromptGuy Wallet! 🚀**
