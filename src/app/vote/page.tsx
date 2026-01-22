import React from 'react'
import StripeBackground from '@/components/StripeBackground'
import RectorInlineTitle from '@/components/competition/RectorInlineTitle'
import VoteCard from '@/components/VoteCard'
import { SearchIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import prisma from '@/lib/prisma'
import Link from 'next/link'

interface VotePageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function page({ searchParams }: VotePageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const ITEMS_PER_PAGE = 8;

  const users = await prisma.competitionRegistration.findMany({
    where:{
      registration_status:'Registered'
    },
    include:{
      user:true
    }
  }).then(async (registrations) => {
    const teamMembers = await prisma.teamMember.findMany({
      include:{
        user:true
      },
      where:{
        join_request_status: 'Registered'
      }
    })
    
    const registrationUsers = registrations.map(item=>({
      name: item.user.name || 'No Name',
      imageSrc: item.profile_url || '/placeholder/no-image.svg'
    }))
    
    const teamUsers = teamMembers.map(item=>({
      name: item.user.name || 'No Name',
      imageSrc: item.profile_url || '/placeholder/no-image.svg'
    }))
    
    return [...registrationUsers, ...teamUsers]
  })

  // Pagination logic
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedUsers = users.slice(startIndex, endIndex);

  return (
    <>
      <div className='w-screen h-[10vh] md:h-[7vh]'></div>
      <div className="relative min-h-screen gap-4 w-screen overflow-hidden flex flex-col justify-center items-center">
        <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] overflow-hidden"></div>
        <StripeBackground />
        <RectorInlineTitle />
        <div className="relative z-2 mb-48 flex flex-col gap-4 w-[90%] justify-center items-center border-8 border-[#AAF3D5] p-8 md:p-12 rounded-lg shadow-lg backdrop-blur-2xl bg-gradient-to-b from-[#390D62]/40 to-[#6226A4]/40">
          <div className="w-full flex justify-center mt-4">
            <input
              type="text"
              placeholder="Cari peserta..."
              className="w-full px-4 py-2 rounded-lg border-2 border-white focus:outline-none focus:ring-white bg-black/40 text-white placeholder-gray-500"
            />
            <button className="ml-2 p-2 bg-black/40 backdrop-blur-2xl rounded-lg border-3 border-white hover:scale-105 transition-transform duration-200">
              <SearchIcon className="text-white w-6 h-6" />
            </button>
          </div>
          <div className='relative w-full'>
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 justify-items-center'>
              {paginatedUsers.map((item, index) => (
                <VoteCard key={index} name={item.name} imageSrc={item.imageSrc} />
              ))}
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="w-full flex justify-center md:justify-end items-center gap-4 mt-8">
            <Link
              href={currentPage > 1 ? `?page=${currentPage - 1}` : '#'}
              className={`px-4 py-2 bg-black/40 border-white border-3 rounded-lg font-bold text-white flex items-center gap-2 transition-all ${
                currentPage === 1 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-purple-800 hover:scale-105'
              }`}
              aria-disabled={currentPage === 1}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </Link>

            <Link
              href={currentPage < totalPages ? `?page=${currentPage + 1}` : '#'}
              className={`px-4 py-2 bg-black/40 border-white border-3 rounded-lg font-bold text-white flex items-center gap-2 transition-all ${
                currentPage === totalPages 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-purple-800 hover:scale-105'
              }`}
              aria-disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
