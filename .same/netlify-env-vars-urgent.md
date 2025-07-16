# URGENT: Add These Environment Variables in Netlify Dashboard

## Required Variables (Add in Site Settings → Environment Variables):

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_demo_placeholder
STRIPE_SECRET_KEY=sk_test_demo_placeholder
STRIPE_WEBHOOK_SECRET=whsec_demo_placeholder
NEXT_PUBLIC_APP_URL=https://your-site-name.netlify.app
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

## How to Add (URGENT STEPS):
1. Go to: https://app.netlify.com/
2. Click your site
3. Go to: Site settings → Environment variables
4. Click "Add variable" for each one above
5. Click "Save"
6. Go to Deploys tab
7. Click "Trigger deploy"

## If Build Still Fails:
Copy the EXACT error message from your build log and we'll fix it immediately.
