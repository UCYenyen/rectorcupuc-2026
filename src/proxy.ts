import { NextResponse } from "next/server";
import withAuth from "next-auth/middleware";
import type { NextRequest } from "next/server";
import { Role } from "@prisma/client";

const ROUTE_PERMISSIONS: Record<string, Role[]> = {
  "/dashboard/admin/lo": [Role.liason_officer, Role.pdd_website],
  "/dashboard/admin": [Role.pdd_website, Role.liason_officer],
  "/dashboard/admin/web": [Role.pdd_website],
};

export async function proxy(req: NextRequest) {
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

  if (!token) {
    if (isProtectedRoute) {
      const loginUrl = new URL("/api/auth/signin", req.url);
      loginUrl.searchParams.set("callbackUrl", req.nextUrl.href);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  const email = token.email as string;
  if (!email?.endsWith("@ciputra.ac.id") && !email?.endsWith("@student.ciputra.ac.id")) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (isProtectedRoute) {
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