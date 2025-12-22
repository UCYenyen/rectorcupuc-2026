'use client'
import React, { useState, useTransition } from "react";
import Image from "next/image";
import TabButton from "@/components/competition/TabButton";
import PacmanAnimation from "@/components/competition/PacmanAnimation";
import AdminBrackets from "@/components/competition/Admin/BracketsAdmin";
import Schedule from "@/components/competition/Schedule";
import LiveScoreController from "@/components/competition/LiveScoreController";
import { CompetitionContainerProps } from "@/types/competition.md";
import StripeBackground from "@/components/StripeBackground";
import RectorInlineTitle from "../RectorInlineTitle";

export default function AdminCompetitionDetailsDataReciever({ competitionData, handleStatusChange }: { competitionData: CompetitionContainerProps, handleStatusChange: (matchId: string, newStatus: "ONGOING" | "COMPLETED" | "UPCOMMING") => Promise<void> }) {
  const [activeTab, setActiveTab] = useState<"brackets" | "schedule" | "live">("brackets");
  const [isPending, startTransition] = useTransition();

  const onStatusChange = async (matchId: string, newStatus: "ONGOING" | "COMPLETED" | "UPCOMMING") => {
    startTransition(async () => {
      await handleStatusChange(matchId, newStatus);
    });
  };

  return (
    <>
      <div className="h-[7vh]"></div>
      <div className={`relative min-h-screen w-screen overflow-hidden flex flex-col justify-center items-center py-4 sm:py-8 gap-4 ${isPending ? "opacity-70 cursor-wait" : ""}`}>
        <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1]"></div>
        <StripeBackground />
        <RectorInlineTitle />
        <div className="relative z-2 flex flex-col gap-4  mb-48 w-[90%] justify-center items-center border-8 border-[#AAF3D5] p-4 md:p-12 rounded-lg shadow-lg backdrop-blur-2xl bg-gradient-to-b from-[#390D62]/40 to-[#6226A4]/40">
          <div className="w-full bg-gradient-to-r from-[#6427A8] to-[#EB79F0] px-4 sm:px-8 py-2 sm:py-3 rounded-lg border-2 sm:border-4 border-[#AAF3D5]">
            <h1 className="text-lg sm:text-2xl md:text-3xl text-center w-full font-bold text-white uppercase">
              {competitionData.name}
            </h1>
          </div>

          <div className="w-full overflow-hidden flex flex-col gap-4 backdrop-blur-2xl bg-gradient-to-b from-[#390D62]/40 to-[#6226A4]/40 rounded-lg">
            <div className="hidden lg:flex gap-4">
              <div className="flex basis-1/2 flex-col gap-2">
                <Image
                  src={"/competitions/competition-overview.svg"}
                  alt={`${competitionData.name} Image`}
                  width={500}
                  height={300}
                  className="w-full h-auto"
                />
                <div className="flex gap-1 sm:gap-2 border-b-2 border-white/20 overflow-x-auto w-full">
                  <TabButton label="Brackets" isActive={activeTab === "brackets"} onClick={() => setActiveTab("brackets")} />
                  <TabButton label="Schedule" isActive={activeTab === "schedule"} onClick={() => setActiveTab("schedule")} />
                  <TabButton label="Live Score" isActive={activeTab === "live"} onClick={() => setActiveTab("live")} />
                </div>
              </div>
              <div className="bg-black/40 flex basis-1/2 backdrop-blur-2xl border-3 border-white rounded-lg w-full">
                <PacmanAnimation />
              </div>
            </div>

            {activeTab === "brackets" && competitionData.matches && (
              <AdminBrackets matches={competitionData.matches!!} handleStatusChange={onStatusChange} />
            )}
            {activeTab === "schedule" && competitionData.matches && (
              <Schedule matches={competitionData.matches} teams={competitionData.teams!!} />
            )}
            {activeTab === "live" && (
              <LiveScoreController
                competitionData={competitionData}
                slug={competitionData.slug}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}