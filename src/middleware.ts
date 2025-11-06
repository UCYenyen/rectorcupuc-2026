import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";

export default withAuth(
  function middleware(req) {
    // redirect to "under development" when NEXTAUTH_URL is not local dev
    const NEXTAUTH_URL = process.env.NEXTAUTH_URL || "";
    const isLocalDev =
      NEXTAUTH_URL.includes("localhost:3000") ||
      NEXTAUTH_URL.includes("127.0.0.1:3000");

    const { pathname } = req.nextUrl;

    if (!isLocalDev) {
      // apply redirect only for protected paths handled by this middleware
      if (
        pathname.startsWith("/dashboard") ||
        pathname.startsWith("/admin") ||
        pathname.startsWith("/web")
      ) {
        return NextResponse.redirect(new URL("/underdevelopment", req.url));
      }
    }

    const token = req.nextauth?.token;
    // role based checks
    if (pathname.startsWith("/admin")) {
      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
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
        return NextResponse.redirect(new URL("/login", req.url));
      }
      if (token?.role !== Role.pdd_website) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};