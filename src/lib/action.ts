'use server' // Tandai ini sebagai file khusus Server Actions

import { registerTeamToCompetition } from "@/lib/competition";
import updateRegistrationStatus from "./admin";
import { revalidatePath } from "next/cache";

// Definisikan tipe state untuk form Anda di sini
export interface RegisterTeamFormState {
  error?: string;
  success?: boolean;
  teamId?: string;
}

const ADMIN_PAGE_PATH = "/admin/registrations"; 

export async function registerTeam(
  leaderId: string, 
  competitionId: string,

  prevState: RegisterTeamFormState,
  formData: FormData
): Promise<RegisterTeamFormState> {
  console.log(prevState);
  const teamName = formData.get("teamName") as string;

  if (!leaderId) {
    return { error: "User is not authenticated." };
  }

  const registration = await registerTeamToCompetition(competitionId, teamName, leaderId);

  if ("error" in registration) {
    return { error: registration.error };
  }
  
  // console.log("Registering team:", { teamName, competitionId, leaderId });

  return { success: true};
}

// Bungkus fungsi server Anda sebagai Server Action
export async function approveRegistration(registrationId: string) {
  try {
    await updateRegistrationStatus(registrationId, 'Registered');
    revalidatePath(ADMIN_PAGE_PATH); // Otomatis refresh data di halaman
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to approve." };
  }
}

export async function rejectRegistration(registrationId: string) {
  try {
    await updateRegistrationStatus(registrationId, 'Failed');
    revalidatePath(ADMIN_PAGE_PATH);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to reject." };
  }
}

export async function setRegistrationPending(registrationId: string) {
  try {
    await updateRegistrationStatus(registrationId, 'Pending');
    revalidatePath(ADMIN_PAGE_PATH);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to set to pending." };
  }
}