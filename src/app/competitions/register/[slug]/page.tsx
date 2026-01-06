'use server'
import RegistrationForm from "@/components/competition/registration/RegistrationForm";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/dist/client/components/navigation";
import StripeBackground from "@/components/StripeBackground";
import { auth } from "@/lib/auth";
import { checkUserRegistrationStatus } from "@/lib/competition";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";

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
    select: { max_team_member: true, id: true, isCompetitionOpenRegistration: true },
  });

  if (!session) {
    return redirect("/auth/signin");
  }

  if (!competition) {
    return notFound();
  }

  if (competition.isCompetitionOpenRegistration == false) {
    return (<div className="relative min-h-screen bg-gradient-to-b from-[#390D62] to-[#6226A4] flex items-center justify-center p-4">
      <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] overflow-hidden"></div>
      <StripeBackground />
      <div className="relative z-10 border-[#AAF3D5] border-4 bg-white/10 backdrop-blur-2xl p-12 rounded-2xl shadow-2xl text-center max-w-md w-full">
        <div className="flex flex-col gap-4 text-white justify-start items-center">
          <TriangleAlert className="w-48 h-38 text-[#E979EE]" />
          <h1 className="text-2xl font-bold">WARNING</h1>
          <h3 className="text-lg text-center">
            REGISTRATION IS NOT OPENNED YET!
          </h3>
          <Link href="/" className="bg-black/40 border-white border-3 rounded-lg px-4 py-2 hover:bg-purple-800">Home</Link>
        </div>
      </div>
    </div>);
  }

  const isRegistered = await checkUserRegistrationStatus(session.user.id, competition.id);

  const isSolo = competition.max_team_member <= 1;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#390D62] to-[#6226A4] flex items-center justify-center p-4">
      <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] overflow-hidden"></div>
      <StripeBackground />
      <div className="relative z-10 border-[#AAF3D5] border-4 bg-white/10 backdrop-blur-2xl p-12 rounded-2xl shadow-2xl text-center max-w-md w-full">
        {isRegistered ? (
          <div className="text-white text-2xl font-bold flex flex-col gap-4">
            Registration for this competition is successful.
            <div className="mt-4">
              <Link href="/competitions" className="bg-black/40 border-white border-3 rounded-lg px-4 py-2 hover:bg-purple-800">
                Back to Competitions
              </Link>
            </div>
          </div>
        ) : (<RegistrationForm
          slug={slug}
          isSolo={isSolo}
        />)}
      </div>
    </div>
  );
}