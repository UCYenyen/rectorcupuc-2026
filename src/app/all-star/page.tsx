import StripeBackground from "@/components/StripeBackground";
import RectorInlineTitle from "@/components/competition/RectorInlineTitle";
import SelectedAllStar from "@/components/allstar/SelectedAllStar";
import prisma from "@/lib/prisma";
import { allStarData } from "@/lib/data/allStarData";

export default async function CompetitionPage() {
  const allStarEmails = allStarData.map((player) => player.email);

  const allStarEmailFilters = allStarEmails.map((email) => ({
    email: { equals: email, mode: "insensitive" as const },
  }));

  const dbUsers = await prisma.user.findMany({
    where: {
      OR: allStarEmailFilters,
    },
    select: {
      email: true,
      name: true,
      faculty: true,
      team_members: {
        select: {
          profile_url: true,
        },
      },
      competition_registrations: {
        select: {
          profile_url: true,
        },
      },
    },
  });

  // DEBUG: Log fetched data to identify image issues
  console.log("=== ALL-STAR PAGE DEBUG ===");
  console.log("Emails searched:", allStarEmails.length);
  console.log(
    "DB Users found:",
    dbUsers.length,
    dbUsers.map((u) => ({
      email: u.email,
      image: u.competition_registrations?.map((r) => r.profile_url),
      regs: u.competition_registrations?.map((r) => r.profile_url),
      tms: u.team_members?.map((t) => t.profile_url),
    })),
  );
  console.log("=== END DEBUG ===");

  const enrichedPlayers = allStarData.map((player) => {
    const dbUser = dbUsers.find(
      (u) => u.email?.toLowerCase() === player.email.toLowerCase(),
    );

    // Priority: competition_registrations.profile_url > team_members.profile_url
    const validReg = dbUser?.competition_registrations?.find(
      (r) => r.profile_url && r.profile_url.trim() !== "",
    );
    const validTm = dbUser?.team_members?.find(
      (t) => t.profile_url && t.profile_url.trim() !== "",
    );

    const userImage = validReg?.profile_url || validTm?.profile_url || null;

    return {
      ...player,
      name: dbUser?.name ?? player.name,
      image: userImage ?? player.image ?? null,
      faculty: dbUser?.faculty ?? player.faculty,
    };
  });

  return (
    <>
      <div className="w-screen h-[10vh] md:h-[7vh]"></div>
      <div className="relative min-h-screen w-screen overflow-x-hidden flex flex-col justify-start items-center gap-8 pt-4 md:pt-8">
        <div className="fixed w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[-1]"></div>
        <StripeBackground />
        <RectorInlineTitle />
        <SelectedAllStar players={enrichedPlayers} />
      </div>
    </>
  );
}
