import { NextResponse } from "next/server";
import { Resend } from "resend";

const BASE_URL = "https://www.productclarity.work";
const CV_INFO_URL = `${BASE_URL}/CV/latest-cv-info.json`;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email, intentions, pageUrl: pageUrlFromBody } = body;

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

    // 1) Email to the user with the CV link using Resend template `cv-download`
    const { data: userData, error: userError } = await resend.emails.send({
      from: "Coen Horrevoets <coen@productclarity.work>",
      to: email,
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

    console.log("CV link email sent to user successfully", userData);

    // 2) Notification email to Coen using Resend template `cv-download-notification`
    const referer = request.headers.get("referer");
    const pageUrl = pageUrlFromBody || referer || "https://www.productclarity.work";

    const submittedAt = new Date().toLocaleString("en-AU", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const { data: ownerData, error: ownerError } = await resend.emails.send({
      from: "Coen Horrevoets <coen@productclarity.work>",
      to: "c.horrevoets@gmail.com",
      replyTo: email,
      template: {
        id: "cv-download-notification",
        variables: {
          user_email: email,
          submitted_at: submittedAt,
          page_url: pageUrl,
          user_message: intentions || "No message provided",
        },
      },
    });

    if (ownerError) {
      console.error("Resend API error (owner notification):", JSON.stringify(ownerError, null, 2));
      // Don't fail the request; user already got their CV email
    } else {
      console.log("CV download notification sent to owner", ownerData);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error processing CV download request:", error);
    return NextResponse.json(
      { error: error?.message || "Request processing error" },
      { status: 500 },
    );
  }
}
