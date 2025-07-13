#!/bin/bash

# 🔑 GitHub Secrets Interactive Setup Script
# Berenice London E-commerce Platform

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}🔑 GitHub Secrets Interactive Setup${NC}"
echo "======================================"
echo ""
echo "This script will guide you through setting up GitHub secrets for automated deployments."
echo ""

# Check GitHub CLI authentication
if ! command -v gh &> /dev/null; then
    echo -e "${RED}❌ GitHub CLI not found. Install from: https://cli.github.com${NC}"
    exit 1
fi

GH_USER=$(gh api user --jq '.login' 2>/dev/null || echo "Not authenticated")
if [ "$GH_USER" = "Not authenticated" ]; then
    echo -e "${RED}❌ GitHub CLI not authenticated. Run: gh auth login${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Authenticated as: $GH_USER${NC}"
echo ""

# Function to set a secret
set_secret() {
    local name=$1
    local description=$2
    local instructions=$3

    echo -e "${BLUE}📝 Setting up: $name${NC}"
    echo "Description: $description"
    echo ""
    echo -e "${YELLOW}Instructions:${NC}"
    echo "$instructions"
    echo ""

    # Check if secret already exists
    if gh secret list --json name --jq '.[].name' | grep -q "^$name$"; then
        echo -e "${YELLOW}⚠️  Secret '$name' already exists.${NC}"
        read -p "Do you want to update it? (y/n): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo "Skipping $name"
            echo ""
            return
        fi
    fi

    read -s -p "Enter value for $name: " secret_value
    echo

    if [ -n "$secret_value" ]; then
        if gh secret set "$name" --body "$secret_value"; then
            echo -e "${GREEN}✅ $name set successfully${NC}"
        else
            echo -e "${RED}❌ Failed to set $name${NC}"
        fi
    else
        echo -e "${YELLOW}⚠️  Empty value, skipping $name${NC}"
    fi
    echo ""
}

echo -e "${CYAN}🌐 NETLIFY SECRETS${NC}"
echo "=================="

set_secret "NETLIFY_AUTH_TOKEN" \
    "Personal access token for Netlify deployments" \
    "1. Go to: https://app.netlify.com/user/applications/personal
2. Generate new token with name: 'Berenice London GitHub Actions'
3. Copy the token (it will only be shown once)"

set_secret "NETLIFY_SITE_ID" \
    "Netlify site identifier for deployments" \
    "1. Go to: https://app.netlify.com
2. Create new site or use existing site
3. Go to Site settings → General
4. Copy the Site ID (format: 12345678-1234-1234-1234-123456789abc)"

echo -e "${CYAN}⚡ VERCEL SECRETS${NC}"
echo "================="

set_secret "VERCEL_TOKEN" \
    "Vercel authentication token for deployments" \
    "1. Go to: https://vercel.com/account/tokens
2. Create new token with name: 'Berenice London GitHub Actions'
3. Copy the token"

set_secret "VERCEL_ORG_ID" \
    "Vercel organization identifier" \
    "1. Go to: https://vercel.com → Settings
2. Copy Team ID (if team account) or Personal Account ID
3. Found in the URL or settings page"

set_secret "VERCEL_PROJECT_ID" \
    "Vercel project identifier" \
    "1. Go to: https://vercel.com
2. Create new project or use existing
3. Import from GitHub: berenicelondon/berenice-london
4. Go to Project Settings → General
5. Copy the Project ID"

echo -e "${CYAN}💳 STRIPE SECRETS${NC}"
echo "================="

set_secret "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" \
    "Stripe publishable key (public, safe for client-side)" \
    "1. Go to: https://dashboard.stripe.com/apikeys
2. Copy Publishable key (starts with pk_test_ or pk_live_)
3. Use test keys for development, live keys for production"

set_secret "STRIPE_SECRET_KEY" \
    "Stripe secret key (private, server-side only)" \
    "1. Same page as above
2. Reveal and copy Secret key (starts with sk_test_ or sk_live_)
3. Keep this secret secure!"

set_secret "STRIPE_WEBHOOK_SECRET" \
    "Stripe webhook signing secret for payment verification" \
    "1. Go to: https://dashboard.stripe.com/webhooks
2. Add endpoint with URL: https://your-domain.com/api/stripe/webhook
3. Select events: payment_intent.succeeded, payment_intent.payment_failed
4. Copy the webhook signing secret (starts with whsec_)"

echo -e "${CYAN}📊 OPTIONAL SECRETS${NC}"
echo "==================="

echo "These are optional but recommended for production:"
echo ""

read -p "Do you want to set up optional business configuration secrets? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    set_secret "BUSINESS_EMAIL" \
        "Business contact email" \
        "Enter your business email (e.g., contact@berenicelondon.co.uk)"

    set_secret "ADMIN_EMAIL" \
        "Admin notification email" \
        "Enter admin email for system notifications (e.g., admin@berenicelondon.co.uk)"
fi

echo ""
echo -e "${GREEN}🎉 Secrets Setup Complete!${NC}"
echo ""

# Verify secrets
echo -e "${BLUE}🔍 Verifying Secrets${NC}"
SECRETS_LIST=$(gh secret list --json name --jq '.[].name')
REQUIRED_SECRETS=(
    "NETLIFY_AUTH_TOKEN"
    "NETLIFY_SITE_ID"
    "VERCEL_TOKEN"
    "VERCEL_ORG_ID"
    "VERCEL_PROJECT_ID"
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
    "STRIPE_SECRET_KEY"
    "STRIPE_WEBHOOK_SECRET"
)

echo "Checking required secrets:"
ALL_SET=true
for secret in "${REQUIRED_SECRETS[@]}"; do
    if echo "$SECRETS_LIST" | grep -q "^$secret$"; then
        echo -e "  ${GREEN}✅ $secret${NC}"
    else
        echo -e "  ${RED}❌ $secret (missing)${NC}"
        ALL_SET=false
    fi
done

echo ""
if [ "$ALL_SET" = true ]; then
    echo -e "${GREEN}🎉 All required secrets are configured!${NC}"
    echo ""
    echo -e "${CYAN}🚀 Next Steps:${NC}"
    echo "1. Trigger a deployment: gh workflow run main-deployment.yml"
    echo "2. Monitor progress: https://github.com/$(gh repo view --json owner,name --jq '.owner.login + "/" + .name')/actions"
    echo "3. Check deployment status: ./scripts/check-workflows.sh"
else
    echo -e "${YELLOW}⚠️  Some required secrets are missing. Please set them up to enable deployments.${NC}"
fi

echo ""
echo -e "${BLUE}📖 For detailed instructions, see: SECRETS_SETUP_GUIDE.md${NC}"
