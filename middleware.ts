import { authMiddleware } from "@clerk/nextjs/server";

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
  protectedRoutes: {
    signIn: true,
    signUp: true,
  },
  // OAuth settings
  signInUrl: "/sign-in",
  signUpUrl: "/sign-up",
  afterSignInUrl: "/dashboard",
  afterSignUpUrl: "/dashboard",
  // Additional security settings
  apiRoutes: ["/api(.*)"],
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