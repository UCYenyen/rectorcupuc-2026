import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { Role } from "@prisma/client";

export async function proxy(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const { pathname } = req.nextUrl;

  const isLocalHost =
    host.includes("localhost") ||
    host.includes("127.0.0.1") ||
    host.includes("vercel") ||
    host.includes("::1");

  const imageExtensions = ['.webp', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico'];
  const isImage = imageExtensions.some(ext => pathname.toLowerCase().endsWith(ext));

  if (!isLocalHost) {
    const allowList = ["/underdevelopment", "/api/auth", "/_next", "/favicon.ico"];
    const isAllowed = allowList.some((path) => pathname.startsWith(path)) || isImage;
    
    if (!isAllowed && pathname !== "/underdevelopment") {
      return NextResponse.redirect(new URL("/underdevelopment", req.url));
    }
  }

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
    secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET 
  });

  if (isProtectedRoute) {
    if (!token) {
      const loginUrl = new URL("/api/auth/signin", req.url);
      loginUrl.searchParams.set("callbackUrl", req.nextUrl.href);
      return NextResponse.redirect(loginUrl);
    }

    const userRole = token.role as string;

    if (pathname.startsWith("/dashboard/admin/web")) {
      if (userRole !== Role.pdd_website) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    } else if (pathname.startsWith("/dashboard/admin")) {
      if (
        userRole !== Role.liason_officer &&
        userRole !== Role.pdd_website
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