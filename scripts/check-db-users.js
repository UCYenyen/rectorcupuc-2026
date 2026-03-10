const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const putriEmails = [
    'fcatherine@student.ciputra.ac.id',
    'gtaffyanna@student.ciputra.ac.id',
    'jellenchia@student.ciputra.ac.id',
    'nmadeayu02@student.ciputra.ac.id',
    'kmadelyn@student.ciputra.ac.id',
    'jlavinia01@student.ciputra.ac.id',
    'vangeline04@student.ciputra.ac.id',
    'cevangelyna@student.ciputra.ac.id',
    'smichell@student.ciputra.ac.id',
    'Gsungkono@student.ciputra.ac.id'
  ];
  
  const putraEmails = [
    'adiningrat@student.ciputra.ac.id', 'kfelicio@student.ciputra.ac.id', 'mwijaya09@student.ciputra.ac.id', 'cmakarau@student.ciputra.ac.id', 'dmazelwijaya@student.ciputra.ac.id', 'iwajaksono@student.ciputra.ac.id', 'shendrawan@student.ciputra.ac.id', 'dsetiawan07@student.ciputra.ac.id', 'joeysonsalam01@student.ciputra.ac.id', 'twinston@student.ciputra.ac.id', 'mchristian10@student.ciputra.ac.id', 'swidjaja05@student.ciputra.ac.id', 'snathael@student.ciputra.ac.id', 'kgilbert@student.ciputra.ac.id', 'jliunardi@student.ciputra.ac.id', 'tristanirvin01@student.ciputra.ac.id', 'bprayogo@student.ciputra.ac.id', 'jwijaya12@student.ciputra.ac.id'
  ];

  const putriUsers = await prisma.user.findMany({
    where: { email: { in: putriEmails } },
    select: { email: true, id: true }
  });
  
  console.log("Putri candidates count:", putriEmails.length);
  console.log("Putri users in DB count:", putriUsers.length);
  console.log("Putri Users DB:", putriUsers.map(u => u.email));

  const putraUsers = await prisma.user.findMany({
    where: { email: { in: putraEmails } },
    select: { email: true, id: true }
  });
  console.log("\nPutra candidates count:", putraEmails.length);
  console.log("Putra users in DB count:", putraUsers.length);
  
  const voteCounts = await prisma.vote.groupBy({
    by: ['competition_id'],
    _count: true
  });
  console.log("\nVote counts:", voteCounts);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
