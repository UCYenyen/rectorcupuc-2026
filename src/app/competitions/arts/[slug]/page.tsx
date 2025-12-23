import { getCompetitionBySlug } from "@/lib/competition";
import { redirect } from "next/dist/client/components/navigation";
import { auth } from "@/lib/auth";
import { checkUserRegistrationStatus } from "@/lib/competition";

interface ProblemPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BasketballPutraPage({ params }: ProblemPageProps) {
  const { slug } = await params;
  const competitionData = await getCompetitionBySlug(slug);
  const session = await auth();

  if (!competitionData) {
    return redirect('/not-found');
  }

  if (!session) {
    return redirect('/');
  }

  let isRegistered = false;
  try {
    isRegistered = await checkUserRegistrationStatus(session.user.id, competitionData.id);
  } catch {
    isRegistered = false;
  }

  return;
}