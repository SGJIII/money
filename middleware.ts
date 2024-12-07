import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default authMiddleware({
  // Public routes that don't require authentication
  publicRoutes: [
    "/",
    "/sign-in",
    "/sign-up",
    "/sign-up/sso-callback",
    "/sign-up/oauth-error",
    "/pricing",
    "/api/webhook/stripe",
    "/api/webhook/clerk",
    "/blog",
    "/about",
    "/contact",
    "/terms",
    "/privacy",
  ],
  ignoredRoutes: [
    "/api/webhook/stripe",
    "/api/webhook/clerk",
    "/((?!.*\\..*|_next).*)",
    "/(api|trpc)(.*)",
  ],
  debug: process.env.NODE_ENV === 'development',
  // Bot protection settings
  beforeAuth: (req) => {
    // Add bot protection for auth routes
    const isAuthRoute = ['/sign-in', '/sign-up'].some(route => 
      req.nextUrl.pathname.startsWith(route)
    );
    if (isAuthRoute) {
      return NextResponse.next(); // Continue with bot protection
    }
    return false; // Skip bot protection for non-auth routes
  },
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)",
  ],
};
