import { CompetitionCategory, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function main() {
    console.log("Seeding database...");

    // 1. Buat Competition dulu
    // Create competitions individually to get their IDs
  // Sports
    /*const basketball = */ await prisma.competition.create({
        data: { name: "Basketball Putra", category: CompetitionCategory.Sports, description: "Lorem Ipsum Yenyen", min_team_member: 5, max_team_member: 10 },
    });
    await prisma.competition.create({
        data: { name: "Basketball", category: CompetitionCategory.Sports, description: "Lorem Ipsum Yenyen", min_team_member: 3, max_team_member: 4 },
    });
    /*const futsal =  */ await prisma.competition.create({
        data: { name: "Futsal", category: CompetitionCategory.Sports, description: "Lorem Ipsum Yenyen", min_team_member: 5, max_team_member: 10 },
    });
    /* const billiard = */ await prisma.competition.create({
        data: { name: "Billiard", category: CompetitionCategory.Sports, description: "Lorem Ipsum Yenyen", min_team_member: 1, max_team_member: 1 },
    });
    /* const badminton  =*/ await prisma.competition.create({
        data: { name: "Badminton", category: CompetitionCategory.Sports, description: "Lorem Ipsum Yenyen", min_team_member:2, max_team_member:2},
    });
   /*const pingpong =*/ await prisma.competition.create({
        data: { name: "Ping Pong", category: CompetitionCategory.Sports, description: "Lorem Ipsum Yenyen", min_team_member:1, max_team_member:1 },
    });
    /*const taekwondo =*/ await prisma.competition.create({
        data: { name: "Taekwondo", category: CompetitionCategory.Sports, description: "Lorem Ipsum Yenyen", min_team_member:1, max_team_member:1 },
    });


    // ESports
    await prisma.competition.create({
        data: { name: "Mobile Legends", category: CompetitionCategory.ESports, description: "Lorem Ipsum Yenyen", min_team_member: 5, max_team_member: 6 },
    });
    /*const pubg = */await prisma.competition.create({
        data: { name: "PUBG", category: CompetitionCategory.ESports, description: "Lorem Ipsum Yenyen", min_team_member: 4, max_team_member: 4 },
    });
    /*const FIFA = */await prisma.competition.create({
        data: { name: "FIFA 2V2", category: CompetitionCategory.ESports, description: "Lorem Ipsum Yenyen", min_team_member: 2, max_team_member: 2 },
    });


    // Arts
    /*const dance = */await prisma.competition.create({
        data: { name: "Dance", category: CompetitionCategory.Arts, description: "Lorem Ipsum Yenyen", min_team_member: 5, max_team_member: 7 },
    });
    /*const Solo = */await prisma.competition.create({
        data: { name: "Solo Singing", category: CompetitionCategory.Arts, description: "Lorem Ipsum Yenyen", min_team_member: 1, max_team_member: 1 },
    });
    /*const Duet = */await prisma.competition.create({
        data: { name: "Duet Singing", category: CompetitionCategory.Arts, description: "Lorem Ipsum Yenyen", min_team_member: 2, max_team_member: 2 },
    });
    /*const Puisi = */await prisma.competition.create({
        data: { name: "Puisi", category: CompetitionCategory.Arts, description: "Lorem Ipsum Yenyen", min_team_member:1, max_team_member:1 },
    });
    /*const Poster = */await prisma.competition.create({
        data: { name: "Poster", category: CompetitionCategory.Arts, description: "Lorem Ipsum Yenyen", min_team_member:1, max_team_member:1 },
    });
    /*const Poster = */await prisma.competition.create({
        data: { name: "Fotografi", category: CompetitionCategory.Arts, description: "Lorem Ipsum Yenyen", min_team_member:1, max_team_member:1 },
    });

    // Learnings
    /*const coc =*/ await prisma.competition.create({
        data: { name: "Cerdas Cermat", category: CompetitionCategory.Learnings, description: "Lorem Ipsum Yenyen", min_team_member:3, max_team_member:3 },
    });
    await prisma.competition.create({
        data: { name: "Catur", category: CompetitionCategory.Learnings, description: "Lorem Ipsum Yenyen", min_team_member:1, max_team_member:1},
    });

    // 2. Baru buat Match dengan competitionId yang valid

    console.log("Dummy matches seeded.");
}

// Replace final call with safe runner:
if (require.main === module) {
  main()
    .then(() => {
      console.log("Seeding finished successfully.");
    })
    .catch((e) => {
      console.error("Seeding failed:", e);
      process.exitCode = 1;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}