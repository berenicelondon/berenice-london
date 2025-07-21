# Environment Variables Setup Guide

## 🔐 Required Environment Variables for Berenice London

### 📊 For Netlify Dashboard:
**Location**: Site Settings → Environment Variables

```bash
# Stripe Payment Integration (REQUIRED)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Application Configuration
NEXT_PUBLIC_APP_URL=https://your-site-name.netlify.app
NODE_ENV=production

# Build Optimization (OPTIONAL)
NEXT_TELEMETRY_DISABLED=1
SKIP_TYPE_CHECK=true
NPM_FLAGS=--legacy-peer-deps
```

### 📊 For Vercel Dashboard:
**Location**: Project Settings → Environment Variables

```bash
# Stripe Payment Integration (REQUIRED)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Application Configuration
NEXT_PUBLIC_APP_URL=https://berenice-london.vercel.app
NODE_ENV=production

# Performance Optimization (OPTIONAL)
NEXT_TELEMETRY_DISABLED=1
NODE_OPTIONS=--max-old-space-size=4096
```

## 🎯 How to Get Stripe Keys

### Test/Development Keys:
1. **Go to Stripe Dashboard**: https://dashboard.stripe.com/test
2. **Switch to Test Mode**: Toggle in top left
3. **Get Publishable Key**:
   - Go to Developers → API Keys
   - Copy "Publishable key" (starts with `pk_test_`)
4. **Get Secret Key**:
   - Copy "Secret key" (starts with `sk_test_`)
   - Click "Reveal live key token" if hidden
5. **Get Webhook Secret**:
   - Go to Developers → Webhooks
   - Create endpoint: `https://your-site.com/api/stripe/webhook`
   - Copy "Signing secret" (starts with `whsec_`)

### Production Keys (When Ready):
1. **Switch to Live Mode**: Toggle in Stripe dashboard
2. **Repeat Same Process**: Get live keys (pk_live_, sk_live_)
3. **Update Environment Variables**: Use production keys for live site

## 📋 Step-by-Step Setup

### For Netlify:
1. **Access Dashboard**: https://app.netlify.com/
2. **Find Your Site**: Click on berenice-london site
3. **Go to Settings**: Click "Site settings"
4. **Environment Variables**: Scroll to "Environment variables"
5. **Add Variables**: Click "Add variable" for each one above
6. **Redeploy**: Go to Deploys → Trigger deploy

### For Vercel:
1. **Access Dashboard**: https://vercel.com/dashboard
2. **Find Your Project**: Click on berenice-london project
3. **Go to Settings**: Click "Settings" tab
4. **Environment Variables**: Scroll to "Environment Variables"
5. **Add Variables**: Click "Add" for each variable above
6. **Choose Environment**: Select Production, Preview, Development
7. **Redeploy**: Go to Deployments → Redeploy

## ⚠️ Security Notes

### DO NOT:
- ❌ Commit secret keys to GitHub
- ❌ Share secret keys in plain text
- ❌ Use production keys in development
- ❌ Hardcode keys in source code

### DO:
- ✅ Use test keys for development
- ✅ Store keys securely in platform dashboards
- ✅ Use different keys for different environments
- ✅ Rotate keys periodically for security

## 🧪 Testing Environment Variables

### Local Testing:
```bash
# Create .env.local (NOT committed to git)
echo "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key" >> .env.local
echo "STRIPE_SECRET_KEY=sk_test_your_key" >> .env.local
echo "STRIPE_WEBHOOK_SECRET=whsec_your_secret" >> .env.local

# Test locally
npm run dev
```

### Production Testing:
1. **Deploy with Variables**: Ensure all variables are set
2. **Test Checkout**: Try making a test purchase
3. **Check Logs**: Verify no environment variable errors
4. **Webhook Testing**: Test Stripe webhook delivery

## 🔧 Troubleshooting

### Common Issues:
1. **"Stripe key not found"**: Check NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
2. **"Secret key invalid"**: Verify STRIPE_SECRET_KEY format
3. **Webhook failures**: Confirm STRIPE_WEBHOOK_SECRET matches Stripe
4. **Build failures**: Check all required variables are set

### Debug Commands:
```bash
# Check environment variables (don't run in production)
console.log('Stripe key:', process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.slice(0, 12) + '...')
```

## 📱 Platform-Specific Instructions

### Netlify Environment Variables:
- **Scope**: Apply to all deployments
- **Syntax**: Simple KEY=VALUE pairs
- **Deploy**: Requires redeploy after changes
- **Access**: Available in build and runtime

### Vercel Environment Variables:
- **Scope**: Choose Production/Preview/Development
- **Syntax**: Simple KEY=VALUE pairs
- **Deploy**: Automatic redeploy triggered
- **Access**: Available in build and runtime

## ✅ Verification Checklist

After setting environment variables:
- [ ] All required Stripe keys added
- [ ] NEXT_PUBLIC_APP_URL points to correct domain
- [ ] NODE_ENV set to production
- [ ] Test deployment successful
- [ ] Stripe checkout works
- [ ] No console errors about missing variables
- [ ] Webhook endpoint responding
- [ ] All application features functional
