# Vercel Deployment Guide - Alternative to Netlify

## 🚀 Why Vercel for Berenice London?

Vercel is the company behind Next.js, making it the most compatible platform for Next.js applications. If Netlify continues to have issues, Vercel is the best alternative.

## 📋 Pre-Deployment Checklist

### ✅ Ready for Deployment:
- [x] Next.js 15.3.2 application built successfully
- [x] All 17 routes compiled and working
- [x] Stripe integration configured
- [x] TypeScript errors resolved
- [x] vercel.json configuration created
- [x] Environment variables documented

## 🔧 Quick Deployment Steps

### Method 1: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project directory
cd berenice-london
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name: berenice-london
# - Directory: ./
# - Override settings? No
```

### Method 2: GitHub Integration
1. **Push to GitHub**: Ensure code is in GitHub repository
2. **Import to Vercel**:
   - Go to https://vercel.com/new
   - Import from GitHub
   - Select berenice-london repository
   - Configure project settings
   - Deploy

### Method 3: Direct Upload
1. **Build Project**: `npm run build`
2. **Zip Build**: Create zip of entire project
3. **Upload to Vercel**: Use Vercel dashboard upload feature

## 🔐 Environment Variables Setup

### Required Variables (Set in Vercel Dashboard):
```bash
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# App Configuration
NEXT_PUBLIC_APP_URL=https://berenice-london.vercel.app
NODE_ENV=production

# Optional Performance
NEXT_TELEMETRY_DISABLED=1
NODE_OPTIONS=--max-old-space-size=4096
```

### How to Add Environment Variables:
1. **Go to Project**: Find your project in Vercel dashboard
2. **Settings Tab**: Click Settings in project
3. **Environment Variables**: Scroll to Environment Variables section
4. **Add Variables**: Click "Add" and enter name/value pairs
5. **Set Environment**: Choose Production, Preview, Development
6. **Save**: Click Save after adding each variable

## 🔄 Automatic Deployments

### GitHub Integration Benefits:
- **Auto Deploy**: Every push to main branch triggers deployment
- **Preview Deployments**: PRs get preview URLs
- **Instant Rollbacks**: Easy to revert to previous versions
- **Branch Deployments**: Different branches get different URLs

### Setup Auto Deploy:
1. **Connect GitHub**: Link your GitHub account in Vercel
2. **Import Repository**: Import berenice-london repository
3. **Configure Build**: Vercel auto-detects Next.js settings
4. **Deploy**: First deployment happens automatically

## 🌐 Custom Domain Setup

### After Successful Deployment:
1. **Get Vercel URL**: Note your .vercel.app URL
2. **Add Custom Domain**:
   - Go to Project Settings > Domains
   - Add your custom domain (e.g., berenicelondon.co.uk)
   - Follow DNS configuration instructions
3. **SSL Certificate**: Vercel automatically provides SSL

## ⚡ Performance Optimizations

### Vercel Advantages:
- **Edge Network**: Global CDN for fast loading
- **Automatic Optimization**: Image optimization, caching
- **Serverless Functions**: API routes run as serverless functions
- **Real-time Analytics**: Built-in performance monitoring

### Monitoring:
- **Analytics**: Built-in web vitals and performance metrics
- **Error Tracking**: Automatic error reporting
- **Function Logs**: Real-time API route logging

## 🛠 Troubleshooting

### Common Issues:
1. **Build Failures**: Check Vercel function logs
2. **Environment Variables**: Verify all required vars are set
3. **API Routes**: Check function timeout settings
4. **Images**: Ensure image domains are configured

### Debug Commands:
```bash
# Local development
vercel dev

# Check deployment status
vercel ls

# View deployment logs
vercel logs [deployment-url]

# Environment variables
vercel env ls
```

## 📊 Expected Deployment Results

### After Successful Deployment:
- ✅ **Main Site**: https://berenice-london.vercel.app
- ✅ **All Routes**: 17 routes accessible
- ✅ **API Endpoints**: Stripe webhooks working
- ✅ **Static Assets**: Images, styles loading
- ✅ **Performance**: Fast global delivery

### URLs to Test:
- Landing: https://berenice-london.vercel.app
- Shop: https://berenice-london.vercel.app/shop
- Checkout: https://berenice-london.vercel.app/shop/checkout
- Admin: https://berenice-london.vercel.app/admin
- Gallery: https://berenice-london.vercel.app/gallery

## 🔄 Migration from Netlify

### If Moving from Netlify:
1. **Export Environment Variables**: Copy from Netlify dashboard
2. **Update URLs**: Change NEXT_PUBLIC_APP_URL to Vercel URL
3. **Update Webhooks**: Point Stripe webhooks to new Vercel URL
4. **DNS Changes**: Update domain DNS if using custom domain
5. **Test Everything**: Verify all functionality works

## 📞 Vercel Support

### Support Channels:
- **Documentation**: https://vercel.com/docs
- **Community**: https://github.com/vercel/vercel/discussions
- **Support**: Built-in support in dashboard (Pro plans)
- **Status**: https://vercel-status.com

### When to Use Vercel Over Netlify:
- ✅ Better Next.js compatibility
- ✅ Faster deployments
- ✅ Superior edge performance
- ✅ More reliable builds
- ✅ Better developer experience
