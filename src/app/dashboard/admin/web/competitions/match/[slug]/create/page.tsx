import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getCompetitionBySlug } from '@/lib/competition'
import MatchCreatingForm from '@/components/dashboard/admin/MatchCreatingForm';


interface SlugProps {
  params: Promise<{
    slug: string;
  }>;
}


export default async function page({ params }: SlugProps) {
    const { slug } = await params;

    const competitions = await getCompetitionBySlug(slug);

    if (!competitions) {
        return (
            <div className="relative min-h-screen bg-gradient-to-b from-[#390D62] to-[#6226A4] flex items-center justify-center p-4">
                <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] overflow-hidden"></div>
                <Image
                    src={"/home/background.svg"}
                    width={1000}
                    height={1000}
                    alt="rectorcupuc background"
                    draggable={false}
                    className="w-full h-full object-center object-cover opacity-25 z-1 absolute"
                ></Image>
                <div className="relative z-10 border-[#AAF3D5] flex flex-col justify-center items-center gap-4 border-4 bg-white/10 backdrop-blur-sm p-12 rounded-2xl shadow-2xl text-center max-w-md w-full">
                    <h1 className='text-3xl font-bold'>No Competitions Found</h1>
                    <Link href={"/dashboard/admin/web/competitions"} className='bg-black/30 px-4 py-2 text-white rounded-lg text-center border-white border-4 w-fit'>Manage Competitions</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#390D62] to-[#6226A4] flex items-center justify-center p-4">
            <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] overflow-hidden"></div>
            <Image
                src={"/home/background.svg"}
                width={1000}
                height={1000}
                alt="rectorcupuc background"
                draggable={false}
                className="w-full h-full object-center object-cover opacity-25 z-1 absolute"
            ></Image>
            <MatchCreatingForm competition={competitions} />
        </div>
    )
}
