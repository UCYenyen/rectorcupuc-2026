import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";

export default withAuth(
  function middleware(req) {
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
      "/",
      "/competitions",
      "/votes",
      "/storyline",
    ];

    // If NOT localhost and NOT in allowlist, redirect to underdevelopment
    if (!isLocalHost) {
      const isAllowed = allowList.some((path) => pathname === path || pathname.startsWith(path));
      if (!isAllowed) {
        return NextResponse.redirect(new URL("/underdevelopment", req.url));
      }
    }

    // Role-based checks (only runs on localhost or after allowlist check)
    const token = req.nextauth?.token;

    if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard/admin")) {
      if (!token) {
        return NextResponse.redirect(new URL("/api/auth/signin", req.url));
      }
      if (
        token?.role !== Role.liason_officer &&
        token?.role !== Role.pdd_website
      ) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    if (pathname.startsWith("/web")) {
      if (!token) {
        return NextResponse.redirect(new URL("/api/auth/signin", req.url));
      }
      if (token?.role !== Role.pdd_website) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    // Dashboard biasa butuh auth tapi tidak perlu role khusus
    if (pathname.startsWith("/dashboard") && !pathname.startsWith("/dashboard/admin")) {
      if (!token) {
        return NextResponse.redirect(new URL("/api/auth/signin", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Hanya require auth untuk protected routes
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Public routes yang tidak butuh token
        const publicPaths = [
          "/",
          "/underdevelopment",
          "/auth/error",
          "/competitions",
          "/votes",
          "/storyline",
          "/unauthorized",
          "/not-found",
        ];

        // Allow NextAuth API routes dan static files
        if (
          pathname.startsWith("/_next") ||
          pathname.startsWith("/api/auth") ||
          pathname === "/favicon.ico"
        ) {
          return true;
        }

        // Allow public paths
        if (publicPaths.some(path => pathname === path || pathname.startsWith(path))) {
          return true;
        }

        // Protected routes butuh token
        if (
          pathname.startsWith("/dashboard") ||
          pathname.startsWith("/admin") ||
          pathname.startsWith("/web")
        ) {
          return !!token;
        }

        // Default: allow (untuk path lain yang belum didefinisikan)
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};