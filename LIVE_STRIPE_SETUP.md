# 🚀 LIVE STRIPE SETUP - Business Verification Process

## ⚠️ IMPORTANT: Real Business Information Required

To set up live Stripe payments, you'll need to provide **real business information** and complete Stripe's verification process. This guide assumes you have a legitimate business entity.

## 📋 Required Information & Documents

### 🏢 Business Information
- **Business Legal Name**: Your registered company name
- **Business Type**:
  - Sole proprietorship/trader
  - Limited company (Ltd)
  - Partnership
  - Corporation
- **Business Registration Number**: Companies House number (UK)
- **VAT Registration Number**: If VAT registered
- **Business Address**: Physical business address
- **Website**: https://berenicelondon.co.uk
- **Industry**: Fashion/Hair & Beauty Products

### 🏦 Banking Information
- **Business Bank Account**: Account number and sort code
- **Bank Name**: Your business bank
- **Account Holder Name**: Must match business registration
- **IBAN**: For international transfers

### 📄 Required Documents
- **Certificate of Incorporation** (for Ltd companies)
- **Proof of Address**: Recent utility bill or bank statement
- **Government-issued ID**: Passport or driving license for business owners
- **Bank Statement**: Recent business bank statement

## 🚀 Step-by-Step Stripe Setup Process

### Step 1: Create Stripe Account
1. Go to [stripe.com](https://stripe.com) and click "Start now"
2. Enter your business email: `payments@berenicelondon.co.uk` (recommended)
3. Choose "United Kingdom" as your country
4. Create a strong password and verify your email

### Step 2: Complete Business Profile
1. **Business Details**:
   - Business name: "Berenice London" or your registered company name
   - Industry: "Fashion and apparel" or "Health and beauty"
   - Business description: "Premium hair solutions and wig specialist"
   - Website: https://berenicelondon.co.uk

2. **Contact Information**:
   - Phone: Your business phone number
   - Support email: support@berenicelondon.co.uk
   - Address: Your registered business address

### Step 3: Identity Verification
1. Upload government-issued photo ID
2. Provide business registration documents
3. Complete identity verification for all business owners (25%+ ownership)

### Step 4: Banking Setup
1. Add your business bank account details
2. Verify micro-deposits (1-2 business days)
3. Set payout schedule (daily, weekly, or monthly)

### Step 5: Activate Live Mode
Once verification is complete (typically 1-7 business days):
1. Go to Developers > API keys
2. Copy your **Live** keys:
   - Publishable key: `pk_live_...`
   - Secret key: `sk_live_...`

## 🔧 Environment Configuration

### Production Environment Variables
Add these to your production environment (Netlify):

```bash
# Live Stripe Keys (NEVER commit to code)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE=pk_live_your_actual_key_here
STRIPE_SECRET_KEY_LIVE=sk_live_your_actual_secret_key_here

# Business Configuration
BUSINESS_NAME=Berenice London
BUSINESS_EMAIL=contact@berenicelondon.co.uk
BUSINESS_PHONE=+44_your_phone_number
VAT_NUMBER=GB_your_vat_number (if applicable)

# Environment
NODE_ENV=production
```

### Webhook Configuration
1. In Stripe Dashboard: Developers > Webhooks
2. Add endpoint: `https://berenicelondon.co.uk/api/stripe/webhook`
3. Select events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.dispute.created`
4. Copy webhook signing secret: `whsec_...`
5. Add to environment: `STRIPE_WEBHOOK_SECRET_LIVE=whsec_...`

## ⚖️ Legal & Compliance Considerations

### Terms of Service & Privacy Policy
Ensure you have:
- Terms of Service mentioning payment processing
- Privacy Policy covering payment data (Stripe handles PCI compliance)
- Refund/Return Policy clearly stated
- GDPR compliance for EU customers

### Tax Considerations
- Register for VAT if turnover exceeds £85,000
- Set up proper accounting for transaction fees
- Consider tax implications of international sales

## 🎯 Go-Live Checklist

Before processing real payments:
- [ ] Stripe business verification completed
- [ ] Live API keys configured in production
- [ ] Webhook endpoint tested and verified
- [ ] Terms of Service and Privacy Policy published
- [ ] Test transaction with real card (small amount)
- [ ] Verify email notifications working
- [ ] Confirm bank account for payouts
- [ ] Set up transaction monitoring

## 🚨 Security Reminders

- **NEVER** commit live API keys to code repositories
- Use environment variables for all sensitive data
- Monitor transactions regularly for fraud
- Set up account alerts for unusual activity
- Keep webhook endpoints secure and verified

## 📞 Support Resources

- **Stripe Support**: Available 24/7 via dashboard
- **Documentation**: [stripe.com/docs](https://stripe.com/docs)
- **UK Business Help**: [stripe.com/gb](https://stripe.com/gb)

---

**⚠️ DISCLAIMER**: This setup requires real business information and banking details. Ensure you have proper business registration and banking before proceeding.
