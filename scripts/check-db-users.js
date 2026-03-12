const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    select: {
      email: true,
      name: true,
      image: true,
      competition_registrations: {
        select: {
          profile_url: true
        }
      },
      team_members: {
        select: {
          profile_url: true
        }
      }
    },
    take: 10
  });
  console.log(JSON.stringify(users, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  });
