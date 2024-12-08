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
  ],
  debug: true,
  // Bot protection settings
  beforeAuth: (req) => {
    return NextResponse.next();
  },
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next|_static|favicon.ico).*)", "/"],
};
