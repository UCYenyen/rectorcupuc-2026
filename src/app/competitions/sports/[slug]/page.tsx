import CompetitionDetailsDataReciever from "@/components/competition/CompetitionDetailsDataReciever";
import { getCompetitionBySlug } from "@/lib/competition";
interface ProblemPageProps {
  params: Promise<{
    slug: string;
  }>;
}
export default async function BasketballPutraPage({ params }: ProblemPageProps) {
  const { slug } = await params;
  const competitionData = await getCompetitionBySlug(slug);

  if ("error" in competitionData) {
    return <div className="p-8 text-center">Competition not found.</div>;
  }

  if (!competitionData) {
    return <div className="p-8 text-center">Loading...</div>;
  }


  return <CompetitionDetailsDataReciever competitionData={competitionData} />;
}