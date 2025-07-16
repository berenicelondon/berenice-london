# 🌐 Vercel Custom Domain Setup Guide

## Adding berenicelondon.com to Your Vercel Deployment

### 📋 Prerequisites
- Access to your domain registrar (where you bought berenicelondon.com)
- Access to your Vercel account
- Domain ownership verification

---

## 🚀 Step 1: Add Domain to Vercel

1. **Go to your Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your `berenice-london` project

2. **Navigate to Domains**
   - Click on the **"Settings"** tab
   - Select **"Domains"** from the left sidebar

3. **Add Your Domain**
   - Click **"Add Domain"**
   - Enter: `berenicelondon.com`
   - Click **"Add"**

4. **Choose Domain Configuration**
   - Select **"Add berenicelondon.com"** (apex domain)
   - Also add **"www.berenicelondon.com"** as an alias

---

## 🔧 Step 2: Configure DNS Records

Vercel will show you the DNS records to add. You'll need to update these at your domain registrar.

### For Apex Domain (berenicelondon.com):

**Option A: Using A Records (Recommended)**
```
Type: A
Name: @ (or leave blank)
Value: 76.76.21.21
```

**Option B: Using CNAME (if supported)**
```
Type: CNAME
Name: @ (or leave blank)
Value: cname.vercel-dns.com
```

### For WWW Subdomain (www.berenicelondon.com):
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## 📝 Step 3: Update DNS at Your Registrar

### Common Registrars:

#### GoDaddy
1. Log in to GoDaddy
2. Go to **"My Products"** → **"DNS"**
3. Delete existing A records for @
4. Add new A record with Vercel's IP
5. Add CNAME for www

#### Namecheap
1. Log in to Namecheap
2. Go to **"Domain List"** → **"Manage"**
3. Click **"Advanced DNS"**
4. Add the records as shown above

#### Cloudflare
1. Log in to Cloudflare
2. Select your domain
3. Go to **"DNS"** tab
4. Add records (set proxy status to DNS only - gray cloud)

---

## ⏱️ Step 4: Wait for Propagation

- DNS changes can take 0-48 hours to propagate
- Usually completes within 1-4 hours
- You can check status at: https://dnschecker.org

---

## ✅ Step 5: Verify Configuration

1. **In Vercel Dashboard**
   - Go back to Settings → Domains
   - You should see green checkmarks next to your domains
   - SSL certificate will be automatically provisioned

2. **Test Your Domain**
   - Visit: https://berenicelondon.com
   - Visit: https://www.berenicelondon.com
   - Both should load your site with HTTPS

---

## 🔒 SSL Certificate

- Vercel automatically provisions SSL certificates
- Uses Let's Encrypt
- Auto-renews every 3 months
- No action required from you

---

## 🚨 Troubleshooting

### Domain Not Working?
1. Check DNS propagation: https://dnschecker.org
2. Verify records are correct in your registrar
3. Clear browser cache and try again
4. Wait up to 48 hours for full propagation

### SSL Error?
1. Usually resolves within 10 minutes of domain verification
2. Check that DNS records are correct
3. Contact Vercel support if persists

### Redirect Issues?
- Vercel automatically handles www → apex redirects
- Both URLs will work and redirect appropriately

---

## 📱 Mobile App Considerations

If you plan to use the domain in mobile apps:
- Use `https://berenicelondon.com` as the base URL
- Update any hardcoded URLs in your codebase
- Test deep linking functionality

---

## 🎯 Next Steps

Once your domain is working:

1. **Update Environment Variables**
   ```
   NEXT_PUBLIC_APP_URL=https://berenicelondon.com
   ```

2. **Update Stripe Webhook URL**
   - Change webhook endpoint to: `https://berenicelondon.com/api/stripe/webhook`

3. **Update Social Media**
   - Update website URL on all social profiles
   - Update Google Business listing

4. **Set up Redirects** (if needed)
   - Old URLs → New URLs
   - HTTP → HTTPS (automatic)

---

## ✅ Success Checklist

- [ ] Domain added to Vercel
- [ ] DNS records updated at registrar
- [ ] Domain verified in Vercel (green checkmark)
- [ ] SSL certificate active
- [ ] https://berenicelondon.com loads correctly
- [ ] https://www.berenicelondon.com redirects to apex
- [ ] Environment variables updated
- [ ] Stripe webhook URL updated

---

## 📞 Need Help?

- **Vercel Support**: https://vercel.com/support
- **DNS Issues**: Contact your domain registrar
- **General Help**: Check Vercel's domain docs

Your custom domain will make your business look professional and trustworthy! 🎉
