"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Competition, CompetitionRegistration } from "@prisma/client";
import { RegistrationStatus } from "@prisma/client";