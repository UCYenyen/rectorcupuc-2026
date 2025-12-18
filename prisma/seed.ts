import { CompetitionCategory, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function main() {
    console.log("Seeding database...");

    // 1. Buat Competition dulu
    // Create competitions individually to get their IDs
  // Sports
    /*const basketball = */ await prisma.competition.create({
        data: { name: "Basketball Putra", slug: "basketball-putra", location: "Parkiran UC", category: CompetitionCategory.Sports, description: "Lorem Ipsum Yenyen", min_team_member: 5, max_team_member: 10 },
    });
    await prisma.competition.create({
        data: { name: "Basketball", slug: "basketball", location: "Parkiran UC", category: CompetitionCategory.Sports, description: "Lorem Ipsum Yenyen", min_team_member: 3, max_team_member: 4 },
    });
    /*const futsal =  */ await prisma.competition.create({
        data: { name: "Futsal", slug: "futsal", location: "Parkiran UC", category: CompetitionCategory.Sports, description: "Lorem Ipsum Yenyen", min_team_member: 5, max_team_member: 10 },
    });
    /* const billiard = */ await prisma.competition.create({
        data: { name: "Billiard", slug: "billiard", location: "Parkiran UC", category: CompetitionCategory.Sports, description: "Lorem Ipsum Yenyen", min_team_member: 1, max_team_member: 1 },
    });
    /* const badminton  =*/ await prisma.competition.create({
        data: { name: "Badminton", slug: "badminton", location: "Parkiran UC", category: CompetitionCategory.Sports, description: "Lorem Ipsum Yenyen", min_team_member:2, max_team_member:2},
    });
   /*const pingpong =*/ await prisma.competition.create({
        data: { name: "Ping Pong", slug: "ping-pong", location: "Parkiran UC", category: CompetitionCategory.Sports, description: "Lorem Ipsum Yenyen", min_team_member:1, max_team_member:1 },
    });
    /*const taekwondo =*/ await prisma.competition.create({
        data: { name: "Taekwondo", slug: "taekwondo", location: "Parkiran UC", category: CompetitionCategory.Sports, description: "Lorem Ipsum Yenyen", min_team_member:1, max_team_member:1 },
    });


    // ESports
    await prisma.competition.create({
        data: { name: "Mobile Legends", slug: "mobile-legends", location: "Parkiran UC", category: CompetitionCategory.ESports, description: "Lorem Ipsum Yenyen", min_team_member: 5, max_team_member: 6 },
    });
    /*const pubg = */await prisma.competition.create({
        data: { name: "PUBG", slug: "pubg", location: "Parkiran UC", category: CompetitionCategory.ESports, description: "Lorem Ipsum Yenyen", min_team_member: 4, max_team_member: 4 },
    });
    /*const FIFA = */await prisma.competition.create({
        data: { name: "FIFA 2V2", slug: "fifa-2v2", location: "Parkiran UC", category: CompetitionCategory.ESports, description: "Lorem Ipsum Yenyen", min_team_member: 2, max_team_member: 2 },
    });


    // Arts
    /*const dance = */await prisma.competition.create({
        data: { name: "Dance", slug: "dance", location: "Parkiran UC", category: CompetitionCategory.Arts, description: "Lorem Ipsum Yenyen", min_team_member: 5, max_team_member: 7 },
    });
    /*const Solo = */await prisma.competition.create({
        data: { name: "Solo Singing", slug: "solo-singing", location: "Parkiran UC", category: CompetitionCategory.Arts, description: "Lorem Ipsum Yenyen", min_team_member: 1, max_team_member: 1 },
    });
    /*const Duet = */await prisma.competition.create({
        data: { name: "Duet Singing", slug: "duet-singing", location: "Parkiran UC", category: CompetitionCategory.Arts, description: "Lorem Ipsum Yenyen", min_team_member: 2, max_team_member: 2 },
    });
    /*const Puisi = */await prisma.competition.create({
        data: { name: "Puisi", slug: "puisi", location: "Parkiran UC", category: CompetitionCategory.Arts, description: "Lorem Ipsum Yenyen", min_team_member:1, max_team_member:1 },
    });
    /*const Poster = */await prisma.competition.create({
        data: { name: "Poster", slug: "poster", location: "Parkiran UC", category: CompetitionCategory.Arts, description: "Lorem Ipsum Yenyen", min_team_member:1, max_team_member:1 },
    });
    /*const Poster = */await prisma.competition.create({
        data: { name: "Fotografi", slug: "fotografi", location: "Parkiran UC", category: CompetitionCategory.Arts, description: "Lorem Ipsum Yenyen", min_team_member:1, max_team_member:1 },
    });

    // Learnings
    /*const coc =*/ await prisma.competition.create({
        data: { name: "Cerdas Cermat", slug: "cerdas-cermat", location: "Parkiran UC", category: CompetitionCategory.Learnings, description: "Lorem Ipsum Yenyen", min_team_member:3, max_team_member:3 },
    });
    await prisma.competition.create({
        data: { name: "Catur", slug: "catur", location: "Parkiran UC", category: CompetitionCategory.Learnings, description: "Lorem Ipsum Yenyen", min_team_member:1, max_team_member:1},
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