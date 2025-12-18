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
  return <CompetitionDetailsDataReciever competitionData={competitionData} />;
}