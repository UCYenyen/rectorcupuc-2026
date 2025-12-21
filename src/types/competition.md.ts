import { CompetitionCategory, Match, Rules, Team } from "@prisma/client";

export type MatchWithTeams = Match & {
    team_one_reference: Team;
    team_two_reference: Team;
    teams?: Team[];
};

export interface Competition {
    id: string;
    name: string;
    matches: Match[];
}

export interface Registration {
    id: string;
    userId: string;
    competitionId: string;
}

export interface TeamInterface extends Team {
    competition: Competition;
    leader: {
        id: string;
        name: string | null;
    };
}

export interface CompetitionRulesModel {
    id: string;
    description: string;
    competition_id: string;
}

export interface CompetitionContainerProps {
    id: string;
    name: string;
    slug: string;
    location: string;
    description: string;
    min_team_member: number;
    max_team_member: number;
    category: CompetitionCategory;
    rules?: Rules[];
    matches?: MatchWithTeams[];
    teams?: Team[];
}