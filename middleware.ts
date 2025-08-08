import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if Clerk keys are properly configured
  const isClerkConfigured = 
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && 
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== 'your_clerk_publishable_key_here' &&
    process.env.CLERK_SECRET_KEY &&
    process.env.CLERK_SECRET_KEY !== 'your_clerk_secret_key_here';

  // If Clerk is not configured, allow all requests to pass through
  if (!isClerkConfigured) {
    return NextResponse.next();
  }

  // If Clerk is configured, we would implement Clerk middleware here
  // For now, just allow all requests to pass through
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}