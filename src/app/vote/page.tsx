import React from 'react'
import StripeBackground from '@/components/StripeBackground'
import RectorInlineTitle from '@/components/competition/RectorInlineTitle'
import CompetitionTitleHeader from '@/components/competition/CompetitionTitleHeader'
import PixelCard from '@/components/PixelCard'
import Image from 'next/image'
import { SearchIcon } from 'lucide-react'
interface CircularGalleryPageProps {
  image: string;
  text: string
}
export default function page() {
  const sampleItems: CircularGalleryPageProps[] = [
    {
      image: '/competitions/competition-overview.svg',
      text: 'Sample 1'
    },
    {
      image: '/competitions/competition-overview.svg',
      text: 'Sample 2'
    },
    {
      image: '/competitions/competition-overview.svg',
      text: 'Sample 3'
    },
    {
      image: '/competitions/competition-overview.svg',
      text: 'Sample 4'
    },
    {
      image: '/competitions/competition-overview.svg',
      text: 'Sample 1'
    },
    {
      image: '/competitions/competition-overview.svg',
      text: 'Sample 2'
    },
    {
      image: '/competitions/competition-overview.svg',
      text: 'Sample 3'
    },
    {
      image: '/competitions/competition-overview.svg',
      text: 'Sample 4'
    }
  ];
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
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center'>
              <PixelCard variant="pink" className='border-3 border-white rounded-lg relative h-[320px] max-w-[275px] flex items-stretch'>
                <div className='absolute inset-0 bg-black/40 backdrop-blur-2xl flex flex-col items-center w-full justify-between p-4 gap-4 overflow-hidden'>
                  <h2 className="text-white text-2xl font-bold text-center truncate w-full">BANANA</h2>
                  <div className="flex justify-center w-full flex-1 items-center">
                    <Image src="/uploads/1766293200616.webp" alt="Banana" width={100} height={100} className="object-center object-cover h-full w-full rounded-lg border-white max-h-[800px]" />
                  </div>
                  <button className="bg-black/40 border-white border-3 text-white font-semibold rounded-lg shadow hover:bg-purple-800 duration-200 transition-all w-full">VOTE</button>
                </div>
              </PixelCard>
              <PixelCard variant="pink" className='border-3 border-white rounded-lg relative h-[320px] max-w-[275px] flex items-stretch'>
                <div className='absolute inset-0 bg-black/40 backdrop-blur-2xl flex flex-col items-center w-full justify-between p-4 gap-4 overflow-hidden'>
                  <h2 className="text-white text-2xl font-bold text-center truncate w-full">BANANA</h2>
                  <div className="flex justify-center w-full flex-1 items-center">
                    <Image src="/uploads/1766293200616.webp" alt="Banana" width={100} height={100} className="object-center object-cover h-full w-full rounded-lg border-white max-h-[800px]" />
                  </div>
                  <button className="bg-black/40 border-white border-3 text-white font-semibold rounded-lg shadow hover:bg-purple-800 duration-200 transition-all w-full">VOTE</button>
                </div>
              </PixelCard>
              <PixelCard variant="pink" className='border-3 border-white rounded-lg relative h-[320px] max-w-[275px] flex items-stretch'>
                <div className='absolute inset-0 bg-black/40 backdrop-blur-2xl flex flex-col items-center w-full justify-between p-4 gap-4 overflow-hidden'>
                  <h2 className="text-white text-2xl font-bold text-center truncate w-full">BANANA</h2>
                  <div className="flex justify-center w-full flex-1 items-center">
                    <Image src="/uploads/1766293200616.webp" alt="Banana" width={100} height={100} className="object-center object-cover h-full w-full rounded-lg border-white max-h-[800px]" />
                  </div>
                  <button className="bg-black/40 border-white border-3 text-white font-semibold rounded-lg shadow hover:bg-purple-800 duration-200 transition-all w-full">VOTE</button>
                </div>
              </PixelCard>
              <PixelCard variant="pink" className='border-3 border-white rounded-lg relative h-[320px] max-w-[275px] flex items-stretch'>
                <div className='absolute inset-0 bg-black/40 backdrop-blur-2xl flex flex-col items-center w-full justify-between p-4 gap-4 overflow-hidden'>
                  <h2 className="text-white text-2xl font-bold text-center truncate w-full">BANANA</h2>
                  <div className="flex justify-center w-full flex-1 items-center">
                    <Image src="/uploads/1766293200616.webp" alt="Banana" width={100} height={100} className="object-center object-cover h-full w-full rounded-lg border-white max-h-[800px]" />
                  </div>
                  <button className="bg-black/40 border-white border-3 text-white font-semibold rounded-lg shadow hover:bg-purple-800 duration-200 transition-all w-full">VOTE</button>
                </div>
              </PixelCard>
              <PixelCard variant="pink" className='border-3 border-white rounded-lg relative h-[320px] max-w-[275px] flex items-stretch'>
                <div className='absolute inset-0 bg-black/40 backdrop-blur-2xl flex flex-col items-center w-full justify-between p-4 gap-4 overflow-hidden'>
                  <h2 className="text-white text-2xl font-bold text-center truncate w-full">BANANA</h2>
                  <div className="flex justify-center w-full flex-1 items-center">
                    <Image src="/uploads/1766293200616.webp" alt="Banana" width={100} height={100} className="object-center object-cover h-full w-full rounded-lg border-white max-h-[800px]" />
                  </div>
                  <button className="bg-black/40 border-white border-3 text-white font-semibold rounded-lg shadow hover:bg-purple-800 duration-200 transition-all w-full">VOTE</button>
                </div>
              </PixelCard>
              <PixelCard variant="pink" className='border-3 border-white rounded-lg relative h-[320px] max-w-[275px] flex items-stretch'>
                <div className='absolute inset-0 bg-black/40 backdrop-blur-2xl flex flex-col items-center w-full justify-between p-4 gap-4 overflow-hidden'>
                  <h2 className="text-white text-2xl font-bold text-center truncate w-full">BANANA</h2>
                  <div className="flex justify-center w-full flex-1 items-center">
                    <Image src="/uploads/1766293200616.webp" alt="Banana" width={100} height={100} className="object-center object-cover h-full w-full rounded-lg border-white max-h-[800px]" />
                  </div>
                  <button className="bg-black/40 border-white border-3 text-white font-semibold rounded-lg shadow hover:bg-purple-800 duration-200 transition-all w-full">VOTE</button>
                </div>
              </PixelCard>
              <PixelCard variant="pink" className='border-3 border-white rounded-lg relative h-[320px] max-w-[275px] flex items-stretch'>
                <div className='absolute inset-0 bg-black/40 backdrop-blur-2xl flex flex-col items-center w-full justify-between p-4 gap-4 overflow-hidden'>
                  <h2 className="text-white text-2xl font-bold text-center truncate w-full">BANANA</h2>
                  <div className="flex justify-center w-full flex-1 items-center">
                    <Image src="/uploads/1766293200616.webp" alt="Banana" width={100} height={100} className="object-center object-cover h-full w-full rounded-lg border-white max-h-[800px]" />
                  </div>
                  <button className="bg-black/40 border-white border-3 text-white font-semibold rounded-lg shadow hover:bg-purple-800 duration-200 transition-all w-full">VOTE</button>
                </div>
              </PixelCard>
              <PixelCard variant="pink" className='border-3 border-white rounded-lg relative h-[320px] max-w-[275px] flex items-stretch'>
                <div className='absolute inset-0 bg-black/40 backdrop-blur-2xl flex flex-col items-center w-full justify-between p-4 gap-4 overflow-hidden'>
                  <h2 className="text-white text-2xl font-bold text-center truncate w-full">BANANA</h2>
                  <div className="flex justify-center w-full flex-1 items-center">
                    <Image src="/uploads/1766293200616.webp" alt="Banana" width={100} height={100} className="object-center object-cover h-full w-full rounded-lg border-white max-h-[800px]" />
                  </div>
                  <button className="bg-black/40 border-white border-3 text-white font-semibold rounded-lg shadow hover:bg-purple-800 duration-200 transition-all w-full">VOTE</button>
                </div>
              </PixelCard>
              <PixelCard variant="pink" className='border-3 border-white rounded-lg relative h-[320px] max-w-[275px] flex items-stretch'>
                <div className='absolute inset-0 bg-black/40 backdrop-blur-2xl flex flex-col items-center w-full justify-between p-4 gap-4 overflow-hidden'>
                  <h2 className="text-white text-2xl font-bold text-center truncate w-full">BANANA</h2>
                  <div className="flex justify-center w-full flex-1 items-center">
                    <Image src="/uploads/1766293200616.webp" alt="Banana" width={100} height={100} className="object-center object-cover h-full w-full rounded-lg border-white max-h-[800px]" />
                  </div>
                  <button className="bg-black/40 border-white border-3 text-white font-semibold rounded-lg shadow hover:bg-purple-800 duration-200 transition-all w-full">VOTE</button>
                </div>
              </PixelCard>
              <PixelCard variant="pink" className='border-3 border-white rounded-lg relative h-[320px] max-w-[275px] flex items-stretch'>
                <div className='absolute inset-0 bg-black/40 backdrop-blur-2xl flex flex-col items-center w-full justify-between p-4 gap-4 overflow-hidden'>
                  <h2 className="text-white text-2xl font-bold text-center truncate w-full">BANANA</h2>
                  <div className="flex justify-center w-full flex-1 items-center">
                    <Image src="/uploads/1766293200616.webp" alt="Banana" width={100} height={100} className="object-center object-cover h-full w-full rounded-lg border-white max-h-[800px]" />
                  </div>
                  <button className="bg-black/40 border-white border-3 text-white font-semibold rounded-lg shadow hover:bg-purple-800 duration-200 transition-all w-full">VOTE</button>
                </div>
              </PixelCard>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
