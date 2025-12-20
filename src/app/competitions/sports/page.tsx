import React from "react";
import Image from "next/image";
import CompetitionPicker from "@/components/competition/CompetitionPicker";
import StripeBackground from "@/components/StripeBackground";
import RectorInlineTitle from "@/components/competition/RectorInlineTitle";
import BottomAsset from "@/components/competition/BottomAsset";
export default async function page() {
  return (
    <>
      <div className="h-[7vh]"></div>
      <div className="relative min-h-screen bg-[url('/home/background.svg')] w-screen overflow-hidden flex flex-col justify-center items-center">
        <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] overflow-hidden"></div>
        <StripeBackground />
        <div className="relative z-2 my-[10rem] md:my-[10%] flex flex-col gap-4 w-[90%] justify-center items-center border-2 sm:border-4 border-[#AAF3D5] p-12 rounded-lg shadow-lg backdrop-blur-2xl bg-gradient-to-b from-[#390D62]/40 to-[#6226A4]/40">
          <RectorInlineTitle />
          <div className="w-full border-2 sm:border-4 border-[#AAF3D5] rounded-2xl py-2 bg-gradient-to-r from-[#6427A8] to-[#EB79F0] flex justify-center items-center">
            <h1 className="text-2xl">COMPETITIONS</h1>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            <CompetitionPicker
              src="/placeholder/basketball-putra.jpeg"
              link="/competitions/sports/basketball-putra"
              title="Basketball Putra"
              alt="card"
              className="md:col-span-2 md:row-span-1"
            ></CompetitionPicker>
            <CompetitionPicker
              src="/placeholder/basketball-putra.jpeg"
              link="/competitions/sports/basketball-putra"
              title="Basketball Putra"
              alt="card"
              className=""
            ></CompetitionPicker>
            <CompetitionPicker
              src="/placeholder/basketball-putra.jpeg"
              link="/competitions/sports/basketball-putra"
              title="Basketball Putra"
              alt="card"
              className="md:row-span-2"
            ></CompetitionPicker>
            <CompetitionPicker
              src="/placeholder/basketball-putra.jpeg"
              link="/competitions/sports/basketball-putra"
              title="Basketball Putra"
              alt="card"
              className="md:col-span-2"
            ></CompetitionPicker>
            <CompetitionPicker
              src="/placeholder/basketball-putra.jpeg"
              link="/competitions/sports/basketball-putra"
              title="Basketball Putra"
              alt="card"
            ></CompetitionPicker>
            <CompetitionPicker
              src="/placeholder/basketball-putra.jpeg"
              link="/competitions/sports/basketball-putra"
              title="Basketball Putra"
              alt="card"
              className=""
            ></CompetitionPicker>
          </div>
        </div>
        <BottomAsset/>
      </div>
    </>
  );
}
