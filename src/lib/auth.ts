// auth.ts (SESUDAH)

import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client"
import { revalidatePath } from "next/cache";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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
      // ... (Fungsi signIn tidak perlu diubah)
      if (!profile?.email) {
        throw new Error("No profile email found");
      }

      if (profile.email.includes("ciputra.ac.id") || profile.email.includes("gmail.com")) {
        if (user && user.id) {
          const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
          });

          if (dbUser) {
            const assignedRole: Role = dbUser.role;

            await prisma.user.update({
              where: { id: user.id },
              data: { role: assignedRole },
            });
          }
        }

        revalidatePath("/dashboard");

        return true;
      } else {
        throw new Error("You must use a @ciputra.ac.id email to sign in");
      }
    },
    async jwt({ token, user }) {
      // 1. Ambil data user dari database
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email!, // Gunakan email dari token untuk mencari
        },
      });

      // 2. Jika user ditemukan, perbarui token dengan data dari database
      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        image: dbUser.image,
        role: dbUser.role,
      };
    },
    async session({ session, token }) {
      // 3. Salin data dari token yang sudah diperbarui ke objek session
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image as string | null | undefined;
        session.user.role = token.role as Role;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};