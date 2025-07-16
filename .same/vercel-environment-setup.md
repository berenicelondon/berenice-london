# 🔐 Vercel Environment Variables Setup Guide

## Step-by-Step Environment Variables Configuration

### 📍 When to Use This Guide:
**AFTER** you've uploaded `berenice-london-vercel-deploy.zip` to Vercel and the initial deployment is complete.

### 🚀 Step 1: Access Your Vercel Project Dashboard

1. **Go to**: https://vercel.com/dashboard
2. **Find your project**: Look for "berenice-london" or the project name you chose
3. **Click on the project** to open the project dashboard

### ⚙️ Step 2: Navigate to Environment Variables

1. **Click the "Settings" tab** at the top of your project dashboard
2. **Scroll down** to find "Environment Variables" section
3. **Click "Environment Variables"** in the left sidebar

### 🔑 Step 3: Add Required Environment Variables

**Add each variable by clicking "Add New" and filling in:**

#### Variable 1: Stripe Publishable Key
```
Name: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
Value: pk_test_51xxxxx... (your actual Stripe publishable key)
Environments: ✅ Production ✅ Preview ✅ Development
```

#### Variable 2: Stripe Secret Key
```
Name: STRIPE_SECRET_KEY
Value: sk_test_51xxxxx... (your actual Stripe secret key)
Environments: ✅ Production ✅ Preview ✅ Development
```

#### Variable 3: Stripe Webhook Secret
```
Name: STRIPE_WEBHOOK_SECRET
Value: whsec_xxxxx... (your actual webhook secret)
Environments: ✅ Production ✅ Preview ✅ Development
```

#### Variable 4: App URL
```
Name: NEXT_PUBLIC_APP_URL
Value: https://your-project-name.vercel.app (use your actual Vercel URL)
Environments: ✅ Production ✅ Preview ✅ Development
```

#### Variable 5: Node Environment
```
Name: NODE_ENV
Value: production
Environments: ✅ Production
```

#### Variable 6: Performance Optimization (Optional)
```
Name: NODE_OPTIONS
Value: --max-old-space-size=4096
Environments: ✅ Production ✅ Preview ✅ Development
```

#### Variable 7: Disable Telemetry (Optional)
```
Name: NEXT_TELEMETRY_DISABLED
Value: 1
Environments: ✅ Production ✅ Preview ✅ Development
```

### 🔍 Step 4: Get Your Stripe Keys

#### For Test/Development Keys:
1. **Go to**: https://dashboard.stripe.com/test
2. **Switch to "Test mode"** (toggle in top-right)
3. **Navigate**: Developers → API Keys
4. **Copy**:
   - **Publishable key**: Starts with `pk_test_`
   - **Secret key**: Click "Reveal live key" and copy (starts with `sk_test_`)

#### For Webhook Secret:
1. **Go to**: Developers → Webhooks in Stripe dashboard
2. **Create endpoint** (if not exists):
   - URL: `https://your-project-name.vercel.app/api/stripe/webhook`
   - Events: Select `payment_intent.succeeded`, `payment_intent.payment_failed`, `checkout.session.completed`
3. **Copy webhook secret**: Click on your webhook → Copy signing secret (starts with `whsec_`)

### ✅ Step 5: Save and Redeploy

1. **Save each variable** after entering it
2. **After adding all variables**, go to "Deployments" tab
3. **Click "Redeploy"** on the latest deployment
4. **Wait for redeployment** to complete (2-3 minutes)

### 🧪 Step 6: Test Environment Variables

**Visit your site and check:**
- ✅ No console errors about missing environment variables
- ✅ Stripe checkout loads properly
- ✅ Payment forms initialize correctly
- ✅ No "undefined" values in payment fields

### 🚨 Common Issues & Solutions:

#### Issue: "Stripe key not found"
**Solution**: Double-check `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set correctly

#### Issue: "Webhook signature verification failed"
**Solution**: Ensure `STRIPE_WEBHOOK_SECRET` matches your Stripe webhook endpoint

#### Issue: Variables not taking effect
**Solution**:
1. Check you selected all environments (Production, Preview, Development)
2. Redeploy after adding variables
3. Clear browser cache and refresh

### 🔄 Environment-Specific Setup:

#### Production Environment:
- Use **live Stripe keys** when ready to go live
- Change `pk_test_` to `pk_live_` and `sk_test_` to `sk_live_`
- Update webhook URL to your custom domain

#### Development/Preview:
- Keep **test Stripe keys** for development
- Use Vercel preview URLs for testing

### 📞 Need Help?

If you encounter issues:
1. **Check Vercel Function Logs**: Go to Functions tab in Vercel dashboard
2. **Verify Stripe Dashboard**: Ensure webhook endpoint is active
3. **Test API Routes**: Visit `/api/stripe/create-payment-intent` to check if it responds

### ✅ Success Indicators:

When properly configured, you should see:
- ✅ **Checkout page loads** without errors
- ✅ **Stripe payment form** appears correctly
- ✅ **Test payments** can be initiated
- ✅ **Webhook events** are received (check Stripe dashboard)
- ✅ **All site features** work as expected

**Next Step**: Once environment variables are working, proceed to domain setup!
