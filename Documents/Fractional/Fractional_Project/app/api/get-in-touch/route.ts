import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const { email, message, pageUrl: pageUrlFromBody } = await request.json();

    if (!email || !message) {
      return NextResponse.json(
        { error: 'Email and message are required' },
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

    // Get page URL from request body, referer header, or use fallback
    const referer = request.headers.get('referer');
    const pageUrl = pageUrlFromBody || referer || 'https://www.productclarity.work';

    // Format submitted_at timestamp
    const submittedAt = new Date().toLocaleString('en-US', {
      timeZone: 'UTC',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    // 1) Email to the user - confirmation copy using template `contact-form`
    const { data: userData, error: userError } = await resend.emails.send({
      from: 'Coen Horrevoets <coen@productclarity.work>',
      to: email,
      replyTo: 'coen@productclarity.work',
      template: {
        id: 'contact-form',
        variables: {
          user_message: message,
        },
      },
    });

    if (userError) {
      console.error('Resend API error (user email):', JSON.stringify(userError, null, 2));
      return NextResponse.json(
        { error: userError.message || 'Failed to send email' },
        { status: 500 }
      );
    }

    console.log('Contact form confirmation email sent to user successfully', userData);

    // 2) Notification email to Coen using template `contact-form-submission`
    const { data: ownerData, error: ownerError } = await resend.emails.send({
      from: 'Coen Horrevoets <coen@productclarity.work>',
      to: 'c.horrevoets@gmail.com',
      replyTo: email,
      template: {
        id: 'contact-form-submission',
        variables: {
          user_email: email,
          submitted_at: submittedAt,
          page_url: pageUrl,
          user_message: message,
        },
      },
    });

    if (ownerError) {
      console.error('Resend API error (owner email):', JSON.stringify(ownerError, null, 2));
      // Don't fail the request for this; just log
    } else {
      console.log('Contact form notification email sent to owner successfully', ownerData);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error processing contact form request:', error);
    return NextResponse.json(
      { error: error?.message || 'Request processing error' },
      { status: 500 }
    );
  }
}
