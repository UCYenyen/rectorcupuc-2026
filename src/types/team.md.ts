// src/types/team.md.ts
import { Team as PrismaTeam, TeamMember, User } from "@prisma/client";

export interface TeamMemberResponse {
  id: string;
  username: string;
  image?: string | null; // <--- ADD THIS
}

export interface Team {
  id: string;
  name: string;
  leader_id: string;
  competition_id: string;
  created_at: Date;
  updated_at: Date;
  image?: string;
  current_team_member: number;
  min_team_member: number;
  max_team_member: number;
  TeamMembers: TeamMemberResponse[];
}

export type TeamWithMembersPayload = PrismaTeam & {
  members: (TeamMember & {
    user: User;
  })[];
};

export function toTeamResponse(team: TeamWithMembersPayload): Team {
  return {
    id: team.id,
    name: team.name,
    leader_id: team.leader_id,
    competition_id: team.competition_id,
    created_at: team.created_at,
    updated_at: team.updated_at,
    current_team_member: team.current_team_member,
    min_team_member: team.min_team_member,
    max_team_member: team.max_team_member,
    // Mapping data dari struktur Prisma ke interface UI
    TeamMembers: team.members.map((member) => ({
      id: member.user_id,
      username: member.user.name || "Unknown",
      image: member.user.image // <--- ADD THIS (assuming your User model has an 'image' field)
    })),
  };
}