import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email, phone, intentions, pageUrl: pageUrlFromBody } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 500 }
      );
    }

    const resend = new Resend(RESEND_API_KEY);

    const REVEALED_PHONE_NUMBER = '+61 450 609 904';

    // Get page URL from request body, referer header, or use fallback
    const referer = request.headers.get('referer');
    const pageUrl = pageUrlFromBody || referer || 'https://www.productclarity.work';

    // Format submitted_at timestamp
    const submittedAt = new Date().toLocaleString('en-US', {
      timeZone: 'UTC',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    // 1) Email to the user – confirmation with contact details (template: contact-number-sharing)
    console.log('[phone-contact] Sending user email via contact-number-sharing to', email);
    const { data: userData, error: userError } = await resend.emails.send({
      from: 'Coen Horrevoets <coen@productclarity.work>',
      to: email,
      replyTo: 'coen@productclarity.work',
      subject: 'Your contact number request',
      template: {
        id: 'contact-number-sharing',
        variables: {
          phone_number: REVEALED_PHONE_NUMBER,
          user_message: intentions || 'No message provided',
        },
      },
    });

    if (userError) {
      console.error('[phone-contact] Resend error (contact-number-sharing):', JSON.stringify(userError, null, 2));
      return NextResponse.json(
        { error: userError.message || 'Failed to send confirmation email' },
        { status: 500 }
      );
    }

    console.log('[phone-contact] User email sent', userData?.id);

    // 2) Notification email to Coen (template: phone-reveal-notification)
    console.log('[phone-contact] Sending owner notification via phone-reveal-notification');
    const { data: ownerData, error: ownerError } = await resend.emails.send({
      from: 'Coen Horrevoets <coen@productclarity.work>',
      to: 'c.horrevoets@gmail.com',
      replyTo: email,
      subject: 'Phone number reveal request',
      template: {
        id: 'phone-reveal-notification',
        variables: {
          user_email: email,
          user_phone: phone || 'Not provided',
          submitted_at: submittedAt,
          page_url: pageUrl,
          user_message: intentions || 'No message provided',
        },
      },
    });

    if (ownerError) {
      console.error('[phone-contact] Resend error (phone-reveal-notification):', JSON.stringify(ownerError, null, 2));
      return NextResponse.json(
        { error: ownerError.message || 'Failed to send notification email' },
        { status: 500 }
      );
    }

    console.log('[phone-contact] Owner notification sent', ownerData?.id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[phone-contact] Unexpected error:', error);
    return NextResponse.json(
      { error: error?.message || 'Request processing error' },
      { status: 500 }
    );
  }
}
