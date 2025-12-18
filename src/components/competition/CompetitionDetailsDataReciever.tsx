'use client'
import React, { useState } from "react";
import Image from "next/image";
import TabButton from "@/components/competition/TabButton";
import CompetitionDetails from "@/components/competition/CompetitionDetails";
import CompetitionRules from "@/components/competition/CompetitionRules";
import PacmanAnimation from "@/components/competition/PacmanAnimation";
import Brackets from "@/components/competition/Brackets";
import Schedule from "@/components/competition/Schedule";
import LiveScore from "@/components/competition/LiveScore";
import { CompetitionContainerProps } from "@/types/competition.md";

export default function CompetitionDetailsDataReciever({competitionData}: {competitionData: CompetitionContainerProps}) {
  const [activeTab, setActiveTab] = useState<
    "details" | "brackets" | "schedule" | "live"
  >("details");

  return (
    <>
      <div className="h-[7vh]"></div>
      <div className="relative min-h-screen bg-[url('/home/background.svg')] w-screen overflow-hidden flex flex-col justify-center items-center py-4 sm:py-8">
        <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1]"></div>
        <Image
          src={"/home/background.svg"}
          width={1000}
          height={1000}
          alt="background"
          className="w-full h-full object-center object-cover opacity-25 z-1 absolute"
        />
        
        <div className="relative mt-[15%] sm:mt-[5%] z-2 w-[95%] max-w-7xl backdrop-blur-2xl bg-gradient-to-b from-[#390D62]/40 to-[#6226A4]/40 border-2 sm:border-4 border-[#AAF3D5] rounded-xl sm:rounded-2xl p-3 sm:p-6 flex flex-col items-center gap-3 sm:gap-6">
          <Image
            src={"/logos/rector-title.svg"}
            width={600}
            height={600}
            alt="Rectorcupuc Title"
            className="absolute w-1/3 sm:w-1/4 h-auto -top-[3rem] sm:-top-[5rem]"
          />
          <div className="w-full bg-gradient-to-r from-[#6427A8] to-[#EB79F0] px-4 sm:px-8 py-2 sm:py-3 rounded-lg border-2 sm:border-4 border-[#AAF3D5]">
            <h1 className="text-lg sm:text-2xl md:text-3xl text-center w-full font-bold text-white uppercase">
              {competitionData.name}
            </h1>
          </div>

          <div className="w-full overflow-hidden backdrop-blur-2xl bg-gradient-to-b from-[#390D62]/40 to-[#6226A4]/40 rounded-lg">
            <div className="flex gap-1 sm:gap-2 border-b-2 border-white/20 overflow-x-auto px-2 sm:px-4">
              <TabButton
                label="Details"
                isActive={activeTab === "details"}
                onClick={() => setActiveTab("details")}
              />
              <TabButton
                label="Brackets"
                isActive={activeTab === "brackets"}
                onClick={() => setActiveTab("brackets")}
              />
              <TabButton
                label="Schedule"
                isActive={activeTab === "schedule"}
                onClick={() => setActiveTab("schedule")}
              />
              <TabButton
                label="Live Score"
                isActive={activeTab === "live"}
                onClick={() => setActiveTab("live")}
              />
            </div>

            <div className="min-h-[400px]">
              {activeTab === "details" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4 p-2 sm:p-4">
                  <CompetitionDetails
                    location={competitionData.location}
                  />
                  <CompetitionRules
                    rules={competitionData.rules || undefined}
                    slug={competitionData.slug}
                  />
                </div>
              )}

              {activeTab === "brackets" && (
                <Brackets competitionId={competitionData.id} />
              )}
              
              {activeTab === "schedule" && competitionData.matches && (
                <Schedule 
                  matches={competitionData.matches} 
                  teams={competitionData.teams!!} 
                />
              )}

              {activeTab === "live" && (
                <LiveScore competitionId={competitionData.id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}