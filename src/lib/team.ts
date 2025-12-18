import prisma from "@/lib/prisma";

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

export async function getTeamByID(id: string) {
    return await prisma.team.findUnique({
        where: { id: id },
    });
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

export async function joinTeamByReferalCode(userId: string, referalCode: string){
    const team = await prisma.team.findFirst({
        where: { team_referal_code: referalCode },
    });

    if(!team){
        return { error: "Team with this referal code does not exist." };
    }

    if(team.current_team_member >= team.max_team_member){
        return { error: "Team is already full." };
    }

    const isAlreadyMember = await prisma.teamMember.findFirst({
        where: { user_id: userId, team_id: team.id },
    });

    if(isAlreadyMember){
        return { error: "You are already a member of this team." };
    }

    const alreadyRegisteredToAnotherTeam = await prisma.team.findFirst({
        where: { 
            competition_id: team.competition_id, 
            members: { some: { user_id: userId } } 
        },
    });

    if(alreadyRegisteredToAnotherTeam){
        return { error: "You are already registered to another team for this competition." };
    }

    const teamMember = await prisma.teamMember.create({
        data: {
            user_id: userId,
            team_id: team.id,
        },
    });

    await prisma.team.update({
        where: { id: team.id },
        data: { current_team_member: { increment: 1 } },
    });

    return teamMember;
}