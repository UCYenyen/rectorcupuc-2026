import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id: userId } = params;
  console.log("STEP 0: userId =", userId);

  // 1. Get direct registrations where user is the team leader
  const leaderRegistrations = await prisma.competitionRegistration.findMany({
    where: { user_id: userId },
    include: {
      team: true,
      competition: true,
    }
  });
  console.log("STEP 1A: leaderRegistrations =", leaderRegistrations);

  // 2. Get registrations where user is a team member
  const registeredInTeam = await prisma.teamMember.findMany({
    where: { user_id: userId },
    include: { team: true },
  });
  console.log("STEP 1B: registeredInTeam =", registeredInTeam);

  // 3. For teams where user is a member, find all competitionRegistrations
  const teamRegistrations = await Promise.all(
    registeredInTeam.map(async (teamMember, idx) => {
      const regis = await prisma.competitionRegistration.findMany({
        where: { team_id: teamMember.team.id },
        include: {
          team: true,
          competition: true,
        },
      });
      console.log(`STEP 2: competitionRegistration for teamMember[${idx}] (team_id=${teamMember.team.id}) =`, regis);
      return regis;
    })
  );

  // 4. Combine both registration types (leader + member)
  const flatRegistrations = [...leaderRegistrations, ...teamRegistrations.flat()];

  // 5. Remove duplicates (in case user is both leader and member)
  const uniqueRegistrations = Array.from(
    new Map(flatRegistrations.map(reg => [reg.id, reg])).values()
  );

  console.log("STEP 3: uniqueRegistrations =", uniqueRegistrations);

  // 6. Map to frontend format
  const result = uniqueRegistrations.map((regis) => ({
    id: regis.id,
    competition: {
      id: regis.competition.id,
      name: regis.competition.name,
      category: regis.competition.category,
      team_name: regis.team.name,
      referal_code: regis.team.team_referal_code,
    },
    registration_status: regis.registration_status,
  }));

  console.log("STEP 4: result =", result);

  return NextResponse.json(result);
}