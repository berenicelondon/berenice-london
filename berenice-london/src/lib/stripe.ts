import { loadStripe, Stripe } from '@stripe/stripe-js'

// Environment configuration
const config = {
  // Use test keys by default, switch to live keys for production
  publishableKey: process.env.NODE_ENV === 'production'
    ? (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE || process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    : (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51234567890abcdef'),

  secretKey: process.env.NODE_ENV === 'production'
    ? process.env.STRIPE_SECRET_KEY_LIVE
    : process.env.STRIPE_SECRET_KEY,

  webhookSecret: process.env.NODE_ENV === 'production'
    ? process.env.STRIPE_WEBHOOK_SECRET_LIVE
    : process.env.STRIPE_WEBHOOK_SECRET,
}

// Initialize Stripe
let stripePromise: Promise<Stripe | null>

export const getStripe = () => {
  if (!stripePromise) {
    if (!config.publishableKey) {
      // During build time, return a promise that resolves to null
      // This allows static generation to succeed
      if (typeof window === 'undefined') {
        stripePromise = Promise.resolve(null)
      } else {
        throw new Error('Stripe publishable key is not configured')
      }
    } else {
      stripePromise = loadStripe(config.publishableKey)
    }
  }
  return stripePromise
}

// Stripe client (server-side)
export const createStripeInstance = () => {
  if (!config.secretKey) {
    throw new Error('Stripe secret key is not configured')
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Stripe = require('stripe')
  return new Stripe(config.secretKey, {
    apiVersion: '2023-10-16',
    typescript: true,
  })
}

// Payment configuration
export const PAYMENT_CONFIG = {
  currency: 'gbp',

  // Payment methods available
  paymentMethods: [
    'card',
    'google_pay',
    'apple_pay',
    'link',
  ],

  // Shipping countries
  shippingCountries: [
    'GB', // United Kingdom
    'US', // United States
    'CA', // Canada
    'AU', // Australia
    'IE', // Ireland
    'DE', // Germany
    'FR', // France
    'IT', // Italy
    'ES', // Spain
    'NL', // Netherlands
  ],

  // Business information
  businessInfo: {
    name: 'Berenice London',
    description: 'Premium Hair Solutions',
    website: 'https://berenicelondon.co.uk',
    supportEmail: 'support@berenicelondon.co.uk',
    supportPhone: '+44 20 7123 4567',
  },

  // Webhook events to listen for
  webhookEvents: [
    'payment_intent.succeeded',
    'payment_intent.payment_failed',
    'charge.dispute.created',
    'customer.subscription.created',
    'customer.subscription.updated',
    'customer.subscription.deleted',
    'invoice.payment_succeeded',
    'invoice.payment_failed',
  ],

  // Security settings
  security: {
    // Require 3D Secure for payments over this amount (in pence)
    require3DS: 5000, // £50

    // Enable radar fraud detection
    enableRadar: true,

    // Capture payments automatically or manually
    captureMethod: 'automatic',
  },
}

// Utility functions
export const formatCurrency = (amount: number, currency = 'GBP') => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency,
  }).format(amount / 100) // Stripe amounts are in pence
}

export const convertToStripeAmount = (amount: number) => {
  return Math.round(amount * 100) // Convert pounds to pence
}

export const convertFromStripeAmount = (amount: number) => {
  return amount / 100 // Convert pence to pounds
}

// Error handling
export class StripeError extends Error {
  code?: string
  type?: string

  constructor(message: string, code?: string, type?: string) {
    super(message)
    this.name = 'StripeError'
    this.code = code
    this.type = type
  }
}

// Environment validation
export const validateStripeConfig = () => {
  const errors: string[] = []

  if (!config.publishableKey || config.publishableKey.startsWith('pk_test_')) {
    if (process.env.NODE_ENV === 'production') {
      errors.push('Live Stripe publishable key is required for production')
    }
  }

  if (!config.secretKey) {
    errors.push('Stripe secret key is required')
  }

  if (!config.webhookSecret && process.env.NODE_ENV === 'production') {
    errors.push('Stripe webhook secret is required for production')
  }

  return {
    isValid: errors.length === 0,
    errors,
    environment: process.env.NODE_ENV,
    usingLiveKeys: !config.publishableKey?.startsWith('pk_test_'),
  }
}

// Development helper
export const getStripeConfigInfo = () => {
  const validation = validateStripeConfig()

  return {
    ...validation,
    publishableKey: config.publishableKey ?
      `${config.publishableKey.substring(0, 12)}...` : 'Not configured',
    hasSecretKey: !!config.secretKey,
    hasWebhookSecret: !!config.webhookSecret,
    paymentMethods: PAYMENT_CONFIG.paymentMethods,
    currency: PAYMENT_CONFIG.currency,
  }
}
