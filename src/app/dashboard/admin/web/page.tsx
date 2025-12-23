import React from 'react'
import Link from 'next/link'
import StripeBackground from '@/components/StripeBackground';
import CompetitionTitleHeader from '@/components/competition/CompetitionTitleHeader';
export default function page() {
  return (
    <>
      <div className="relative min-h-screen bg-[url('/home/background.svg')] w-screen overflow-hidden flex flex-col justify-center items-center">
        <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] overflow-hidden"></div>
        <StripeBackground />
        <div className="relative z-2 flex flex-col gap-4 justify-center items-center border-8 border-[#AAF3D5] p-4 md:p-12 rounded-lg shadow-lg backdrop-blur-2xl bg-gradient-to-b from-[#390D62]/40 to-[#6226A4]/40">
          <CompetitionTitleHeader title="💀 PDD WEBSITE 💀" shouldFitContent={false} />
          <Link href={"/dashboard/admin/web/user"} className='bg-black/30 px-4 py-2 text-white rounded-lg text-center border-white border-4 w-full hover:bg-purple-900 uppercase text-2xl font-bold'>Manage Users</Link>
          <Link href={"/dashboard/admin/web/competitions"} className='bg-black/30 px-4 py-2 text-white rounded-lg text-center border-white border-4 w-full hover:bg-purple-900 uppercase text-2xl font-bold'>Manage Competitions</Link>
        </div>
      </div>
    </>
  )
}
