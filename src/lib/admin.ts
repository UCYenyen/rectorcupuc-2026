import prisma from "./prisma";
export default function updateRegistrationStatus(registrationId: string, status: 'Registered' | 'Pending' | 'Failed') {
    return prisma.competitionRegistration.update({
        where: { id: registrationId },  
        data: { registration_status: status },
    });
}