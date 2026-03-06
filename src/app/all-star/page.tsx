import StripeBackground from "@/components/StripeBackground";
import RectorInlineTitle from "@/components/competition/RectorInlineTitle";
import SelectedAllStar from "@/components/allstar/SelectedAllStar";
import prisma from "@/lib/prisma";
import { allStarData } from "@/lib/data/allStarData";

export default async function CompetitionPage() {
  const allStarEmails = allStarData.map((player) => player.email);

  const dbUsers = await prisma.user.findMany({
    where: {
      email: {
        in: allStarEmails,
      },
    },
    select: {
      email: true,
      name: true,
      image: true,
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

  const enrichedPlayers = allStarData.map((player) => {
    const dbUser = dbUsers.find((u) => u.email === player.email);

    let userImage = dbUser?.image || null;
    if (dbUser?.competition_registrations?.length) {
      userImage = dbUser.competition_registrations[0].profile_url || userImage;
    } else if (dbUser?.team_members?.length) {
      userImage = dbUser.team_members[0].profile_url || userImage;
    }

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
