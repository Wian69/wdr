import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Get the country code from Vercel's edge network headers
  // Default to 'US' for local development if the header is missing
  const country = request.headers.get('x-vercel-ip-country') || 'US';
  
  // Create a response object
  const response = NextResponse.next();
  
  // Set the country as a cookie so our client-side components can easily read it
  response.cookies.set('user-country', country, {
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return response;
}

export const config = {
  matcher: '/',
};
