# 📊 Google Analytics 4 Setup Guide

## Complete Setup for Berenice London E-commerce Tracking

### 🎯 What You'll Track
- Page views and user behavior
- E-commerce transactions
- Product views and add to cart
- Checkout funnel
- User demographics
- Traffic sources

---

## 📝 Step 1: Create Google Analytics Account

1. **Go to Google Analytics**
   - Visit: https://analytics.google.com
   - Sign in with your Google account

2. **Start Setup**
   - Click **"Start measuring"**
   - Fill in account details:
     - Account name: **"Berenice London"**
     - Leave data sharing settings as default

3. **Create Property**
   - Property name: **"Berenice London Website"**
   - Reporting time zone: **"United Kingdom - London"**
   - Currency: **"British Pound (£)"**

4. **Business Information**
   - Industry category: **"Shopping"**
   - Business size: Select appropriate option

---

## 🔑 Step 2: Get Your Measurement ID

1. **After Property Creation**
   - You'll see a setup assistant
   - Click **"Web"** platform

2. **Set Up Web Stream**
   - Website URL: `https://berenicelondon.com`
   - Stream name: **"Berenice London Main Site"**
   - Click **"Create stream"**

3. **Copy Measurement ID**
   - You'll see: `G-XXXXXXXXXX`
   - Copy this ID (you'll need it soon)

---

## ⚙️ Step 3: Add to Vercel Environment

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/berenicelondon/berenice-london
   - Click **"Settings"** → **"Environment Variables"**

2. **Add Variable**
   ```
   Key: NEXT_PUBLIC_GA_ID
   Value: G-XXXXXXXXXX (your measurement ID)
   Environment: Production
   ```
   - Click **"Save"**

3. **Redeploy**
   - Go to **"Deployments"** tab
   - Click **"..."** on latest deployment
   - Select **"Redeploy"**

---

## 🛍️ Step 4: Enable E-commerce Tracking

### In Google Analytics:

1. **Go to Admin** (gear icon)
2. **Select your property**
3. **Click "Events"**
4. **Enable Enhanced E-commerce**

### Configure E-commerce Events:

Your site already tracks these events automatically:
- `view_item` - Product page views
- `add_to_cart` - Add to cart actions
- `begin_checkout` - Checkout initiated
- `purchase` - Completed orders

### Mark Events as Conversions:

1. Go to **Admin** → **Events**
2. Find these events and toggle **"Mark as conversion"**:
   - `purchase`
   - `add_to_cart`
   - `begin_checkout`

---

## 📱 Step 5: Configure Enhanced Measurement

1. **Go to Admin** → **Data Streams**
2. **Click your web stream**
3. **Toggle ON all Enhanced Measurements**:
   - Page views ✓
   - Scrolls ✓
   - Outbound clicks ✓
   - Site search ✓
   - Form interactions ✓
   - Video engagement ✓

---

## 🎯 Step 6: Set Up Goals & Audiences

### Create Audiences:

1. **Go to Admin** → **Audiences**
2. **Create useful segments**:
   - "Purchasers" - Users who completed purchase
   - "Cart Abandoners" - Added to cart but didn't purchase
   - "High Value Customers" - Purchase value > £200
   - "Returning Customers" - Multiple purchases

### Set Up Conversion Values:

1. **Go to Admin** → **Conversions**
2. **Configure conversion values** for:
   - Purchase (actual order value)
   - Newsletter signup (£5)
   - Account creation (£10)

---

## 📊 Step 7: Create Custom Reports

### E-commerce Dashboard:

1. **Go to Reports** → **Library**
2. **Create new report collection**
3. **Add these reports**:
   - Revenue by product
   - Conversion funnel
   - Cart abandonment rate
   - Average order value

### Custom Dimensions:

Set up tracking for:
- Member vs Guest purchases
- Product categories
- Discount code usage
- Payment methods

---

## 🧪 Step 8: Test Your Setup

### Real-Time Testing:

1. **Open your website** in an incognito window
2. **In GA4**: Go to **Reports** → **Real-time**
3. **Navigate your site** and verify:
   - Page views appear
   - Events fire correctly
   - E-commerce data tracks

### Debug Mode:

1. **Install GA Debugger** Chrome extension
2. **Open Chrome DevTools** → Console
3. **Look for GA events** being sent

---

## 📈 Step 9: Link Other Google Services

### Google Ads (if using):
1. **Admin** → **Google Ads Links**
2. Link your Google Ads account
3. Enable auto-tagging

### Search Console:
1. **Admin** → **Search Console Links**
2. Link to track organic search data

---

## 📱 Step 10: Mobile App Tracking (Future)

If you create a mobile app:
1. Add Firebase SDK
2. Link Firebase to GA4
3. Track app + web together

---

## 🔍 Useful Reports to Monitor

### Daily:
- Real-time users
- Today's revenue
- Conversion rate

### Weekly:
- Traffic sources
- Top products
- User acquisition
- Cart abandonment rate

### Monthly:
- Revenue trends
- Customer lifetime value
- User retention
- Channel performance

---

## 🚨 Common Issues & Solutions

### No Data Showing?
- Wait 24-48 hours for initial data
- Check measurement ID is correct
- Verify site is using HTTPS
- Clear cache and test in incognito

### Missing E-commerce Data?
- Ensure Stripe is in live mode
- Check purchase events fire
- Verify product data is sent

### Discrepancies with Stripe?
- Normal to have 1-3% difference
- GA uses different attribution
- Check timezone settings

---

## 🎯 Advanced Features

### Custom Events to Add:
```javascript
// Wishlist additions
gtag('event', 'add_to_wishlist', {
  currency: 'GBP',
  value: price,
  items: [productData]
});

// Newsletter signups
gtag('event', 'newsletter_signup', {
  method: 'footer_form'
});
```

### Enhanced E-commerce:
- Product impressions
- Promotion tracking
- Refund tracking
- Product list performance

---

## ✅ Setup Checklist

- [ ] GA4 account created
- [ ] Measurement ID obtained
- [ ] Added to Vercel environment
- [ ] Site redeployed
- [ ] Enhanced measurement enabled
- [ ] E-commerce tracking active
- [ ] Conversions configured
- [ ] Real-time data verified
- [ ] Custom reports created
- [ ] Team members added

---

## 📚 Resources

- **GA4 Help Center**: https://support.google.com/analytics
- **E-commerce Guide**: https://support.google.com/analytics/answer/9612232
- **Debug Extension**: https://chrome.google.com/webstore/detail/google-analytics-debugger

---

## 🎉 Congratulations!

You now have professional analytics tracking for your e-commerce business. Use this data to:
- Understand customer behavior
- Optimize marketing spend
- Improve conversion rates
- Make data-driven decisions

Your analytics will start collecting data immediately! 📊
