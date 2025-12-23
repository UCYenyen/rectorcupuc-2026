import React from "react";
import Image from "next/image";
import CompetitionPicker from "@/components/competition/CompetitionPicker";
import StripeBackground from "@/components/StripeBackground";
import RectorInlineTitle from "@/components/competition/RectorInlineTitle";
import CompetitionTitleHeader from "@/components/competition/CompetitionTitleHeader";

export default async function page() {
  return (
    <>
      <div className='w-screen h-[10vh] md:h-[7vh]'></div>
      <div className="relative min-h-screen w-screen overflow-hidden flex flex-col justify-center items-center gap-4">
        <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] overflow-hidden"></div>
        <StripeBackground />
        <RectorInlineTitle />
        <div className="relative z-2 flex flex-col gap-4 w-[90%] mb-48 justify-center items-center border-8 border-[#AAF3D5] p-4 md:p-12 rounded-lg shadow-lg backdrop-blur-2xl bg-gradient-to-b from-[#390D62]/40 to-[#6226A4]/40">
          <CompetitionTitleHeader title="E-SPORTS" shouldFitContent={false} />
          <div className="w-full grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-3 md:h-[70vh]">
            <CompetitionPicker
              src="/competitions/hero/fifa-2v2.webp"
              link="/competitions/esports"
              title="Fifa 2v2"
              alt="rectorcupuc fifa-2v2"
              className="w-full h-full md:row-start-1 md:col-start-1 md:col-end-5"
            />
            
            <CompetitionPicker
              src="/competitions/hero/mobile-legends.webp"
              link="/competitions/esports"
              title="Mobile Legends"
              alt="rectorcupuc mobile-legends"
              className="w-full h-full md:row-start-2 md:row-end-4 md:col-start-1 md:col-end-3"
            />
            
            <CompetitionPicker
              src="/competitions/hero/pubg.webp"
              link="/competitions/esports"
              title="PUBG"
              alt="rectorcupuc pubg"
              className="w-full h-full md:row-start-2 md:row-end-4 md:col-start-3 md:col-end-5"
            />
          </div>
        </div>
      </div>
    </>
  );
}