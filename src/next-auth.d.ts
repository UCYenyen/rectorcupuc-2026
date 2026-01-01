import { DefaultSession } from "next-auth";
import { Role, Faculty } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      faculty?: Faculty | null;
    } & DefaultSession["user"];
  }

  interface User {
    role?: Role;
    faculty?: Faculty | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
    faculty?: Faculty | null;
  }
}