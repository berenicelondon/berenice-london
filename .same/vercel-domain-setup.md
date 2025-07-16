# 🌐 Connect berenicelondon.co.uk to Vercel

## Complete Domain Setup Guide

### 📋 Prerequisites:
- ✅ Vercel project deployed successfully
- ✅ Environment variables configured
- ✅ Site working on Vercel URL (e.g., `your-project.vercel.app`)

### 🚀 Step 1: Add Domain in Vercel Dashboard

1. **Go to your Vercel project dashboard**
2. **Click "Settings" tab**
3. **Click "Domains" in the left sidebar**
4. **Click "Add Domain"**
5. **Enter**: `berenicelondon.co.uk`
6. **Click "Add"**

### 🔧 Step 2: Configure DNS Records

Vercel will show you DNS configuration instructions. You'll need to set up DNS records with your domain provider.

#### Option A: CNAME Record (Recommended)
```
Type: CNAME
Name: @ (or leave blank for root domain)
Value: cname.vercel-dns.com
TTL: 3600 (or Auto)
```

#### Option B: A Records (Alternative)
If CNAME doesn't work for root domain:
```
Type: A
Name: @ (or leave blank)
Value: 76.76.19.61
TTL: 3600

Type: A
Name: @ (or leave blank)
Value: 76.223.126.88
TTL: 3600
```

#### For WWW Subdomain (Recommended to add both):
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### 🏢 DNS Provider Instructions

#### Common DNS Providers:

##### Cloudflare:
1. Log into Cloudflare dashboard
2. Select your domain `berenicelondon.co.uk`
3. Go to DNS → Records
4. Add the CNAME record as shown above
5. Set Proxy status to "DNS only" (gray cloud)

##### Namecheap:
1. Login to Namecheap account
2. Go to Domain List → Manage
3. Go to Advanced DNS
4. Add new record with CNAME details above

##### GoDaddy:
1. Login to GoDaddy account
2. Go to My Products → DNS
3. Add new CNAME record as specified

##### Google Domains:
1. Login to Google Domains
2. Select your domain
3. Go to DNS → Custom records
4. Add CNAME record with details above

### ⏱️ Step 3: Wait for DNS Propagation

**Expected Timeline:**
- **Initial propagation**: 15 minutes - 2 hours
- **Full global propagation**: Up to 48 hours
- **Most users see changes**: Within 4-6 hours

**Check propagation status:**
- Use: https://dnschecker.org/
- Enter: `berenicelondon.co.uk`
- Look for green checkmarks globally

### 🔍 Step 4: Verify Domain Setup

#### In Vercel Dashboard:
1. **Go to**: Project → Settings → Domains
2. **Check status**: Should show "Active" or "Valid Configuration"
3. **Look for**: Green checkmark next to your domain

#### Test Your Domain:
1. **Visit**: `https://berenicelondon.co.uk`
2. **Check**: Site loads correctly
3. **Test**: All pages work (shop, checkout, etc.)
4. **Verify**: SSL certificate is active (lock icon in browser)

### 🔒 Step 5: SSL Certificate

**Automatic SSL Setup:**
- ✅ **Vercel automatically provides** SSL certificates
- ✅ **Let's Encrypt certificates** are issued automatically
- ✅ **Auto-renewal** every 90 days
- ✅ **HTTPS redirect** is automatic

**Verify SSL:**
- Visit `https://berenicelondon.co.uk`
- Check for lock icon in browser address bar
- Certificate should show as valid

### 🔄 Step 6: Update Application URLs

#### Update Environment Variables:
1. **Go to**: Vercel Project → Settings → Environment Variables
2. **Update**: `NEXT_PUBLIC_APP_URL`
   - **From**: `https://your-project.vercel.app`
   - **To**: `https://berenicelondon.co.uk`
3. **Save** and **redeploy**

#### Update Stripe Webhook:
1. **Go to**: https://dashboard.stripe.com
2. **Navigate**: Developers → Webhooks
3. **Update endpoint URL**:
   - **From**: `https://your-project.vercel.app/api/stripe/webhook`
   - **To**: `https://berenicelondon.co.uk/api/stripe/webhook`
4. **Save** changes

### 🧪 Step 7: Test Everything

#### Domain Tests:
- [ ] `https://berenicelondon.co.uk` loads homepage
- [ ] `https://www.berenicelondon.co.uk` redirects to main domain
- [ ] SSL certificate is valid and active
- [ ] All pages load correctly

#### Functionality Tests:
- [ ] **Shop**: Products display correctly
- [ ] **Checkout**: Payment forms work
- [ ] **Admin**: Dashboard accessible
- [ ] **Gallery**: Images load properly
- [ ] **Blog**: Posts are accessible
- [ ] **Booking**: System functions correctly

#### API Tests:
- [ ] **Stripe webhook**: Receiving events properly
- [ ] **Payment processing**: Test transactions work
- [ ] **Form submissions**: Working as expected

### 🚨 Troubleshooting Common Issues

#### Issue: "Domain not found" or 404 error
**Solutions:**
1. Check DNS records are correct
2. Wait longer for DNS propagation
3. Verify domain spelling in Vercel dashboard
4. Try incognito/private browser window

#### Issue: SSL certificate error
**Solutions:**
1. Wait 10-15 minutes for certificate provisioning
2. Clear browser cache
3. Check domain is verified in Vercel
4. Force refresh with Ctrl+F5

#### Issue: Mixed content warnings
**Solutions:**
1. Ensure all resources use HTTPS
2. Update `NEXT_PUBLIC_APP_URL` environment variable
3. Check no hardcoded HTTP URLs in code

#### Issue: Redirect loops
**Solutions:**
1. Check DNS proxy settings (disable if using Cloudflare)
2. Verify no conflicting redirects
3. Clear browser cache completely

### 📊 Monitoring Domain Health

#### Vercel Analytics:
- **Go to**: Project → Analytics
- **Monitor**: Page views, performance, errors
- **Track**: Real user data

#### DNS Monitoring:
- **Use**: DNSChecker, WhatsMyDNS
- **Check**: Regular propagation status
- **Monitor**: Uptime and response times

### ✅ Success Checklist:

When domain setup is complete:
- ✅ **berenicelondon.co.uk** loads your website
- ✅ **SSL certificate** shows as valid
- ✅ **All pages** work correctly
- ✅ **Stripe payments** process properly
- ✅ **Environment variables** updated
- ✅ **Webhook URL** updated in Stripe
- ✅ **Performance** is optimal

### 🎉 Domain Live!

Once your domain is working:
1. **Test thoroughly** with real user scenarios
2. **Monitor performance** for 24-48 hours
3. **Update any bookmarks** or links
4. **Announce** your new website!

**Next Steps**: Multi-language support and Apple Pay integration!
