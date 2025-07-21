#!/bin/bash

# Netlify Deployment Script for Berenice London
# This script prepares and validates the project for Netlify deployment

echo "🚀 Preparing Berenice London for Netlify deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version)
echo "📝 Node.js version: $NODE_VERSION"

if [[ "$NODE_VERSION" < "v18" ]]; then
    echo "⚠️  Warning: Node.js version should be 18 or higher for optimal compatibility"
fi

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf node_modules/.cache

# Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to install dependencies"
    exit 1
fi

# Run build test
echo "🔨 Testing build process..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error: Build failed"
    exit 1
fi

echo "✅ Build successful!"

# Check critical files
echo "🔍 Checking critical files..."
CRITICAL_FILES=(
    "netlify.toml"
    "next.config.js"
    "package.json"
    "src/app/layout.tsx"
    "src/app/page.tsx"
)

for file in "${CRITICAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ Missing critical file: $file"
        exit 1
    fi
done

# Check API routes
echo "🔍 Checking API routes..."
if [ -f "src/app/api/stripe/create-payment-intent/route.ts" ]; then
    echo "✅ Payment Intent API route exists"
else
    echo "❌ Missing Payment Intent API route"
    exit 1
fi

if [ -f "src/app/api/stripe/webhook/route.ts" ]; then
    echo "✅ Webhook API route exists"
else
    echo "❌ Missing Webhook API route"
    exit 1
fi

# Display deployment information
echo ""
echo "🎉 Deployment Ready Summary:"
echo "================================"
echo "✅ Build: Successful"
echo "✅ Dependencies: Installed"
echo "✅ API Routes: Configured"
echo "✅ Netlify Config: Ready"
echo ""
echo "📋 Next Steps:"
echo "1. Push your code to GitHub"
echo "2. Connect your GitHub repo to Netlify"
echo "3. Set build command: npm install --legacy-peer-deps && npm run build"
echo "4. Set publish directory: .next"
echo "5. Deploy!"
echo ""
echo "🌐 Environment Variables to set in Netlify:"
echo "- NEXT_PUBLIC_APP_URL=https://your-site.netlify.app"
echo "- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_demo"
echo "- STRIPE_SECRET_KEY=sk_test_demo"
echo "- STRIPE_WEBHOOK_SECRET=whsec_demo"
echo "- DEMO_MODE=true"
echo ""
echo "🎯 Expected deployment URL format: https://berenicelondon.netlify.app"

exit 0
