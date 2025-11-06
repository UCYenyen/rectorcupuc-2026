import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { Role } from "@prisma/client";

export async function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const isLocalHost =
    host.includes("localhost") ||
    host.includes("127.0.0.1") ||
    host.includes("::1");

  const { pathname } = req.nextUrl;

  // Allowlist paths that should always be accessible
  const allowList = [
    "/underdevelopment",
    "/_next",
    "/api/auth",
    "/auth/error",
    "/favicon.ico",
    "/robots.txt",
    "/sitemap.xml",
  ];

  // Allow all image extensions
  const imageExtensions = ['.webp', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico'];
  const isImage = imageExtensions.some(ext => pathname.toLowerCase().endsWith(ext));

  // PRIORITAS PERTAMA: Redirect ke underdevelopment jika bukan localhost
  if (!isLocalHost) {
    const isAllowed = allowList.some((path) => pathname.startsWith(path)) || isImage;
    if (!isAllowed) {
      return NextResponse.redirect(new URL("/underdevelopment", req.url));
    }
    // Jika sudah di underdevelopment atau allowlist, langsung next (skip auth check)
    return NextResponse.next();
  }

  // HANYA JALANKAN AUTH CHECK DI LOCALHOST
  // Public routes yang tidak butuh auth
  const publicPaths = [
    "/",
    "/competitions",
    "/votes",
    "/storyline",
    "/unauthorized",
    "/not-found",
    "/auth/error",
  ];

  // Skip auth untuk public paths dan static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname === "/favicon.ico" ||
    publicPaths.some(path => pathname === path || pathname.startsWith(path))
  ) {
    return NextResponse.next();
  }

  // Get token untuk protected routes
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Protected routes: dashboard, admin, web
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/web")
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/api/auth/signin", req.url));
    }

    // Role-based access control
    if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard/admin")) {
      if (
        token.role !== Role.liason_officer &&
        token.role !== Role.pdd_website
      ) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    if (pathname.startsWith("/web")) {
      if (token.role !== Role.pdd_website) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};