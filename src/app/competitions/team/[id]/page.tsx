import { getTeamByID } from '@/lib/team'
import StripeBackground from '@/components/StripeBackground';
import RectorInlineTitle from '@/components/competition/RectorInlineTitle';
import CompetitionTitleHeader from '@/components/competition/CompetitionTitleHeader';
import prisma from '@/lib/prisma';
import { Metadata } from 'next';
import TeamCard from '@/components/competition/TeamCard';

export const metadata: Metadata = {
    title: "Team Details - Rector Cup 2026",
    description: "View detailed information about your team registered for competitions at Rector Cup 2026.",
};

export default async function page({ params }: { params: Promise<{ id: string }> }) {
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
                    
                    {/* Team Grid Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full place-items-center mt-6">
                        
                        {/* 1. Leader Card */}
                        <TeamCard 
                            name={leaderData.name || leaderData.name || "Team Leader"}
                            image={leaderData.image || ""} 
                        />

                        {/* 2. Members Cards */}
                        {teamData.TeamMembers.map(member => (
                            <TeamCard 
                                key={member.id} 
                                name={member.username || member.username} // Prefer name, fallback to username
                                image={member.image || ""}
                            />
                        ))}
                        
                    </div>
                </div>
            </div>
        </>
    );
}