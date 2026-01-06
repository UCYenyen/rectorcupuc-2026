import prisma from "@/lib/prisma";
import { Team, toTeamResponse, TeamWithMembersPayload } from "@/types/team.md";
import { TeamMember, Faculty } from "@prisma/client";
import { deleteUploadedImage } from "./action";
export async function createTeam(name: string, competitionId: string, leaderId: string) {
    const competitionData = await prisma.competition.findUnique({
        where: { id: competitionId },
    });
    
    if(!competitionData){
        return { error: "Competition does not exist." };
    }

    const isTeamExist = await prisma.team.findUnique({
        where: { name_competition_id: { name: name, competition_id: competitionId } },
    });

    if (isTeamExist) {
        return { error: "Team with this name is already registered in the competition." };
    }

    try {
        const team = await prisma.team.create({
            data: {
                name: name,
                competition_id: competitionId,
                leader_id: leaderId,
                min_team_member: competitionData.min_team_member,
                max_team_member: competitionData.max_team_member,
                current_team_member: 1,
            },
        });
        return team;
    } catch (error) {
        console.error("Prisma Create Team Error:", error);
        return { error: "Leader ID tidak ditemukan atau terjadi kesalahan database." };
    }
}

export async function getTeamByID(id: string): Promise<Team | null> {
    if (!id || id === "undefined") return null;

    const team = await prisma.team.findUnique({
        where: { id: id },
        include: {
            members: {
                include: {
                    user: true
                }
            }
        },
    });

    if (!team) return null;
    return toTeamResponse(team as TeamWithMembersPayload);
}
export async function deleteTeam(id: string) {
    try {
        return await prisma.team.delete({
            where: { id: id },
        });
    } catch (error) {
        return { error: "Failed to delete team." };
    }
}

export async function getTeamByUserID(id: string){
    return await prisma.teamMember.findFirst({
        where: { user_id: id },
        include: { team: true },
    });
}

export async function joinTeamByReferalCode(userId: string, referalCode: string, followProofUrl: string, profileUrl: string, faculty: string, nim: string){
    const team = await prisma.team.findFirst({
        where: { team_referal_code: referalCode },
    });

    if(!team){
        if (followProofUrl) await deleteUploadedImage(followProofUrl);
        if (profileUrl) await deleteUploadedImage(profileUrl);
        return { error: "Team with this referal code does not exist." };
    }

    // Get leader's faculty
    const leader = await prisma.user.findUnique({
        where: { id: team.leader_id },
        select: { faculty: true }
    });

    if (!leader) {
        if (followProofUrl) await deleteUploadedImage(followProofUrl);
        if (profileUrl) await deleteUploadedImage(profileUrl);
        return { error: "Team leader not found." };
    }

    if (leader.faculty !== faculty) {
        if (followProofUrl) await deleteUploadedImage(followProofUrl);
        if (profileUrl) await deleteUploadedImage(profileUrl);
        return { error: `Faculty mismatch! This team is for ${leader.faculty} students only. You selected ${faculty}.` };
    }

    const competitionRegistration = await prisma.competitionRegistration.findFirst({
        where: {
            competition_id: team.competition_id,
            user_id: team.leader_id
        }
    });

    if(!competitionRegistration){
        if (followProofUrl) await deleteUploadedImage(followProofUrl);
        if (profileUrl) await deleteUploadedImage(profileUrl);
        return { error: "Team leader is not registered for the competition!" };
    }

    if(team.leader_id === userId){
        if (followProofUrl) await deleteUploadedImage(followProofUrl);
        if (profileUrl) await deleteUploadedImage(profileUrl);
        return { error: "Team leader cannot join their own team as a member!" };
    }

    if(competitionRegistration.registration_status != "Registered"){
        if (followProofUrl) await deleteUploadedImage(followProofUrl);
        if (profileUrl) await deleteUploadedImage(profileUrl);
        return { error: `Team registration status for ${team.name} is ${competitionRegistration.registration_status}! Please wait until the approval is granted.` };
    }

    if(team.current_team_member >= team.max_team_member){
        if (followProofUrl) await deleteUploadedImage(followProofUrl);
        if (profileUrl) await deleteUploadedImage(profileUrl);
        return { error: "Team is already full!" };
    }

    const isAlreadyMember = await prisma.teamMember.findFirst({
        where: { user_id: userId, team_id: team.id },
    });

    if(isAlreadyMember){
        if (followProofUrl) await deleteUploadedImage(followProofUrl);
        if (profileUrl) await deleteUploadedImage(profileUrl);
        return { error: "You are already a member of this team!" };
    }

    const alreadyRegisteredToAnotherTeam = await prisma.team.findFirst({
        where: { 
            competition_id: team.competition_id, 
            members: { some: { user_id: userId } } 
        },
    });

    if(alreadyRegisteredToAnotherTeam){
        if (followProofUrl) await deleteUploadedImage(followProofUrl);
        if (profileUrl) await deleteUploadedImage(profileUrl);
        return { error: "You are already registered to another team for this competition!" };
    }

    try {
      // Check if NIM is already used by another user
      const nimExists = await prisma.user.findFirst({
        where: { 
          NIM: nim,
          NOT: { id: userId }
        },
      });

      if (nimExists) {
        if (followProofUrl) await deleteUploadedImage(followProofUrl);
        if (profileUrl) await deleteUploadedImage(profileUrl);
        return { error: "NIM sudah digunakan oleh user lain. Pastikan NIM yang dimasukkan benar." };
      }

      // Update user faculty and NIM
      await prisma.user.update({
        where: { id: userId },
        data: { 
          faculty: faculty as Faculty,
          NIM: nim
        },
      });

      const teamMember = await prisma.teamMember.create({
          data: {
              user_id: userId,
              team_id: team.id,
              follow_proof_url: followProofUrl,
              profile_url: profileUrl,
              join_request_status: "Pending"
          },
      });

      return teamMember;
    } catch (error) {
        if (followProofUrl) await deleteUploadedImage(followProofUrl);
        if (profileUrl) await deleteUploadedImage(profileUrl);
        return { error: "Failed to join the team. Please try again." };
    }
}