# 💇‍♀️ Berenice London - Premium Hair & Wig E-Commerce Platform

<div align="center">

![Berenice London](https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=200&fit=crop&crop=center)

**A premium e-commerce platform for luxury hair solutions with advanced features**

[![Live Site](https://img.shields.io/badge/🌐%20Live%20Site-berenicelondon.co.uk-blue)](https://berenicelondon.co.uk)
[![Netlify Status](https://api.netlify.com/api/v1/badges/12345678-1234-1234-1234-123456789abc/deploy-status)](https://app.netlify.com/sites/berenicelondon/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.3-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Stripe](https://img.shields.io/badge/Stripe-008CDD?logo=stripe&logoColor=white)](https://stripe.com)

[🌐 Live Demo](https://berenicelondon.co.uk) • [📖 Documentation](#-documentation) • [🚀 Quick Start](#-quick-start) • [🛠️ Contributing](#-contributing)

</div>

---

## ✨ Features

### 🛍️ **E-Commerce Core**
- **Product Catalog**: Comprehensive wig collection with detailed specifications
- **Shopping Cart**: Persistent cart with real-time updates
- **Checkout System**: Streamlined checkout with multiple payment options
- **Order Management**: Complete order tracking and history
- **Inventory System**: Real-time stock management
- **Search & Filtering**: Advanced product search with filters
- **Product Reviews**: Customer feedback and rating system

### 💳 **Payment Integration**
- **Live Stripe Payments**: Secure payment processing with Stripe
- **Multiple Payment Methods**: Cards, Google Pay, Apple Pay, Link
- **Subscription Support**: Membership plans and recurring payments
- **Webhook Handling**: Automated order fulfillment
- **Fraud Protection**: Built-in Stripe Radar integration
- **Tax Calculation**: Automatic tax calculation by location
- **Refund Management**: Automated refund processing

### 👤 **User Management**
- **Authentication System**: Secure login/register with 2FA support
- **Membership Tiers**: Basic, Premium, and Elite memberships
- **Member Dashboard**: Personalized user experience
- **Profile Management**: Photo upload and account settings
- **Guest Checkout**: No account required for purchases
- **Social Login**: Google and Facebook authentication
- **Account Recovery**: Secure password reset system

### 🎭 **Virtual Try-On**
- **Camera Integration**: Real-time hair/wig visualization
- **Member-Only Feature**: Exclusive access for registered users
- **Style Comparison**: Side-by-side style comparisons
- **Photo Capture**: Save and share virtual try-on sessions
- **AR Technology**: Advanced augmented reality integration
- **Style Recommendations**: AI-powered style suggestions

### 🤖 **AI Support**
- **Intelligent Chatbot**: 24/7 customer support
- **Product Recommendations**: Personalized product suggestions
- **Style Consultant**: AI-powered styling advice
- **Natural Language Processing**: Advanced query understanding
- **Multi-language Support**: Support for multiple languages

### 🔐 **Security & Privacy**
- **2FA Authentication**: Two-factor authentication support
- **GDPR Compliance**: Full GDPR compliance with consent management
- **Data Encryption**: End-to-end data encryption
- **Security Monitoring**: Real-time security threat detection
- **Privacy Controls**: Granular privacy settings
- **Audit Logging**: Comprehensive activity logging

### 🎨 **Admin Panel**
- **Product Management**: Full CRUD operations for products
- **Order Management**: Order tracking and fulfillment
- **User Management**: Customer account administration
- **Analytics Dashboard**: Sales and user analytics
- **Content Management**: Website content administration
- **Inventory Control**: Stock level management
- **Marketing Tools**: Discount codes and promotions

### 📈 **SEO & Performance**
- **SEO Optimized**: Full SEO optimization with meta tags
- **Structured Data**: Rich snippets and schema markup
- **Performance Monitoring**: Real-time performance tracking
- **Core Web Vitals**: Optimized for Google's Core Web Vitals
- **Image Optimization**: Next.js Image optimization
- **Lazy Loading**: Optimized content loading

---

## 🛠️ Technology Stack

### **Frontend**
- **Framework**: [Next.js 15.3](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) for type safety
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom design system
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives
- **Icons**: [Lucide React](https://lucide.dev/) icon library
- **Forms**: [React Hook Form](https://react-hook-form.com/) with Zod validation

### **Backend & APIs**
- **API Routes**: Next.js API routes for server-side logic
- **Authentication**: Custom auth system with 2FA support
- **Payments**: [Stripe](https://stripe.com/) for payment processing
- **Webhooks**: Stripe webhooks for order automation
- **Email**: Automated email notifications

### **Database & Storage**
- **Database**: PostgreSQL (production-ready)
- **File Storage**: Cloud storage for product images
- **Session Management**: Secure session handling
- **Caching**: Redis caching for performance

### **Development Tools**
- **Package Manager**: [Bun](https://bun.sh/) for fast package management
- **Linting**: [ESLint](https://eslint.org/) with Next.js config
- **Formatting**: [Biome](https://biomejs.dev/) for code formatting
- **Type Checking**: TypeScript strict mode
- **Git Hooks**: Pre-commit hooks for code quality

### **Deployment & Infrastructure**
- **Hosting**: [Netlify](https://www.netlify.com/) with custom domain
- **CDN**: Global content delivery network
- **SSL**: Automatic SSL certificate management
- **Environment**: Production, staging, and development environments
- **Monitoring**: Real-time performance and error monitoring

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.17 or later
- **Bun** package manager ([Install Bun](https://bun.sh/docs/installation))
- **Git** for version control
- **Stripe Account** for payment processing

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/berenicelondon/berenice-london.git
   cd berenice-london
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your configuration:
   ```env
   # Application
   NEXT_PUBLIC_APP_URL=http://localhost:3000

   # Stripe Configuration
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...

   # Database
   DATABASE_URL=postgresql://...

   # Authentication
   NEXTAUTH_SECRET=your-secret-here
   NEXTAUTH_URL=http://localhost:3000

   # Email Configuration
   EMAIL_SERVER_HOST=smtp.gmail.com
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER=your-email@gmail.com
   EMAIL_SERVER_PASSWORD=your-password
   EMAIL_FROM=noreply@berenicelondon.co.uk
   ```

4. **Run the development server**
   ```bash
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Development Commands

```bash
# Start development server
bun dev

# Build for production
bun build

# Start production server
bun start

# Run type checking and linting
bun lint

# Format code
bun format

# Check types only
bunx tsc --noEmit
```

---

## 🔧 Environment Variables Setup

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_APP_URL` | Application URL | `https://berenicelondon.co.uk` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | `pk_live_...` |
| `STRIPE_SECRET_KEY` | Stripe secret key | `sk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | `whsec_...` |
| `DATABASE_URL` | Database connection string | `postgresql://...` |
| `NEXTAUTH_SECRET` | Authentication secret | `your-random-secret` |
| `NEXTAUTH_URL` | Authentication URL | `https://berenicelondon.co.uk` |

### Optional Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `EMAIL_SERVER_HOST` | SMTP server host | `smtp.gmail.com` |
| `EMAIL_SERVER_PORT` | SMTP server port | `587` |
| `EMAIL_FROM` | Default email sender | `noreply@berenicelondon.co.uk` |
| `ANALYTICS_ID` | Google Analytics ID | - |
| `SENTRY_DSN` | Sentry error tracking | - |

---

## 🚀 Deployment

### Netlify Deployment (Recommended)

1. **Connect to Netlify**
   - Fork this repository
   - Connect your GitHub account to Netlify
   - Select the forked repository

2. **Configure Build Settings**
   ```
   Build command: bun run build
   Publish directory: out
   Node version: 18
   ```

3. **Set Environment Variables**
   Add all required environment variables in Netlify dashboard

4. **Deploy**
   Push to main branch or deploy manually

### Manual Deployment

1. **Build the application**
   ```bash
   bun run build
   ```

2. **Start the server**
   ```bash
   bun start
   ```

### Docker Deployment

```bash
# Build Docker image
docker build -t berenice-london .

# Run container
docker run -p 3000:3000 berenice-london
```

---

## 📁 Project Structure

```
berenice-london/
├── src/
│   ├── app/                    # Next.js 13+ App Router
│   │   ├── (auth)/            # Authentication routes
│   │   ├── (shop)/            # E-commerce routes
│   │   ├── admin/             # Admin panel routes
│   │   ├── api/               # API routes
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # Reusable components
│   │   ├── ui/               # UI primitives
│   │   ├── auth/             # Authentication components
│   │   ├── shop/             # E-commerce components
│   │   └── admin/            # Admin components
│   ├── lib/                  # Utility libraries
│   │   ├── auth.ts           # Authentication utilities
│   │   ├── stripe.ts         # Stripe configuration
│   │   ├── utils.ts          # General utilities
│   │   └── validations.ts    # Zod schemas
│   ├── types/                # TypeScript type definitions
│   └── styles/               # Additional stylesheets
├── public/                   # Static assets
├── .github/                  # GitHub configuration
│   ├── workflows/            # GitHub Actions
│   ├── ISSUE_TEMPLATE/       # Issue templates
│   └── PULL_REQUEST_TEMPLATE.md
├── docs/                     # Documentation
├── .env.example              # Environment variables template
├── .gitignore               # Git ignore rules
├── bun.lock                 # Bun lockfile
├── next.config.js           # Next.js configuration
├── package.json             # Dependencies and scripts
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

---

## 📖 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | User registration |
| POST | `/api/auth/signin` | User login |
| POST | `/api/auth/signout` | User logout |
| GET | `/api/auth/session` | Get current session |
| POST | `/api/auth/reset-password` | Password reset |

### Product Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/[id]` | Get product by ID |
| POST | `/api/products` | Create product (admin) |
| PUT | `/api/products/[id]` | Update product (admin) |
| DELETE | `/api/products/[id]` | Delete product (admin) |

### Order Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | Get user orders |
| POST | `/api/orders` | Create new order |
| GET | `/api/orders/[id]` | Get order by ID |
| PUT | `/api/orders/[id]` | Update order status |

### Payment Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/stripe/create-payment-intent` | Create payment intent |
| POST | `/api/stripe/webhook` | Stripe webhook handler |
| POST | `/api/stripe/create-subscription` | Create subscription |

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test --watch

# Run specific test file
bun test src/components/Button.test.tsx

# Generate coverage report
bun test --coverage
```

### Test Structure

```
src/
├── __tests__/              # Test files
├── components/
│   └── __tests__/          # Component tests
└── lib/
    └── __tests__/          # Utility tests
```

---

## 🐛 Troubleshooting

### Common Issues

#### **Build Errors**

1. **TypeScript errors**
   ```bash
   bunx tsc --noEmit
   ```

2. **Dependency conflicts**
   ```bash
   rm -rf node_modules bun.lock
   bun install
   ```

#### **Development Issues**

1. **Port already in use**
   ```bash
   lsof -ti:3000 | xargs kill -9
   bun dev
   ```

2. **Environment variables not loading**
   - Ensure `.env.local` exists
   - Restart development server
   - Check variable names (must start with `NEXT_PUBLIC_` for client-side)

#### **Stripe Integration**

1. **Webhook not receiving events**
   - Check webhook URL in Stripe dashboard
   - Verify webhook secret in environment variables
   - Use Stripe CLI for local testing:
     ```bash
     stripe listen --forward-to localhost:3000/api/stripe/webhook
     ```

2. **Payment intent creation fails**
   - Verify Stripe secret key
   - Check API version compatibility
   - Ensure amount is in cents

#### **Netlify Deployment**

1. **Build fails on Netlify**
   - Check Node.js version (18+)
   - Verify build command: `bun run build`
   - Check environment variables

2. **Functions not working**
   - Ensure API routes are in `src/app/api/`
   - Check Netlify function limits
   - Verify edge runtime configuration

### Getting Help

- **GitHub Issues**: [Create an issue](https://github.com/berenicelondon/berenice-london/issues)
- **Documentation**: Check the `/docs` folder
- **Discord**: Join our development community
- **Email**: Contact support@berenicelondon.co.uk

---

## 🤝 Contributing

We welcome contributions from the community! Please read our contributing guidelines before getting started.

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   bun lint
   bun test
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Code Standards

- Use TypeScript for all new code
- Follow ESLint configuration
- Write tests for new features
- Update documentation as needed
- Follow conventional commit messages

### Pull Request Guidelines

- Provide clear description of changes
- Include screenshots for UI changes
- Add tests for new functionality
- Update documentation if needed
- Ensure all CI checks pass

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Next.js team** for the amazing framework
- **Stripe** for secure payment processing
- **Radix UI** for accessible components
- **Tailwind CSS** for utility-first styling
- **Netlify** for seamless deployment

---

## 📞 Support

For support and questions:

- **Website**: [berenicelondon.co.uk](https://berenicelondon.co.uk)
- **Email**: support@berenicelondon.co.uk
- **GitHub Issues**: [Issue Tracker](https://github.com/berenicelondon/berenice-london/issues)
- **Documentation**: [Project Wiki](https://github.com/berenicelondon/berenice-london/wiki)

---

<div align="center">

**Made with ❤️ by the Berenice London team**

[⬆ Back to Top](#-berenice-london---premium-hair--wig-e-commerce-platform)

</div>
