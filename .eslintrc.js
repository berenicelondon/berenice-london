module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    // Allow any types in Stripe integration files
    '@typescript-eslint/no-explicit-any': [
      'error',
      {
        ignoreRestArgs: true,
      },
    ],
    // Allow require imports for server-side modules
    '@typescript-eslint/no-require-imports': [
      'error',
      {
        allow: ['stripe'], // Allow require for Stripe server-side
      },
    ],
    // Relax some rules for better development experience
    'react-hooks/exhaustive-deps': 'warn',
    'prefer-const': 'warn',
  },
  overrides: [
    {
      // Allow any types in API routes and Stripe integration files
      files: [
        'src/app/api/**/*.ts',
        'src/lib/stripe.ts',
        'src/components/StripePayment.tsx',
        'src/services/*.ts',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-require-imports': 'off',
      },
    },
  ],
};
