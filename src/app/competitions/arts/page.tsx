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
      <div className="relative min-h-screen bg-[url('/home/background.svg')] w-screen overflow-hidden flex flex-col justify-center items-center">
        <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] overflow-hidden"></div>
        <StripeBackground />
        <div className="relative z-2 my-[7.5rem] md:my-[10%] flex flex-col gap-4 w-[90%] justify-center items-center border-8 border-[#AAF3D5] p-4 md:p-12 rounded-lg shadow-lg backdrop-blur-2xl bg-gradient-to-b from-[#390D62]/40 to-[#6226A4]/40">
        <RectorInlineTitle />
        <CompetitionTitleHeader title="SPORTS" shouldFitContent={false} />
          <div className="w-full grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-3 md:h-[70vh]">
            <CompetitionPicker
              src="/competitions/hero/dance.webp"
              link="/competitions/arts"
              title="Dance"
              alt="rectorcupuc dance"
              className="w-full h-full md:row-start-1 md:col-start-1"
            />

            <CompetitionPicker
              src="/competitions/hero/solo-singing.webp"
              link="/competitions/arts"
              title="Solo Singing"
              alt="rectorcupuc solo-singing"
              className="w-full h-full md:row-start-1 md:col-start-2"
            />

            <CompetitionPicker
              src="/competitions/hero/duet-singing.webp"
              link="/competitions/arts"
              title="Duet Singing"
              alt="rectorcupuc duet-singing"
              className="w-full h-full md:row-start-1 md:col-start-3"
            />

            <CompetitionPicker
              src="/competitions/hero/photography.webp"
              link="/competitions/arts"
              title="Photography"
              alt="rectorcupuc photography"
              className="w-full h-full md:row-start-2 md:col-start-1"
            />

            <CompetitionPicker
              src="/competitions/hero/poster.webp"
              link="/competitions/arts"
              title="Poster"
              alt="rectorcupuc poster"
              className="w-full h-full md:row-start-2 md:col-start-2"
            />

            <CompetitionPicker
              src="/competitions/hero/poetry.webp"
              link="/competitions/arts"
              title="Poetry"
              alt="rectorcupuc poetry"
              className="w-full h-full md:row-start-2 md:col-start-3"
            />
          </div>
        </div>
      </div>
    </>
  );
}