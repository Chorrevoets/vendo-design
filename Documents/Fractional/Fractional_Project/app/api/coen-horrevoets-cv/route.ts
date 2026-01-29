import { readFileSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const htmlPath = join(process.cwd(), 'public', 'coen-horrevoets-cv.html');
    const htmlContent = readFileSync(htmlPath, 'utf-8');
    
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
