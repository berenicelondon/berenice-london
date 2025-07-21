#!/bin/bash

# 🔧 GitHub Workflows Setup and Status Checker
# Berenice London E-commerce Platform

set -e

echo "🔧 GitHub Workflows Setup and Status Checker"
echo "=============================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d ".github/workflows" ]; then
    echo -e "${RED}❌ Error: Run this script from the berenice-london project root${NC}"
    exit 1
fi

echo -e "${BLUE}📂 Project Directory Check${NC}"
echo "✅ Found package.json"
echo "✅ Found .github/workflows directory"
echo ""

# Check GitHub CLI
echo -e "${BLUE}🔧 GitHub CLI Check${NC}"
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI is installed"
    GH_USER=$(gh api user --jq '.login' 2>/dev/null || echo "Not authenticated")
    if [ "$GH_USER" != "Not authenticated" ]; then
        echo "✅ Authenticated as: $GH_USER"
    else
        echo -e "${YELLOW}⚠️  GitHub CLI not authenticated. Run: gh auth login${NC}"
    fi
else
    echo -e "${RED}❌ GitHub CLI not found. Install from: https://cli.github.com${NC}"
fi
echo ""

# List available workflows
echo -e "${BLUE}📋 Available Workflows${NC}"
WORKFLOW_COUNT=$(find .github/workflows -name "*.yml" -o -name "*.yaml" | wc -l)
echo "Found $WORKFLOW_COUNT workflow files:"

for workflow in .github/workflows/*.yml .github/workflows/*.yaml; do
    if [ -f "$workflow" ]; then
        WORKFLOW_NAME=$(grep -m1 "^name:" "$workflow" | sed 's/name: //' | tr -d '"' || echo "$(basename "$workflow")")
        echo "  📄 $WORKFLOW_NAME"
        echo "     File: $(basename "$workflow")"
    fi
done
echo ""

# Check workflow status (if GitHub CLI is available and authenticated)
if command -v gh &> /dev/null && [ "$GH_USER" != "Not authenticated" ]; then
    echo -e "${BLUE}🔍 Workflow Status Check${NC}"

    # List workflows
    echo "Active Workflows:"
    gh workflow list || echo "No workflows found or GitHub CLI access issue"
    echo ""

    # Check recent runs
    echo "Recent Workflow Runs (last 5):"
    gh run list --limit 5 || echo "No recent runs or GitHub CLI access issue"
    echo ""

    # Check for failed runs
    FAILED_RUNS=$(gh run list --status failure --limit 3 --json conclusion,name,headBranch 2>/dev/null || echo "[]")
    if [ "$FAILED_RUNS" != "[]" ] && [ "$FAILED_RUNS" != "" ]; then
        echo -e "${YELLOW}⚠️  Recent Failed Runs:${NC}"
        gh run list --status failure --limit 3
        echo ""
    fi
fi

# Check workflow configuration
echo -e "${BLUE}⚙️  Workflow Configuration Check${NC}"

# Check main deployment workflow
if [ -f ".github/workflows/main-deployment.yml" ]; then
    echo "✅ Main Deployment Pipeline configured"
else
    echo -e "${RED}❌ Main Deployment Pipeline missing${NC}"
fi

# Check Netlify workflow
if [ -f ".github/workflows/deploy-netlify.yml" ]; then
    echo "✅ Netlify Deployment workflow configured"
else
    echo -e "${RED}❌ Netlify Deployment workflow missing${NC}"
fi

# Check Vercel workflow
if [ -f ".github/workflows/deploy-vercel.yml" ]; then
    echo "✅ Vercel Deployment workflow configured"
else
    echo -e "${RED}❌ Vercel Deployment workflow missing${NC}"
fi

# Check CI/CD workflow
if [ -f ".github/workflows/ci-cd.yml" ]; then
    echo "✅ CI/CD Pipeline configured"
else
    echo -e "${YELLOW}⚠️  CI/CD Pipeline missing${NC}"
fi

echo ""

# Check required secrets (if GitHub CLI is available)
if command -v gh &> /dev/null && [ "$GH_USER" != "Not authenticated" ]; then
    echo -e "${BLUE}🔐 GitHub Secrets Check${NC}"

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

    SECRETS_LIST=$(gh secret list --json name --jq '.[].name' 2>/dev/null || echo "")

    echo "Checking required secrets:"
    for secret in "${REQUIRED_SECRETS[@]}"; do
        if echo "$SECRETS_LIST" | grep -q "^$secret$"; then
            echo "  ✅ $secret"
        else
            echo -e "  ${RED}❌ $secret (missing)${NC}"
        fi
    done
    echo ""
fi

# Check project configuration files
echo -e "${BLUE}📝 Project Configuration Check${NC}"

if [ -f "netlify.toml" ]; then
    echo "✅ netlify.toml configured"
else
    echo -e "${YELLOW}⚠️  netlify.toml missing${NC}"
fi

if [ -f "vercel.json" ]; then
    echo "✅ vercel.json configured"
else
    echo -e "${YELLOW}⚠️  vercel.json missing${NC}"
fi

if [ -f ".nvmrc" ]; then
    NODE_VERSION=$(cat .nvmrc)
    echo "✅ Node.js version specified: $NODE_VERSION"
else
    echo -e "${YELLOW}⚠️  .nvmrc missing${NC}"
fi

echo ""

# Test build locally
echo -e "${BLUE}🏗️  Local Build Test${NC}"
echo "Testing local build..."

if npm run build &>/dev/null; then
    echo "✅ Local build successful"

    # Check build output
    if [ -d ".next" ]; then
        BUILD_SIZE=$(du -sh .next 2>/dev/null | cut -f1)
        ROUTE_COUNT=$(find .next/server/app -name "page.js" 2>/dev/null | wc -l)
        echo "  📊 Build size: $BUILD_SIZE"
        echo "  📄 Generated routes: $ROUTE_COUNT"
    fi
else
    echo -e "${RED}❌ Local build failed${NC}"
    echo "Run 'npm run build' to see detailed error messages"
fi

echo ""

# Recommendations
echo -e "${BLUE}💡 Recommendations${NC}"

if [ "$GH_USER" = "Not authenticated" ]; then
    echo "1. Authenticate GitHub CLI: gh auth login"
fi

if ! echo "$SECRETS_LIST" | grep -q "NETLIFY_AUTH_TOKEN"; then
    echo "2. Configure GitHub Secrets for automated deployments"
    echo "   Go to: Repository Settings → Secrets and variables → Actions"
fi

if [ ! -f "vercel.json" ]; then
    echo "3. Add vercel.json for Vercel deployment optimization"
fi

echo "4. Monitor workflow runs: https://github.com/$(gh repo view --json owner,name --jq '.owner.login + "/" + .name')/actions"

echo ""

# Manual workflow trigger
echo -e "${BLUE}🚀 Manual Workflow Trigger${NC}"
echo "To manually trigger deployments:"
echo "1. Main Deployment: gh workflow run main-deployment.yml"
echo "2. Netlify Only:    gh workflow run deploy-netlify.yml"
echo "3. Vercel Only:     gh workflow run deploy-vercel.yml"

echo ""
echo -e "${GREEN}🎉 Workflow Setup Check Complete!${NC}"
echo ""
echo "📖 For detailed setup instructions, see: GITHUB_SETUP_GUIDE.md"
echo "🔧 To configure secrets: Repository Settings → Secrets and variables → Actions"
echo "📊 Monitor deployments: https://github.com/$(gh repo view --json owner,name --jq '.owner.login + "/" + .name' 2>/dev/null || echo 'your-username/berenice-london')/actions"
