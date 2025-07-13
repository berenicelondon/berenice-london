# Netlify Deployment Guide for Berenice London

## Overview
This guide covers deploying the Berenice London Next.js application to Netlify with proper environment configuration. **Recent updates have fixed critical deployment issues**.

## 🔧 Critical Fixes Applied

### Build Configuration Issues Fixed:
- ✅ **Corrected Next.js configuration** for Netlify compatibility
- ✅ **Updated netlify.toml** with proper environment variables
- ✅ **Added fallback environment handling** to prevent build failures
- ✅ **Optimized webpack configuration** for Netlify build environment
- ✅ **Added engine specifications** in package.json

## Pre-deployment Checklist

### 1. Build Configuration
- ✅ **netlify.toml** is configured to use `npm` instead of `bun`
- ✅ **Node.js version** is set to version 20
- ✅ **NPM flags** include `--legacy-peer-deps` for dependency compatibility
- ✅ **@netlify/plugin-nextjs** plugin is enabled
- ✅ **Environment variables** properly configured in build section

### 2. Required Environment Variables
Set these environment variables in your Netlify dashboard under **Site settings > Environment variables**:

#### Stripe Configuration (REQUIRED)
```bash
# Test/Development Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_test_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_test_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_test_webhook_secret_here

# Production Keys (for live site)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE=pk_live_your_live_publishable_key_here
STRIPE_SECRET_KEY_LIVE=sk_live_your_live_secret_key_here
STRIPE_WEBHOOK_SECRET_LIVE=whsec_your_live_webhook_secret_here
```

#### Application Configuration
```bash
# Site URL
NEXT_PUBLIC_APP_URL=https://your-site-name.netlify.app

# Environment
NODE_ENV=production

# Security
NEXTAUTH_SECRET=your_secure_random_string_here
NEXTAUTH_URL=https://your-site-name.netlify.app

# Business Configuration
BUSINESS_EMAIL=contact@berenicelondon.co.uk
ADMIN_EMAIL=admin@berenicelondon.co.uk
```

#### Optional Analytics & Tracking
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_PROJECT_ID=your_clarity_project_id
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your_facebook_pixel_id
```

### 3. Build Commands

#### Primary Build Command
```bash
npm run build
```

#### Build Verification Command
```bash
npm run build:verify
```

#### Development Command
```bash
npm run dev
```

### 4. Netlify Site Settings

#### Build & Deploy Settings
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node.js version**: `20` (specified in .nvmrc)

#### Functions
- **Functions directory**: `.netlify/functions`
- Functions are automatically handled by `@netlify/plugin-nextjs`

## 🚀 Deployment Steps

### 1. Connect Repository
- Link your GitHub repository to Netlify
- Set up automatic deployments on push to main branch

### 2. Configure Build Settings
- Set build command: `npm run build`
- Set publish directory: `.next`
- Enable the Next.js plugin

### 3. Set Environment Variables
**CRITICAL**: Add all required environment variables in Netlify dashboard:
1. Go to Site settings > Environment variables
2. Add each variable from the list above
3. **DO NOT leave Stripe variables empty** - add actual test keys

### 4. Deploy
- Trigger initial deployment
- Monitor build logs for errors
- Test all functionality

### 5. Configure Domain
- Set up custom domain if needed
- Update environment variables with final URL

### 6. Setup Monitoring
- Configure error tracking
- Set up uptime monitoring
- Enable analytics

## 🔍 Troubleshooting Common Issues

### Build Failures

#### Issue: Environment Variable Errors
**Solution**: Ensure all required environment variables are set in Netlify dashboard. The build will now provide fallback values but warnings will appear.

#### Issue: SWC Dependencies
**Solution**: The `postinstall` script in package.json handles missing SWC dependencies automatically.

#### Issue: TypeScript Errors
**Solution**: ESLint is disabled during builds, but TypeScript checking is enabled. Fix any TypeScript errors in your code.

#### Issue: Memory Issues
**Solution**: Netlify provides sufficient memory for most builds. The webpack configuration has been optimized for Netlify.

### Environment Variable Issues
- Ensure all required Stripe keys are set with actual values (not empty strings)
- Verify `NODE_ENV=production` is set
- Check that public variables start with `NEXT_PUBLIC_`

### Runtime Issues
- Verify API routes work: `/api/stripe/create-payment-intent`
- Test webhook endpoint: `/api/stripe/webhook`
- Check browser console for client-side errors

## 🔧 Configuration Details

### netlify.toml Configuration
The current configuration includes:
- Proper environment variables for build
- Correct publish directory
- Security headers
- API route handling
- Static asset optimization

### next.config.js Configuration
The current configuration includes:
- Netlify-specific optimizations
- Webpack configuration for build environment
- Image optimization settings
- Environment variable handling

## 📊 Performance Optimization

### Headers Configuration
- Static assets are cached for 1 year
- API routes have no-cache headers
- Security headers are properly configured

### Image Optimization
- Next.js Image Optimization is enabled
- Remote image domains are configured
- Images are automatically optimized by Netlify

## 🔒 Security Considerations

### Content Security Policy
- XSS protection enabled
- Frame options set to DENY
- Content type sniffing disabled

### API Security
- Rate limiting implemented on payment endpoints
- Webhook signature verification
- CORS properly configured

## ✅ Production Checklist

Before going live:
- [ ] All environment variables configured with actual values
- [ ] Stripe webhook endpoints set up
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Error monitoring enabled
- [ ] Analytics configured
- [ ] Performance testing completed
- [ ] Security headers verified
- [ ] Backup plan established

## 🆘 Common Deployment Failures & Solutions

### 1. Build Command Fails
```bash
Error: Command failed with exit code 1
```
**Solution**: Check environment variables are set. Run `npm run build:verify` locally first.

### 2. Missing Dependencies
```bash
Error: Cannot resolve module
```
**Solution**: Ensure all dependencies are in package.json, run `npm install` locally.

### 3. Environment Variable Issues
```bash
Error: process.env.STRIPE_SECRET_KEY is undefined
```
**Solution**: Set all required environment variables in Netlify dashboard with actual values.

### 4. API Routes Not Working
```bash
404 on /api/* routes
```
**Solution**: Ensure @netlify/plugin-nextjs is enabled and redirects are configured in netlify.toml.

## 📞 Support

If you encounter issues during deployment:
1. Check Netlify build logs for specific errors
2. Verify all environment variables are set correctly with actual values
3. Test the application locally with `npm run build` first
4. Ensure the build passes with `npm run build:verify`
5. Contact Netlify support for platform-specific issues

## 🔄 Recent Updates

**Latest fixes applied**:
- Fixed Next.js configuration for Netlify compatibility
- Added comprehensive environment variable handling
- Optimized webpack configuration for build environment
- Added fallback values to prevent build failures
- Updated netlify.toml with proper environment configuration
- Added build verification script

The deployment should now work successfully with these fixes applied.
