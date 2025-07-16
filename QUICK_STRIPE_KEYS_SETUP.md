# 🚀 QUICK STRIPE KEYS SETUP

## Where to Add Your Stripe Keys

### 1️⃣ Go to Vercel Environment Variables
**URL**: https://vercel.com/berenicelondon/berenice-london/settings/environment-variables

### 2️⃣ Add These Keys:

```bash
# 1. Your Publishable Key (starts with pk_live_)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = [PASTE YOUR pk_live_... KEY HERE]

# 2. Your Secret Key (starts with sk_live_)
STRIPE_SECRET_KEY = [PASTE YOUR sk_live_... KEY HERE]

# 3. Your Webhook Secret (starts with whsec_)
STRIPE_WEBHOOK_SECRET = [PASTE YOUR whsec_... KEY HERE]

# 4. Update these settings too:
NEXT_PUBLIC_APP_URL = https://berenicelondon.com
NODE_ENV = production
DEMO_MODE = false
```

### 3️⃣ Important Settings:
- Environment: **Production** ✅
- Click **"Save"** after each variable

### 4️⃣ Redeploy:
1. Go to **Deployments** tab
2. Click **"..."** on latest deployment
3. Select **"Redeploy"**
4. Wait 2-3 minutes

### 5️⃣ Your Site is Ready for Real Payments! 🎉

---

## 📝 When you're ready, share your keys and I'll help you add them!

**What I need from you:**
1. `pk_live_...` (your publishable key)
2. `sk_live_...` (your secret key)
3. `whsec_...` (your webhook secret)

I'll guide you through adding them step by step! 💳
