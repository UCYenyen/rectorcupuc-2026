import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const imageExtensions = ['.webp', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico'];
  const isImage = imageExtensions.some(ext => pathname.toLowerCase().endsWith(ext));

  const isProtectedRoute = 
    pathname.startsWith("/dashboard") || 
    pathname.startsWith("/competitions/register");

  const publicPaths = [
    "/competitions",
    "/votes",
    "/storyline",
    "/unauthorized",
    "/not-found",
    "/auth/error",
    "/underdevelopment"
  ];

  const isPublicPath = 
    pathname === "/" || 
    (publicPaths.some(path => pathname === path || pathname.startsWith(`${path}/`)) && !isProtectedRoute);

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    isImage ||
    isPublicPath
  ) {
    return NextResponse.next();
  }

  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production"
  });

  if (isProtectedRoute) {
    if (!token) {
      const loginUrl = new URL("/api/auth/signin", req.url);
      loginUrl.searchParams.set("callbackUrl", req.nextUrl.href);
      return NextResponse.redirect(loginUrl);
    }

    const userRole = token.role as string;
    
    if (pathname.startsWith("/dashboard/admin/web")) {
      if (userRole !== "pdd_website") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    } else if (pathname.startsWith("/dashboard/admin/lo")) {
      if (
        userRole !== "liason_officer" &&
        userRole !== "pdd_website"
      ) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};