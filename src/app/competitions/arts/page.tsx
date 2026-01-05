import CompetitionPicker from "@/components/competition/CompetitionPicker";
import StripeBackground from "@/components/StripeBackground";
import RectorInlineTitle from "@/components/competition/RectorInlineTitle";
import CompetitionTitleHeader from "@/components/competition/CompetitionTitleHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ARTS Competitions - Rector Cup 2026",
  description: "Explore the thrilling ARTS competitions at Rector Cup 2026. Join us for an unforgettable artistic experience!",
};

export default function page() {
  return (
    <>
      <div className='w-screen h-[10vh] md:h-[7vh]'></div>
      <div className="relative min-h-screen gap-4 w-screen overflow-hidden flex flex-col justify-center items-center">
        <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] overflow-hidden"></div>
        <StripeBackground />
         <RectorInlineTitle />
        <div className="relative z-2 flex flex-col mb-48 gap-4 w-[90%] justify-center items-center border-8 border-[#AAF3D5] p-4 md:p-12 rounded-lg shadow-lg backdrop-blur-2xl bg-gradient-to-b from-[#390D62]/40 to-[#6226A4]/40">
        <CompetitionTitleHeader title="ARTS" shouldFitContent={false} />
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <CompetitionPicker
              src="/competitions/hero/dance.webp"
              link="/competitions/register/dance"
              title="Dance"
              alt="rectorcupuc dance"
              className="w-full h-full aspect-square object-cover"
            />
            
            <CompetitionPicker
              src="/competitions/hero/solo-singing.webp"
              link="/competitions/register/solo-singing"
              title="Solo Singing"
              alt="rectorcupuc solo-singing"
              className="w-full h-full aspect-square object-cover"
            />
            
            <CompetitionPicker
              src="/competitions/hero/photography.webp"
              link="/competitions/register/fotografi"
              title="Photography"
              alt="rectorcupuc photography"
              className="w-full h-full aspect-square object-cover"
            />
            
            <CompetitionPicker
              src="/competitions/hero/poster.webp"
              link="/competitions/register/poster"
              title="Poster"
              alt="rectorcupuc poster"
              className="w-full h-full aspect-square object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}