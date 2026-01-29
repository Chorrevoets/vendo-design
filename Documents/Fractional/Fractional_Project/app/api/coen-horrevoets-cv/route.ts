import { readFileSync } from 'fs';
import { join } from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const htmlPath = join(process.cwd(), 'public', 'coen-horrevoets-cv.html');
    let htmlContent = readFileSync(htmlPath, 'utf-8');
    
    // Get the base URL from the request
    const baseUrl = request.nextUrl.origin;
    
    // Replace relative favicon paths with absolute URLs
    htmlContent = htmlContent.replace(
      /href="\/Favicon_Coen\.webp"/g,
      `href="${baseUrl}/Favicon_Coen.webp"`
    );
    
    return new NextResponse(htmlContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Error reading CV HTML:', error);
    return new NextResponse('CV not found', { status: 404 });
  }
}
