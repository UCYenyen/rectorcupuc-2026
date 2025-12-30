
import Link from 'next/link'
import CompetitionTitleHeader from '@/components/competition/CompetitionTitleHeader';
import StripeBackground from '@/components/StripeBackground';

export default function page() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#390D62] to-[#6226A4] flex items-center justify-center p-4">
      <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] overflow-hidden"></div>
      <StripeBackground />
      <div className="relative z-2 flex flex-col gap-4 justify-center items-center border-8 border-[#AAF3D5] p-4 md:p-12 rounded-lg shadow-lg backdrop-blur-2xl bg-gradient-to-b from-[#390D62]/40 to-[#6226A4]/40">
        <CompetitionTitleHeader title="ADMIN LO" shouldFitContent={false} />
        <div className="w-full gap-4 text-white font-bold text-2xl flex-col flex">
          <Link href={"/dashboard/admin/lo/registration"} rel='manage registrations' className='bg-black/40 border-white border-3 rounded-lg px-4 py-2 text-center hover:bg-purple-800'>Team Registrations</Link>
          <Link href={"/dashboard/admin/lo/join-req"} rel='manage join requests' className='bg-black/40 border-white border-3 rounded-lg px-4 py-2 text-center hover:bg-purple-800'>Team Join Requests</Link>
        </div>
      </div>
    </div>
  )
}
