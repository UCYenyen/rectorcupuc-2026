import { getTeamByID } from '@/lib/team'
import React from 'react'
import StripeBackground from '@/components/StripeBackground';
import RectorInlineTitle from '@/components/competition/RectorInlineTitle';
import CompetitionTitleHeader from '@/components/competition/CompetitionTitleHeader';
import prisma from '@/lib/prisma';
// Definisikan tipe params sebagai Promise
export default async function page({ params }: { params: Promise<{ id: string }> }) {
    // 1. Await objek params terlebih dahulu [cite: 3]
    const resolvedParams = await params;
    const id = resolvedParams.id;


    if (!id) {
        return <div className="p-8 text-center text-white">ID Tim tidak valid.</div>;
    }

    const teamData = await getTeamByID(id);

    if (!teamData) {
        return (
            <div className="p-8 text-center text-white/60">
                Team not found.
            </div>
        );
    }

    const leaderData = await prisma.user.findUnique({
        where: {
            id: teamData.leader_id
        }
    });

    if (!leaderData) {
        return (
            <div className="p-8 text-center text-white/60">
                Leader data not found.
            </div>
        );
    }
    return (
        <>
            <div className='w-screen h-[10vh] md:h-[7vh]'></div>
            <div className="relative min-h-screen bg-[url('/home/background.svg')] w-screen overflow-hidden flex flex-col justify-center items-center">
                <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] overflow-hidden"></div>
                <StripeBackground />
                <div className="relative text-white z-2 my-[7.5rem] md:my-[10%] flex flex-col gap-4 w-[90%] justify-center items-center border-8 border-[#AAF3D5] p-8 md:p-12 rounded-lg shadow-lg backdrop-blur-2xl bg-gradient-to-b from-[#390D62]/40 to-[#6226A4]/40">
                    <RectorInlineTitle />
                    <CompetitionTitleHeader title={'TEAM DATA - ' + teamData.name} shouldFitContent={false} />
                    <ul className='text-2xl'>
                        <li className="border-4 border-[#AAF3D5] flex flex-col rounded-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-[#E94BFF] to-[#FF6BDB] px-4 py-2">
                                <h3 className="text-white font-bold uppercase">{leaderData.name}</h3>
                            </div>
                        </li>
                        {teamData.TeamMembers.map(member => (
                            <li key={member.id}>{member.username}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}