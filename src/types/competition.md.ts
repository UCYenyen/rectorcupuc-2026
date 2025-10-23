import { CompetitionCategory, Match } from "@prisma/client";
import { Team } from "@prisma/client";

export interface Competition{
    id: string;
    name: string;
    matches: Match[];
}

export interface Registration{
    id: string;
    userId: string;
    competitionId: string;
}
export interface TeamInterface extends Team {
    competition: Competition;
    leader:{
        id: string;
        name: string | null;
    }
}

export interface CompetitionContainerProps{
    id: String;                   
    name: String
    description: String                   
    min_team_member: number                      
    max_team_member: number                       
    category: CompetitionCategory
}