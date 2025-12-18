import prisma from "@/lib/prisma";
import { deleteTeam, createTeam } from "./team";
import { CompetitionContainerProps } from "@/types/competition.md";

export async function getAllCompetitions(){
    return await prisma.competition.findMany();
}

export async function getCompetitionByID(id: string){
    return await prisma.competition.findUnique({
        where: { id: id },
    });
}

export async function getCompetitionBySlug(slug: string) : Promise<CompetitionContainerProps>{
    const data = await prisma.competition.findUnique({
        where: { slug: slug },
        include: {
            matches: true,
            rules: true,
        }
    });

    if(!data) throw new Error("Competition not found");
    return data;
}

export async function registerTeamToCompetition(
    slug: string, 
    teamName: string, 
    leaderId: string, 
    proofUrl: string
){
    const competition = await prisma.competition.findUnique({
        where: { slug: slug },
    });

    if(!competition) return { error: "Competition not found." };

    const userExists = await prisma.user.findUnique({
        where: { id: leaderId }
    });
    if(!userExists) return { error: "User ID not found in database." };

    const isTeamExist = await prisma.team.findUnique({
        where: { name_competition_id: { name: teamName, competition_id: competition.id } },
    });
    if(isTeamExist) return { error: "Team with this name is already registered." };

    const alreadyRegistered = await prisma.competitionRegistration.findFirst({
        where: { competition_id: competition.id, user_id: leaderId },
    });
    if(alreadyRegistered) return { error: "You have already registered for the competition." };

    const team = await createTeam(teamName, competition.id, leaderId);
    if ("error" in team) return { error: team.error };

    try {
        const registration = await prisma.competitionRegistration.create({
            data: {
                competition_id: competition.id,
                team_id: team.id,
                user_id: leaderId,
                image_url: proofUrl, 
            },
        });
        return { team, registration };
    } catch (error) {
        await deleteTeam(team.id);
        return { error: "Failed to create registration record." };
    }
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