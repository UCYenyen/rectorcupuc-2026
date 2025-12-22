import React from "react";
import Image from "next/image";
import CompetitionPicker from "@/components/competition/CompetitionPicker";
import StripeBackground from "@/components/StripeBackground";
import RectorInlineTitle from "@/components/competition/RectorInlineTitle";
import BottomAsset from "@/components/competition/BottomAsset";
import CompetitionTitleHeader from "@/components/competition/CompetitionTitleHeader";

export default async function page() {
  // const competitionData = await getAllCompetitions();
  return (
    <>
      <div className='w-screen h-[10vh] md:h-[7vh]'></div>
      <div className="relative min-h-screen w-screen overflow-hidden flex flex-col justify-center items-center gap-4">
        <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] overflow-hidden"></div>
        <StripeBackground />
        <RectorInlineTitle />
        <div className="relative z-2 mb-48 flex flex-col gap-4 w-[90%] justify-center items-center border-8 border-[#AAF3D5] p-4 md:p-12 rounded-lg shadow-lg backdrop-blur-2xl bg-gradient-to-b from-[#390D62]/40 to-[#6226A4]/40">
          <CompetitionTitleHeader title="COMPETITIONS" shouldFitContent={false} />
          <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4">
            <CompetitionPicker
              title="Sports"
              src="/placeholder/sports.svg"
              alt="card"
              link="/competitions/sports"
            ></CompetitionPicker>
            <CompetitionPicker
              title="Arts"
              src="/placeholder/arts.svg"
              alt="card"
              link="/competitions/arts"
            ></CompetitionPicker>
            <CompetitionPicker
              title="Esports"
              src="/placeholder/esports.svg"
              alt="card"
              link="/competitions/esports"
            ></CompetitionPicker>
            <CompetitionPicker
              title="Learnings"
              src="/placeholder/learning.png"
              alt="card"
              link="/competitions/learnings"
            ></CompetitionPicker>
          </div>
        </div>
      </div>
    </>
  );
}
