import React from "react";
import Image from "next/image";
import CompetitionPicker from "@/components/competition/CompetitionPicker";
// import { getAllCompetitions } from '@/lib/competition'
// import CompetitionContainer from '@/components/competition/CompetitionContainer';

export default async function page() {
  // const competitionData = await getAllCompetitions();
  return (
    <>
      <div className="h-[7vh]"></div>
      <div className="relative min-h-screen bg-[url('/home/background.svg')] w-screen overflow-hidden flex flex-col justify-center items-center">
        <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] overflow-hidden"></div>
        <Image
          src={"/home/background.svg"}
          width={1000}
          height={1000}
          alt="rectorcupuc background"
          className="w-full h-full object-center object-cover opacity-25 z-1 absolute"
        ></Image>
        <div className="relative z-2 mt-[10%] sm:mt-0 flex flex-col gap-2 w-[90%] justify-center items-center border-4 border-[#AAF3D5] p-4 rounded-lg shadow-lg backdrop-blur-2xl bg-gradient-to-b from-[#390D62]/40 to-[#6226A4]/40">
          <Image
            src={"/logos/rector-title.svg"}
            width={600}
            height={600}
            alt="Rectorcupuc Title"
            className="absolute w-1/4 h-auto -top-[6rem]"
          ></Image>
          <Image
            src={"/competitions/filler-asset-competition.webp"}
            width={1000}
            height={1000}
            alt="background"
            className="w-full h-full object-center object-cover opacity-50 z-2 absolute"
          />
          <div className="w-full border-4 border-[#AAF3D5] rounded-2xl py-2 bg-gradient-to-r from-[#6427A8] to-[#EB79F0] flex justify-center items-center">
            <h1 className="text-2xl">COMPETITIONS</h1>
          </div>
          <div className="hidden md:grid xl:hidden grid-cols-2 gap-2 w-full">
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
            ></CompetitionPicker>
            <CompetitionPicker
              src="/placeholder/basketball-putra.jpeg"
              link="/competitions/sports/basketball-putra"
              title="Basketball Putra"
              alt="card"
            ></CompetitionPicker>
          </div>
          <div className="grid grid-cols-1 sm:hidden sm:grid-cols-2 xl:grid xl:grid-cols-3 w-full gap-2">
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
            ></CompetitionPicker>
            <CompetitionPicker
              src="/placeholder/basketball-putra.jpeg"
              link="/competitions/sports/basketball-putra"
              title="Basketball Putra"
              alt="card"
            ></CompetitionPicker>
          </div>
          <div className="grid grid-cols-1 sm:hidden sm:grid-cols-4 xl:grid gap-2">
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
            ></CompetitionPicker>
          </div>
        </div>
        {/* <div className="w-full max-w-5xl">
        <CompetitionContainer items={competitionData} />
      </div> */}
      </div>
    </>
  );
}
