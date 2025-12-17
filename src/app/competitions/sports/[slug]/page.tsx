"use client";
import React, { useState } from "react";
import Image from "next/image";
import TabButton from "@/components/competition/TabButton";
import CompetitionDetails from "@/components/competition/CompetitionDetails";
import CompetitionRules from "@/components/competition/CompetitionRules";
import PacmanAnimation from "@/components/competition/PacmanAnimation";
import Brackets from "@/components/competition/Brackets";
import Schedule from "@/components/competition/Schedule";
import LiveScore from "@/components/competition/LiveScore";

export default function BasketballPutraPage() {
  const [activeTab, setActiveTab] = useState<
    "details" | "brackets" | "schedule" | "live"
  >("details");

  const competitionData = {
    participants: "8 teams maximum per category",
    format: "Single elimination tournament",
    venue: "UC Sports Hall, Main Court",
    prizePool:
      "1st Place: Rp 10.000.000 | 2nd Place: Rp 5.000.000 | 3rd Place: Rp 2.500.000",
  };

  const rules = [
    "Each team must consist of 5-10 members",
    "All participants must be registered students",
    "Match duration: 4 quarters x 10 minutes",
    "Follow FIBA basketball rules",
    "Team must arrive 30 minutes before match time",
  ];

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
        <Image
          src={"/competitions/filler-asset-competition.webp"}
          width={1000}
          height={1000}
          alt="background"
          className="w-full h-full object-center object-cover opacity-50 z-2 absolute"
        />
        
        <div className="relative mt-[15%] sm:mt-[5%] z-2 w-[95%] max-w-7xl backdrop-blur-2xl bg-gradient-to-b from-[#390D62]/40 to-[#6226A4]/40 border-2 sm:border-4 border-[#AAF3D5] rounded-xl sm:rounded-2xl p-3 sm:p-6 flex flex-col items-center gap-3 sm:gap-6">
          {/* Header */}
          <Image
            src={"/logos/rector-title.svg"}
            width={600}
            height={600}
            alt="Rectorcupuc Title"
            className="absolute w-1/3 sm:w-1/4 h-auto -top-[3rem] sm:-top-[5rem]"
          />
          <div className="w-full bg-gradient-to-r from-[#6427A8] to-[#EB79F0] px-4 sm:px-8 py-2 sm:py-3 rounded-lg border-2 sm:border-4 border-[#AAF3D5]">
            <h1 className="text-lg sm:text-2xl md:text-3xl text-center w-full font-bold text-white uppercase">
              Basketball - Putra
            </h1>
          </div>

          {/* Main Content Container */}
          <div className="w-full overflow-hidden backdrop-blur-2xl bg-gradient-to-b from-[#390D62]/40 to-[#6226A4]/40 rounded-lg">
            {/* Competition Overview Banner */}
            <div className="flex flex-col md:flex-row justify-center items-center h-fit w-full gap-2 sm:gap-4 p-2 sm:p-4">
              <div className="w-full md:w-1/2">
                <Image
                  src="/competitions/competition-overview.svg"
                  alt="rectorcupuc competition overview"
                  width={800}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              <div className="bg-[#3C1971] h-32 sm:h-48 md:h-full w-full md:w-1/2 border border-[#AAF3D5] sm:border-2 rounded-lg p-2 sm:p-4">
                <PacmanAnimation />
              </div>
            </div>

            {/* Tab Navigation - Scrollable on mobile */}
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

            {/* Content Area - Conditional Rendering Based on Active Tab */}
            <div className="min-h-[400px]">
              {activeTab === "details" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4 p-2 sm:p-4">
                  <CompetitionDetails
                    participants={competitionData.participants}
                    format={competitionData.format}
                    venue={competitionData.venue}
                    prizePool={competitionData.prizePool}
                  />
                  <CompetitionRules rules={rules} />
                </div>
              )}

              {activeTab === "brackets" && (
                <Brackets competitionId="basketball-putra" />
              )}

              {activeTab === "schedule" && (
                <Schedule competitionId="basketball-putra" />
              )}

              {activeTab === "live" && (
                <LiveScore competitionId="basketball-putra" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}