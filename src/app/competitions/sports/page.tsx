import React from "react";
import Image from "next/image";
import CompetitionPicker from "@/components/competition/CompetitionPicker";
import StripeBackground from "@/components/StripeBackground";
import RectorInlineTitle from "@/components/competition/RectorInlineTitle";
import BottomAsset from "@/components/competition/BottomAsset";
import CompetitionTitleHeader from "@/components/competition/CompetitionTitleHeader";

export default async function page() {
  return (
    <>
      <div className="h-[7vh]"></div>
      <div className="relative min-h-screen bg-[url('/home/background.svg')] w-screen overflow-hidden flex flex-col justify-center items-center">
        <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] overflow-hidden"></div>
        <StripeBackground />
        <div className="relative z-2 my-[10rem] md:my-[10%] flex flex-col gap-4 w-[90%] justify-center items-center border-2 sm:border-4 border-[#AAF3D5] p-12 rounded-lg shadow-lg backdrop-blur-2xl bg-gradient-to-b from-[#390D62]/40 to-[#6226A4]/40">
          <RectorInlineTitle />
         <CompetitionTitleHeader title="COMPETITIONS" />
          
          <div className="w-full grid grid-cols-1 md:grid-cols-6 md:grid-rows-7 gap-4">
            <CompetitionPicker
              src="/placeholder/basketball-putra.jpeg"
              link="/competitions/sports/basketball"
              title="Basketball"
              alt="rectorcup"
              className="w-full md:col-start-1 md:row-start-1 md:col-span-4 md:row-span-2 min-h-[150px]"
            />
            
            <CompetitionPicker
              src="/placeholder/basketball-putra.jpeg"
              link="/competitions/sports/basketball-putri"
              title="Basketball Putri"
              alt="rectorcup"
              className="w-full md:col-start-5 md:row-start-1 md:col-span-2 md:row-span-2 min-h-[150px]"
            />
            
            <CompetitionPicker
              src="/placeholder/basketball-putra.jpeg"
              link="/competitions/sports/futsal"
              title="Futsal"
              alt="rectorcup"
              className="w-full md:col-start-1 md:row-start-3 md:col-span-2 md:row-span-3 min-h-[150px]"
            />
            
            <CompetitionPicker
              src="/placeholder/basketball-putra.jpeg"
              link="/competitions/sports/billiard"
              title="Billiard"
              alt="rectorcup"
              className="w-full md:col-start-3 md:row-start-3 md:col-span-2 md:row-span-2 min-h-[150px]"
            />
            
            <CompetitionPicker
              src="/placeholder/basketball-putra.jpeg"
              link="/competitions/sports/badminton"
              title="Badminton"
              alt="rectorcup"
              className="w-full md:col-start-5 md:row-start-3 md:col-span-2 md:row-span-5 min-h-[150px]"
            />
            
            <CompetitionPicker
              src="/placeholder/basketball-putra.jpeg"
              link="/competitions/sports/ping-pong"
              title="Ping Pong"
              alt="rectorcup"
              className="w-full md:col-start-3 md:row-start-5 md:col-span-2 md:row-span-3 min-h-[150px]"
            />
            
            <CompetitionPicker
              src="/placeholder/basketball-putra.jpeg"
              link="/competitions/sports/taekwondo"
              title="Taekwondo"
              alt="rectorcup"
              className="w-full md:col-start-1 md:row-start-6 md:col-span-2 md:row-span-2 min-h-[150px]"
            />
          </div>
        </div>
        <BottomAsset/>
      </div>
    </>
  );
}