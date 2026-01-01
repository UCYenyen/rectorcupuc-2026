import NextAuth, { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google OAuth environment variables");
}

const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile, user }) {
      const email = profile?.email || user?.email;

      if (!email) {
        console.error("SignIn Error: No email found in profile");
        return false;
      }

      if (email.endsWith("ciputra.ac.id")) {
        try {
          if (user && user.id) {
            const dbUser = await prisma.user.findUnique({
              where: { id: user.id },
            });

            if (dbUser) {
              await prisma.user.update({
                where: { id: user.id },
                data: {
                  role: dbUser.role,
                  faculty: dbUser.faculty,
                },
              });
            }
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

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id!;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;

        const dbUser = await prisma.user.findUnique({
          where: { id: user.id! },
          select: { role: true, faculty: true },
        });

        if (dbUser) {
          token.role = dbUser.role;
          token.faculty = dbUser.faculty;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.role = token.role as any;
        session.user.faculty = token.faculty as any;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
