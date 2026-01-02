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

      if (email.endsWith("ciputra.ac.id")) {
        try {
          // Cari user berdasarkan email, bukan ID dari NextAuth
          const dbUser = await prisma.user.findUnique({
            where: { email: email },
          });

          if (dbUser) {
            // Update role jika ada perubahan
            await prisma.user.update({
              where: { email: email },
              data: { role: dbUser.role },
            });
          }
          
          return true;
        } catch (error) {
          console.error("Database Error during signIn:", error);
          return true;
        }
      }

      console.warn(`Access Denied: ${email} is not a Ciputra email`);
      return false;
    },
    async jwt({ token, user, account }) {
      // Saat login pertama kali, ambil User ID yang sebenarnya dari database
      if (user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
          select: { id: true, role: true, faculty: true },
        });

        if (dbUser) {
          token.id = dbUser.id; // Gunakan ID dari database
          token.role = dbUser.role;
          token.faculty = dbUser.faculty;
        }
      }

      // Refresh data dari database setiap kali token di-refresh
      if (token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email as string },
          select: { id: true, role: true, faculty: true },
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
          token.faculty = dbUser.faculty;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string; // Gunakan ID dari token yang sudah diperbaiki
        session.user.role = token.role as Role;
        session.user.faculty = token.faculty as Faculty | null;
      }
      return session;
    },
  },
});
