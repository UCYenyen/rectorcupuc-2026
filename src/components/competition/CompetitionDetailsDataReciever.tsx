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
import StripeBackground from "@/components/StripeBackground";
import RectorInlineTitle from "./RectorInlineTitle";

export default function CompetitionDetailsDataReciever({ competitionData }: { competitionData: CompetitionContainerProps }) {
  const [activeTab, setActiveTab] = useState<
    "details" | "brackets" | "schedule" | "live"
  >("details");

  return (
    <>
      <div className="h-[7vh]"></div>
      <div className="relative min-h-screen w-screen overflow-hidden flex flex-col justify-center items-center py-4 sm:py-8">
        <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1]"></div>
        <StripeBackground />
        <div className="relative z-2 my-[7.5rem] md:my-[10%] flex flex-col gap-4 w-[90%] justify-center items-center border-8 border-[#AAF3D5] p-4 md:p-12 rounded-lg shadow-lg backdrop-blur-2xl bg-gradient-to-b from-[#390D62]/40 to-[#6226A4]/40">
          <RectorInlineTitle />
          <div className="w-full bg-gradient-to-r from-[#6427A8] to-[#EB79F0] px-4 sm:px-8 py-2 sm:py-3 rounded-lg border-2 sm:border-4 border-[#AAF3D5]">
            <h1 className="text-lg sm:text-2xl md:text-3xl text-center w-full font-bold text-white uppercase">
              {competitionData.name}
            </h1>
          </div>

          <div className="w-full overflow-hidden flex flex-col gap-4 backdrop-blur-2xl bg-gradient-to-b from-[#390D62]/40 to-[#6226A4]/40 rounded-lg">
            <div className="hidden md:flex gap-4">
              <div className="flex basis-1/2 flex-col gap-2">
                <Image
                  src={"/competitions/competition-overview.svg"}
                  alt={`${competitionData.name} Image`}
                  width={500}
                  height={300}
                  className="w-full h-auto"
                />
                <div className="flex gap-1 sm:gap-2 border-b-2 border-white/20 overflow-x-auto w-full">
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
              </div>
              <div className="bg-black/40 flex basis-1/2 backdrop-blur-2xl border-3 border-white rounded-lg w-full">
                <PacmanAnimation />
              </div>
            </div>
            <div className="flex md:hidden flex-col gap-4">
              <Image
                src={"/competitions/competition-overview.svg"}
                alt={`${competitionData.name} Image`}
                width={500}
                height={300}
                className="w-full h-auto"
              />
              <div className="flex gap-1 sm:gap-2 border-b-2 border-white/20 overflow-x-auto w-full">
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
            </div>
            <div className="min-h-[400px]">
              {activeTab === "details" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4">
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