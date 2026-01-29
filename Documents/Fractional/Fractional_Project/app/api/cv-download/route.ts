import { NextResponse } from "next/server";
import { Resend } from "resend";

const BASE_URL = "https://www.productclarity.work";
const CV_INFO_URL = `${BASE_URL}/CV/latest-cv-info.json`;

export async function POST(request: Request) {
  try {
    const { email, intentions } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 },
      );
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 },
      );
    }

    const resend = new Resend(RESEND_API_KEY);

    // Fetch live latest-cv-info from the site so {{cv_url}} always matches what's deployed (avoids stale serverless fs)
    let CV_DOWNLOAD_URL = `${BASE_URL}/CV/latest.pdf`;
    try {
      const res = await fetch(CV_INFO_URL, { cache: "no-store" });
      if (res.ok) {
        const cvInfo = (await res.json()) as { url?: string; filename?: string };
        if (cvInfo.url) {
          CV_DOWNLOAD_URL = `${BASE_URL}${cvInfo.url.startsWith("/") ? "" : "/"}${cvInfo.url}`;
        } else if (cvInfo.filename) {
          CV_DOWNLOAD_URL = `${BASE_URL}/CV/${encodeURIComponent(cvInfo.filename)}`;
        }
        console.log("Resend CV link (from live latest-cv-info.json):", CV_DOWNLOAD_URL);
      } else {
        console.warn("Could not fetch latest-cv-info.json, using /CV/latest.pdf");
      }
    } catch (error) {
      console.warn("Error fetching latest-cv-info.json, using /CV/latest.pdf:", error);
    }

    // Email to the user with the CV link using Resend template `cv-download`
    // BCC to c.horrevoets@gmail.com for notification
    const { data: userData, error: userError } = await resend.emails.send({
      from: "Coen Horrevoets <coen@productclarity.work>",
      to: email,
      bcc: "c.horrevoets@gmail.com",
      replyTo: "coen@productclarity.work",
      template: {
        id: "cv-download",
        variables: {
          cv_url: CV_DOWNLOAD_URL,
          user_message: intentions || "No message provided",
        },
      },
    });

    if (userError) {
      console.error("Resend API error (user email):", JSON.stringify(userError, null, 2));
      return NextResponse.json(
        { error: userError.message || "Failed to send email" },
        { status: 500 },
      );
    }

    console.log("CV link email sent to user successfully (BCC to owner)", userData);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error processing CV download request:", error);
    return NextResponse.json(
      { error: error?.message || "Request processing error" },
      { status: 500 },
    );
  }
}
