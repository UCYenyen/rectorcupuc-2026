import React from "react";
import StripeBackground from "@/components/StripeBackground";
import RectorInlineTitle from "@/components/competition/RectorInlineTitle";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function page() {
  const allCompetitions = await prisma.competition.findMany();
  return (
    <>
      <div className='w-screen h-[10vh] md:h-[7vh]'></div>
      <div className="relative min-h-screen bg-[url('/home/background.svg')] w-screen flex flex-col justify-center items-center">
        <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] overflow-hidden"></div>
        <StripeBackground />
        <div className="relative z-[2] my-[7.5rem] md:my-[5%] flex flex-col gap-4 w-[90%] max-w-6xl justify-center items-center border-8 border-[#AAF3D5] p-4 md:p-12 rounded-lg shadow-lg backdrop-blur-2xl bg-gradient-to-b from-[#390D62]/40 to-[#6226A4]/40">
          <RectorInlineTitle />
          <div className="w-full max-h-[25rem] overflow-y-auto flex flex-col gap-4 p-2 custom-scrollbar">
            {allCompetitions.map((competition) => (
              <div key={competition.id} className="w-full flex flex-col md:flex-row justify-between items-center border-4 border-[#AAF3D5] rounded-lg p-6 bg-white/10 backdrop-blur-md shrink-0">
                <div className="text-2xl font-semibold text-white mb-4 md:mb-0">{competition.name}</div>  
                <div className="flex gap-4 text-white font-bold">
                  <Link
                    href={`/dashboard/admin/web/competitions/match/${competition.id}/create`}
                    className="px-4 py-2 bg-black/40 border-white border-2 rounded-lg hover:bg-purple-800 transition-all"
                  >
                    CREATE MATCHES
                  </Link>
                  <Link 
                    href={`/dashboard/admin/web/competitions/match/${competition.id}/manage`}
                    className="px-4 py-2 bg-black/40 border-white border-2 rounded-lg hover:bg-purple-800 transition-all"
                  >
                    MANAGE MATCHES
                  </Link>
                </div>
              </div>
            ))} 
          </div>
        </div>
      </div>
    </>
  );
}