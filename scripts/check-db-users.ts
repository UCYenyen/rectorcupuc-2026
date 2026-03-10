import { PrismaClient } from "@prisma/client";
import { allStarData } from "../src/lib/data/bestVoteCandidatesData";

const prisma = new PrismaClient();

async function main() {
  const putriEmails = allStarData
    .filter((c) => c.competition === "basketball-putri")
    .map((c) => c.email);
  const users = await prisma.user.findMany({
    where: { email: { in: putriEmails } },
    select: { email: true, id: true },
  });

  console.log("Putri candidates count:", putriEmails.length);
  console.log("Putri users in DB count:", users.length);
  console.log("Users:", users);

  const putraEmails = allStarData
    .filter((c) => c.competition === "basketball-putra")
    .map((c) => c.email);
  const putraUsers = await prisma.user.findMany({
    where: { email: { in: putraEmails } },
    select: { email: true, id: true },
  });
  console.log("\nPutra candidates count:", putraEmails.length);
  console.log("Putra users in DB count:", putraUsers.length);

  // also check votes
  const voteCounts = await prisma.vote.groupBy({
    by: ["competition_id"],
    _count: true,
  });
  console.log("\nVote counts:", voteCounts);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
