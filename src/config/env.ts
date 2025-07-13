// Environment configuration with fallback values for Netlify deployment
export const env = {
  // App Configuration
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://berenicelondon.co.uk',
  NODE_ENV: process.env.NODE_ENV || 'production',

  // Stripe Configuration
  STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || '',
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || '',

  // Build-time flags
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',

  // Business Configuration
  BUSINESS_EMAIL: process.env.BUSINESS_EMAIL || 'contact@berenicelondon.co.uk',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@berenicelondon.co.uk',

  // Feature Flags
  ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? true : false,
  ENABLE_VIRTUAL_TRYON: process.env.ENABLE_VIRTUAL_TRYON !== 'false',

  // Validation function
  validate() {
    if (this.IS_PRODUCTION) {
      const required = [
        'STRIPE_PUBLISHABLE_KEY',
        'STRIPE_SECRET_KEY',
      ];

      const missing = required.filter(key => !this[key as keyof typeof this]);

      if (missing.length > 0) {
        console.warn(`Missing required environment variables: ${missing.join(', ')}`);
        // Don't throw error during build, just warn
        if (typeof window !== 'undefined') {
          console.error('Application may not function correctly without required environment variables');
        }
      }
    }

    return true;
  }
};

// Validate environment on module load
env.validate();
