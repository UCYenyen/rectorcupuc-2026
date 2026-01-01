"use server";
import { startMatch, pendMatch, completeMatch } from "@/lib/competition";
import { registerTeamToCompetition } from "@/lib/competition";
import updateRegistrationStatus from "./admin";
import { revalidatePath } from "next/cache";
import { updateMatchScoreDB } from "@/lib/competition";
import prisma from "@/lib/prisma";
import { Faculty } from "@prisma/client";

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

const ADMIN_PAGE_PATH = "/dashboard/admin/";
const TEAM_JOIN_REQUESTS_PATH = "dashboard/admin/lo/team-join-requests";

export async function registerTeam(
  leaderId: string,
  competitionSlug: string,
  prevState: RegisterTeamFormState,
  formData: FormData
): Promise<RegisterTeamFormState> {
  const teamName = formData.get("teamName") as string;
  const faculty = formData.get("faculty") as string;
  const instagramProofUrl = formData.get("instagramProofUrl") as string;
  const profileImageUrl = formData.get("profileImageUrl") as string;

  if (!leaderId) {
    return { error: "User is not authenticated." };
  }

  if (!instagramProofUrl || !profileImageUrl) {
    return { error: "Both images are required." };
  }

  if (!faculty) {
    return { error: "Faculty is required." };
  }

  try {
    // Update user faculty
    await prisma.user.update({
      where: { id: leaderId },
      data: { faculty: faculty as Faculty },
    });

    const registration = await registerTeamToCompetition(
      competitionSlug,
      teamName,
      leaderId,
      instagramProofUrl,
      profileImageUrl
    );

    if ("error" in registration) {
      return { error: registration.error };
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Register Team Error:", error);
    return { error: "Failed to register team." };
  }
}

export async function approveRegistration(registrationId: string) {
  try {
    await updateRegistrationStatus(registrationId, "Registered");
    revalidatePath(ADMIN_PAGE_PATH);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to approve." };
  }
}

export async function rejectRegistration(registrationId: string) {
  try {
    await updateRegistrationStatus(registrationId, "Failed");
    revalidatePath(ADMIN_PAGE_PATH);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to reject." };
  }
}

export async function setRegistrationPending(registrationId: string) {
  try {
    await updateRegistrationStatus(registrationId, "Pending");
    revalidatePath(ADMIN_PAGE_PATH);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to set to pending." };
  }
}

export async function handleMatchChangeStatus(
  matchId: string,
  newStatus: "ONGOING" | "COMPLETED" | "UPCOMMING",
  slug: string
) {
  if (newStatus === "ONGOING") {
    await startMatch(matchId, "ONGOING");
  } else if (newStatus === "COMPLETED") {
    await completeMatch(matchId, "COMPLETED");
  } else if (newStatus === "UPCOMMING") {
    await pendMatch(matchId, "UPCOMMING");
  }

  revalidatePath(`/competitions/sports/${slug}`);
  revalidatePath(`/dashboard/admin/web/competitions/${slug}`);
}

export async function handleUpdateMatchScore(
  matchId: string,
  team1Score: number,
  team2Score: number,
  slug: string
) {
  try {
    await updateMatchScoreDB(matchId, team1Score, team2Score);
    revalidatePath(`/dashboard/admin/web/competitions/${slug}`);
  } catch (error) {
    console.error("Database update failed:", error);
  }
}

export async function deleteUploadedImage(url: string) {
  if (!url) return;
  try {
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/image/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
  } catch (err) {
    console.error(err);
  }
}

export async function approveTeamJoinRequest(teamMemberId: string) {
  try {
    await prisma.teamMember.update({
      where: { id: teamMemberId },
      data: {
        join_request_status: "Registered",
        team: {
          update: {
            current_team_member: { increment: 1 },
          },
        },
      },
    });

    revalidatePath(TEAM_JOIN_REQUESTS_PATH);
    return { success: true };
  } catch (error) {
    console.error("Approve Error:", error);
    return { success: false, error: "Gagal menyetujui permintaan join." };
  }
}

export async function rejectTeamJoinRequest(teamMemberId: string) {
  try {
    await prisma.teamMember.update({
      where: { id: teamMemberId },
      data: {
        join_request_status: "Failed",
        team: {
          update: {
            current_team_member: { decrement: 1 },
          },
        },
      },
    });

    revalidatePath(TEAM_JOIN_REQUESTS_PATH);
    return { success: true };
  } catch (error) {
    console.error("Reject Error:", error);
    return { success: false, error: "Gagal menolak permintaan join." };
  }
}

export async function setTeamJoinRequestPending(teamMemberId: string) {
  try {
    await prisma.teamMember.update({
      where: { id: teamMemberId },
      data: {
        join_request_status: "Pending",
        team: {
          update: {
            current_team_member: { decrement: 1 },
          },
        },
      },
    });

    revalidatePath(TEAM_JOIN_REQUESTS_PATH);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Gagal mengubah status ke pending." };
  }
}

export async function getTeamJoinRequestsAction(filters: {
  status?: "Pending" | "Registered" | "Failed";
  searchParticipant?: string;
  competitionId?: string;
  teamName?: string;
}) {
  const { status, searchParticipant, competitionId, teamName } = filters;

  return await prisma.teamMember.findMany({
    where: {
      join_request_status: status || undefined,
      user: searchParticipant
        ? {
            name: { contains: searchParticipant, mode: "insensitive" },
          }
        : undefined,
      team: {
        name: teamName
          ? { contains: teamName, mode: "insensitive" }
          : undefined,
        competition_id: competitionId || undefined,
      },
    },
    include: {
      user: true,
      team: {
        include: {
          competition: true,
          leader: true,
        },
      },
    },
  });
}
