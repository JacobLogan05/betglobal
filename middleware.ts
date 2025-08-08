import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
  '/api/admin(.*)', // Only protect admin API routes, not all API routes
]);

export default clerkMiddleware((auth, req) => {
  // Allow sign-in and sign-up routes to be public
  if (req.nextUrl.pathname.startsWith('/sign-in') || req.nextUrl.pathname.startsWith('/sign-up')) {
    return;
  }
  
  // Allow Clerk's internal API routes to be public
  if (req.nextUrl.pathname.includes('clerk') || req.nextUrl.pathname.includes('SignIn_clerk_catchall_check')) {
    return;
  }
  
  if (isProtectedRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};