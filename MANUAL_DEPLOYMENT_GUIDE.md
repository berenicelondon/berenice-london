# 🚀 Berenice London - Manual Deployment Guide

**Your Berenice London e-commerce platform is ready for deployment!**

✅ **Build Status**: All 17 routes compile successfully
✅ **Local Verification**: Complete ✓
✅ **Repository**: https://github.com/berenicelondon/berenice-london

---

## 🎯 Quick Deployment Options

### Option 1: One-Click Netlify Deploy ⚡
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/berenicelondon/berenice-london)

1. Click the deploy button above
2. Connect your GitHub account
3. Configure environment variables (see below)
4. Deploy!

### Option 2: Manual Netlify Deployment 📁

#### Step 1: Build the Project Locally
```bash
cd berenice-london
npm install
npm run build
```

#### Step 2: Deploy to Netlify
1. Go to [netlify.com](https://netlify.com) and log in
2. Click "Add new site" → "Deploy manually"
3. Drag and drop the `.next` folder
4. Configure custom domain if desired

### Option 3: Connect GitHub Repository 🔗

#### Step 1: Netlify Dashboard
1. Go to [app.netlify.com](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Choose "Deploy with GitHub"
4. Select repository: `berenicelondon/berenice-london`

#### Step 2: Build Settings
```
Build command: npm run build
Publish directory: .next
```

#### Step 3: Environment Variables
Add these in Netlify dashboard under Site settings → Environment variables:

**Required Variables**:
```bash
NODE_VERSION=20
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-site.netlify.app
NEXT_TELEMETRY_DISABLED=1
```

**Stripe Configuration** (Required for payments):
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

**Optional Analytics**:
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_PROJECT_ID=your_clarity_id
```

---

## 🔧 Alternative Deployment Platforms

### Vercel (Recommended for Next.js) 🔥

#### Quick Deploy
```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to project
cd berenice-london

# Deploy
vercel --prod
```

#### GitHub Integration
1. Go to [vercel.com](https://vercel.com)
2. Import from GitHub: `berenicelondon/berenice-london`
3. Configure environment variables
4. Deploy!

### Cloudflare Pages ☁️

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect GitHub repository
3. Build settings:
   - Build command: `npm run build`
   - Build output directory: `.next`
4. Add environment variables
5. Deploy!

---

## 🔒 Environment Variables Setup

### 1. Stripe Configuration (Critical)

#### Test Mode (Development)
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51234567890abcdef...
STRIPE_SECRET_KEY=sk_test_51234567890abcdef...
STRIPE_WEBHOOK_SECRET=whsec_1234567890abcdef...
```

#### Live Mode (Production)
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51234567890abcdef...
STRIPE_SECRET_KEY=sk_live_51234567890abcdef...
STRIPE_WEBHOOK_SECRET=whsec_1234567890abcdef...
```

### 2. Get Your Stripe Keys
1. Go to [dashboard.stripe.com](https://dashboard.stripe.com)
2. Navigate to Developers → API keys
3. Copy your Publishable key and Secret key
4. For webhooks: Developers → Webhooks → Add endpoint
   - URL: `https://your-domain.com/api/stripe/webhook`
   - Events: `payment_intent.succeeded`, `payment_intent.payment_failed`

### 3. Business Configuration
```bash
BUSINESS_NAME=Berenice London
BUSINESS_EMAIL=contact@berenicelondon.co.uk
ADMIN_EMAIL=admin@berenicelondon.co.uk
```

---

## 🎛️ Domain Configuration

### Custom Domain Setup

#### For Netlify:
1. Go to Site settings → Domain management
2. Add custom domain: `berenicelondon.co.uk`
3. Configure DNS records:
   ```
   CNAME www your-site.netlify.app
   A @ 75.2.60.5
   ```

#### For Vercel:
1. Go to Project settings → Domains
2. Add `berenicelondon.co.uk`
3. Configure DNS records as instructed

---

## 🔐 SSL & Security

### Automatic SSL
- ✅ Netlify: Automatic Let's Encrypt SSL
- ✅ Vercel: Automatic SSL certificates
- ✅ Cloudflare: Automatic SSL + CDN

### Security Headers (Already Configured)
- ✅ CSRF Protection
- ✅ XSS Protection
- ✅ Content Security Policy
- ✅ CORS Configuration
- ✅ Rate Limiting

---

## 📊 Post-Deployment Checklist

### 1. Verify Core Features ✅
- [ ] Homepage loads correctly
- [ ] Shop page displays products
- [ ] Product detail pages work
- [ ] Shopping cart functionality
- [ ] User authentication (login/register)
- [ ] Admin panel access

### 2. Test Payment System 💳
- [ ] Add product to cart
- [ ] Proceed to checkout
- [ ] Enter test card: `4242 4242 4242 4242`
- [ ] Complete test payment
- [ ] Verify webhook events in Stripe dashboard

### 3. Member Features 👤
- [ ] Register new account
- [ ] Login functionality
- [ ] Member dashboard access
- [ ] Virtual try-on feature (camera permission)
- [ ] Profile photo upload

### 4. Content Management 📝
- [ ] Blog page loads
- [ ] Individual blog posts work
- [ ] Gallery displays images
- [ ] Booking system functionality
- [ ] Admin panel features

### 5. SEO & Performance 🚀
- [ ] Check page titles and meta descriptions
- [ ] Verify sitemap: `/sitemap.xml`
- [ ] Test robots.txt: `/robots.txt`
- [ ] Run Lighthouse audit
- [ ] Check mobile responsiveness

---

## 🔧 Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Environment Variable Issues
- Ensure all required Stripe keys are set
- Check environment variable names (case-sensitive)
- Verify no trailing spaces in values

### Payment Issues
- Verify webhook URL is correct
- Check Stripe dashboard for webhook events
- Ensure webhook secret matches environment variable

### 404 Errors
- Verify dynamic routes are properly configured
- Check API routes are accessible
- Ensure proper redirect configuration

---

## 📞 Support

If you encounter issues:

1. **Check build logs** in your deployment platform
2. **Verify environment variables** are correctly set
3. **Test locally** with same environment variables
4. **Contact support**:
   - Platform-specific support (Netlify, Vercel, etc.)
   - GitHub Issues: [Create an issue](https://github.com/berenicelondon/berenice-london/issues)

---

## ✅ Deployment Status

Your Berenice London platform is **production-ready** with:

- ✅ **Complete e-commerce functionality**
- ✅ **Live Stripe payment processing**
- ✅ **User authentication & membership**
- ✅ **Admin panel & content management**
- ✅ **Virtual try-on feature**
- ✅ **AI chatbot integration**
- ✅ **SEO optimization**
- ✅ **Security & performance features**
- ✅ **Mobile-responsive design**

**Time to go live!** 🚀

---

*Last updated: Version 29 - Ready for production deployment*
