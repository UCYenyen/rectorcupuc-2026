import { getAllRegistrations } from '@/lib/competition';
import RegistrationTable from '@/components/dashboard/admin/RegistrationTable';
import StripeBackground from '@/components/StripeBackground';
import { getTeamJoinRequestsAction } from '@/lib/action';
import prisma from '@/lib/prisma';
import TeamJoinRequestsTable from '@/components/dashboard/admin/TeamJoinRequestsTable';
export default async function RegistrationPage() {
    const teamJoinRequests = await getTeamJoinRequestsAction({});
    const competitions = await prisma.competition.findMany({
        orderBy: { name: 'asc' }
    });

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#390D62] to-[#6226A4] flex items-center justify-center p-4">
            <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] overflow-hidden"></div>
            <StripeBackground />
            <div className="relative z-10 border-[#AAF3D5] border-4 bg-white/10 backdrop-blur-sm p-12 my-[20%] md:my-0 rounded-2xl shadow-2xl text-center w-[90%]">
                <h1 className="text-4xl md:text-5xl text-white font-bold mb-6">Team Join Requests</h1>
                <TeamJoinRequestsTable
                    initialRequests={teamJoinRequests}
                    competitions={competitions}
                />
            </div>
        </div>
    );
}
