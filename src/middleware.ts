import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";
import path from "path";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const { pathname } = req.nextUrl

        if (pathname.startsWith("/admin")) {
            if (!token) {
                console.log("token : ", token)
                return NextResponse.redirect(new URL('/login', req.url));
            }

            if( token?.role !== Role.liason_officer && token?.role !== Role.pdd_website){
                return NextResponse.redirect(new URL('/unauthorized', req.url));
            }
            // Check if user is authenticated
        }

        if(pathname.startsWith("/web")){
            if (!token) {
                console.log("token : ", token)
                return NextResponse.redirect(new URL('/login', req.url));
            }

            if( token?.role !== Role.pdd_website){
                return NextResponse.redirect(new URL('/unauthorized', req.url));
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
    matcher: ["/dashboard/:path*"]
}