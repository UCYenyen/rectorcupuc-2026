'use server'
import prisma from "@/lib/prisma";
import { deleteTeam, createTeam } from "./team";
import { CompetitionContainerProps, MatchWithTeams } from "@/types/competition.md";
import { Match, CompetitionMatchType } from "@prisma/client";
import { CreateMatchFormState } from "./action";

export async function getAllCompetitions() : Promise<CompetitionContainerProps[]>{
    return await prisma.competition.findMany({
        include: {
            teams: true,
        },
    });
}

export async function getCompetitionByID(id: string){
    return await prisma.competition.findUnique({
        where: { id: id },
    });
}

export async function getCompetitionBySlug(slug: string): Promise<CompetitionContainerProps | null> {
    const data = await prisma.competition.findUnique({
        where: { slug: slug },
        include: {
            matches: {
                include: {
                    team_one_reference: true,
                    team_two_reference: true,
                }
            },
            rules: true,
            teams: true,
        }
    });

    if (!data) return null;

    const matchesWithTeams: MatchWithTeams[] = data.matches.map(match => ({
        ...match,
        teams: [match.team_one_reference, match.team_two_reference]
    }));

    return {
        ...data,
        matches: matchesWithTeams
    };
}

export async function checkUserRegistrationStatus(userId: string, competitionId: string): Promise<boolean> {
    const registration = await prisma.competitionRegistration.findFirst({
        where: {
            competition_id: competitionId,
            team: {
                OR: [
                    { leader_id: userId },
                    { members: { some: { user_id: userId } } }
                ]
            }
        }
    });

    return registration !== null;
}

export async function registerTeamToCompetition(
    slug: string, 
    teamName: string, 
    leaderId: string, 
    proofUrl: string,
    profileUrl: string
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
                follow_proof_url: proofUrl,
                profile_url: profileUrl,
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

export async function createMatch(prevState: CreateMatchFormState,
  formData: FormData) : Promise<CreateMatchFormState> {
    const competitionId = formData.get('competitionId') as string;
    const team1_id = formData.get("team1") as string;
    const team2_id = formData.get("team2") as string;
    const startTime = new Date(formData.get("startDate") as string);
    const endTime = new Date(formData.get("endDate") as string);
    const duration = Number(formData.get("duration") as string);
    const matchType = formData.get("match-type") as string;

    if(matchType === "" || matchType === null){
        return {
            ...prevState,
            error: "Match type is required.",
        };
    }
    
    const competition = await prisma.competition.findUnique({
        where: { id: competitionId },
    });
    if(!competition) return { error: "Competition not found." };

    try {
        await prisma.match.create({
            data: {
                competition_id: competition.id,
                duration: duration,
                team_one_score: 0,
                team_two_score: 0,
                team_one_id: team1_id,
                team_two_id: team2_id,
                startTime: startTime,
                endTime: endTime,
                match_type: matchType as CompetitionMatchType,
            },
            include:{
                team_one_reference: true,
                team_two_reference: true,
            }
        });
        return {success: true};
    } catch (error) {
        return { error: "Failed to create match." + error };
    }
}

export async function startMatch(
    matchId: string,
    status: "ONGOING"
): Promise<Match | { error: string }> {

    const match = await prisma.match.findUnique({
        where: { id: matchId },
    });
    if (!match) return { error: "Match not found." };

    try {
        const updatedMatch = await prisma.match.update({
            where: { id: matchId },
            data: { 
                match_status: status,
            },
        });
        return updatedMatch;
    } catch (error) {
        return { error: "Failed to start match." };
    }   
}
export async function completeMatch(
    matchId: string,
    status: "COMPLETED"
): Promise<Match | { error: string }> {

    const match = await prisma.match.findUnique({
        where: { id: matchId },
    });
    if (!match) return { error: "Match not found." };

    try {
        const updatedMatch = await prisma.match.update({
            where: { id: matchId },
            data: { 
                match_status: status,
            },
        });
        return updatedMatch;
    } catch (error) {
        return { error: "Failed to complete match." };
    }   
}

export async function pendMatch(
    matchId: string,
    status: "UPCOMMING"
): Promise<Match | { error: string }> {

    const match = await prisma.match.findUnique({
        where: { id: matchId },
    });
    if (!match) return { error: "Match not found." };

    try {
        const updatedMatch = await prisma.match.update({
            where: { id: matchId },
            data: { 
                match_status: status,
            },
        });
        return updatedMatch;
    } catch (error) {
        return { error: "Failed to pend match." };
    }   
}   

export async function updateMatchScoreDB(
    matchId: string,
    team1Score: number,
    team2Score: number
) {
    try {
        const updatedMatch = await prisma.match.update({
            where: { id: matchId },
            data: { 
                team_one_score: team1Score,
                team_two_score: team2Score,
            },
        });
        return updatedMatch;
    } catch (error) {
        return { error: "Failed to update score." };
    }   
}