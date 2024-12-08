import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/app/auth"

export async function middleware(request: NextRequest) {
  const session = await auth()

  if (!session) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()
}

// Run middleware on dashboard and api routes except auth
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/((?!auth).*)/:path*'
  ]
}
