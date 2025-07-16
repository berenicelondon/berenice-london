# Netlify Deployment Debug Guide

## 🔍 Step 1: Access Netlify Dashboard Logs

### How to Check Build Logs:
1. **Go to Netlify Dashboard**: https://app.netlify.com/
2. **Find Your Site**: Look for "berenice-london" or your site name
3. **Click on the Site**: Go to site overview
4. **Navigate to Deploys**: Click "Deploys" tab at the top
5. **Find Failed Deploy**: Look for the failed deployment (red X)
6. **Click on Failed Deploy**: This opens the deployment details
7. **View Build Log**: Click "Build log" or scroll down to see full output

### What to Look For:
- **Error Messages**: Look for red text with "ERROR" or "FAILED"
- **Missing Dependencies**: Check for package installation failures
- **Environment Variable Issues**: Look for undefined variable errors
- **Memory/Timeout Issues**: Check for build timeouts or memory errors
- **Node.js Version Conflicts**: Look for version compatibility warnings

## 🔧 Step 2: Common Netlify Issues & Solutions

### Issue 1: Environment Variables Missing
**Symptoms**: `process.env.VARIABLE_NAME is undefined`
**Solution**:
1. Go to Site Settings > Environment Variables
2. Add all required variables from `.env.example`
3. Redeploy after adding variables

### Issue 2: Node.js Version Conflicts
**Symptoms**: Package installation failures, peer dependency warnings
**Solution**:
1. Check if Node version in netlify.toml matches package.json requirements
2. Try Node 18 instead of Node 20
3. Enable legacy peer deps in build settings

### Issue 3: Build Command Issues
**Symptoms**: "Command not found" or build script failures
**Solution**:
1. Verify build command in netlify.toml
2. Check package.json scripts
3. Ensure all dependencies are listed

### Issue 4: Memory/Timeout Issues
**Symptoms**: Build hangs or runs out of memory
**Solution**:
1. Increase build timeout in site settings
2. Optimize dependencies
3. Use build optimization flags

## 📋 Step 3: Environment Variables Checklist

### Required Variables for Netlify:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
NEXT_PUBLIC_APP_URL=https://your-site.netlify.app
NODE_ENV=production
```

### Optional Variables:
```
NEXT_TELEMETRY_DISABLED=1
SKIP_TYPE_CHECK=true
NPM_FLAGS=--legacy-peer-deps
```

## 🆘 Step 4: Contact Netlify Support

### When to Contact Support:
- Build logs show internal Netlify errors
- Memory or timeout issues persist
- Platform-specific problems (ARM64 vs x64)
- Plugin failures (@netlify/plugin-nextjs)

### What to Include in Support Request:
1. **Site Name**: Your Netlify site name
2. **Deploy ID**: Failed deployment ID from logs
3. **Error Messages**: Copy exact error text from logs
4. **Build Log**: Full build log output
5. **Configuration Files**: netlify.toml, package.json, next.config.js
6. **Environment**: Node version, dependencies, build command

### Netlify Support Channels:
- **Dashboard**: Go to Support in your Netlify dashboard
- **Community**: https://answers.netlify.com/
- **Email**: Support ticket through dashboard
- **Documentation**: https://docs.netlify.com/

## 🚀 Next Steps:
1. Check logs following Step 1
2. Apply fixes from Step 2 based on what you find
3. Set up environment variables per Step 3
4. If issues persist, contact support per Step 4
5. **Backup Plan**: Use Vercel deployment (see vercel-deployment.md)
