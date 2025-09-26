import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: Role;
    };
  }

  interface JWT {
    id: string;
    role: Role;
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
