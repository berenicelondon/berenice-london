# 📊 Analytics & Tracking Setup Guide

## 🎯 Overview

This guide will help you set up comprehensive analytics and tracking for your Berenice London e-commerce website, including Google Analytics, Facebook Pixel, and other tracking tools.

---

## 🚀 Quick Setup Checklist

- [ ] **Google Analytics 4** - Essential for website analytics
- [ ] **Facebook Pixel** - For social media advertising (Optional)
- [ ] **Hotjar** - For user behavior tracking (Optional)
- [ ] **Microsoft Clarity** - For heatmaps and recordings (Optional)
- [ ] **Environment Variables** - Configure in Netlify
- [ ] **Test Implementation** - Verify tracking is working

---

## 📈 1. Google Analytics 4 Setup (Required)

### Step 1: Create Google Analytics Account
1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring"
4. Fill in your account details:
   - **Account Name**: "Berenice London"
   - **Property Name**: "Berenice London Website"
   - **Industry**: "Retail/E-commerce"
   - **Business Size**: Select appropriate size

### Step 2: Get Your Measurement ID
1. In Google Analytics, go to **Admin** (gear icon)
2. Under **Property**, click **Data Streams**
3. Click **Add stream** → **Web**
4. Enter your website URL: `https://graceful-crisp-e96a53.netlify.app`
5. Copy the **Measurement ID** (format: G-XXXXXXXXXX)

### Step 3: Configure Enhanced E-commerce
1. In Google Analytics, go to **Admin** → **Property** → **Events**
2. Enable these events:
   - `purchase` - When customers complete a purchase
   - `add_to_cart` - When items are added to cart
   - `view_item` - When products are viewed
   - `begin_checkout` - When checkout process starts

---

## 📱 2. Facebook Pixel Setup (Optional)

### Step 1: Create Facebook Pixel
1. Go to [Facebook Business Manager](https://business.facebook.com/)
2. Navigate to **Events Manager**
3. Click **Connect Data Sources** → **Web** → **Facebook Pixel**
4. Name your pixel: "Berenice London Pixel"
5. Copy the **Pixel ID** (numeric value)

### Step 2: Configure Events
The website will automatically track these Facebook events:
- **PageView** - All page visits
- **AddToCart** - Add items to cart
- **Purchase** - Completed purchases
- **CompleteRegistration** - User sign-ups

---

## 🔥 3. Hotjar Setup (Optional)

### Step 1: Create Hotjar Account
1. Go to [Hotjar](https://www.hotjar.com/)
2. Sign up for an account
3. Create a new site with URL: `https://graceful-crisp-e96a53.netlify.app`
4. Copy the **Site ID** (numeric value)

### Step 2: Benefits
Hotjar provides:
- **Heatmaps** - See where users click and scroll
- **Recordings** - Watch user sessions
- **Feedback** - Collect user feedback
- **Surveys** - Ask users questions

---

## 🔍 4. Microsoft Clarity Setup (Optional)

### Step 1: Create Clarity Account
1. Go to [Microsoft Clarity](https://clarity.microsoft.com/)
2. Sign in with Microsoft account
3. Click **Add new project**
4. Enter website URL: `https://graceful-crisp-e96a53.netlify.app`
5. Copy the **Project ID**

### Step 2: Features
Microsoft Clarity offers:
- **Free** user behavior analytics
- **Session recordings**
- **Heatmaps**
- **No traffic limits**

---

## ⚙️ 5. Environment Variables Configuration

### Step 1: Access Netlify Settings
1. Go to: `https://app.netlify.com/sites/graceful-crisp-e96a53/settings/env`
2. Click **"Add variable"** for each tracking ID

### Step 2: Add Required Variables
```bash
# Google Analytics (Required)
NEXT_PUBLIC_GA_ID = G-XXXXXXXXXX

# Facebook Pixel (Optional)
NEXT_PUBLIC_FB_PIXEL_ID = 1234567890123456

# Hotjar (Optional)
NEXT_PUBLIC_HOTJAR_ID = 1234567

# Microsoft Clarity (Optional)
NEXT_PUBLIC_CLARITY_PROJECT_ID = abcd1234
```

### Step 3: Deploy Changes
1. Click **"Save"** for each variable
2. Go to **Deploys** tab
3. Click **"Trigger deploy"**
4. Wait for deployment to complete

---

## ✅ 6. Verification & Testing

### Step 1: Check Environment Status
1. Go to your website admin panel: `/admin`
2. Click on **"Settings"** tab
3. Verify all environment variables show as **"Set"**

### Step 2: Test Google Analytics
1. Visit your website: `https://graceful-crisp-e96a53.netlify.app`
2. In Google Analytics, go to **Reports** → **Realtime**
3. You should see your visit appear within 30 seconds

### Step 3: Test Facebook Pixel
1. Install [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/) Chrome extension
2. Visit your website
3. Click the extension - it should show active pixels

### Step 4: Test Other Tracking
- **Hotjar**: Check dashboard for session recordings
- **Clarity**: Check project dashboard for data

---

## 📊 7. Analytics Dashboard

### Internal Analytics
Your website includes a built-in analytics dashboard:
- **Real-time visitors**
- **Page views**
- **Conversion tracking**
- **User behavior flow**

Access via: `/admin` → **Analytics** tab

### Key Metrics to Monitor
1. **Traffic Sources** - Where visitors come from
2. **Page Performance** - Most viewed pages
3. **Conversion Rate** - Visitors who make purchases
4. **User Journey** - How users navigate your site
5. **Product Performance** - Best-selling items

---

## 🎯 8. E-commerce Tracking Events

The website automatically tracks these important events:

### Product Events
- **Product View** - When someone views a product page
- **Add to Cart** - When items are added to cart
- **Remove from Cart** - When items are removed
- **Begin Checkout** - When checkout process starts
- **Purchase** - When payment is completed

### User Events
- **User Registration** - New account creation
- **Login** - User authentication
- **Newsletter Signup** - Email subscription
- **Booking Made** - Appointment scheduling

### Engagement Events
- **File Download** - Brochure/catalog downloads
- **Video Play** - Media engagement
- **Search** - Site search usage
- **Page Scroll** - Content engagement

---

## 🚨 9. Troubleshooting

### Common Issues

**Analytics Not Working?**
- Check environment variables are set correctly
- Verify measurement ID format (G-XXXXXXXXXX)
- Clear browser cache and test again
- Check browser console for errors

**Facebook Pixel Not Firing?**
- Verify Pixel ID is numeric only
- Check Facebook Pixel Helper extension
- Test in incognito mode

**No Data Appearing?**
- Wait 24-48 hours for initial data
- Check timezone settings in analytics platforms
- Verify website is receiving traffic

### Getting Help
- **Google Analytics**: [Help Center](https://support.google.com/analytics/)
- **Facebook Pixel**: [Business Help Center](https://www.facebook.com/business/help/)
- **Hotjar**: [Knowledge Base](https://help.hotjar.com/)

---

## 🔐 10. Privacy & GDPR Compliance

### Important Notes
- **Cookie Consent**: Consider adding cookie consent banner
- **Privacy Policy**: Update to include tracking information
- **Data Retention**: Configure appropriate data retention periods
- **User Rights**: Provide opt-out mechanisms

### Best Practices
1. **Be Transparent** - Tell users about tracking
2. **Collect Minimal Data** - Only track what you need
3. **Secure Data** - Ensure tracking data is protected
4. **Respect Preferences** - Honor user opt-out requests

---

## 📈 11. Advanced Setup (Optional)

### Google Analytics 4 Enhanced Setup
- **Custom Events** - Track specific business actions
- **Audience Creation** - Segment users for remarketing
- **Goal Configuration** - Set up conversion goals
- **Attribution Modeling** - Understand customer journey

### Cross-Platform Tracking
- **Google Ads Integration** - Connect advertising accounts
- **Search Console** - Link for SEO insights
- **YouTube Analytics** - If using video content

---

## 🎉 Success!

Once setup is complete, you'll have:
- ✅ **Comprehensive tracking** of user behavior
- ✅ **E-commerce insights** on sales and products
- ✅ **Real-time monitoring** of website performance
- ✅ **Data-driven decisions** for business growth
- ✅ **ROI measurement** for marketing campaigns

Your analytics setup will provide valuable insights to help grow your Berenice London business! 🚀
