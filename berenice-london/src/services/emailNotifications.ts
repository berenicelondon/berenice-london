// Email notification service (mock implementation)
// In a real application, this would integrate with services like SendGrid, Mailgun, or AWS SES

interface EmailTemplate {
  subject: string
  htmlContent: string
  textContent: string
}

interface NotificationData {
  userEmail: string
  userName: string
  [key: string]: string | number | boolean | undefined
}

class EmailNotificationService {
  private baseUrl: string = 'https://berenice-london.com'

  private getTemplate(type: string, data: NotificationData): EmailTemplate {
    switch (type) {
      case 'booking_confirmation':
        return {
          subject: `Booking Confirmation - ${data.bookingReference}`,
          htmlContent: this.generateBookingConfirmationHTML(data),
          textContent: this.generateBookingConfirmationText(data)
        }

      case 'booking_reminder':
        return {
          subject: `Appointment Reminder - Tomorrow at ${data.appointmentTime}`,
          htmlContent: this.generateBookingReminderHTML(data),
          textContent: this.generateBookingReminderText(data)
        }

      case 'membership_welcome':
        return {
          subject: `Welcome to Berenice London - ${data.membershipTier as string} Membership`,
          htmlContent: this.generateMembershipWelcomeHTML(data),
          textContent: this.generateMembershipWelcomeText(data)
        }

      case 'membership_upgrade':
        return {
          subject: `Membership Upgraded - Welcome to ${data.newTier as string}`,
          htmlContent: this.generateMembershipUpgradeHTML(data),
          textContent: this.generateMembershipUpgradeText(data)
        }

      case 'payment_confirmation':
        return {
          subject: `Payment Received - £${data.amount}`,
          htmlContent: this.generatePaymentConfirmationHTML(data),
          textContent: this.generatePaymentConfirmationText(data)
        }

      default:
        throw new Error(`Unknown email template type: ${type}`)
    }
  }

  private generateBookingConfirmationHTML(data: NotificationData): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #b45309, #d97706); color: white; padding: 30px; text-align: center; }
            .content { background: #fff; padding: 30px; border: 1px solid #e5e7eb; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 14px; color: #6b7280; }
            .button { display: inline-block; background: #d97706; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
            .details { background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Booking Confirmed</h1>
              <p>Thank you for choosing Berenice London</p>
            </div>
            <div class="content">
              <p>Dear ${data.userName},</p>
              <p>Your appointment has been successfully confirmed. We're excited to help you achieve your perfect hair solution.</p>

              <div class="details">
                <h3>Appointment Details</h3>
                <p><strong>Booking Reference:</strong> ${data.bookingReference}</p>
                <p><strong>Service:</strong> ${data.serviceName}</p>
                <p><strong>Date:</strong> ${data.appointmentDate}</p>
                <p><strong>Time:</strong> ${data.appointmentTime}</p>
                <p><strong>Duration:</strong> ${data.duration}</p>
                <p><strong>Location:</strong> ${data.location}</p>
                <p><strong>Total:</strong> £${data.amount}</p>
              </div>

              <h3>What to Expect</h3>
              <ul>
                <li>Arrive 10 minutes early for check-in</li>
                <li>Bring any reference photos or inspiration</li>
                <li>Wear comfortable clothing</li>
                <li>Come with clean, dry hair if possible</li>
              </ul>

              <h3>Need to Make Changes?</h3>
              <p>If you need to reschedule or cancel, please contact us at least 24 hours in advance.</p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${this.baseUrl}/my-bookings" class="button">View My Bookings</a>
              </div>
            </div>
            <div class="footer">
              <p>Berenice London | Expert Hair Solutions</p>
              <p>Studio Address | London | Phone: 020 XXXX XXXX</p>
            </div>
          </div>
        </body>
      </html>
    `
  }

  private generateBookingConfirmationText(data: NotificationData): string {
    return `
      BOOKING CONFIRMED - BERENICE LONDON

      Dear ${data.userName},

      Your appointment has been successfully confirmed.

      APPOINTMENT DETAILS:
      Booking Reference: ${data.bookingReference}
      Service: ${data.serviceName}
      Date: ${data.appointmentDate}
      Time: ${data.appointmentTime}
      Duration: ${data.duration}
      Location: ${data.location}
      Total: £${data.amount}

      WHAT TO EXPECT:
      • Arrive 10 minutes early for check-in
      • Bring any reference photos or inspiration
      • Wear comfortable clothing
      • Come with clean, dry hair if possible

      Need to make changes? Contact us at least 24 hours in advance.

      View your bookings: ${this.baseUrl}/my-bookings

      Thank you for choosing Berenice London!
    `
  }

  private generateBookingReminderHTML(data: NotificationData): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #b45309, #d97706); color: white; padding: 30px; text-align: center; }
            .content { background: #fff; padding: 30px; border: 1px solid #e5e7eb; }
            .reminder-box { background: #fef3c7; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Appointment Reminder</h1>
            </div>
            <div class="content">
              <p>Dear ${data.userName},</p>

              <div class="reminder-box">
                <h2>Your appointment is tomorrow!</h2>
                <p><strong>${data.serviceName}</strong></p>
                <p>${data.appointmentDate} at ${data.appointmentTime}</p>
              </div>

              <p>We're looking forward to seeing you tomorrow. Please remember to:</p>
              <ul>
                <li>Arrive 10 minutes early</li>
                <li>Bring any inspiration photos</li>
                <li>Wear comfortable clothing</li>
              </ul>

              <p>If you need to make any last-minute changes, please call us as soon as possible.</p>
            </div>
          </div>
        </body>
      </html>
    `
  }

  private generateBookingReminderText(data: NotificationData): string {
    return `
      APPOINTMENT REMINDER - BERENICE LONDON

      Dear ${data.userName},

      Your appointment is tomorrow!

      ${data.serviceName}
      ${data.appointmentDate} at ${data.appointmentTime}

      Please remember to:
      • Arrive 10 minutes early
      • Bring any inspiration photos
      • Wear comfortable clothing

      See you tomorrow!
    `
  }

  private generateMembershipWelcomeHTML(data: NotificationData): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #b45309, #d97706); color: white; padding: 30px; text-align: center; }
            .content { background: #fff; padding: 30px; border: 1px solid #e5e7eb; }
            .benefits { background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .button { display: inline-block; background: #d97706; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Berenice London!</h1>
              <p>Your ${data.membershipTier} membership is now active</p>
            </div>
            <div class="content">
              <p>Dear ${data.userName},</p>
              <p>Welcome to the Berenice London family! We're thrilled to have you as a ${data.membershipTier} member.</p>

              <div class="benefits">
                <h3>Your ${data.membershipTier} Benefits Include:</h3>
                ${this.getMembershipBenefitsHTML(data.membershipTier as string)}
              </div>

              <h3>Getting Started</h3>
              <p>Your member dashboard is ready for you with exclusive content, priority booking, and personalized recommendations.</p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${this.baseUrl}/dashboard" class="button">Access Your Dashboard</a>
              </div>
            </div>
          </div>
        </body>
      </html>
    `
  }

  private generateMembershipWelcomeText(data: NotificationData): string {
    return `
      WELCOME TO BERENICE LONDON!

      Dear ${data.userName},

      Your ${data.membershipTier} membership is now active.

      Access your member dashboard: ${this.baseUrl}/dashboard

      Welcome to the family!
    `
  }

  private generateMembershipUpgradeHTML(data: NotificationData): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #b45309, #d97706); color: white; padding: 30px; text-align: center; }
            .content { background: #fff; padding: 30px; border: 1px solid #e5e7eb; }
            .upgrade-box { background: #fef3c7; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Membership Upgraded!</h1>
              <p>Welcome to ${data.newTier}</p>
            </div>
            <div class="content">
              <p>Dear ${data.userName},</p>

              <div class="upgrade-box">
                <h2>Congratulations on your upgrade!</h2>
                <p>You now have access to exclusive ${data.newTier} benefits</p>
              </div>

              <h3>Your New Benefits:</h3>
              ${this.getMembershipBenefitsHTML(data.newTier as string)}
            </div>
          </div>
        </body>
      </html>
    `
  }

  private generateMembershipUpgradeText(data: NotificationData): string {
    return `
      MEMBERSHIP UPGRADED - BERENICE LONDON

      Dear ${data.userName},

      Congratulations! Your membership has been upgraded to ${data.newTier}.

      Enjoy your new benefits!
    `
  }

  private generatePaymentConfirmationHTML(data: NotificationData): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #b45309, #d97706); color: white; padding: 30px; text-align: center; }
            .content { background: #fff; padding: 30px; border: 1px solid #e5e7eb; }
            .payment-details { background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Payment Received</h1>
              <p>Thank you for your payment</p>
            </div>
            <div class="content">
              <p>Dear ${data.userName},</p>
              <p>We've successfully processed your payment.</p>

              <div class="payment-details">
                <h3>Payment Details</h3>
                <p><strong>Amount:</strong> £${data.amount}</p>
                <p><strong>Payment ID:</strong> ${data.paymentId}</p>
                <p><strong>Date:</strong> ${data.paymentDate}</p>
                <p><strong>Description:</strong> ${data.description}</p>
              </div>

              <p>You should receive the benefits of your purchase immediately.</p>
            </div>
          </div>
        </body>
      </html>
    `
  }

  private generatePaymentConfirmationText(data: NotificationData): string {
    return `
      PAYMENT RECEIVED - BERENICE LONDON

      Dear ${data.userName},

      We've successfully processed your payment.

      Amount: £${data.amount}
      Payment ID: ${data.paymentId}
      Date: ${data.paymentDate}

      Thank you!
    `
  }

  private getMembershipBenefitsHTML(tier: string): string {
    const benefits = this.getMembershipBenefits(tier)
    return `<ul>${benefits.map(benefit => `<li>${benefit}</li>`).join('')}</ul>`
  }

  private getMembershipBenefits(tier: string): string[] {
    switch (tier) {
      case 'premium':
        return [
          '15% discount on all services',
          'Priority booking',
          'Monthly styling tips newsletter',
          'Free product samples'
        ]
      case 'elite':
        return [
          '25% discount on all services',
          'Priority booking',
          'Monthly styling tips newsletter',
          'Free product samples',
          '1-on-1 styling sessions',
          'Exclusive event invitations'
        ]
      default:
        return [
          'Access to member blog',
          'Basic booking system',
          'Community access'
        ]
    }
  }

  async sendEmail(type: string, data: NotificationData): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const template = this.getTemplate(type, data)

      // Mock API call to email service
      console.log('📧 Email Notification:', {
        to: data.userEmail,
        subject: template.subject,
        type: type,
        data: data
      })

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))

      // Mock successful response
      const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      // In a real application, you would make an API call like:
      // const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     personalizations: [{ to: [{ email: data.userEmail, name: data.userName }] }],
      //     from: { email: 'notifications@berenice-london.com', name: 'Berenice London' },
      //     subject: template.subject,
      //     content: [
      //       { type: 'text/plain', value: template.textContent },
      //       { type: 'text/html', value: template.htmlContent }
      //     ]
      //   })
      // })

      return {
        success: true,
        messageId: messageId
      }
    } catch (error) {
      console.error('Email sending failed:', error)
      return {
        success: false,
        error: 'Failed to send email notification'
      }
    }
  }

  // Convenience methods for specific email types
  async sendBookingConfirmation(userData: NotificationData) {
    return this.sendEmail('booking_confirmation', userData)
  }

  async sendBookingReminder(userData: NotificationData) {
    return this.sendEmail('booking_reminder', userData)
  }

  async sendMembershipWelcome(userData: NotificationData) {
    return this.sendEmail('membership_welcome', userData)
  }

  async sendMembershipUpgrade(userData: NotificationData) {
    return this.sendEmail('membership_upgrade', userData)
  }

  async sendPaymentConfirmation(userData: NotificationData) {
    return this.sendEmail('payment_confirmation', userData)
  }
}

export const emailService = new EmailNotificationService()
