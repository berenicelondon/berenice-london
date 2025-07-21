# Netlify Deployment Guide for Berenice London

## Overview
This guide covers deploying the Berenice London Next.js application to Netlify with proper environment configuration.

## Pre-deployment Checklist

### 1. Build Configuration
- ✅ **netlify.toml** is configured to use `npm` instead of `bun`
- ✅ **Node.js version** is set to version 20
- ✅ **NPM flags** include `--legacy-peer-deps` for dependency compatibility
- ✅ **@netlify/plugin-nextjs** plugin is enabled

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

### 5. Domain Configuration

#### Custom Domain Setup
1. Add your custom domain in Netlify dashboard
2. Update DNS records with your domain provider
3. Enable HTTPS (automatic with Netlify)
4. Update `NEXT_PUBLIC_APP_URL` environment variable

### 6. Stripe Webhook Configuration

#### Setup Stripe Webhooks
1. Go to Stripe Dashboard > Developers > Webhooks
2. Add endpoint: `https://your-site-name.netlify.app/api/stripe/webhook`
3. Select events to listen for:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.dispute.created`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Copy the webhook secret and add to environment variables

### 7. Troubleshooting Common Issues

#### Build Failures
- **SWC Dependencies**: The `postinstall` script in package.json handles missing SWC dependencies
- **TypeScript Errors**: ESLint is disabled during builds, but TypeScript checking is enabled
- **Memory Issues**: Netlify provides sufficient memory for most builds

#### Environment Variable Issues
- Ensure all required Stripe keys are set
- Verify `NODE_ENV=production` is set
- Check that public variables start with `NEXT_PUBLIC_`

#### Runtime Issues
- Verify API routes work: `/api/stripe/create-payment-intent`
- Test webhook endpoint: `/api/stripe/webhook`
- Check browser console for client-side errors

### 8. Performance Optimization

#### Headers Configuration
- Static assets are cached for 1 year
- API routes have no-cache headers
- Security headers are properly configured

#### Image Optimization
- Next.js Image Optimization is enabled
- Remote image domains are configured
- Images are automatically optimized by Netlify

### 9. Monitoring & Analytics

#### Error Tracking
Consider adding error tracking:
- Sentry for error monitoring
- LogRocket for user session recording
- New Relic for performance monitoring

#### Performance Monitoring
- Netlify Analytics for traffic insights
- Core Web Vitals tracking
- Real User Monitoring (RUM)

### 10. Security Considerations

#### Content Security Policy
- XSS protection enabled
- Frame options set to DENY
- Content type sniffing disabled

#### API Security
- Rate limiting implemented on payment endpoints
- Webhook signature verification
- CORS properly configured

## Deployment Steps

1. **Connect Repository**
   - Link your GitHub repository to Netlify
   - Set up automatic deployments on push to main branch

2. **Configure Build Settings**
   - Set build command: `npm run build`
   - Set publish directory: `.next`
   - Enable the Next.js plugin

3. **Set Environment Variables**
   - Add all required environment variables
   - Verify they're available during build

4. **Deploy**
   - Trigger initial deployment
   - Monitor build logs for errors
   - Test all functionality

5. **Configure Domain**
   - Set up custom domain if needed
   - Update environment variables with final URL

6. **Setup Monitoring**
   - Configure error tracking
   - Set up uptime monitoring
   - Enable analytics

## Support

If you encounter issues during deployment:
1. Check Netlify build logs for specific errors
2. Verify all environment variables are set correctly
3. Test the application locally with `npm run build` first
4. Contact Netlify support for platform-specific issues

## Production Checklist

Before going live:
- [ ] All environment variables configured
- [ ] Stripe webhook endpoints set up
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Error monitoring enabled
- [ ] Analytics configured
- [ ] Performance testing completed
- [ ] Security headers verified
- [ ] Backup plan established
