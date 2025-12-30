'use server'
import RegistrationForm from "@/components/competition/registration/RegistrationForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/dist/client/components/navigation";
import StripeBackground from "@/components/StripeBackground";
import { auth } from "@/lib/auth";
import { checkUserRegistrationStatus } from "@/lib/competition";

interface ProblemPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: ProblemPageProps) {
  const { slug } = await params;
  const session = await auth();
  const competition = await prisma.competition.findUnique({
    where: { slug: slug },
    select: { max_team_member: true, id: true },
  });

  if (!session) {
    return;
  }

  if (!competition) {
    return notFound();
  }
  const isRegistered = await checkUserRegistrationStatus(session.user.id, competition.id);

  const isSolo = competition.max_team_member <= 1;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#390D62] to-[#6226A4] flex items-center justify-center p-4">
      <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] overflow-hidden"></div>
      <StripeBackground />
      <div className="relative z-10 border-[#AAF3D5] border-4 bg-white/10 backdrop-blur-2xl p-12 rounded-2xl shadow-2xl text-center max-w-md w-full">
        {isRegistered ? (
          <div className="text-white text-2xl font-bold">
            You have already registered for this competition.
          </div>
        ) : (<RegistrationForm
          slug={slug}
          isSolo={isSolo}
        />)}
      </div>
    </div>
  );
}