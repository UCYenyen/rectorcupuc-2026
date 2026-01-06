import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Role, Faculty } from "@prisma/client";
import prisma from "@/lib/prisma";

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
    maxAge: 30 * 24 * 60 * 60, // 30 hari
  },

  trustHost: true,
  secret: process.env.AUTH_SECRET,

  pages: {
    error: "/auth/error",
    signIn: "/auth/signin",
  },

  callbacks: {
    async signIn({ profile, user }) {
      console.log("=== SignIn Callback ===");
      const email = (profile?.email || user?.email)?.toLowerCase().trim();
      console.log("Signing in email:", email);

      if (!email) {
        console.error("SignIn Error: No email found");
        return false;
      }

      // if (!email.includes("ciputra.ac.id")) {
      //   console.warn(`SignIn Blocked: ${email} is not a valid Ciputra email`);
      //   return "/auth/error?error=InvalidDomain";
      // }

      return true;
    },

    async jwt({ token, user, trigger }) {
      // Logic Baru: Selalu validasi ke database, tidak peduli trigger-nya apa.
      // Ini memastikan jika database di-reset, session di browser ikut mati.
      
      const email = (user?.email || token.email) as string;

      if (!email) return token;

      // Log untuk monitoring di PM2
      // console.log(`=== JWT Validation (${trigger || 'session-check'}) ===`); // Uncomment jika ingin log per request (bisa spam)

      try {
        let dbUser = await prisma.user.findUnique({
          where: { email: email.toLowerCase().trim() },
          select: { id: true, role: true, faculty: true, NIM: true },
        });

        // Logic Retry (hanya berguna saat login pertama kali jika DB lambat)
        if (!dbUser && user) {
          console.log("User not found immediately, waiting for adapter...");
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          dbUser = await prisma.user.findUnique({
            where: { email: email.toLowerCase().trim() },
            select: { id: true, role: true, faculty: true, NIM: true },
          });
        }

        if (dbUser) {
          // Update data di token agar selalu sync dengan DB
          token.id = dbUser.id;
          token.role = dbUser.role;
          token.faculty = dbUser.faculty;
          token.nim = dbUser.NIM;
        } else {
          // CRITICAL: Jika user tidak ada di DB (misal habis di-reset),
          // Return null untuk membatalkan token/session ini.
          console.warn(`JWT: User ${email} not found in DB. Invalidating session.`);
          return null; 
        }
      } catch (error) {
        console.error("JWT callback error:", error);
        return null; // Jika error DB, anggap logout demi keamanan
      }

      return token;
    },

    async session({ session, token }) {
      // Jika token null (dari logic di atas), session otomatis tidak akan terbentuk/valid
      if (session.user && token?.id) {
        session.user.id = token.id as string;
        session.user.role = (token.role as Role) || Role.viewer;
        session.user.faculty = token.faculty as Faculty | null;
      }
      return session;
    },
  },
});