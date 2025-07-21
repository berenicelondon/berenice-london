# 💳 Stripe Live Payment Setup Guide

## Enabling Real Payments for Berenice London

### 🔑 Keys You'll Need to Provide

Please provide these keys when you have them:
1. **Live Publishable Key**: `pk_live_...` (safe to expose)
2. **Live Secret Key**: `sk_live_...` (keep private!)
3. **Webhook Signing Secret**: `whsec_...` (for webhooks)

---

## 📝 Step 1: Activate Your Stripe Account

1. **Log in to Stripe Dashboard**
   - Go to: https://dashboard.stripe.com
   - Complete account activation if needed

2. **Fill Business Details**
   - Business name: Berenice London
   - Business type: Company/Individual
   - Address and tax information
   - Bank account for payouts

3. **Verify Your Identity**
   - Upload required documents
   - Wait for Stripe approval (usually 1-2 days)

---

## 🔐 Step 2: Get Your Live Keys

### Get API Keys:
1. Go to **Developers** → **API keys**
2. You'll see two keys:
   - **Publishable key**: `pk_live_51...` (can be public)
   - **Secret key**: `sk_live_51...` (keep private!)
3. Copy both keys

### Create Webhook Endpoint:
1. Go to **Developers** → **Webhooks**
2. Click **"Add endpoint"**
3. Endpoint URL: `https://berenicelondon.com/api/stripe/webhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `customer.subscription.created`
   - `customer.subscription.deleted`
5. Click **"Add endpoint"**
6. Copy the **Signing secret**: `whsec_...`

---

## ⚙️ Step 3: Add Keys to Vercel

### Add Environment Variables:

1. **Go to Vercel Dashboard**
   - https://vercel.com/berenicelondon/berenice-london/settings/environment-variables

2. **Add these variables** (one by one):

```bash
# Public key (safe to expose)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_live_your_key_here

# Secret key (keep private!)
STRIPE_SECRET_KEY = sk_live_your_key_here

# Webhook secret
STRIPE_WEBHOOK_SECRET = whsec_your_secret_here

# Update app URL
NEXT_PUBLIC_APP_URL = https://berenicelondon.com

# Set to production mode
NODE_ENV = production
DEMO_MODE = false
```

3. **Important**: Make sure each is set to "Production" environment

4. **Redeploy your site**
   - Go to Deployments tab
   - Click "..." → "Redeploy"

---

## 💰 Step 4: Configure Stripe Products

### Set Up Products:
1. Go to **Products** in Stripe Dashboard
2. Create products matching your inventory:
   - Name: Product name
   - Price: Amount in GBP
   - Images: Product photos
   - Description: Full details
   - Metadata: `category`, `brand`, etc.

### Configure Payment Methods:
1. Go to **Settings** → **Payment methods**
2. Enable:
   - ✅ Card payments
   - ✅ Apple Pay
   - ✅ Google Pay
   - ✅ Klarna (Buy now, pay later)
   - ✅ Clearpay/Afterpay

### Set Up Shipping:
1. Go to **Settings** → **Shipping rates**
2. Add your shipping options:
   - Standard: £5.99 (3-5 days)
   - Express: £9.99 (1-2 days)
   - Free shipping over £100

---

## 🧪 Step 5: Test Live Payments

### Test Transaction:
1. Visit your site: https://berenicelondon.com
2. Add a product to cart
3. Go to checkout
4. Use a **real card** (small amount)
5. Complete purchase

### Verify in Stripe:
1. Check **Payments** tab in Stripe
2. You should see your test payment
3. Check webhook logs for success

### Test Card Numbers (for testing only):
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- 3D Secure: `4000 0025 0000 3155`

---

## 📊 Step 6: Set Up Business Features

### Enable Invoicing:
1. Go to **Settings** → **Invoicing**
2. Customize invoice template
3. Add business details

### Configure Tax:
1. Go to **Settings** → **Tax**
2. Enable tax calculation
3. Set up VAT rates if applicable

### Customer Portal:
1. Go to **Settings** → **Customer portal**
2. Enable features:
   - View invoices
   - Update payment methods
   - Cancel subscriptions

---

## 🔔 Step 7: Set Up Notifications

### Email Receipts:
1. Go to **Settings** → **Email receipts**
2. Customize receipt template
3. Add logo and branding

### Webhook Notifications:
Your site will automatically:
- Send order confirmations
- Update inventory
- Track analytics
- Send admin notifications

---

## 🛡️ Step 8: Security & Compliance

### Enable Security Features:
1. **Radar** (Fraud prevention)
   - Go to **Radar** → **Rules**
   - Enable recommended rules
   - Set custom rules if needed

2. **3D Secure**
   - Automatically enabled
   - Reduces fraud and disputes

3. **PCI Compliance**
   - Stripe handles this
   - Your site is compliant

### GDPR Compliance:
- Customer data is encrypted
- Privacy policy updated
- Cookie consent implemented

---

## 📱 Step 9: Mobile Optimization

Your Stripe integration supports:
- Apple Pay on iOS
- Google Pay on Android
- Mobile-optimized checkout
- Digital wallets

---

## 📈 Step 10: Monitor & Optimize

### Daily Monitoring:
- Check payments dashboard
- Review failed payments
- Monitor conversion rate

### Weekly Tasks:
- Review Radar blocked payments
- Check payout schedule
- Analyze payment methods used

### Monthly Review:
- Download reports
- Analyze trends
- Optimize checkout flow

---

## 🚨 Troubleshooting

### Payment Fails?
1. Check Stripe logs
2. Verify card details
3. Check Radar rules
4. Review error message

### Webhook Errors?
1. Check webhook logs in Stripe
2. Verify endpoint URL
3. Check signing secret
4. Test with Stripe CLI

### Customer Issues?
1. Check payment in Stripe
2. Send receipt manually
3. Process refund if needed

---

## 💡 Best Practices

### Checkout Optimization:
- Show security badges
- Display accepted cards
- Clear pricing (no surprises)
- Guest checkout option

### Reduce Cart Abandonment:
- Save cart contents
- Send abandoned cart emails
- Offer multiple payment methods
- Show shipping costs early

### Increase Trust:
- SSL certificate (✓ Already done)
- Privacy policy visible
- Return policy clear
- Contact information available

---

## 📞 Support Contacts

### Stripe Support:
- Dashboard: Help → Contact Support
- Email: support@stripe.com
- Docs: https://stripe.com/docs

### Your Support:
- Set up support email
- Add phone number
- Create FAQ page

---

## ✅ Go-Live Checklist

Before accepting real payments:
- [ ] Stripe account activated
- [ ] Live keys added to Vercel
- [ ] Site redeployed
- [ ] Test transaction completed
- [ ] Webhook working
- [ ] Email receipts configured
- [ ] Fraud rules enabled
- [ ] Shipping rates set
- [ ] Return policy published
- [ ] Support contact added

---

## 🎉 Ready for Business!

Once you provide your keys, I'll help you:
1. Add them to Vercel
2. Test the integration
3. Verify everything works
4. Start accepting real payments!

**Please share your keys when ready, and I'll guide you through adding them securely!** 💳
