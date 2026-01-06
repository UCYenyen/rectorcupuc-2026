// src/lib/auth.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Role } from "@prisma/client";
import prisma from "@/lib/prisma";
import { Faculty } from "@prisma/client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  trustHost: true,
  useSecureCookies: process.env.NODE_ENV === "production",
  secret: process.env.AUTH_SECRET,
  pages: {
    error: "/auth/error",
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ profile, user }) {
      const email = (profile?.email || user?.email)?.toLowerCase().trim();

      console.log("=== SignIn Callback ===");
      console.log("Email:", email);

      if (!email) {
        console.error("SignIn Error: No email found");
        return false;
      }

      if (!email.includes("ciputra.ac.id")) {
        console.warn(`Access Denied: ${email} is not a valid Ciputra email`);
        return "/auth/error?error=InvalidDomain";
      }

      console.log("Email validation passed for:", email);
      return true;
    },

    async jwt({ token, user, trigger }) {
      console.log("=== JWT Callback ===");
      console.log("Trigger:", trigger);
      console.log("User from param:", user?.email);

      if (user?.email || trigger === "update") {
        const email = (user?.email || token.email) as string;

        try {
          let dbUser = await prisma.user.findUnique({
            where: { email: email.toLowerCase().trim() },
            select: { id: true, role: true, faculty: true, NIM: true },
          });

          if (!dbUser) {
            console.log("User not found, waiting for adapter to create...");
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            dbUser = await prisma.user.findUnique({
              where: { email: email.toLowerCase().trim() },
              select: { id: true, role: true, faculty: true, NIM: true },
            });
          }

          if (dbUser) {
            console.log("JWT: User found", dbUser.id);
            token.id = dbUser.id;
            token.role = dbUser.role;
            token.faculty = dbUser.faculty;
            token.nim = dbUser.NIM;
          } else {
            console.error("JWT: User still not found after retry!");
          }
        } catch (error) {
          console.error("JWT callback error:", error);
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
        session.user.role = (token.role as Role) || Role.viewer;
        session.user.faculty = token.faculty as Faculty | null;

        console.log("=== Session Created ===");
        console.log("User ID:", session.user.id);
      }
      return session;
    },
  },
});