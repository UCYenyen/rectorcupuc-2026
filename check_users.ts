import { PrismaClient } from '@prisma/client';
import { allStarData } from './src/lib/data/bestVoteCandidatesData';

const prisma = new PrismaClient();

async function main() {
  const emails = allStarData.map(c => c.email);
  const users = await prisma.user.findMany({ where: { email: { in: emails } } });
  console.log(`Found ${users.length} users out of ${emails.length} emails.`);
  const missing = emails.filter(e => !users.find(u => u.email === e));
  console.log('Missing emails:', missing);
}
main().catch(console.error).finally(() => prisma.$disconnect());
