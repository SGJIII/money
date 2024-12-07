import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  // Public routes that don't require authentication
  publicRoutes: [
    "/",
    "/sign-up",
    "/sign-in",
    "/pricing",
    "/api/webhook/stripe",
    "/api/webhook/clerk",
    "/blog",
    "/about",
    "/contact",
    "/terms",
    "/privacy",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 