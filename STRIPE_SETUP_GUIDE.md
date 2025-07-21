# 🚀 Stripe Live Payment Setup Guide for Berenice London

This guide will walk you through setting up live Stripe payments for the Berenice London website.

## 📋 Prerequisites

Before you begin, ensure you have:
- A Stripe account (create one at [stripe.com](https://stripe.com))
- Access to your business banking information
- Business registration documents
- Your website deployed and accessible

## 🏪 1. Stripe Account Setup

### Create Your Stripe Account
1. Go to [stripe.com](https://stripe.com) and click "Start now"
2. Sign up with your business email address
3. Complete the business verification process:
   - Business type and legal structure
   - Business address and contact information
   - Tax ID/VAT number
   - Bank account details for payouts

### Business Verification
Stripe requires verification before you can accept live payments:
- **Business documents**: Certificate of incorporation, business license
- **Identity verification**: Government-issued ID for business owners
- **Banking information**: Business bank account details
- **Tax information**: Tax ID, VAT registration (if applicable)

**Note**: Verification can take 1-7 business days depending on your country and business type.

## 🔑 2. API Keys Configuration

### Get Your API Keys
1. Log into your Stripe Dashboard
2. Go to **Developers** > **API keys**
3. Copy your keys:
   - **Publishable key**: `pk_live_...` (safe to expose publicly)
   - **Secret key**: `sk_live_...` (keep private, server-side only)

### Environment Variables Setup
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Update your `.env.local` file with your live keys:
   ```bash
   # Live Stripe Keys
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE=pk_live_your_actual_live_key_here
   STRIPE_SECRET_KEY_LIVE=sk_live_your_actual_secret_key_here
   ```

3. For production deployment, set these as environment variables in your hosting platform:
   - **Netlify**: Site settings > Environment variables
   - **Vercel**: Project settings > Environment Variables
   - **Railway**: Project > Variables

## 🪝 3. Webhook Configuration

Webhooks are essential for processing payment confirmations and handling order fulfillment.

### Create Webhook Endpoint
1. In Stripe Dashboard, go to **Developers** > **Webhooks**
2. Click **Add endpoint**
3. Set endpoint URL: `https://berenicelondon.co.uk/api/stripe/webhook`
4. Select events to listen for:
   ```
   payment_intent.succeeded
   payment_intent.payment_failed
   charge.dispute.created
   customer.subscription.created
   customer.subscription.updated
   customer.subscription.deleted
   invoice.payment_succeeded
   invoice.payment_failed
   ```

### Configure Webhook Secret
1. After creating the webhook, copy the **Signing secret**
2. Add it to your environment variables:
   ```bash
   STRIPE_WEBHOOK_SECRET_LIVE=whsec_your_webhook_secret_here
   ```

## 💳 4. Payment Methods Setup

### Enable Payment Methods
1. Go to **Settings** > **Payment methods**
2. Enable the payment methods you want to accept:
   - **Cards**: Visa, Mastercard, American Express
   - **Digital wallets**: Apple Pay, Google Pay
   - **Bank payments**: SEPA Direct Debit (EU), ACH (US)
   - **Buy now, pay later**: Klarna, Afterpay

### Configure 3D Secure
For enhanced security and reduced fraud:
1. Go to **Settings** > **Radar** > **Rules**
2. Enable 3D Secure for payments over £50:
   ```
   Charge is for more than £50 → Request 3D Secure
   ```

## 🔒 5. Security Configuration

### Enable Radar (Fraud Protection)
1. Go to **Settings** > **Radar**
2. Enable **Radar for Fraud Teams**
3. Configure rules for your business:
   - Block payments from high-risk countries
   - Flag unusual spending patterns
   - Block payments with mismatched billing info

### Set Up Dispute Protection
1. Go to **Settings** > **Radar** > **Dispute protection**
2. Enable protection for eligible payments
3. Configure automatic responses to disputes

## 📧 6. Email Notifications

### Customer Receipts
1. Go to **Settings** > **Emails**
2. Enable customer receipt emails
3. Customize the email template with your branding
4. Set the sender email to match your domain

### Business Notifications
Configure notifications for:
- Successful payments
- Failed payments
- Disputes and chargebacks
- Weekly/monthly reports

## 🧪 7. Testing Before Going Live

### Test Mode Validation
Before switching to live mode, thoroughly test:

1. **Test payments** with test card numbers:
   ```
   Success: 4242 4242 4242 4242
   Decline: 4000 0000 0000 0002
   3D Secure: 4000 0000 0000 3220
   ```

2. **Webhook functionality**:
   - Use ngrok to test webhooks locally
   - Verify all webhook events are handled correctly

3. **Error scenarios**:
   - Card declined
   - Network timeouts
   - Invalid card details

### Pre-Launch Checklist
- [ ] Business verification completed
- [ ] Live API keys configured
- [ ] Webhooks set up and tested
- [ ] Payment methods enabled
- [ ] Fraud protection configured
- [ ] Email notifications working
- [ ] SSL certificate installed
- [ ] Test transactions processed successfully

## 🚀 8. Going Live

### Switch to Live Mode
1. Ensure all tests pass in test mode
2. Update environment variables with live keys
3. Deploy to production
4. Test with small real transactions

### Monitor Your Integration
1. **Stripe Dashboard**: Monitor payments in real-time
2. **Webhook logs**: Check webhook delivery status
3. **Error tracking**: Monitor application logs
4. **Customer feedback**: Watch for payment issues

## 📊 9. Business Intelligence

### Revenue Reporting
Set up automated reports:
1. Go to **Reporting** > **Dashboard**
2. Configure daily/weekly/monthly reports
3. Set up email delivery to stakeholders

### Export Data
Regularly export data for accounting:
1. **Payments**: For revenue tracking
2. **Payouts**: For bank reconciliation
3. **Fees**: For expense reporting

## 🆘 10. Support and Troubleshooting

### Common Issues

#### Payment Declined
- Check card details are correct
- Verify sufficient funds
- Check for international card restrictions

#### Webhook Not Receiving Events
- Verify endpoint URL is correct and accessible
- Check webhook secret is properly configured
- Ensure HTTPS is enabled

#### 3D Secure Issues
- Verify 3D Secure is properly implemented
- Test with 3D Secure test cards
- Check bank requirements for authentication

### Getting Help
- **Stripe Documentation**: [docs.stripe.com](https://docs.stripe.com)
- **Stripe Support**: Available 24/7 via dashboard
- **Community**: [Stack Overflow](https://stackoverflow.com/questions/tagged/stripe-payments)

## 🔧 11. Advanced Configuration

### Custom Domain for Checkout
1. Set up custom domain: `checkout.berenicelondon.co.uk`
2. Configure SSL certificate
3. Update Stripe settings

### Multi-Currency Support
1. Enable additional currencies in Stripe
2. Update payment forms to show local currency
3. Configure automatic currency conversion

### Subscription Billing (Future Enhancement)
For membership subscriptions:
1. Create products and pricing in Stripe
2. Set up subscription webhooks
3. Implement subscription management UI

## 📱 12. Mobile Optimization

### Apple Pay Setup
1. Verify domain with Apple: [developer.apple.com](https://developer.apple.com/apple-pay/)
2. Add domain verification file to your website
3. Test Apple Pay on iOS devices

### Google Pay Setup
1. Register your domain in Google Pay console
2. Verify integration with test payments
3. Submit for production review

## 🌍 13. International Considerations

### UK Regulations
- **PCI DSS Compliance**: Stripe handles this automatically
- **Strong Customer Authentication (SCA)**: 3D Secure implementation
- **GDPR**: Customer data protection (Stripe is GDPR compliant)

### VAT Handling
1. Configure VAT rates in Stripe
2. Set up automatic VAT calculation
3. Generate VAT invoices for business customers

## ✅ Final Verification

Before launching, verify:
- [ ] Live payments working correctly
- [ ] Order confirmation emails sent
- [ ] Webhook events processed
- [ ] Customer receipts delivered
- [ ] Dashboard shows real transactions
- [ ] Bank account receives payouts
- [ ] All error scenarios handled gracefully

## 🎉 Congratulations!

Your Berenice London website is now ready to accept live payments securely through Stripe!

Remember to:
- Monitor transactions regularly
- Keep your integration updated
- Review Stripe's feature updates
- Maintain PCI compliance
- Back up transaction data

For any issues or questions, refer to the troubleshooting section or contact Stripe support.

---

**Next Steps**: Consider implementing advanced features like subscription billing, multi-currency support, or marketplace functionality as your business grows.
