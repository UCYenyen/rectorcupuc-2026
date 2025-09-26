import { Competition, Role } from "@prisma/client";

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified?: Date | null;
  image: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserData {
  name: string | null;
  email: string | null;
  emailVerified?: Date | null;
  image: string | null;
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;
}


export type UserRegistrationDetails = {
  id: string;
  competitionId: string;
  rejection_reason: string;
  competitionName: string;
  registrationDate: Date;
  competition: Competition; // Competition details
  status: string; // Status pendaftaran
};