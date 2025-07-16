# 🔧 GitHub Automated Deployment Setup Guide

## 🎯 Overview

This guide will help you configure automated deployments for your Berenice London e-commerce platform to both **Netlify** and **Vercel** using GitHub Actions.

## ✅ Prerequisites

- ✅ GitHub repository: https://github.com/berenicelondon/berenice-london
- ✅ Netlify account: [netlify.com](https://netlify.com)
- ✅ Vercel account: [vercel.com](https://vercel.com)
- ✅ Stripe account: [stripe.com](https://stripe.com)

---

## 🔑 Step 1: Configure GitHub Secrets

### **1.1 Access Repository Secrets**
1. Go to your repository: https://github.com/berenicelondon/berenice-london
2. Click **Settings** tab
3. Click **Secrets and variables** → **Actions**
4. Click **New repository secret**

### **1.2 Required Secrets for Netlify**

#### **NETLIFY_AUTH_TOKEN**
```bash
# Get from: https://app.netlify.com/user/applications/personal
# 1. Go to Netlify dashboard
# 2. Click your avatar → User settings
# 3. Applications → Personal access tokens
# 4. Generate new token
# 5. Copy and paste as secret value
```

#### **NETLIFY_SITE_ID**
```bash
# Get from: Your Netlify site settings
# 1. Create a new site on Netlify (or use existing)
# 2. Go to Site settings → General
# 3. Copy the Site ID (looks like: 12345678-1234-1234-1234-123456789abc)
```

### **1.3 Required Secrets for Vercel**

#### **VERCEL_TOKEN**
```bash
# Get from: https://vercel.com/account/tokens
# 1. Go to Vercel dashboard
# 2. Settings → Tokens
# 3. Create new token
# 4. Copy and paste as secret value
```

#### **VERCEL_ORG_ID**
```bash
# Get from: https://vercel.com/[username]/settings
# 1. Go to your team/personal settings
# 2. Copy the Team ID or Personal Account ID
```

#### **VERCEL_PROJECT_ID**
```bash
# Get from: Your Vercel project settings
# 1. Create new project on Vercel (import from GitHub)
# 2. Go to project Settings → General
# 3. Copy the Project ID
```

### **1.4 Required Secrets for Stripe**

#### **NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY**
```bash
# Get from: https://dashboard.stripe.com/apikeys
# 1. Go to Stripe dashboard
# 2. Developers → API keys
# 3. Copy Publishable key (starts with pk_test_ or pk_live_)
```

#### **STRIPE_SECRET_KEY**
```bash
# Get from: https://dashboard.stripe.com/apikeys
# 1. Go to Stripe dashboard
# 2. Developers → API keys
# 3. Reveal and copy Secret key (starts with sk_test_ or sk_live_)
```

#### **STRIPE_WEBHOOK_SECRET**
```bash
# Get from: https://dashboard.stripe.com/webhooks
# 1. Create new webhook endpoint
# 2. URL: https://your-domain.com/api/stripe/webhook
# 3. Events: payment_intent.succeeded, payment_intent.payment_failed
# 4. Copy the webhook signing secret (starts with whsec_)
```

### **1.5 Optional Secrets (Recommended)**

#### **BUSINESS_EMAIL**
```bash
# Your business email (e.g., contact@berenicelondon.co.uk)
```

#### **ADMIN_EMAIL**
```bash
# Your admin email (e.g., admin@berenicelondon.co.uk)
```

---

## 🌐 Step 2: Platform Setup

### **2.1 Netlify Setup**

1. **Create Site**:
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub → Select `berenicelondon/berenice-london`

2. **Build Settings**:
   ```bash
   Build command: npm run build
   Publish directory: .next
   ```

3. **Environment Variables** (in Netlify dashboard):
   ```bash
   NODE_VERSION=20
   NODE_ENV=production
   NEXT_PUBLIC_APP_URL=https://your-site.netlify.app
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
   STRIPE_SECRET_KEY=sk_test_your_secret
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook
   NEXT_TELEMETRY_DISABLED=1
   ```

4. **Domain Configuration**:
   - Site settings → Domain management
   - Add custom domain: `berenicelondon.co.uk`
   - Configure DNS as instructed

### **2.2 Vercel Setup**

1. **Create Project**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"
   - Import from GitHub: `berenicelondon/berenice-london`
   - Vercel auto-detects Next.js ✅

2. **Environment Variables** (in Vercel dashboard):
   ```bash
   NODE_ENV=production
   NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
   STRIPE_SECRET_KEY=sk_test_your_secret
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook
   NEXT_TELEMETRY_DISABLED=1
   ```

3. **Domain Configuration**:
   - Project settings → Domains
   - Add custom domain (optional)

---

## 🚀 Step 3: Test Automated Deployments

### **3.1 Trigger First Deployment**

1. **Push to Main Branch**:
   ```bash
   git add .
   git commit -m "🚀 Enable automated deployments"
   git push origin main
   ```

2. **Monitor Workflows**:
   - Go to: https://github.com/berenicelondon/berenice-london/actions
   - Watch workflows run:
     - ✅ 🎯 Main Deployment Pipeline
     - ✅ 🌐 Deploy to Netlify
     - ✅ ⚡ Deploy to Vercel

3. **Check Results**:
   - ✅ Green checkmarks = Successful deployments
   - ❌ Red X = Check logs for issues (usually missing secrets)

### **3.2 Test Pull Request Previews**

1. **Create Test Branch**:
   ```bash
   git checkout -b test-preview-deployment
   echo "<!-- Test change -->" >> README.md
   git add .
   git commit -m "Test preview deployment"
   git push origin test-preview-deployment
   ```

2. **Create Pull Request**:
   - Go to GitHub repository
   - Create PR from `test-preview-deployment` to `main`
   - Watch automated preview deployments

3. **Verify Previews**:
   - Check PR comments for preview URLs
   - Test both Netlify and Vercel preview links

---

## 📊 Step 4: Monitor & Maintain

### **4.1 Workflow Status**

Monitor your deployments at:
- **GitHub Actions**: https://github.com/berenicelondon/berenice-london/actions
- **Netlify Dashboard**: https://app.netlify.com
- **Vercel Dashboard**: https://vercel.com/dashboard

### **4.2 Live Site URLs**

After successful deployment, your site will be available at:
- **Primary (Netlify)**: https://berenicelondon.co.uk
- **Backup (Vercel)**: https://berenicelondon-vercel.vercel.app

### **4.3 Deployment Triggers**

Automatic deployments trigger on:
- ✅ **Push to main branch** → Production deployment
- ✅ **Pull requests** → Preview deployments
- ✅ **Manual dispatch** → Custom deployments

---

## 🔧 Troubleshooting

### **Common Issues**

#### **❌ Workflow fails with "Secret not found"**
- **Solution**: Verify all required secrets are added to repository settings
- **Check**: Repository → Settings → Secrets and variables → Actions

#### **❌ Build fails with environment variable errors**
- **Solution**: Add missing environment variables to platform dashboards
- **Netlify**: Site settings → Environment variables
- **Vercel**: Project settings → Environment variables

#### **❌ Stripe integration not working**
- **Solution**: Verify Stripe keys are correct and match environment (test vs live)
- **Check**: Stripe dashboard → Developers → API keys

#### **❌ Site shows 404 errors**
- **Solution**: Verify build output directory is correct (.next for Next.js)
- **Check**: Platform build logs for deployment issues

### **Getting Help**

1. **Check workflow logs**: GitHub Actions tab for detailed error messages
2. **Platform support**: Netlify/Vercel support for platform-specific issues
3. **Repository issues**: Create issue at https://github.com/berenicelondon/berenice-london/issues

---

## ✅ Success Checklist

After completing setup, verify:

- [ ] All GitHub secrets configured correctly
- [ ] Netlify site created and connected
- [ ] Vercel project created and connected
- [ ] Environment variables set on both platforms
- [ ] First deployment workflow completed successfully
- [ ] Both live sites accessible and functional
- [ ] Preview deployments work for pull requests
- [ ] Stripe payments work in test mode

## 🎉 Congratulations!

Your **Berenice London e-commerce platform** now has:

- ✅ **Automated deployments** to dual platforms
- ✅ **Preview deployments** for testing changes
- ✅ **Quality assurance** with automated checks
- ✅ **Redundancy** with Netlify + Vercel
- ✅ **Enterprise-grade** CI/CD pipeline

**Your professional e-commerce platform is now live and automatically maintained!** 🚀
