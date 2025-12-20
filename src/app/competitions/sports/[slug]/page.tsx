import CompetitionDetailsDataReciever from "@/components/competition/CompetitionDetailsDataReciever";
import { getCompetitionBySlug } from "@/lib/competition";
import { redirect } from "next/dist/client/components/navigation";
interface ProblemPageProps {
  params: Promise<{
    slug: string;
  }>;
}
export default async function BasketballPutraPage({ params }: ProblemPageProps) {
  const { slug } = await params;
  const competitionData = await getCompetitionBySlug(slug);

  if(!competitionData){
    return redirect('/not-found');
  }

  if (!competitionData) {
    return <div className="p-8 text-center">Loading...</div>;
  }


  return <CompetitionDetailsDataReciever competitionData={competitionData} />;
}