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
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ profile, user, account }) {
      const email = (profile?.email || user?.email)?.toLowerCase().trim();

      console.log("=== SignIn Callback Debug ===");
      console.log("Email:", email);
      console.log("Profile:", profile);
      console.log("User:", user);
      console.log("Account:", account);

      if (!email) {
        console.error("❌ SignIn Error: No email found");
        return false;
      }

      // Validasi domain email - case insensitive
      if (!email.includes("@ciputra.ac.id")) {
        console.warn(`❌ Access Denied: ${email} is not a valid Ciputra email`);
        return "/auth/error?error=InvalidDomain";
      }

      try {
        // Cek apakah user sudah ada di database
        const dbUser = await prisma.user.findUnique({
          where: { email: email },
        });

        console.log("DB User found:", dbUser ? "Yes" : "No");

        // Jika user sudah ada, pastikan rolenya up to date
        if (dbUser) {
          console.log("✅ Existing user, role:", dbUser.role);
          // Update terakhir login atau data lainnya jika perlu
          await prisma.user.update({
            where: { email: email },
            data: { 
              role: dbUser.role,
              // emailVerified: new Date(), // optional
            },
          });
        } else {
          // User baru - biarkan PrismaAdapter yang handle pembuatan user
          // Tapi kita bisa set default role di sini jika diperlukan
          console.log("⚠️ New user will be created by adapter");
        }

        console.log("✅ SignIn allowed for:", email);
        return true;

      } catch (error) {
        console.error("❌ Database Error during signIn:", error);
        // Tetap izinkan login meski ada error database
        // Agar user tidak stuck
        return true;
      }
    },

    async jwt({ token, user, account, trigger }) {
      console.log("=== JWT Callback Debug ===");
      console.log("Trigger:", trigger);
      console.log("Token email:", token.email);

      // Saat login pertama kali atau saat update
      if (user?.email || trigger === "update") {
        const email = (user?.email || token.email) as string;
        
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: email.toLowerCase().trim() },
            select: { id: true, role: true, faculty: true },
          });

          if (dbUser) {
            console.log("✅ User data loaded:", { id: dbUser.id, role: dbUser.role });
            token.id = dbUser.id;
            token.role = dbUser.role;
            token.faculty = dbUser.faculty;
          } else {
            console.warn("⚠️ User not found in database:", email);
            // Set default role untuk user baru
            token.role = Role.viewer; // atau Role.USER, sesuai default Anda
            token.faculty = null;
          }
        } catch (error) {
          console.error("❌ Error fetching user in JWT callback:", error);
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as Role) || Role.viewer;
        session.user.faculty = token.faculty as Faculty | null;
        
        console.log("=== Session Created ===");
        console.log("User ID:", session.user.id);
        console.log("Role:", session.user.role);
      }
      return session;
    },
  },
});