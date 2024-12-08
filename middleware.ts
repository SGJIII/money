import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
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
    "/_next(.*)",
    "/favicon.ico",
    "/api/trpc(.*)",
  ],
  debug: true,
  beforeAuth: (req) => {
    return NextResponse.next();
  }
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
