import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Role } from "@prisma/client";
import prisma from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ profile, user }) {
      const email = profile?.email || user?.email;

      if (!email) {
        console.error("SignIn Error: No email found in profile");
        return false;
      }

      // if (email.endsWith("ciputra.ac.id")) {
      //   try {
      //     if (user && user.id) {
      //       const dbUser = await prisma.user.findUnique({
      //         where: { id: user.id },
      //       });

      //       if (dbUser) {
      //         await prisma.user.update({
      //           where: { id: user.id },
      //           data: { role: dbUser.role },
      //         });
      //       }
      //     }
      //     return true;
      //   } catch (error) {
      //     console.error("Database Error during signIn:", error);
      //     return true; // Tetap izinkan login meski update gagal, atau ganti false jika wajib update
      //   }
      // }

      if (user && user.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
        });

        if (dbUser) {
          await prisma.user.update({
            where: { id: user.id },
            data: { role: dbUser.role },
          });
        }
        return true;
      }

      console.warn(`Access Denied: ${email} is not a Ciputra email`);
      return false;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }

      const userId = token.sub || token.id;

      if (userId) {
        const dbUser = await prisma.user.findUnique({
          where: { id: userId as string },
          select: { role: true },
        });
        if (dbUser) {
          token.role = dbUser.role;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.sub || token.id) as string;
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
});
