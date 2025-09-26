import { Match } from "@prisma/client";
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