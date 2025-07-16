import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Demo mode - acknowledge webhook but don't process
    const body = await request.text()

    console.log('Demo webhook received:', {
      timestamp: new Date().toISOString(),
      size: body.length,
      demo_mode: true
    })

    // Return success response for demo
    return NextResponse.json({
      received: true,
      demo_mode: true,
      message: 'Webhook received in demo mode'
    })

  } catch (error) {
    console.error('Demo webhook error:', error)

    return NextResponse.json(
      { error: 'Demo webhook processing failed' },
      { status: 400 }
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json({
    status: 'Demo webhook endpoint',
    demo_mode: true
  })
}
