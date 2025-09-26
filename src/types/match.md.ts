export interface Match {
  id: string;
  duration: number;
  startTime: Date;
  endTime: Date;
  team_one: string;
  team_two: string;
  team_one_score: number;
  team_two_score: number;
}

export type MatchCardProps = {
    teamAName: string;
    teamBName: string;
    teamAScore: number;
    teamBScore: number;
    duration: string;
    isMatchDone: boolean;
};