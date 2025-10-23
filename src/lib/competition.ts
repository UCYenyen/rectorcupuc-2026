import prisma from "@/lib/prisma";
import { deleteTeam, createTeam } from "./team";

export async function getAllCompetitions(){
    return await prisma.competition.findMany();
}

export async function getCompetitionByID(id: string){
    return await prisma.competition.findUnique({
        where: { id: id },
    });
}

export async function registerTeamToCompetition(competitionId: string, teamName: string, leaderId: string){
    const isTeamExist = await prisma.team.findUnique({
        where: { name_competition_id: { name: teamName, competition_id: competitionId } },
    });

    if(isTeamExist){
        return { error: "Team with this name is already registered in the competition." };
    }

    const alreadyRegisteredWithATeamForThisCompetition = await prisma.team.findFirst({
        where: { competition_id: competitionId, name: teamName },
    });

    if(alreadyRegisteredWithATeamForThisCompetition){
        return { error: "You have already registered for the competition." };
    }

    const alreadyRegisteredForThisCompetition = await prisma.competitionRegistration.findFirst({
        where: { competition_id: competitionId, user_id: leaderId },
    });

    if(alreadyRegisteredForThisCompetition){
        return { error: "You have already registered for the competition." };
    }

    const team = await createTeam(teamName, competitionId, leaderId);
  
    if ("error" in team) {
        return { error: team.error };
    }

    const registration = await prisma.competitionRegistration.create({
        data: {
            competition_id: competitionId,
            team_id: team.id,
            user_id: leaderId,
        },
    });

    if (!registration) {
        await deleteTeam(team.id);
        return { error: "Failed to register. Due to connection issue" };
    }  

    return { team, registration };
}

export async function getAllRegistrations(){
    return await prisma.competitionRegistration.findMany({
        include: {
            team: true,
            competition: true,
            user: true,
        },
    });
}