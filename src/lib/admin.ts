import prisma from "./prisma";

export default function updateRegistrationStatus(
  registrationId: string,
  status: "Registered" | "Pending" | "Failed"
) {
  return prisma.competitionRegistration.update({
    where: { id: registrationId },
    data: { registration_status: status },
  });
}

export async function updateTeamJoinRequestStatus(
  teamMemberId: string,
  status: "Registered" | "Pending" | "Failed"
) {
  const teamMember = await prisma.teamMember.findUnique({
    where: { id: teamMemberId },
    include: { team: true },
  });

  if (!teamMember) {
    throw new Error("Team member not found");
  }

  // If approving, increment team member count
  if (
    status === "Registered" &&
    teamMember.join_request_status !== "Registered"
  ) {
    await prisma.team.update({
      where: { id: teamMember.team_id },
      data: { current_team_member: { increment: 1 } },
    });
  }

  if (
    status !== "Registered" &&
    teamMember.join_request_status === "Registered"
  ) {
    await prisma.team.update({
      where: { id: teamMember.team_id },
      data: { current_team_member: { decrement: 1 } },
    });
  }

  return prisma.teamMember.update({
    where: { id: teamMemberId },
    data: { join_request_status: status },
  });
}
