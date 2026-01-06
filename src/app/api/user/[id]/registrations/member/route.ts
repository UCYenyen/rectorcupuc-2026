import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: userId } = await context.params;
  console.log("STEP 0: userId =", userId);

  // 1. Get direct registrations where user is the team leader
  const leaderRegistrations = await prisma.competitionRegistration.findMany({
    where: { user_id: userId },
    include: {
      team: true,
      competition: true,
      user: true,
    },
  });
  console.log("STEP 1A: leaderRegistrations =", leaderRegistrations);

  // 2. Get team member requests (ALL STATUSES) with team and competition data
  const memberRequests = await prisma.teamMember.findMany({
    where: { 
      user_id: userId,
    },
    include: { 
      team: {
        include: {
          competition: true,
        }
      }
    },
  });
  console.log("STEP 1B: memberRequests =", memberRequests);

  // 3. Map leader registrations to result format
  const leaderResults = leaderRegistrations.map((regis) => ({
    id: regis.id,
    competition: {
      id: regis.competition.id,
      name: regis.competition.name,
      category: regis.competition.category,
      team_name: regis.team.name,
      referal_code: regis.team.team_referal_code,
    },
    team: {
      id: regis.team.id,
      name: regis.team.name,
      min_team_members: regis.competition.min_team_member,
      current_team_members: regis.team.current_team_member,
      max_team_members: regis.competition.max_team_member,
    },
    registration_status: regis.registration_status,
    member_join_status: null, // Leader doesn't have join status
    is_leader: true,
  }));

  // 4. Map member requests to result format
  const memberResults = memberRequests.map((member) => ({
    id: member.id, // TeamMember ID
    competition: {
      id: member.team.competition.id,
      name: member.team.competition.name,
      category: member.team.competition.category,
      team_name: member.team.name,
      referal_code: member.team.team_referal_code,
    },
    team: {
      id: member.team.id,
      name: member.team.name,
      min_team_members: member.team.competition.min_team_member,
      current_team_members: member.team.current_team_member,
      max_team_members: member.team.competition.max_team_member,
    },
    registration_status: member.join_request_status, // Member's join status (Pending/Registered/Failed)
    member_join_status: member.join_request_status,
    is_leader: false,
  }));

  // 5. Combine both types
  const result = [...leaderResults, ...memberResults];

  console.log("STEP 2: result =", result);

  return NextResponse.json(result);
}