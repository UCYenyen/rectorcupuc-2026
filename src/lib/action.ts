'use server'

import { registerTeamToCompetition } from "@/lib/competition";
import updateRegistrationStatus from "./admin";
import { revalidatePath } from "next/cache";

export interface RegisterTeamFormState {
  error?: string;
  success?: boolean;
  teamId?: string;
}

export interface CreateMatchFormState {
  error?: string;
  success?: boolean;
  matchId?: string;
}

const ADMIN_PAGE_PATH = "/admin/registrations"; 

export async function registerTeam(
  leaderId: string, 
  competitionSlug: string,
  prevState: RegisterTeamFormState,
  formData: FormData
): Promise<RegisterTeamFormState> {
  const teamName = formData.get("teamName") as string;
  const imageUrl = formData.get("instagramProofUrl") as string;

  if (!leaderId) {
    return { error: "User is not authenticated." };
  }

  const registration = await registerTeamToCompetition(
    competitionSlug, 
    teamName, 
    leaderId, 
    imageUrl
  );

  if ("error" in registration) {
    return { error: registration.error };
  }
  
  return { success: true };
}

export async function approveRegistration(registrationId: string) {
  try {
    await updateRegistrationStatus(registrationId, 'Registered');
    revalidatePath(ADMIN_PAGE_PATH);
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