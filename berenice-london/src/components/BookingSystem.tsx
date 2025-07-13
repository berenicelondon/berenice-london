"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { StripePayment } from "@/components/StripePayment"
import { useAuth } from "@/contexts/AuthContext"
import { useAnalytics } from "@/contexts/AnalyticsContext"
import { emailService } from "@/services/emailNotifications"
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  Crown,
  GraduationCap,
  Sparkles,
  CheckCircle,
  ArrowLeft,
  CreditCard
} from "lucide-react"

interface TimeSlot {
  time: string
  available: boolean
  type: 'morning' | 'afternoon' | 'evening'
}

interface BookingFormData {
  name: string
  email: string
  phone: string
  serviceType: string
  consultationType: string
  preferredDate: Date | undefined
  preferredTime: string
  message: string
}

const serviceTypes = [
  { id: 'consultation', name: 'Initial Consultation', icon: User, duration: '60 min', price: 'Free' },
  { id: 'bespoke', name: 'Bespoke Wig Consultation', icon: Crown, duration: '90 min', price: '£150' },
  { id: 'styling', name: 'Styling Session', icon: Sparkles, duration: '45 min', price: '£75' },
  { id: 'education', name: 'Educational Session', icon: GraduationCap, duration: '120 min', price: '£200' },
  { id: 'maintenance', name: 'Maintenance & Care', icon: Clock, duration: '30 min', price: '£50' }
]

const consultationTypes = [
  { id: 'in-person', name: 'In-Person (London Studio)', available: true },
  { id: 'virtual', name: 'Virtual Consultation', available: true },
  { id: 'home-visit', name: 'Home Visit (London Area)', available: false }
]

const timeSlots: TimeSlot[] = [
  { time: '09:00', available: true, type: 'morning' },
  { time: '09:30', available: false, type: 'morning' },
  { time: '10:00', available: true, type: 'morning' },
  { time: '10:30', available: true, type: 'morning' },
  { time: '11:00', available: false, type: 'morning' },
  { time: '11:30', available: true, type: 'morning' },
  { time: '14:00', available: true, type: 'afternoon' },
  { time: '14:30', available: true, type: 'afternoon' },
  { time: '15:00', available: false, type: 'afternoon' },
  { time: '15:30', available: true, type: 'afternoon' },
  { time: '16:00', available: true, type: 'afternoon' },
  { time: '16:30', available: false, type: 'afternoon' },
  { time: '17:00', available: true, type: 'evening' },
  { time: '17:30', available: true, type: 'evening' }
]

export function BookingSystem() {
  const { user } = useAuth()
  const { trackEvent, trackConversion } = useAnalytics()
  const [step, setStep] = useState<'service' | 'datetime' | 'details' | 'payment' | 'confirmation'>('service')
  const [bookingData, setBookingData] = useState<BookingFormData>({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    serviceType: '',
    consultationType: '',
    preferredDate: undefined,
    preferredTime: '',
    message: ''
  })
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [paymentId, setPaymentId] = useState<string | null>(null)

  const updateBookingData = (field: keyof BookingFormData, value: string | Date | undefined) => {
    setBookingData(prev => ({ ...prev, [field]: value }))
  }

  const getSelectedService = () => {
    return serviceTypes.find(service => service.id === bookingData.serviceType)
  }

  const getSelectedConsultationType = () => {
    return consultationTypes.find(type => type.id === bookingData.consultationType)
  }

  const getServicePrice = () => {
    const service = getSelectedService()
    if (!service) return 0

    // Extract price from service.price string (e.g., "£150" -> 150)
    const priceMatch = service.price.match(/£?(\d+)/)
    return priceMatch ? parseInt(priceMatch[1]) : 0
  }

  const handlePaymentSuccess = async (paymentIdReceived: string) => {
    setPaymentId(paymentIdReceived)

    // Send booking confirmation email
    const service = getSelectedService()
    const consultationType = getSelectedConsultationType()

    try {
      await emailService.sendBookingConfirmation({
        userEmail: bookingData.email,
        userName: bookingData.name,
        bookingReference: `BL-${Date.now().toString().slice(-6)}`,
        serviceName: service?.name || '',
        appointmentDate: bookingData.preferredDate?.toLocaleDateString() || '',
        appointmentTime: bookingData.preferredTime,
        duration: service?.duration || '',
        location: consultationType?.name === 'Virtual Consultation' ? 'Virtual Meeting' : 'Berenice London Studio, London',
        amount: getServicePrice().toString()
      })

      // Send payment confirmation email
      await emailService.sendPaymentConfirmation({
        userEmail: bookingData.email,
        userName: bookingData.name,
        amount: getServicePrice().toString(),
        paymentId: paymentIdReceived,
        paymentDate: new Date().toLocaleDateString(),
        description: service?.name || ''
      })
    } catch (error) {
      console.error('Failed to send confirmation emails:', error)
    }

    // Track conversion
    trackConversion('booking', getServicePrice())
    trackEvent('booking', 'booking_completed', service?.name, getServicePrice())

    setStep('confirmation')
  }

  const handlePaymentError = (error: string) => {
    console.error('Payment failed:', error)
    // Handle payment error (show message, etc.)
  }

  const handleSubmitBooking = () => {
    const price = getServicePrice()
    if (price > 0) {
      setStep('payment')
    } else {
      // Free service, skip payment
      handlePaymentSuccess('free_service')
    }
  }

  const groupedTimeSlots = timeSlots.reduce((acc, slot) => {
    if (!acc[slot.type]) acc[slot.type] = []
    acc[slot.type].push(slot)
    return acc
  }, {} as Record<string, TimeSlot[]>)

  // Service Selection Step
  if (step === 'service') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-stone-800 mb-4">Book Your Consultation</h1>
          <p className="text-lg text-stone-600">Choose the service that best suits your needs</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceTypes.map((service) => {
            const Icon = service.icon
            return (
              <Card
                key={service.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  bookingData.serviceType === service.id ? 'ring-2 ring-amber-500 bg-amber-50' : ''
                }`}
                onClick={() => updateBookingData('serviceType', service.id)}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-amber-100 rounded-full w-fit">
                    <Icon className="h-8 w-8 text-amber-700" />
                  </div>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <CardDescription>
                    {service.duration} • {service.price}
                  </CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-8">
          <Button
            className="bg-amber-700 hover:bg-amber-800"
            disabled={!bookingData.serviceType}
            onClick={() => setStep('datetime')}
          >
            Continue to Date & Time
          </Button>
        </div>
      </div>
    )
  }

  // Date & Time Selection Step
  if (step === 'datetime') {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => setStep('service')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-stone-800">Select Date & Time</h1>
            <p className="text-stone-600">Choose your preferred appointment slot</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Select Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date)
                  updateBookingData('preferredDate', date)
                }}
                disabled={(date) => date < new Date() || date.getDay() === 0} // Disable past dates and Sundays
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Time Slots */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Available Times
              </CardTitle>
              <CardDescription>
                {selectedDate ? `Available slots for ${selectedDate.toLocaleDateString()}` : 'Please select a date first'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDate ? (
                <div className="space-y-6">
                  {Object.entries(groupedTimeSlots).map(([period, slots]) => (
                    <div key={period}>
                      <h4 className="font-medium text-sm text-stone-600 mb-3 capitalize">
                        {period}
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {slots.map((slot) => (
                          <Button
                            key={slot.time}
                            variant={bookingData.preferredTime === slot.time ? "default" : "outline"}
                            size="sm"
                            disabled={!slot.available}
                            onClick={() => updateBookingData('preferredTime', slot.time)}
                            className={
                              bookingData.preferredTime === slot.time
                                ? "bg-amber-700 hover:bg-amber-800"
                                : ""
                            }
                          >
                            {slot.time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-stone-500 py-8">
                  Select a date to view available time slots
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Consultation Type */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Consultation Type</CardTitle>
            <CardDescription>How would you prefer to have your consultation?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {consultationTypes.map((type) => (
                <Button
                  key={type.id}
                  variant={bookingData.consultationType === type.id ? "default" : "outline"}
                  disabled={!type.available}
                  onClick={() => updateBookingData('consultationType', type.id)}
                  className={`h-auto p-4 text-left ${
                    bookingData.consultationType === type.id
                      ? "bg-amber-700 hover:bg-amber-800"
                      : ""
                  }`}
                >
                  <div>
                    <div className="font-medium">{type.name}</div>
                    {!type.available && (
                      <Badge variant="secondary" className="mt-1">Coming Soon</Badge>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Button
            className="bg-amber-700 hover:bg-amber-800"
            disabled={!bookingData.preferredDate || !bookingData.preferredTime || !bookingData.consultationType}
            onClick={() => setStep('details')}
          >
            Continue to Details
          </Button>
        </div>
      </div>
    )
  }

  // Details Step
  if (step === 'details') {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => setStep('datetime')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-stone-800">Your Details</h1>
            <p className="text-stone-600">Complete your booking information</p>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Service:</span>
              <span className="font-medium">{getSelectedService()?.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Duration:</span>
              <span>{getSelectedService()?.duration}</span>
            </div>
            <div className="flex justify-between">
              <span>Date:</span>
              <span>{bookingData.preferredDate?.toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Time:</span>
              <span>{bookingData.preferredTime}</span>
            </div>
            <div className="flex justify-between">
              <span>Type:</span>
              <span>{getSelectedConsultationType()?.name}</span>
            </div>
            <div className="flex justify-between font-medium text-lg border-t pt-2">
              <span>Total:</span>
              <span>{getSelectedService()?.price}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={bookingData.name}
                  onChange={(e) => updateBookingData('name', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={bookingData.phone}
                  onChange={(e) => updateBookingData('phone', e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={bookingData.email}
                onChange={(e) => updateBookingData('email', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="message">Additional Information</Label>
              <Textarea
                id="message"
                placeholder="Tell us about your specific needs, concerns, or questions..."
                value={bookingData.message}
                onChange={(e) => updateBookingData('message', e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Button
            className="bg-amber-700 hover:bg-amber-800"
            disabled={!bookingData.name || !bookingData.email || !bookingData.phone}
            onClick={handleSubmitBooking}
          >
            {getServicePrice() > 0 ? 'Proceed to Payment' : 'Confirm Booking'}
          </Button>
        </div>
      </div>
    )
  }

  // Payment Step
  if (step === 'payment') {
    const service = getSelectedService()
    const price = getServicePrice()

    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => setStep('details')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-stone-800">Complete Payment</h1>
            <p className="text-stone-600">Secure payment for your consultation</p>
          </div>
        </div>

        <StripePayment
          amount={price}
          description={`${service?.name || 'Consultation'} - ${bookingData.name}`}
          customerEmail={bookingData.email}
          onSuccess={(paymentIntent) => handlePaymentSuccess(paymentIntent.id)}
          onError={handlePaymentError}
          metadata={{
            booking_type: 'consultation',
            service_type: service?.id || '',
            customer_name: bookingData.name,
            customer_email: bookingData.email
          }}
        />
      </div>
    )
  }

  // Confirmation Step
  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <div className="mb-8">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-stone-800 mb-4">Booking Confirmed!</h1>
        <p className="text-lg text-stone-600">
          Thank you for booking with Berenice London. We've sent a confirmation email to {bookingData.email}.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appointment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-left">
          <div className="flex justify-between">
            <span>Booking Reference:</span>
            <span className="font-mono font-medium">BL-{Date.now().toString().slice(-6)}</span>
          </div>
          <div className="flex justify-between">
            <span>Service:</span>
            <span>{getSelectedService()?.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Date & Time:</span>
            <span>{bookingData.preferredDate?.toLocaleDateString()} at {bookingData.preferredTime}</span>
          </div>
          <div className="flex justify-between">
            <span>Type:</span>
            <span>{getSelectedConsultationType()?.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Duration:</span>
            <span>{getSelectedService()?.duration}</span>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-4">
        <p className="text-sm text-stone-600">
          We'll send you a reminder 24 hours before your appointment. If you need to reschedule or cancel,
          please contact us at least 24 hours in advance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Book Another Appointment
          </Button>
          <Button className="bg-amber-700 hover:bg-amber-800">
            View My Bookings
          </Button>
        </div>
      </div>
    </div>
  )
}
