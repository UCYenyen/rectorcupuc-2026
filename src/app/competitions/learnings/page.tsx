import CompetitionPicker from "@/components/competition/CompetitionPicker";
import StripeBackground from "@/components/StripeBackground";
import RectorInlineTitle from "@/components/competition/RectorInlineTitle";
import CompetitionTitleHeader from "@/components/competition/CompetitionTitleHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learning Competitions - Rector Cup 2026",
  description: "Explore the thrilling Learning competitions at Rector Cup 2026. Join us for an unforgettable experience!",
};

export default function page() {
  return (
    <>
      <div className='w-screen h-[10vh] md:h-[7vh]'></div>
      <div className="relative min-h-screen w-screen overflow-hidden flex flex-col justify-center items-center gap-4">
        <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] overflow-hidden"></div>
        <StripeBackground />
        <RectorInlineTitle />
        <div className="relative z-2 flex flex-col gap-4 w-[90%] mb-48 justify-center items-center border-8 border-[#AAF3D5] p-4 md:p-12 rounded-lg shadow-lg backdrop-blur-2xl bg-gradient-to-b from-[#390D62]/40 to-[#6226A4]/40">
          <CompetitionTitleHeader title="E-SPORTS" shouldFitContent={false} />
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <CompetitionPicker
              src="/competitions/hero/cerdas-cermat.webp"
              alt="rectorcupuc cerdas cermat"
              title="Cerdas Cermat"
              link="/competitions/learnings/cerdas-cermat"
            ></CompetitionPicker>
            <CompetitionPicker
              src="/competitions/hero/catur.webp"
              alt="rectorcupuc catur"
              title="Catur"
              link="/competitions/learnings/catur"
            ></CompetitionPicker>
          </div>
        </div>
      </div>
    </>
  );
}
