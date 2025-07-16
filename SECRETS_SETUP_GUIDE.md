# 🔑 GitHub Secrets Setup Guide

## 🎯 Overview

This guide will help you configure the required GitHub secrets to enable automated deployments for your Berenice London e-commerce platform.

## 📊 Current Status

✅ **Workflows**: All 6 deployment workflows are configured
✅ **Local Build**: Successful (13 routes, optimized)
❌ **Secrets**: Missing (required for deployments)

## 🔧 Step 1: Access GitHub Secrets

1. **Go to your repository**: https://github.com/berenicelondon/berenice-london
2. **Click "Settings"** tab (next to "Code")
3. **Click "Secrets and variables"** in left sidebar
4. **Click "Actions"**
5. **Click "New repository secret"**

## 🌐 Step 2: Netlify Secrets

### Get Netlify Credentials

#### **NETLIFY_AUTH_TOKEN**
1. Go to [app.netlify.com](https://app.netlify.com)
2. Click your avatar → **User settings**
3. **Applications** → **Personal access tokens**
4. **Generate new token**
5. **Copy the token**

**Add to GitHub:**
- Name: `NETLIFY_AUTH_TOKEN`
- Value: `your_actual_token_here`

#### **NETLIFY_SITE_ID**
1. **Option A: Create New Site**
   - Go to Netlify → **Add new site** → **Deploy manually**
   - Drag and drop any folder to create placeholder
   - Go to **Site settings** → **General**
   - Copy **Site ID**

2. **Option B: Use Existing Site**
   - Go to your existing Netlify site
   - **Site settings** → **General**
   - Copy **Site ID**

**Add to GitHub:**
- Name: `NETLIFY_SITE_ID`
- Value: `12345678-1234-1234-1234-123456789abc`

## ⚡ Step 3: Vercel Secrets

### Get Vercel Credentials

#### **VERCEL_TOKEN**
1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. **Create new token**
3. Name it: "Berenice London GitHub Actions"
4. **Copy the token**

**Add to GitHub:**
- Name: `VERCEL_TOKEN`
- Value: `your_actual_vercel_token`

#### **VERCEL_ORG_ID**
1. Go to [vercel.com](https://vercel.com) → **Settings**
2. If personal account: Copy **Personal Account ID**
3. If team account: Copy **Team ID**

**Add to GitHub:**
- Name: `VERCEL_ORG_ID`
- Value: `your_org_id_here`

#### **VERCEL_PROJECT_ID**
1. **Option A: Create New Project**
   - Go to Vercel → **Add New** → **Project**
   - **Import from GitHub** → Select `berenice-london`
   - After creation: **Settings** → **General**
   - Copy **Project ID**

2. **Option B: Use Existing Project**
   - Go to existing project → **Settings** → **General**
   - Copy **Project ID**

**Add to GitHub:**
- Name: `VERCEL_PROJECT_ID`
- Value: `your_project_id_here`

## 💳 Step 4: Stripe Secrets

### Get Stripe Credentials

#### **NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY**
1. Go to [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)
2. **Copy Publishable key** (starts with `pk_test_` or `pk_live_`)

**Add to GitHub:**
- Name: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- Value: `pk_test_your_actual_publishable_key`

#### **STRIPE_SECRET_KEY**
1. Same page → **Reveal** and **copy Secret key** (starts with `sk_test_` or `sk_live_`)

**Add to GitHub:**
- Name: `STRIPE_SECRET_KEY`
- Value: `sk_test_your_actual_secret_key`

#### **STRIPE_WEBHOOK_SECRET**
1. Go to [dashboard.stripe.com/webhooks](https://dashboard.stripe.com/webhooks)
2. **Add endpoint**:
   - URL: `https://your-domain.com/api/stripe/webhook`
   - Events: `payment_intent.succeeded`, `payment_intent.payment_failed`
3. **Copy webhook signing secret** (starts with `whsec_`)

**Add to GitHub:**
- Name: `STRIPE_WEBHOOK_SECRET`
- Value: `whsec_your_webhook_secret`

## 🔍 Step 5: Verify Secrets

### Check Secrets List
After adding all secrets, you should see:

```
✅ NETLIFY_AUTH_TOKEN
✅ NETLIFY_SITE_ID
✅ VERCEL_TOKEN
✅ VERCEL_ORG_ID
✅ VERCEL_PROJECT_ID
✅ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
✅ STRIPE_SECRET_KEY
✅ STRIPE_WEBHOOK_SECRET
```

### Run Verification Script
```bash
cd berenice-london
./scripts/check-workflows.sh
```

## 🚀 Step 6: Trigger Deployments

### Automatic Trigger
```bash
# Push to main branch to trigger all workflows
git add .
git commit -m "🔧 Configure GitHub secrets for automated deployments"
git push origin master
```

### Manual Trigger
```bash
# Trigger main deployment pipeline
gh workflow run main-deployment.yml

# Or trigger individual workflows
gh workflow run deploy-netlify.yml
gh workflow run deploy-vercel.yml
```

## 📊 Step 7: Monitor Deployments

### Check Workflow Status
1. **Go to**: https://github.com/berenicelondon/berenice-london/actions
2. **Watch for**:
   - ✅ Green checkmarks = Success
   - ❌ Red X = Failed (check logs)
   - 🟡 Yellow circle = Running

### Expected Results
After successful deployment:
- **🌐 Netlify**: `https://berenicelondon.co.uk`
- **⚡ Vercel**: `https://berenice-london-vercel.vercel.app`

## ⚠️ Troubleshooting

### Common Issues

#### **"Secret not found" error**
- **Solution**: Verify secret names match exactly (case-sensitive)
- **Check**: Repository Settings → Secrets and variables → Actions

#### **"Invalid token" error**
- **Solution**: Regenerate tokens on platform dashboards
- **Netlify**: User settings → Personal access tokens
- **Vercel**: Account settings → Tokens

#### **"Site not found" error**
- **Solution**: Verify Site ID/Project ID are correct
- **Check**: Platform dashboard → Site/Project settings

#### **Build fails with environment errors**
- **Solution**: Verify all 8 secrets are configured
- **Check**: Use verification script to confirm

### Getting Help

1. **Check workflow logs**: Click failed workflow → View detailed logs
2. **Run local verification**: `./scripts/check-workflows.sh`
3. **Platform status**: Check Netlify/Vercel status pages
4. **Repository issues**: https://github.com/berenicelondon/berenice-london/issues

## ✅ Success Checklist

After completing setup:

- [ ] All 8 GitHub secrets configured
- [ ] Netlify site created and connected
- [ ] Vercel project created and connected
- [ ] Stripe account configured with API keys
- [ ] Webhooks configured for both platforms
- [ ] First deployment workflow completed successfully
- [ ] Both live sites accessible and functional
- [ ] Test payment works with Stripe test keys

## 🎉 Congratulations!

Your **Berenice London e-commerce platform** now has:

- ✅ **Fully automated deployments** to dual platforms
- ✅ **Enterprise-grade CI/CD pipeline** with quality checks
- ✅ **Preview deployments** for all pull requests
- ✅ **Health monitoring** and status reporting
- ✅ **Zero manual intervention** required

**Your professional e-commerce platform will now deploy automatically on every code change!** 🚀

---

*Last updated: Version 32 - GitHub Workflows Active*
