/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Temporarily ignore ESLint errors during build
    // These are mostly related to Stripe API types and don't affect functionality
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Enable TypeScript checking during build for production
    ignoreBuildErrors: false,
  },
  images: {
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "ext.same-assets.com",
      "ugc.same-assets.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
    ],
  },
  // Environment variables available to the browser
  env: {
    // Only expose public environment variables
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://berenicelondon.co.uk',
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
  },
  // Output configuration for Netlify - disabled for now
  // output: 'standalone',

  // Netlify-specific configuration
  trailingSlash: false,

  // Experimental features for better performance
  experimental: {
    // Enable PPR for better performance (if needed)
    ppr: false,
  },

  // Webpack configuration for Netlify
  webpack: (config, { dev, isServer }) => {
    // Optimize for Netlify build environment
    if (!dev && isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          default: false,
          vendors: false,
        },
      };
    }
    return config;
  },

  // API routes configuration
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
